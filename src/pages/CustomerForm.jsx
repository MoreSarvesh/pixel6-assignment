import { useState } from "react";

//toast notification imports
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/warning.css";
import "react-simple-toasts/dist/theme/success.css";

//lib imports
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

//utils imports
import { valadationCheck, panRegex } from "../utils/valadationChecks";
import AddressFields from "../components/AddressFields";
import AddNewAddress from "../components/AddNewAddress";

const CustomerForm = () => {
  //ro navigate to customer list after form submission
  const navigate = useNavigate();

  //retriving customer list from local storage
  const customerList = useLoaderData();
  const [customers, setCustomers] = useState(customerList);

  //form data controlled input
  const [formData, setFormData] = useState({
    pancard: "",
    fullName: "",
    email: "",
    mobile: "",
    addresses: [
      {
        id: 1,
        addressLine1: "",
        addressLine2: "",
        postcode: "",
        city: "Select City",
        state: "Select  State",
      },
    ],
  });

  //data fetching state
  const [isPancardLoading, setIsPancardLoading] = useState(false);

  //form onChange handler for control input
  const handleFormDataChange = (e, id) => {
    const { name, value } = e.target;

    if (!id) {
      //for fields other than address
      setFormData((prev) => ({
        ...prev,
        [name]: name === "pancard" ? value.toUpperCase() : value,
      }));
    } else {
      //address fields
      setFormData((prev) => ({
        ...prev,
        addresses: prev.addresses.map((address) => {
          if (address.id === id) {
            return {
              ...address,
              [name]: value,
            };
          }
          return address;
        }),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //form valadation
    const valadationError = valadationCheck(formData);
    if (valadationError !== "") {
      toast(valadationError, { theme: "failure" });
      return;
    }

    //adding new customer data to list
    setCustomers((prev) => {
      const updatedCustomerList = [...prev, formData];
      localStorage.setItem("customers", JSON.stringify(updatedCustomerList));
      return updatedCustomerList;
    });

    //resetting the form
    setFormData({
      pancard: "",
      fullName: "",
      email: "",
      mobile: "",
      addresses: [
        {
          id: 1,
          addressLine1: "",
          addressLine2: "",
          postcode: "",
          city: "Select City",
          state: "Select  State",
        },
      ],
    });

    toast("Form Submitted", { theme: "success" });

    //navigate to customer list page
    return navigate("customers");
  };

  //fetching pancard data
  const fetchPanData = (pannumber) => {
    axios
      .post("https://lab.pixel6.co/api/verify-pan.php", {
        panNumber: pannumber,
      })
      .then((res) =>
        setFormData((prev) => ({
          ...prev,
          fullName: res.data.fullName,
        }))
      )
      .catch((err) => console.log(err))
      .finally(() => setIsPancardLoading(false));
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold underline p-2 m-4">
        Customer Form
      </h2>
      <form
        className="flex flex-col gap-4 p-4 my-4 bg-gray-100 rounded-md shadow-md xl:mx-[30%]"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col relative">
          <div>
            PAN Card:<span className="text-red-600">*</span>
          </div>
          <input
            type="text"
            name="pancard"
            className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
            maxLength={10}
            value={formData.pancard}
            onBlur={() => setIsPancardLoading(false)}
            onChange={(e) => {
              setIsPancardLoading(true);
              handleFormDataChange(e);
              const pannumber = e.target.value.toUpperCase();
              if (panRegex.test(pannumber)) {
                fetchPanData(pannumber);
              }
            }}
            required
          />
          {isPancardLoading && (
            <div className="absolute right-2 top-1/2 loader"></div>
          )}
        </label>
        <label className="flex flex-col">
          <div>
            Full Name:<span className="text-red-600">*</span>
          </div>
          <input
            type="text"
            name="fullName"
            className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
            maxLength={140}
            value={formData.fullName}
            onChange={handleFormDataChange}
            required
          />
        </label>
        <label className="flex flex-col">
          <div>
            Email:<span className="text-red-600">*</span>
          </div>
          <input
            type="email"
            name="email"
            className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
            maxLength={255}
            value={formData.email}
            onChange={handleFormDataChange}
            required
          />
        </label>
        <label className="flex flex-col">
          <div>
            Mobile Number:<span className="text-red-600">*</span>
          </div>
          <input
            type="text"
            name="mobile"
            className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
            maxLength={10}
            value={formData.mobile}
            onChange={handleFormDataChange}
            required
          />
        </label>
        {formData.addresses.map((address, index) => (
          <AddressFields
            key={address.id}
            handleFormDataChange={handleFormDataChange}
            setFormData={setFormData}
            address={address}
            index={index}
          />
        ))}
        {
          //checking if limit reached for adding new entry for address
          formData.addresses.length < 10 ? (
            <AddNewAddress formData={formData} setFormData={setFormData} />
          ) : (
            <span className="text-red-500 mt-4">
              Limit reached. Cannot add more Address!
            </span>
          )
        }
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600 w-[20%]"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerForm;
