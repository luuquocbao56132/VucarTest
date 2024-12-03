import React, { useState } from "react";
import AddCar from "./components/Addcar";
import CarList from "./components/Carlist";
import CriteriaList from "./components/CriteriaList";
import CarCriteriaList from "./components/CarCriteriaList";
import "./App.css";

const App = () => {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [refreshCarList, setRefreshCarList] = useState(false);

  const handleCarCriteriaUpdate = () => {
    setRefreshCarList(!refreshCarList);
  };


  return (
    <div className="app-container">
      <h1>Car Inspection App</h1>
      <AddCar onCarAdded={() => window.location.reload()} />
      <div className="content-container">
        <div className="list-container">
          <CarList onCarSelected={setSelectedCarId} refresh={refreshCarList} />
          <CriteriaList />
        </div>
        <div className="details-container">
          {selectedCarId ? (
            <CarCriteriaList 
              selectedCarId={selectedCarId} 
              setRefresh={handleCarCriteriaUpdate}
              onCriteriaUpdate={handleCarCriteriaUpdate}
            />
          ) : (
            <p>Select a car to view its criteria details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
