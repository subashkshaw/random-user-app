"use client";

import React, { useState, useEffect } from "react";

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
      <h1>User List</h1>
      {data.length > 0 && (
        <ul>
          {data.map((user: any, index: any) => (
            <li key={index}>
              <img src={user.picture.thumbnail} alt="User Thumbnail" />
              <div>
                <p>
                  Name:{" "}
                  {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </p>
                <p>Gender: {user.gender}</p>
                <p>Age: {user.dob.age}</p>
                <p>Email: {user.email}</p>
                <p>
                  Location:{" "}
                  {`${user.location.city}, ${user.location.state}, ${user.location.country}`}
                </p>
                <p>Phone: {user.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
