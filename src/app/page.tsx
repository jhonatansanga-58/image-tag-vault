"use client"; // Indica que este archivo es de cliente y permite el uso de hooks y efectos de React
import { useEffect, useState, useRef } from "react"; // Import useRef
import { fetchData } from "./utils/fetchData"; // Importamos la función para obtener datos desde el CSV
import { buildTagsIndex, TagInfo } from "./utils/buildTagsIndex"; // Importamos la función para construir el índice de tags
import { searchTags } from "./utils/searchTags"; // Importamos la función de búsqueda
import { getIconForType } from "./utils/getIconForType"; // Importamos la función de iconos

// Definimos la estructura de los datos que vamos a recibir del CSV
interface ImageData {
  image: string;
  tags: string[];
  character_tags: string[];
  ratings: string[];
}

// El componente principal de la página
export default function HomePage() {
  const [images, setImages] = useState<ImageData[]>([]); // Estado para almacenar las imágenes originales
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]); // Estado para almacenar las imágenes filtradas
  const [tagsIndex, setTagsIndex] = useState<TagInfo[]>([]); // Estado para almacenar el índice de tags
  const [searchText, setSearchText] = useState(""); // Texto que el usuario escribe
  const [suggestions, setSuggestions] = useState<TagInfo[]>([]); // Sugerencias de autocompletado
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Tags seleccionados para el filtro
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);

  // Create a ref for the search input div
  const searchInputDivRef = useRef<HTMLDivElement | null>(null);
  const suggestionsDiv = useRef<HTMLDivElement | null>(null);

  // Efecto para cargar las imágenes cuando el componente se monta
  useEffect(() => {
    fetchData() // Llamamos a la función para cargar los datos desde el CSV
      .then((data) => {
        setImages(data);
        setFilteredImages(data);
        setTagsIndex(buildTagsIndex(data)); // Construimos el índice de tags una sola vez
        manageSuggestions([]); // Limpiamos las sugerencias al cargar
      }) // Si la carga es exitosa, actualizamos el estado de las imágenes
      .catch((err) => {
        // Si hay error, mostramos un mensaje de error
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
      });
  }, []); // El array vacío asegura que solo se ejecute una vez al cargar el componente

  useEffect(() => {
    if (suggestionsDiv.current) {
      if (!isInputFocused) {
        suggestionsDiv.current.style.display = "none";
      } else if (suggestions.length > 0) {
        suggestionsDiv.current.style.display = "block";
      }
    }
  }, [isInputFocused, suggestions]);

  // Función que maneja la escritura en el input de búsqueda
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchText(value);

    // Buscamos sugerencias solo del último término escrito
    const terms = value.split(",").map((term) => term.trim());
    const lastTerm = terms[terms.length - 1];

    const results = searchTags(tagsIndex, lastTerm);
    manageSuggestions(results); // Actualizamos las sugerencias
  }

  // Función para agregar un tag seleccionado desde sugerencias
  function handleSelectSuggestion(suggestion: TagInfo) {
    const newTags = [...selectedTags, suggestion.name];
    setSelectedTags(newTags);
    setSearchText(newTags.join(", ") + ", "); // Actualizamos el input mostrando los tags
    manageSuggestions([]); // Limpiamos sugerencias
  }

  function manageSuggestions(results: TagInfo[]) {
    setSuggestions(results);

    setActiveSuggestionIndex(-1); // Reset al moverse entre sugerencias nuevas

    if (searchInputDivRef.current && suggestionsDiv.current) {
      if (results.length === 0 || !isInputFocused) {
        suggestionsDiv.current.style.display = "none";
        searchInputDivRef.current.classList.add("no-suggestions");
      } else {
        suggestionsDiv.current.style.display = "block";
        searchInputDivRef.current.classList.remove("no-suggestions");
      }
    }
  }

  // Función para aplicar el filtro de imágenes
  function applyFilters() {
    // Dividir el texto actual en el input en tags
    const terms = searchText
      .split(",")
      .map((term) => term.trim())
      .filter(Boolean);
    const tagsToFilter = terms.length > 0 ? terms : selectedTags;

    if (tagsToFilter.length === 0) {
      setFilteredImages(images);
      return;
    }

    const filtered = images.filter((img) => {
      const allTags = [...img.tags, ...img.character_tags, ...img.ratings];
      return tagsToFilter.every((tag) => allTags.includes(tag));
    });

    setFilteredImages(filtered);
  }

  // Función para manejar el "Enter" en el input (aplica filtros)
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= suggestions.length ? 0 : nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) => {
        const nextIndex = prevIndex - 1;
        return nextIndex < 0 ? suggestions.length - 1 : nextIndex;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        activeSuggestionIndex >= 0 &&
        activeSuggestionIndex < suggestions.length
      ) {
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      } else {
        applyFilters();
      }
    }
  }

  return (
    <div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="search-bar">
            <div className="search-input-div" ref={searchInputDivRef}>
              <input
                className="search-input"
                type="text"
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    if (!isSelectingSuggestion) {
                      setIsInputFocused(false);
                    }
                  }, 100); // Un pequeño delay para que el click en la sugerencia termine primero
                }}
                placeholder="Escribe tags separados por comas"
              />

              <div className="search-icon" onClick={applyFilters}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <div className="suggestions" ref={suggestionsDiv}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.name}
                  className={`suggestion-item ${
                    index === activeSuggestionIndex ? "active" : ""
                  }`}
                  onMouseDown={() => setIsSelectingSuggestion(true)} // <- antes de hacer click
                  onClick={() => {
                    handleSelectSuggestion(suggestion);
                    setIsSelectingSuggestion(false); // <- después de seleccionar
                  }}
                >
                  <span>{getIconForType(suggestion.type)} </span>{" "}
                  {/* Muestra el icono */}
                  <span>{suggestion.name}</span>{" "}
                  {/* Muestra el nombre del tag */}
                </div>
              ))}
            </div>
          </div>

          {/* Galería de imágenes */}
          <div className="gallery">
            {filteredImages.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.image}
                src={`images/${img.image}`}
                alt="tagged"
                className="image-card"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
