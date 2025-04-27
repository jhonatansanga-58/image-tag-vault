"use client";

import React, { useState } from "react";

interface FilterBarProps {
  filters: string[];
  setFilters: (filters: string[]) => void;
  onApplyFilter: () => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, onApplyFilter, onClearFilters }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilters([...filters, input.trim()]);
      setInput("");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Escribe y presiona Enter..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={onApplyFilter} style={{ marginRight: "5px" }}>Aplicar Filtros</button>
      <button onClick={onClearFilters}>Limpiar</button>

      {/* Filtros actuales */}
      <div style={{ marginTop: "10px" }}>
        {filters.map((filter, idx) => (
          <span key={idx} style={{ marginRight: "8px", padding: "4px 8px", background: "#eee", borderRadius: "4px" }}>
            {filter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
