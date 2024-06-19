using CardApi.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace CardApi.Services
{
    public class BankService
    {
        private readonly IMemoryCache _cache;
        private readonly IConfiguration _configuration;
        private const string BankCacheKey = "BankCacheKey";

        private readonly List<Card> _cards;

        public BankService(IMemoryCache cache, IConfiguration configuration)
        {
            _cache = cache;
            _configuration = configuration;
            _cards = Data.Cards;
        }

        public async Task<List<Bank>> GetBanksAsync()
        {
            if (_cache.TryGetValue(BankCacheKey, out List<Bank> banks)) return banks;

            banks = Data.Banks;

            if (banks == null || banks.Count == 0) throw new Exception("No banks found.");

            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(_configuration.GetValue<int>("CacheDurationMinutes")));

            _cache.Set(BankCacheKey, banks, cacheEntryOptions);

            return banks;
        }

        public async Task<List<Card>> GetCardsAsync(bool? isBlocked = null, string cardNumber = null, int? bankCode = null)
        {
            var cards = _cards;

            if (cards == null || cards.Count == 0) throw new Exception("No cards found.");

            // Apply filters if provided
            if (isBlocked.HasValue)
                cards = cards.Where(c => c.IsBlocked == isBlocked.Value).ToList();

            if (!string.IsNullOrEmpty(cardNumber))
                cards = cards.Where(c => c.CardNumber.Contains(cardNumber)).ToList();

            if (bankCode.HasValue)
                cards = cards.Where(c => c.BankCode == bankCode.Value).ToList();

            return cards;
        }

        public async Task<bool> IncreaseCreditLimit(string cardNumber, int requestedAmount, float monthlySalary, string occupation)
        {
            // Find the card to update
            var cardToUpdate = _cards.FirstOrDefault(c => c.CardNumber == cardNumber);
            if (cardToUpdate == null)
            {
                throw new Exception($"Card with number '{cardNumber}' not found.");
            }

            // Checking that the amount of the request is not higher than 100k
            if (requestedAmount > 100000) return false;

            // Checking that the monthly salary is higher than 12k
            if (monthlySalary < 12000) return false;

            // Checking that the request corresponds to the monthly salary of the employee/self-employed
            float maxAmount = occupation.ToLower() switch
            {
                "employee" => monthlySalary / 2,
                "self-employed" => monthlySalary / 3,
                _ => 0
            };
            if (requestedAmount > maxAmount)
                return false;

            // Checking business rules for updating the card
            if (cardToUpdate.IsBlocked)
                return false;

            DateTime dateOfIssue = cardToUpdate.DateOfIssue;
            if ((DateTime.Now - dateOfIssue).TotalDays < 90)
                return false;

            // Update the card limit
            cardToUpdate.CreditLimit = requestedAmount;

            return true;
        }
    }
}