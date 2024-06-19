import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useGetAllCardsQuery } from "../store/services/card-api";
import { toast } from "react-toastify";
import { checkSearchInputs } from "../utils/validation";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/redusers/authReducer";

const Home = () => {
  const [isBlocked, setIsBlocked] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const { data, error, isLoading, refetch } = useGetAllCardsQuery({
    isBlocked,
    cardNumber,
    bankCode,
  });
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger update
  const dispacth = useAppDispatch();

  useEffect(() => {
    if (data?.length == 0) toast.error("Credit card not found");
    if (updateTrigger) {
      refetch();
      setUpdateTrigger(false);
    }
  }, [updateTrigger]);

  const handleSearch = () => {
    if (validateSearch()) {
      setUpdateTrigger(true);
    }
  };

  const validateSearch = (): boolean => {
    return checkSearchInputs(parseFloat(cardNumber));
  };

  return (
    <div>
      <button
        onClick={() => dispacth(logout())}
        className="top-4 left-4 p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row justify-around items-center w-full p-4">
          <input
            type="number"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.target.value);
              if (e.target.value.length < 16) {
                setUpdateTrigger(false);
              }
            }}
            className="p-2 border rounded mb-2 md:mb-0"
          />
          <button
            onClick={handleSearch}
            disabled={cardNumber.length !== 16}
            className={`p-2 text-white rounded ${
              cardNumber.length === 16 ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            {cardNumber.length === 16
              ? "Search"
              : "At least 16 digits to search"}
          </button>
          <select
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            className="p-2 border rounded mb-2 md:mb-0"
          >
            <option value="">Select Bank</option>
            <option value="8745">Mizrahi Tefahot</option>
            <option value="1245">Leumi</option>
            <option value="4093">Hapoalim</option>
          </select>
          <select
            value={isBlocked}
            onChange={(e) => setIsBlocked(e.target.value)}
            className="p-2 border rounded mb-2 md:mb-0"
          >
            <option value="">All</option>
            <option value="true">Blocked</option>
            <option value="false">Unblocked</option>
          </select>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          data &&
          data.map((card, index) => (
            <div key={index}>
              <Card
                number={card.cardNumber}
                image={card.cardImage}
                code={card.bankCode}
                creditLimit={card.creditLimit}
                isBlocked={card.isBlocked}
                onUpdate={() => setUpdateTrigger(true)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
