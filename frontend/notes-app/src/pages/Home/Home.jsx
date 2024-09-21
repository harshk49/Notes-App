import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../../public/4192859.webp";
import NoDataImg from "../../../public/no_data.avif";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });

    setTimeout(() => {
      handleCloseToast();
    }, 3000);
  };

  const handleCloseToast = () => {
    setShowToastMsg((prev) => ({
      ...prev,
      isShown: false,
    }));
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Delete Note
  const deleteNote = async (note) => {
    const noteId = note._id;

    if (!noteId) {
      console.error("No note ID provided for deletion.");
      return;
    }

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log(
        "Error deleting note:",
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  // Search Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      } else {
        setIsSearch(true);
        setAllNotes([]);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned, // Toggle the isPinned state
        }
      );
      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully", "edit");
        getAllNotes();
      }
    } catch (error) {
      console.log("Error updating pinned status:", error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onPinNote={() => updateIsPinned(item)}
                onDelete={() => deleteNote(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch ? (
                <div className="p-4 text-center bg-gray-100 rounded-lg shadow-md">
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    Sorry, we couldn't find any notes that match your search.
                  </h2>
                  <p className="text-gray-600 text-md">
                    <span className="font-medium">
                      Try adjusting your search term
                    </span>
                    <span className="font-medium"> to see if that helps!</span>
                  </p>
                </div>
              ) : (
                <div className="p-4 text-center bg-gray-100 rounded-lg shadow-md">
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    Welcome to Notes App!
                  </h2>
                  <p className="text-gray-600 text-md">
                    <span className="font-medium">Click the </span>
                    <span className="px-2 py-1 font-semibold text-white bg-blue-500 rounded-lg">
                      +
                    </span>
                    <span className="font-medium">
                      {" "}
                      button below to add your notes,
                    </span>
                  </p>
                  <p className="mt-1 text-gray-600 text-md">
                    including tasks, ideas, or reminders to stay organized and
                    inspired.
                  </p>
                </div>
              )
            }
          />
        )}
      </div>
      <button
        className="absolute flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4067D5] to-[#A0C4FF] hover:shadow-lg transition-all right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] text-black" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default Home;
