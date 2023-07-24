using System.Text;
using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // This code is configuring the dependency injection for the application's services.
            services.AddDbContext<DataContext>(opt => { 
                opt.UseSqlite(config.GetConnectionString("DatabaseConnection"));
            });

            // Add CORS (Cross-Origin Resource Sharing), 
            // so that the frontend can reach the webapi on the same "localhost"
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}