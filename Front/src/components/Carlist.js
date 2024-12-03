import React, { useState, useEffect } from "react";
import axios from "axios";

const CarList = ({ onCarSelected, refresh }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, [refresh]);

  const fetchCars = async () => {
    const response = await axios.get("http://localhost:5000/api/cars");
    setCars(response.data);
  };

  return (
    <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id} onClick={() => onCarSelected(car.id)}>
            {car.name} - Status:{" "}
            {car.status === 0
              ? "Not Inspected"
              : car.status === 1
              ? "Inspecting"
              : "Inspected"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
