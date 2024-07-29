import toast from "react-simple-toasts";

const AddNewAddress = ({ formData, setFormData }) => {
  const handleAddAddress = (e) => {
    e.preventDefault();
    let newAddress = formData.addresses;

    //valadating the address line 1 (checking for not null)
    if (formData.addresses[formData.addresses.length - 1].addressLine1 === "") {
      toast("Address Line 1 cannot be Empty!", {
        theme: "failure",
      });
      return;
    }

    //adding new address field
    newAddress.push({
      id: formData.addresses[formData.addresses.length - 1].id + 1,
      addressLine1: "",
      addressLine2: "",
      postcode: "",
      city: "",
      state: "",
    });
    setFormData((prev) => ({ ...prev, addresses: newAddress }));
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <span>Add address</span>
      <button
        onClick={handleAddAddress}
        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
      >
        +
      </button>
    </div>
  );
};

export default AddNewAddress;
