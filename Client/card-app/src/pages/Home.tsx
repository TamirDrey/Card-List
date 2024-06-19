import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useGetAllCardsQuery } from "../store/services/card-api";

const Home = () => {
  const { data, error, isLoading, refetch } = useGetAllCardsQuery(null);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger update

  useEffect(() => {
    if (updateTrigger) {
      refetch();
      setUpdateTrigger(false);
    }
  }, [updateTrigger, refetch]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
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
