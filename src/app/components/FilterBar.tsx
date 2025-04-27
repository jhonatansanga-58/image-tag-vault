// src/components/FilterBar.tsx

import React from "react";

interface FilterBarProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  onApplyFilter: () => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, onApplyFilter, onClearFilters }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters(value.split(",").map((tag) => tag.trim()));
  };

  return (
    <div style={styles.filterBar}>
      <input
        type="text"
        placeholder="Filtrar por tags, personajes o ratings"
        value={filters.join(", ")}
        onChange={handleInputChange}
        style={styles.input}
      />
      <button onClick={onApplyFilter} style={styles.button}>Aplicar filtro</button>
      <button onClick={onClearFilters} style={styles.button}>Limpiar</button>
    </div>
  );
};

const styles = {
  filterBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: 1,
  },
  button: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  }
};

export default FilterBar;
