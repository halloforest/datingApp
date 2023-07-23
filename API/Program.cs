using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// This code is configuring the dependency injection for the application's services.
builder.Services.AddDbContext<DataContext>(opt => { 
    opt.UseSqlite(builder.Configuration.GetConnectionString("DatabaseConnection"));
});

// Add CORS (Cross-Origin Resource Sharing), 
// so that the frontend can reach the webapi on the same "localhost"
builder.Services.AddCors();


var app = builder.Build();

// Configure the HTTP request pipeline.
// Add CORS (Cross-Origin Resource Sharing), 
// app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

app.MapControllers(); // Middleware

app.Run();
