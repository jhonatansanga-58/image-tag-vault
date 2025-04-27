// src/app/page.tsx
"use client";

import React, { useState } from "react";
import FilterBar from "./components/FilterBar";
import ImageCard from "./components/ImageCard";

const Page = () => {
  const [filters, setFilters] = useState<string[]>([]);

  const handleApplyFilter = () => {
    // Lógica para aplicar el filtro (esto lo conectamos con la lógica del backend)
    console.log("Aplicar filtros:", filters);
  };

  const handleClearFilters = () => {
    setFilters([]);
    console.log("Filtros limpiados");
  };

  return (
    <div>
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onApplyFilter={handleApplyFilter} 
        onClearFilters={handleClearFilters}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <ImageCard />
        <ImageCard />
        <ImageCard />
        {/* Más ImageCard según los datos */}
      </div>
    </div>
  );
};

export default Page;
