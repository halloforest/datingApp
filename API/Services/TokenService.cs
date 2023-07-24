using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key; // Only Server has the key
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));   
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}


// TokenService implements the ITokenService interface and is responsible for generating JWT tokens.

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key; // Only the server has the key, which is used for token signing.

    // Constructor that takes IConfiguration as a parameter to read the TokenKey from the app settings.
    public TokenService(IConfiguration config)
    {
        // Convert the TokenKey from the configuration to a byte array and create a SymmetricSecurityKey.
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
    }

    // Method to create a JWT token for the provided AppUser.
    public string CreateToken(AppUser user)
    {
        // Define a list of claims to be included in the token. For now, we include the NameId claim with the user's UserName.
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
        };

        // Create SigningCredentials using the SymmetricSecurityKey and the HmacSha512Signature algorithm.
        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        // Create a SecurityTokenDescriptor to define the token's properties, including subject, expiration, and signing credentials.
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims), // Subject contains the claims for the token.
            Expires = DateTime.Now.AddDays(7), // Token expiration time, set to 7 days from the current date.
            SigningCredentials = creds // SigningCredentials used to sign the token.
        };

        // Create a new instance of JwtSecurityTokenHandler.
        var tokenHandler = new JwtSecurityTokenHandler();

        // Generate the token based on the token descriptor.
        var token = tokenHandler.CreateToken(tokenDescriptor);

        // Write the token as a string and return it.
        return tokenHandler.WriteToken(token);
    }
}
