import Card from "../components/Card";
import { useGetAllCardsQuery } from "../store/services/card-api";

const Home = () => {
  const { data, error, isLoading } = useGetAllCardsQuery(null);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        data &&
        data.map((card, index) => (
          <div key={index} >
            <Card
              number={card.cardNumber}
              image={card.cardImage}
              code={card.bankCode}
              creditLimit={card.creditLimit}
              isBlocked={card.isBlocked}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
