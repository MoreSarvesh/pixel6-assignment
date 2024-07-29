import { useState } from "react";
import AddressFields from "./AddressFields";
import AddNewAddress from "./AddNewAddress";

const UpdateCustomer = ({
  selectedCustomer,
  handleSave,
  setShowUpdatePopup,
}) => {
  const [formData, setFormData] = useState(selectedCustomer);

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

  return (
    <div className="fixed overflow-scroll inset-0 bg-gray-600 bg-opacity-50 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[50%] my-8 h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Update Customer</h2>
          <button
            onClick={() => setShowUpdatePopup((prev) => !prev)}
            className="text-red-600 hover:text-red-800"
          >
            Close
          </button>
        </div>
        <form
          className="flex flex-col gap-4 p-4 my-4 bg-gray-100 rounded-md shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(formData);
          }}
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
              onChange={handleFormDataChange}
              disabled
            />
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
      </div>
    </div>
  );
};

export default UpdateCustomer;
