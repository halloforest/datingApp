using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        // Constructor
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // A DbSet<TEntity> can be used to query and save instances of AppUser. 
        // LINQ queries against a DbSet<TEntity> will be translated into queries against the database.
        public DbSet<AppUser> Users {get; set;}
    }
}