import React, { useState, useEffect } from "react";
import axios from "axios";

const CriteriaList = () => {
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    fetchCriteria();
  }, []);

  const fetchCriteria = async () => {
    const response = await axios.get("http://localhost:5000/api/criteria");
    setCriteria(response.data);
  };
  
  return (
    <div className="criteria-list">
      <h2>Criteria List</h2>
      <ul>
        {criteria.map((crit) => (
          <li key={crit.id}>{crit.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default CriteriaList;
