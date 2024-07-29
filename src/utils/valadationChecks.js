import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/failure.css";

export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /\d{10}$/;
export const postcodeRegex = /^\d{6}$/;

export const valadationCheck = (formData) => {
  if (!panRegex.test(formData.pancard.trim())) {
    return "Invalid PAN format";
  }
  if (!emailRegex.test(formData.email.trim())) {
    return "Invalid email format";
  }
  if (!mobileRegex.test(formData.mobile.trim())) {
    return "Invalid mobile number";
  }
  formData.addresses.forEach((address) => {
    if (!address.addressLine1) {
      return "Address Line 1 is required";
    }
    if (!postcodeRegex.test(address.postcode.trim())) {
      return "Invalid postcode";
    }
  });

  return "";
};
