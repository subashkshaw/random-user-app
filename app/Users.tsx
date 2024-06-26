"use client";

import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const Users = ({ initialData }: any) => {
  const [data, setData] = useState(initialData || []);

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api");
      const json = await response.json();
      setData(json.results);

      // Store the fetched data in local storage
      localStorage.setItem("userData", JSON.stringify(json.results));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium font-sans">User List</h2>
      {data.length > 0 && (
        <div className="rounded from-sky-500 to-indigo-500 p-5 bg-gradient-to-l hover:bg-gradient-to-r">
          <ul>
            {data.map((user: any, index: any) => (
              <li key={index}>
                <p className="flex justify-end text-white">
                  <FiEdit />
                </p>
                <img
                  src={user.picture.thumbnail}
                  alt="User Thumbnail"
                  className="p-1"
                />

                <div>
                  <p className="p-1">
                    Name:{" "}
                    {`${user.name.title} ${user.name.first} ${user.name.last}`}
                  </p>
                  <p className="p-1">Gender: {user.gender}</p>
                  <p className="p-1">Age: {user.dob.age}</p>
                  <p className="p-1">Email: {user.email}</p>
                  <p className="p-1">
                    Location:{" "}
                    {`${user.location.city}, ${user.location.state}, ${user.location.country}`}
                  </p>
                  <p className="p-1">Phone: {user.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;
