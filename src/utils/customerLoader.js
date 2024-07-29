export const customerLoader = () => {
  const customerList = localStorage.getItem("customers");
  if (!customerList) return [];
  return JSON.parse(customerList);
};
