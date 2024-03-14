import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const RegisteredUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://circularclientapi.azurewebsites.net/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
        <div className="container-fluid px-3 pt-4">
          <div className="text-center bg-dark ">
            <h2 className="text-uppercase p-2 page-title">
              REGISTERED USERS
            </h2>
          </div>
        {/* <div className="row"> */}
        <div className="row text-light">
          <div className="col-lg-12">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Zip Code</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.city}</td>
                    <td>{user.zipCode}</td>
                    <td>{user.state}</td>
                    <td>{user.country}</td>
                    <td>{user.address}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.mobileNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default RegisteredUser;
