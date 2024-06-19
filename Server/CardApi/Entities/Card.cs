namespace CardApi.Entities
{
    public class Card
    {
        public string CardNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public string CardImage { get; set; }
        public bool IsBlocked { get; set; }
        public bool IsDigital { get; set; }
        public int CreditLimit { get; set; }
        public int BankCode { get; set; }
    }
}