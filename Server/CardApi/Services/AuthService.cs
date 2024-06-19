using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using CardApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CardApi.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;
        private readonly string _dataFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data.json");

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<User> AuthenticateUser(string email, string password)
        {
            User user = null;

            // In real, this would fetch user from database
            var stream = new FileStream(_dataFilePath, FileMode.Open, FileAccess.Read);
            var jsonDocument = await JsonDocument.ParseAsync(stream);
            var userDB = jsonDocument.RootElement.GetProperty("user");

            if (userDB.GetProperty("Email").GetString().Equals(email) && userDB.GetProperty("Password").GetString().Equals(password))
            {
                user = new User { Name = userDB.GetProperty("Name").GetString(), Email = userDB.GetProperty("Email").GetString() };
            }
            return user;

        }

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