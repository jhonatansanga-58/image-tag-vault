import Papa from "papaparse";

interface ImageData {
  image: string;
  ratings: string[];
  character_tags: string[];
  tags: string[];
}

export async function fetchData(): Promise<ImageData[]> {
  try {
    const res = await fetch("/data/batch_tags.csv");
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const csvText = await res.text();
    const parsed = Papa.parse<string[]>(csvText, {
      delimiter: ",",
      skipEmptyLines: true,
    });

    if (parsed.errors.length > 0) {
      throw new Error(
        `CSV Parsing Error: ${parsed.errors.map((e) => e.message).join(", ")}`
      );
    }

    const images: ImageData[] = parsed.data
      .filter((row) => row[0] !== "image") // <--- esto salta la cabecera
      .map((row) => {
        const [image, ratings, character_tags, tags] = row;
        return {
          image: image || "",
          ratings: ratings ? ratings.split(";") : [],
          character_tags: character_tags ? character_tags.split(";") : [],
          tags: tags ? tags.split(";") : [],
        };
      });

    return images;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    throw error;
  }
}
