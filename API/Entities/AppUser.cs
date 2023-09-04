using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; }    

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public string Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }
        
        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public List<Photo> Photos { get; set; } = new();
        
        public int GetAge()
        {
            DateOnly currentDate = DateOnly.FromDateTime(DateTime.Today);
            int age = currentDate.Year - DateOfBirth.Year;

            // Check if the birthday hasn't occurred yet this year
            if (currentDate < DateOfBirth.AddYears(age))
            {
                age--;
            }

            return age;
        }
    
    }

    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; }

        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; }
    }

    public class KeyValue 
    {
        public string key { get; set; }
        public string value { get; set; }
    }
}