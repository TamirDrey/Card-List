using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CardApi.Entities;
using Microsoft.IdentityModel.Tokens;

namespace CardApi.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;
        private readonly User _user;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
            _user = Data.User;
        }

        public async Task<User> AuthenticateUser(string email, string password)
        {
            User user = null;

            // Compare provided credentials with the stored user data (in real from the db)
            if (_user.Email.Equals(email, StringComparison.OrdinalIgnoreCase) && _user.Password.Equals(password))
            {
                user = new User { Name = _user.Name, Email = _user.Email };
            }

            return user;

        }

        // Generate Token to existing user
        public string GenerateToken(string email, string password)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Sub, password)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}