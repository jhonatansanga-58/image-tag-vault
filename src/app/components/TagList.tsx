"use client";

import { useRouter } from "next/navigation";
import { TagInfo } from "../types";

interface TagListProps {
  tags: TagInfo[];
  filterType: "tag" | "character" | "rating";
}

export default function TagList({ tags, filterType }: TagListProps) {
  const router = useRouter();

  const filteredTags = tags
    .filter((tag) => tag.type === filterType)
    .sort((a, b) => b.count - a.count);

  const handleTagClick = (tagName: string) => {
    router.push(`/?search=${encodeURIComponent(tagName)}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center capitalize">
        {filterType}s
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredTags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => handleTagClick(tag.name)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold text-sm rounded-xl p-2 shadow transition-transform hover:scale-105"
          >
            {`${tag.name.replaceAll("_", " ")} (${tag.count})`}
          </button>
        ))}
      </div>
    </div>
  );
}
