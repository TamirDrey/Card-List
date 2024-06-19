import { toast } from "react-toastify";

export const checkEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const TEST = regex.test(email);

  if (!email) return false;
  if (!TEST) {
    toast.error("Email must be a valid email...");
    return false;
  }
  return true;
};

export const checkPassword = (password: string): boolean => {
  const containNumber = /^(?=.*[0-9])/;
  const containSpecial = /(?=.*[!@#$%^&(),.?":{}|<>])/;
  const containLower = /(?=.*[a-z])/;
  const containUpper = /^(?=.*[A-Z])/;

  const TEST =
    containNumber.test(password) &&
    containSpecial.test(password) &&
    containLower.test(password) &&
    containUpper.test(password);

  if (!password) return false;
  if (!TEST) {
    toast.error("Passwords must be a strong password... (eXample@12)");
    return false;
  }
  return true;
};

export const checkForm = (
  requestedAmount: number,
  occupation: string,
  monthlySalary: number
): boolean => {
  if (typeof monthlySalary !== "number" || monthlySalary <= 0) {
    toast.error("Monthly income must be a positive number.");
    return false;
  }

  if (
    typeof occupation !== "string" ||
    (occupation !== "employee" && occupation !== "self-employed")
  ) {
    toast.error('Occupation must be either "employee" or "self-employed".');
    return false;
  }

  if (
    typeof requestedAmount !== "number" ||
    requestedAmount <= 0 ||
    requestedAmount > 100000
  ) {
    toast.error(
      "Requested amount must be a positive number and not higher than 100,000."
    );
    return false;
  }

  return true;
};
