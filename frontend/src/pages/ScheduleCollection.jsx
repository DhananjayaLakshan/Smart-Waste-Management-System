import { useState, useEffect } from "react";
import { Checkbox, Button, Card, Label, TextInput } from "flowbite-react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import ewaste from "../assets/categories/ewaste.jpg";
import glass from "../assets/categories/glass.jpg";
import metal from "../assets/categories/metal.jpg";
import organik from "../assets/categories/organik.jpg";
import paper from "../assets/categories/paper.jpg";
import plastic from "../assets/categories/plastic.jpg";
import SchedulePopup from "../components/SchedulePopup";
import background from "../assets/background.png";
import Swal from "sweetalert2";

const wasteCategories = [
  { name: "E-Waste", img: ewaste },
  { name: "Glass Waste", img: glass },
  { name: "Metal Waste", img: metal },
  { name: "Organik Waste", img: organik },
  { name: "Paper Waste", img: paper },
  { name: "Plastic Waste", img: plastic },
];

export default function ScheduleCollection() {
  const [formData, setFormData] = useState({
    wasteType: [],
    selectedDate: "",
    selectedTime: "",
  });
  const [pickupHistory, setPickupHistory] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pickup history on component mount
  useEffect(() => {
    const fetchPickupHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/waste", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status === "success") {
          setPickupHistory(data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchPickupHistory();
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => {
      const updatedWasteType = checked
        ? [...prevData.wasteType, name]
        : prevData.wasteType.filter((type) => type !== name);
      return { ...prevData, wasteType: updatedWasteType };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/waste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "success") {
        // Update history after successful scheduling
        setPickupHistory((prevHistory) => [...prevHistory, data.data]);

        // Show success alert using SweetAlert
        Swal.fire({
          title: "Success!",
          text: "Your waste collection has been successfully scheduled.",
          confirmButtonText: "OK",
          confirmButtonColor: "#006400",
        });
      } else if (data.status === "failed") {
        Swal.fire({
          title: "Error!",
          text: data.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#FF0000",
        });
      }
    } catch (error) {
      console.error("Error submitting schedule:", error);

      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting your schedule.",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF0000",
      });
    }
  };

  // Open modal and fetch schedule details
  const handleCardClick = async (scheduleId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/waste/${scheduleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success") {
        setSelectedSchedule(data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Handle update
  const handleUpdate = async (updatedSchedule) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/waste/${updatedSchedule._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSchedule),
      });
      const data = await res.json();
      if (data.status === "success") {
        // Update local history
        const updatedHistory = pickupHistory.map((item) =>
          item._id === updatedSchedule._id ? data.data : item
        );
        setPickupHistory(updatedHistory);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  // Handle delete
  const handleDelete = async (scheduleId) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/api/waste/${scheduleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPickupHistory(pickupHistory.filter((item) => item._id !== scheduleId));
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <div
      className="flex lg:flex-row flex-col justify-between gap-8 p-8 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Left Side - Waste Category Selection */}
      <div className="w-full lg:w-1/2 flex flex-col items-center glassmorphism rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-lg border border-white/20 p-7 lg:h-2/3 ">
        <h2 className="text-2xl font-bold mb-5">Schedule Waste Collection</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid lg:grid-cols-3  md:grid-cols-2 gap-4 mb-5">
            {wasteCategories.map((category) => (
              <div
                key={category.name}
                className="text-center bg-white shadow-lg rounded-2xl py-3"
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="h-20 w-auto mx-auto mb-2 "
                />
                <Checkbox
                  name={category.name}
                  id={category.name}
                  onChange={handleChange}
                  className="mr-3"
                />
                <Label htmlFor={category.name}>{category.name}</Label>
              </div>
            ))}
          </div>

          <div className="md:flex gap-8">
            <div className="mb-5 flex-1">
              <Label htmlFor="selectedDate">Select Date:</Label>
              <TextInput
                type="date"
                id="selectedDate"
                value={formData.selectedDate}
                onChange={(e) =>
                  setFormData({ ...formData, selectedDate: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>

            <div className="mb-5 flex-1">
              <Label htmlFor="selectedTime">Select Time:</Label>
              <TextInput
                type="time"
                id="selectedTime"
                value={formData.selectedTime}
                onChange={(e) =>
                  setFormData({ ...formData, selectedTime: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="greenToBlue"
          >
            Schedule Pickup
          </Button>
        </form>
      </div>

      {/* Right Side - Pickup History */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-5">Pickup History</h2>
        <div className="flex flex-col gap-4">
          {pickupHistory.length ? (
            pickupHistory.map((schedule) => (
              <Card key={schedule._id} className="flex justify-between">
                <div onClick={() => handleCardClick(schedule._id)}>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(schedule.selectedDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {schedule.selectedTime}
                  </p>
                  <p>
                    <strong>Waste Types:</strong>{" "}
                    {schedule.wasteType.join(", ")}
                  </p>
                  <p>
                    <strong>Address:</strong> {schedule.address}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <HiPencilAlt
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleCardClick(schedule._id)}
                  />
                  <HiTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(schedule._id)}
                  />
                </div>
              </Card>
            ))
          ) : (
            <p>No pickup history available.</p>
          )}
        </div>
      </div>

      {/* Popup Modal for Schedule Details */}
      {selectedSchedule && (
        <SchedulePopup
          schedule={selectedSchedule}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
