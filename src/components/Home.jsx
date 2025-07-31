import axios from "axios";
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { createUser, deleteUser, fetchUsers, updateUser } from "../../api";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
import UsersTable from "./UsersTable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { formReducer, initialForm } from "../reducer/FormReducer";

const Home = () => {
  const [users, setUsers] = useLocalStorage("user", []);
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditingModal, setShowEditingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const nameInputRef = useRef(null);
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    const searchTermLower = searchTerm.toLowerCase();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm, users]);
  
  const handleSearchResults = useCallback(() => {
    setSearchResults(filteredUsers);
  }, [filteredUsers]);

  useEffect(() => {
    handleSearchResults();
  }, [handleSearchResults])

  useEffect(() => {
    if (showEditingModal && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  });


  useEffect(() => {
    if (users?.length === 0) {
      const getUsers = async () => {
        try {
          const res = await fetchUsers();

          setUsers(res);
        } catch (error) {
          console.log("Failed to fetch users from API. ", error);
        }
      };

      getUsers();
    }
  }, []);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleEditClick = (user) => {
    dispatch({
      type: "SET_FORM",
      payload: { name: user.name, email: user.email, phone: user.phone },
    });
    setEditingId(user.id);
    setIsEditMode(true);
    setShowEditingModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const updated = await updateUser(editingId, form);
        console.log("User: ", updated);
        toast.success(`User ${form.name} updated.`);

        setUsers((prev) =>
          prev.map((user) => (user.id === editingId ? updated : user))
        );
        setSearchResults((prev) =>
          prev.map((user) => (user.id === editingId ? updated : user))
        );
      } else {
        const newUser = await createUser(form);
        toast.success(`User "${form.name}" added.`);
        setUsers((prev) => [...prev, newUser]);
        setSearchResults((prev) => [...prev, newUser]);
      }
    } catch (error) {
      console.log("Error during user submission: ", error);
      toast.error(`Unable to ${isEditMode ? "edit" : "add"} the user!`);
    } finally {
      dispatch({ type: "RESET" });
      setIsEditMode(false);
      setShowEditingModal(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const message = await deleteUser(id);
      toast.success(`User of ${userToDelete?.name}deleted successfully!`);

      setUsers((prev) => prev.filter((user) => user.id !== id));
      setSearchResults((prev) => prev.filter((user) => user.id !== id));
      setShowEditingModal(false);
    } catch (error) {
      console.error("Delete failed: ", error);
      toast.error("Delete failed. Try again later!");
    } finally {
      setShowConfirm(false);
      setUserToDelete(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          onClick={() => {
            dispatch({ type: "RESET" });
            setIsEditMode(false);
            setShowEditingModal(true);
          }}
        >
          Add User
        </button>
      </div>
      <div>
        <SearchBar
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          handleClearSearch={handleClearSearch}
        />
      </div>

      {error && <div className="text-red-600 text-sm">Error: {error}</div>}

      {isLoading ? (
        <div className="text-center justify-center items-center w-full h-full">
          <p className="spinner"></p>
        </div>
      ) : (
        <UsersTable
          searchResults={searchResults}
          showConfirm={showConfirm}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
          setShowConfirm={setShowConfirm}
          userToDelete={userToDelete}
          setUserToDelete={setUserToDelete}
        />
      )}

      {/* Modal for Add/Edit */}
      {showEditingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditingModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-pointer"
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
