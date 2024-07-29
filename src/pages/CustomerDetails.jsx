import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UpdateCustomer from "../components/UpdateCustomer.jsx";
import CustomersList from "./CustomersList.jsx";

const CustomerListComponent = () => {
  const navigate = useNavigate();
  //retrieveing data from localstorage
  const customerList = useLoaderData();
  const [customers, setCustomers] = useState(customerList);

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handelEditCustomer = (pancard) => {
    const customer = customers.find((customer) => customer.pancard === pancard);
    setSelectedCustomer(customer);
    setShowUpdatePopup(true);
  };

  const handelDeleteCustomer = (pancard) => {
    setCustomers((prev) => {
      const updatedList = prev.filter(
        (customer) => customer.pancard !== pancard
      );
      console.log(updatedList);
      if (updatedList.length < 1) {
        localStorage.setItem("customers", "[]");
        return [];
      }
      localStorage.setItem("customers", JSON.stringify(updatedList));
      return updatedList;
    });
    toast("Address Deleted", { theme: "warning" });
  };

  const handleSave = (updatedCustomer) => {
    console.log(updatedCustomer);
    const updatedCustomers = customers.map((customer) =>
      customer.pancard === updatedCustomer.pancard ? updatedCustomer : customer
    );
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
    setShowUpdatePopup(false);
    setSelectedCustomer(null);
  };

  const handleNewCustomer = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <CustomersList
        customers={customers}
        handelDeleteCustomer={handelDeleteCustomer}
        handelEditCustomer={handelEditCustomer}
      />
      {showUpdatePopup && (
        <UpdateCustomer
          selectedCustomer={selectedCustomer}
          handleSave={handleSave}
          setShowUpdatePopup={setShowUpdatePopup}
        />
      )}
      <div className="flex justify-center">
        <button
          onClick={handleNewCustomer}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add New Customer
        </button>
      </div>
    </div>
  );
};

export default CustomerListComponent;
