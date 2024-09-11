"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSort } from "react-icons/bi";
import EditModal from "./EditModal";

const Users = ({ initialData }: any) => {
  const [data, setData] = useState(initialData || []);
  const [nameAsc, setNameAsc] = useState(false);
  const [ageAsc, setAgeAsc] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [success, setSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNameToggle = () => {
    setNameAsc(!nameAsc);
    setSortBy("firstName");
    setSortOrder(nameAsc ? "asc" : "desc");
  };

  const handleAgeToggle = () => {
    setAgeAsc(!ageAsc);
    setSortBy("age");
    setSortOrder(ageAsc ? "asc" : "desc");
  };

  const handleDelete = async (id: any) => {
    try {
      setSuccess(false);
      await axios.delete(`api/delete-user?id=${id}`);
      setSuccess(true);
      fetchData(); // Refresh the data
    } catch (error) {
      setSuccess(false);
      console.error("Unable to delete user");
    }
  };

  const handleCreate = async () => {
    try {
      setSuccess(false);
      await axios.post(`api/create-user`, {});
      setSuccess(true);
      fetchData(); // Refresh the data
    } catch (error) {
      setSuccess(false);
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, [initialData, nameAsc, ageAsc, success]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `api/get-user?sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      setData(res.data.allUsers);
      console.log(res.data.allUsers, "User Data");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = (updatedUser: any) => {
    setData(
      data.map((user: any) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsModalOpen(false); 
  };

  return (
    <div>
      <h2 className="text-2xl font-medium font-sans">All Users</h2>
      <button
        className="border border-slate-500  from-sky-500 to-indigo-500 p-2  bg-gradient-to-l hover:bg-gradient-to-r my-2"
        onClick={handleCreate}
      >
        Generate User
      </button>
      {data && (
        <table className="table-auto w-full text-left border-spacing-4 border border-slate-500  from-sky-500 to-indigo-500 p-5 bg-gradient-to-l hover:bg-gradient-to-r">
          <thead>
            <tr>
              <th className="border border-slate-600 p-2">
                <span className="flex items-center">
                  Name{" "}
                  <BiSort
                    onClick={handleNameToggle}
                    className={`mx-3 ${!nameAsc && "scale-x-[-1]"}`}
                  />
                </span>
              </th>
              <th className="border border-slate-600 p-2">
                <span className="flex items-center">
                  Age{" "}
                  <BiSort
                    onClick={handleAgeToggle}
                    className={`mx-3 ${!ageAsc && "scale-x-[-1]"}`}
                  />
                </span>
              </th>
              <th className="border border-slate-600 p-2">Edit</th>
              <th className="border border-slate-600 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: any, index: any) => (
              <tr key={index}>
                <td className="border border-slate-700  p-2">
                  {`${user.firstName}`}&nbsp; {`${user.lastName}`}
                </td>
                <td className="border border-slate-700  p-2">{`${user.age}`}</td>
                <td className="border border-slate-700  p-2">
                  <FiEdit onClick={() => handleEditClick(user)} />
                </td>
                <td className="border border-slate-700  p-2">
                  <RiDeleteBin6Line onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && selectedUser && (
        <EditModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Users;
