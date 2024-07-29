const CustomersList = ({
  customers,
  handelDeleteCustomer,
  handelEditCustomer,
}) => {
  return (
    <div className="container mx-auto p-4">
      {customers.length < 1 ? (
        <p>No Customer to display!</p>
      ) : (
        <>
          {customers.map((customer, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{customer.fullName}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handelEditCustomer(customer.pancard)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handelDeleteCustomer(customer.pancard)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-gray-700">
                <p>
                  <strong>PAN Card:</strong> {customer.pancard}
                </p>
                <p>
                  <strong>Email:</strong> {customer.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {customer.mobile}
                </p>
                {customer.addresses.map((address, idx) => (
                  <div key={idx} className="mt-4 border-t pt-4">
                    <p>
                      <strong>Address {idx + 1}:</strong>
                    </p>
                    <p>{address.addressLine1}</p>
                    <p>{address.addressLine2}</p>
                    <p>
                      {address.postcode}, {address.city}, {address.state}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CustomersList;
