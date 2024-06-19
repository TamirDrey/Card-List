import { useState } from "react";
import AuthForm from "./AuthForm";
import { checkForm } from "../utils/validation";
import { useIncreaseCreditLimitMutation } from "../store/services/card-api";
import { toast } from "react-toastify";

interface CardProps {
  number: string;
  image: string;
  code: number;
  creditLimit: number;
  isBlocked: boolean;
  onUpdate: () => void;
}

const Card: React.FC<CardProps> = ({
  number,
  image,
  code,
  creditLimit,
  isBlocked,
  onUpdate
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestedAmount, setRequestedAmount] = useState("");
  const [occupation, setOccupation] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [IncreaseCreditLimit] = useIncreaseCreditLimitMutation();
  
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    // Clear form fields when the modal closes
    setRequestedAmount("");
    setOccupation("");
    setMonthlySalary("");
  };
  
  const validateForm = (): boolean => {
    const isFormValid = checkForm(
      parseFloat(requestedAmount),
      occupation,
      parseFloat(monthlySalary)
    );
    return isFormValid;
  };
  
  const handleSubmit = async () => {
    await IncreaseCreditLimit({
      CardNumber: number,
      requestdAmount: requestedAmount,
      monthlySalary: monthlySalary,
      occupation: occupation,
    })
      .unwrap()
      .then((data) => {
        if (data) {
          toast.success(`${data.message}`);
          closeModal();
          onUpdate();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.error);
      });
  };

  return (
    <div className="flex flex-col items-center bg-white border rounded-lg shadow-lg p-4 m-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-2">Card Number: {number}</h1>
      <img
        src={image}
        alt="Card Image"
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg mb-1">Credit Limit: {creditLimit}</h2>
      <h2 className="text-lg">Bank Code: {code}</h2>
      <button
        onClick={openModal}
        className={`mt-4 text-white p-2 rounded ${
          isBlocked ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
        }`}
        disabled={isBlocked}
      >
        {isBlocked ? "Blocked Card!! No Credit Limit" : "Increase Credit Limit"}
      </button>
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <AuthForm
              title="Increase Credit Limit"
              fields={[
                {
                  label: "Requested Amount",
                  type: "number",
                  value: requestedAmount,
                  setValue: setRequestedAmount,
                },
                {
                  label: "Occupation",
                  type: "text",
                  value: occupation,
                  setValue: setOccupation,
                },
                {
                  label: "Average Monthly Salary",
                  type: "number",
                  value: monthlySalary,
                  setValue: setMonthlySalary,
                },
              ]}
              validate={validateForm}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
