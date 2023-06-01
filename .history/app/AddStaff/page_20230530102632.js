"use client";

import { useState } from "react";

export default function AddStaff() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    // You can access the form data using the state variables (name, phoneNumber, role, bloodGroup, emergencyContact)
    console.log("Form submitted");
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    console.log("Role:", role);
    console.log("Blood Group:", bloodGroup);
    console.log("Emergency Contact:", emergencyContact);

    try {
      const res = await fetch("/api/AddStafff", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          phoneNumber: phoneNumber,
          role: role,
          bloodGroup: bloodGroup,
          emergencyContactNumber: emergencyContact,
        }),
      });
      if (res.ok) {
        alert("Staff added Successfully");
        setName("");
        setPhoneNumber("");
        setRole("");
        setBloodGroup("");
        setEmergencyContact("");
      } else if (res.status === 409) {
        alert("Staff already exists");
        setName("");
        setPhoneNumber("");
        setRole("");
        setBloodGroup("");
        setEmergencyContact("");
      } else if (res.status === 500) {
        alert("Internal server error");
        console.log(res.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 font-semibold">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block mb-2 font-semibold">
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="emergencyContact"
              className="block mb-2 font-semibold"
            >
              Emergency Contact Number
            </label>
            <input
              type="text"
              id="emergencyContact"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-full max-w-md px-6 py-8 ml-6 bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Image Section</h2>
        <img
          src="https://via.placeholder.com/400"
          alt="Registration Image"
          className="w-full h-auto"
        />
      </div>
      <footer className="mt-8 text-center text-gray-500">
        &copy; 2023 Company Name. All rights reserved.
      </footer>
    </div>
  );
}
