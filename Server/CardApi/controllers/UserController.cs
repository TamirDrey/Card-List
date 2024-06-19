using CardApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CardApi.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AuthService _authService;

        public UserController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginPayload payload)
        {
            IActionResult response = Unauthorized(new { messege = "User does not exist" });
            var user = await _authService.AuthenticateUser(payload.Email, payload.Password);

            if (user != null)
            {
                var jwt = _authService.GenerateToken(payload.Email, payload.Password);
                response = Ok(new { user = user, token = jwt });
            }

            return response;

        }
    }
}