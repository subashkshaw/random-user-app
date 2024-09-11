import React, { useState } from "react";
import axios from "axios";

const EditUserModal = ({ user, onClose, onSave }: any) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const updatedUser = {
        id: user.id,
        firstName,
        lastName,
        age: Number(age), // Ensure age is a number
      };

      await axios.put(`/api/update-user`, updatedUser);
      onSave(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-xl font-medium">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
