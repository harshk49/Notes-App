import moment from "moment";
import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="p-4 transition-all ease-in-out bg-gradient-to-r from-white to-[#A0C4FF] text-slate-950 rounded-lg hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-black" : "text-slate-950"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="mt-2 text-xs text-slate-600">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item}`).join(", ")}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <MdCreate
            className="text-black icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="text-black icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
