import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const initials = getInitials(userInfo?.fullName);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-12 h-12 font-medium text-black rounded-full bg-gradient-to-r from-white to-[#4067D5]">
        {initials || "?"}{" "}
        {/* Display a default character if initials are not available */}
      </div>
      <div>
        <p className="text-sm font-medium text-white">
          {userInfo?.fullName || "Guest"}
        </p>
        <button
          className="px-2 py-1 text-sm text-white transition bg-transparent border border-white rounded-md hover:bg-white hover:text-black"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
