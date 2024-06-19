using System.ComponentModel.DataAnnotations;

namespace CardApi
{
    // DTO (data transfer object) The contract between the client and the server
    public record LoginPayload([Required] string Email, [Required] string Password);
    public record UpdateCardLimit([Required] string CardNumber, [Required] int requestdAmount, [Required] float monthlySalary, [Required] string occupation);
}