import { useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";

export default function SchedulePopup({
  schedule,
  isOpen,
  onClose,
  onUpdate,
}) {
  const [updatedSchedule, setUpdatedSchedule] = useState(schedule);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSchedule((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateClick = () => {
    onUpdate(updatedSchedule);
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Schedule Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <Label htmlFor="selectedDate">Date</Label>
            <TextInput
              type="date"
              id="selectedDate"
              name="selectedDate"
              value={new Date(updatedSchedule.selectedDate)
                .toISOString()
                .split("T")[0]}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="selectedTime">Time</Label>
            <TextInput
              type="time"
              id="selectedTime"
              name="selectedTime"
              value={updatedSchedule.selectedTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <TextInput
              type="text"
              id="address"
              name="address"
              value={updatedSchedule.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="wasteType">Waste Types</Label>
            <p>{updatedSchedule.wasteType.join(", ")}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdateClick}>Update</Button>
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
