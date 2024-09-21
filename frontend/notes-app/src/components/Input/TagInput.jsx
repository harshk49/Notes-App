import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    const trimmedValue = inputValue.trim();
    // Prevent adding empty or duplicate tags
    if (trimmedValue !== "" && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 border rounded text-slate-900"
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          className="px-2 py-1 text-sm transition-all ease-in-out bg-gradient-to-r from-white to-[#A0C4FF] text-slate-950 rounded-lg outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && addNewTag()}
        />
        <button
          className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#4067D5] to-[#A0C4FF] text-black rounded hover:shadow-md"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
