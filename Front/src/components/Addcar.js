import React, { useState } from "react";
import axios from "axios";

const AddCar = ({ onCarAdded }) => {
  const [carName, setCarName] = useState("");

  const handleAddCar = async () => {
    if (!carName) return alert("Please enter a car name");

    await axios.post("http://localhost:5000/api/cars", { name: carName });
    setCarName("");
    onCarAdded();
  };

  return (
    <div>
      <h2>Add a New Car</h2>
      <input
        type="text"
        placeholder="Car name"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
      />
      <button onClick={handleAddCar}>Add Car</button>
    </div>
  );
};

export default AddCar;
