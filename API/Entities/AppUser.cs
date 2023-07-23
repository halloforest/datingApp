using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; }    

        public string Introduce { get; set; }  

        public string ImageUrl { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }

    public class KeyValue 
    {
        public string key { get; set; }
        public string value { get; set; }
    }
}