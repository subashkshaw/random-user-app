"use client";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [user, setUser] = useState({ results: [] });

  const fetchInfo = () => {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); 
        setUser(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      {user.results.map((emp: any, i: any) => {
        return (
          <ul key={i}>
            <li>
              {emp.name.title} {emp.name.first} {emp.name.last} {emp.dob.age}
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default Users;
