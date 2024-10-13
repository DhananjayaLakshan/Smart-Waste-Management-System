import { useState, useEffect } from "react";
import { Checkbox, Button, Card, Label, TextInput } from "flowbite-react";

const wasteCategories = [
  { name: "Recyclable", img: "recyclable.png" },
  { name: "Organic", img: "organic.png" },
  { name: "Hazardous", img: "hazardous.png" },
  { name: "Electronic", img: "electronic.png" },
  { name: "Other", img: "other.png" },
];

export default function ScheduleCollection() {
  const [formData, setFormData] = useState({
    wasteType: [],
    selectedDate: "",
    selectedTime: "",
  });
  const [pickupHistory, setPickupHistory] = useState([]);

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
      }
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }
  };

  return (
    <div className="flex flex-row justify-between gap-8 p-8">
      {/* Left Side - Waste Category Selection */}
      <div className="w-1/2 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-5">Schedule Waste Collection</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {wasteCategories.map((category) => (
              <div key={category.name} className="text-center">
                <img
                  src={`/images/${category.img}`}
                  alt={category.name}
                  className="h-20 w-20 mx-auto mb-2"
                />
                <Checkbox
                  name={category.name}
                  id={category.name}
                  onChange={handleChange}
                  className="mb-2"
                />
                <Label htmlFor={category.name}>{category.name}</Label>
              </div>
            ))}
          </div>

          <div className="mb-5">
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

          <div className="mb-5">
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

          <Button type="submit" className="w-full">
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
              <Card key={schedule._id}>
                <p><strong>Date:</strong> {new Date(schedule.selectedDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {schedule.selectedTime}</p>
                <p><strong>Waste Types:</strong> {schedule.wasteType.join(", ")}</p>
                <p><strong>Address:</strong> {schedule.address}</p>
              </Card>
            ))
          ) : (
            <p>No pickup history available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
