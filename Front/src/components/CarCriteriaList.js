import React, { useState, useEffect } from "react";
import axios from "axios";

const CarCriteriaList = ({ selectedCarId, setRefresh}) => {
  const [carCriteria, setCarCriteria] = useState([]);
  const [carName, setCarName] = useState("");
  const [noteValues, setNoteValues] = useState({}); 

  useEffect(() => {
    if (selectedCarId) {
      fetchCarCriteria();
      fetchCarName();
    }
  }, [selectedCarId]);

  const fetchCarCriteria = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/car_criteria/${selectedCarId}`
      );
      setCarCriteria(response.data);

      const notes = response.data.reduce((acc, item) => {
        acc[item.id] = item.note || "";
        return acc;
      }, {});
      setNoteValues(notes);
    } catch (error) {
      console.error("Error fetching car criteria:", error);
    }
  };

  const fetchCarName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cars/${selectedCarId}`
      );
      setCarName(response.data.name);
    } catch (error) {
      console.error("Error fetching car name:", error);
    }
  };

  const updateCarCriteria = async (id, updatedField) => {
    try {
      // Automatically clear note if is_good is set to true
      if (updatedField.is_good) {
        updatedField.note = "";
      }

      await axios.put(
        `http://localhost:5000/api/car_criteria/${id}`,
        updatedField
      );
      fetchCarCriteria(); // Refresh the data after update
    } catch (error) {
      console.error("Error updating car criteria:", error);
    }
  };

  const handleNoteChange = (id, value) => {
    setNoteValues({ ...noteValues, [id]: value });
  };

  const handleNoteSubmit = (id) => {
    updateCarCriteria(id, { note: noteValues[id] });
  };

  return (
    <div>
      <h3>Car Criteria List for Car: {carName}</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Criteria Name</th>
            <th>Is Good</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {carCriteria.map((cc) => (
            <tr key={cc.id}>
              <td>{cc.criteria.description}</td>
              <td>
                <input
                  type="checkbox"
                  checked={cc.is_good}
                  onChange={(e) => {
                    updateCarCriteria(cc.id, { is_good: e.target.checked }).then(() => { 
                      setRefresh(true);
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={noteValues[cc.id] || ""}
                  onChange={(e) => handleNoteChange(cc.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleNoteSubmit(cc.id);
                    }
                  }}
                  disabled={cc.is_good} // Disable editing if is_good is true
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarCriteriaList;
