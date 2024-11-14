"use client";

import React from "react";
import BackOffice from "../../../components/admin_components/BackOffice"; 
const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Back Office</h1>
      <BackOffice />
    </div>
  );
};

export default AdminPage;
