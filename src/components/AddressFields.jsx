import { useState } from "react";
import { postcodeRegex } from "../utils/valadationChecks";
import axios from "axios";
import toast from "react-simple-toasts";

const AddressFields = ({
  handleFormDataChange,
  setFormData,
  address,
  index,
}) => {
  const [isPostcodeLoading, setIsPostcodeLoading] = useState(false);

  const handleDeleteAddress = (id) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((address) => address.id !== id),
    }));
    toast("Address Deleted", { theme: "warning" });
  };

  return (
    <fieldset className="border-2 border-gray-300 rounded-md p-4 mt-4">
      <div className="flex justify-between items-center mb-2">
        <legend className="font-semibold">Address {index + 1}</legend>
        {index + 1 > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteAddress(address.id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
      <label className="flex flex-col mb-2">
        <div>
          Address Line 1:<span className="text-red-600">*</span>
        </div>
        <input
          type="text"
          name="addressLine1"
          className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
          value={address.addressLine1}
          onChange={(e) => handleFormDataChange(e, address.id)}
          required
        />
      </label>
      <label className="flex flex-col mb-2">
        Address Line 2:
        <input
          type="text"
          name="addressLine2"
          className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
          value={address.addressLine2}
          onChange={(e) => handleFormDataChange(e, address.id)}
        />
      </label>
      <label className="flex flex-col mb-2 relative">
        <div>
          Postcode:<span className="text-red-600">*</span>
        </div>
        <input
          maxLength={6}
          type="text"
          name="postcode"
          className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
          value={address.postcode}
          onBlur={() => setIsPostcodeLoading(false)}
          onChange={(e) => {
            const id = address.id;
            setIsPostcodeLoading(true);
            handleFormDataChange(e, address.id);
            if (postcodeRegex.test(e.target.value)) {
              axios
                .post("https://lab.pixel6.co/api/get-postcode-details.php", {
                  postcode: e.target.value,
                })
                .then((res) => {
                  setFormData((prev) => ({
                    ...prev,
                    addresses: prev.addresses.map((address) => {
                      if (address.id === id) {
                        return {
                          ...address,
                          city: res.data.city[0].name,
                          state: res.data.state[0].name,
                        };
                      }
                      return address;
                    }),
                  }));
                })
                .catch((err) => console.log(err))
                .finally(() => setIsPostcodeLoading(false));
            }
          }}
          required
        />
        {isPostcodeLoading && (
          <div className="absolute right-2 top-1/2 loader"></div>
        )}
      </label>
      <label className="flex flex-col mb-2">
        City:
        <select
          name="city"
          className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
          disabled
        >
          <option value={address.city}>{address.city}</option>
        </select>
      </label>
      <label className="flex flex-col">
        State:
        <select
          name="state"
          className="border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
          disabled
        >
          <option value={address.state}>{address.state}</option>
        </select>
      </label>
    </fieldset>
  );
};

export default AddressFields;
