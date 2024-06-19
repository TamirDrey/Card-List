import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useGetAllCardsQuery } from "../store/services/card-api";
import { toast } from "react-toastify";
import { checkSearchInputs } from "../utils/validation";

const Home = () => {
  const [isBlocked, setIsBlocked] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const { data, error, isLoading, refetch } = useGetAllCardsQuery({
    isBlocked,
    cardNumber,
    bankName,
  });
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger update

  useEffect(() => {
    if (data?.length == 0) toast.error("Credit card not found");
    if (updateTrigger) {
      refetch();
      setUpdateTrigger(false);
    }
  }, [updateTrigger, refetch, data]);

  const handleSearch = () => {
    validateSearch();
    setUpdateTrigger(true);
  };

  const validateSearch = (): boolean => {
    const isSearchValid = checkSearchInputs(parseFloat(cardNumber), bankName);
    return isSearchValid;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row justify-around items-center w-full p-4">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="p-2 border rounded mb-2 md:mb-0"
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="p-2 border rounded mb-2 md:mb-0"
        />
        <select
          value={isBlocked}
          onChange={(e) => setIsBlocked(e.target.value)}
          className="p-2 border rounded mb-2 md:mb-0"
        >
          <option value="">All</option>
          <option value="true">Blocked</option>
          <option value="false">Unblocked</option>
        </select>
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
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
  );
};

export default Home;
