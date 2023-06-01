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
          {/* Rest of the form code */}
        </form>
      </div>
    </div>
  );
}
