import React, { useState } from "react";
import axios from "axios";

const InspectionForm = ({ carId }) => {
  const [criteria, setCriteria] = useState([
    { description: "Brakes", is_good: true, note: "" },
    { description: "Lights", is_good: true, note: "" },
    { description: "Steering", is_good: true, note: "" },
  ]);

  const updateCriteria = (index, field, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index][field] = value;
    setCriteria(updatedCriteria);
  };

  const submitInspection = async () => {
    await axios.post(`http://localhost:5000/api/criteria/${carId}`, {
      criteria,
    });
    alert("Inspection submitted successfully!");
  };

  return (
    <div>
      <h2>Inspection Form</h2>
      {criteria.map((crit, index) => (
        <div key={index}>
          <p>{crit.description}</p>
          <label>
            Is Good:
            <input
              type="checkbox"
              checked={crit.is_good}
              onChange={(e) =>
                updateCriteria(index, "is_good", e.target.checked)
              }
            />
          </label>
          {!crit.is_good && (
            <textarea
              placeholder="Enter note"
              value={crit.note}
              onChange={(e) => updateCriteria(index, "note", e.target.value)}
            />
          )}
        </div>
      ))}
      <button onClick={submitInspection}>Submit Inspection</button>
    </div>
  );
};

export default InspectionForm;
