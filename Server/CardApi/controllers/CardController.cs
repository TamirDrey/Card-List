using CardApi.Entities;
using CardApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardApi.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        private readonly BankService _bankService;

        public CardController(BankService bankService)
        {
            _bankService = bankService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Card>>> GetCards([FromQuery] bool? isBlocked, [FromQuery] string cardNumber, [FromQuery] int? bankCode)
        {
            try
            {
                var cards = await _bankService.GetCardsAsync(isBlocked, cardNumber, bankCode);
                return Ok(cards);
            }
            catch (Exception ex)
            {
                return StatusCode(404, new { error = ex.Message });
            }
        }

        [HttpPut("IncreaseCreditLimit")]
        [Authorize]
        public async Task<ActionResult> IncreaseCreditLimit([FromBody] UpdateCardLimit request)
        {
            try
            {
                var result = await _bankService.IncreaseCreditLimit(request.CardNumber, request.requestdAmount, request.monthlySalary, request.occupation);
                if (result)
                {
                    return Ok(new { message = "Credit limit increased successfully." });
                }
                else
                {
                    return BadRequest(new { error = "We are sorry, you do not meet the conditions for increasing the credit card limit" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}