import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all plants when the component loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  // Add a new plant
  function handleAddPlant(newPlant) {

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {

        setPlants((currentPlants) => [...currentPlants, data]);
      })
      .catch((error) => console.error("Error adding plant:", error));
  }

  // Filter plants by name
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NewPlantForm onAddPlant={handleAddPlant} />

      <Search
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <PlantList plants={filteredPlants} />
    </>
  );
}

export default PlantPage;