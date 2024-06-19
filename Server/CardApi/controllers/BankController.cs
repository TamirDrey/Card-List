using CardApi.Entities;
using CardApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardApi.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BankController : ControllerBase
    {
        private readonly BankService _bankService;

        public BankController(BankService bankService)
        {
            _bankService = bankService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Bank>>> GetAll()
        {
            try
            {
                var banks = await _bankService.GetBanksAsync();
                return Ok(banks);
            }
            catch (Exception ex)
            {
                return StatusCode(404, new {error = ex.Message });
            }
        }
    }
}