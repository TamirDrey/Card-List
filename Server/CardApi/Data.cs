using CardApi.Entities;

namespace CardApi
{
    public class Data
    {
        public static User User { get; } = new User
        {
            Name = "John Smith",
            Email = "John@example.com",
            Password = "eXample@12"
        };

        public static List<Bank> Banks { get; } = new List<Bank>
        {
            new Bank
            {
                Code = 8745,
                Name = "Mizrahi Tefahot",
                Description = "Mizrahi Tefahot is the best bank in the world..."
            },
            new Bank
            {
                Code = 1245,
                Name = "Leumi",
                Description = "Leumi is the best bank in the world..."
            },
            new Bank
            {
                Code = 4093,
                Name = "Hapoalim",
                Description = "Hapoalim is the best bank in the world..."
            },
            new Bank
            {
                Code = 5963,
                Name = "Discount",
                Description = "Discount is the best bank in the world..."
            }
        };

        public static List<Card> Cards { get; } = new List<Card>
        {
            new Card
            {
                CardNumber = "1234567812345678",
                DateOfIssue = new DateTime(2021, 01, 01),
                CardImage = "images/Leumi.jpg",
                IsBlocked = true,
                IsDigital = true,
                CreditLimit = 1000,
                BankCode = 1245
            },
            new Card
            {
                CardNumber = "0285633095642122",
                DateOfIssue = new DateTime(2021, 01, 01),
                CardImage = "images/Mizrahi-Tefahot.jpg",
                IsBlocked = true,
                IsDigital = true,
                CreditLimit = 15000,
                BankCode = 8745
            },
            new Card
            {
                CardNumber = "8989652440019238",
                DateOfIssue = new DateTime(2021, 01, 01),
                CardImage = "images/Discount.jpg",
                IsBlocked = false,
                IsDigital = true,
                CreditLimit = 7000,
                BankCode = 5963
            },
            new Card
            {
                CardNumber = "3449867562236671",
                DateOfIssue = new DateTime(2021, 01, 01),
                CardImage = "images/Hapoalim.jpg",
                IsBlocked = false,
                IsDigital = true,
                CreditLimit = 6000,
                BankCode = 4093
            }
        };
    }
}