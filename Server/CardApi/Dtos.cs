using System.ComponentModel.DataAnnotations;

namespace CardApi
{
    public record LoginPayload([Required] string Email, [Required] string Password);
    public record UpdateCardLimit([Required] string CardNumber, [Required] int requestdAmount, [Required] float monthlySalary, [Required] string occupation);
}