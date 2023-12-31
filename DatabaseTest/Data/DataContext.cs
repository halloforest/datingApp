using Microsoft.EntityFrameworkCore;
using DatabaseTest.Models;

namespace DatabaseTest.Data
{
    public class DataContext : DbContext
    {           
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Student>? Students { get; set; }
    }
}