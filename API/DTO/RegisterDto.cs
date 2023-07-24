using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string UserName {get; set;}      // The uppercase/lowercase will be accecpted between JSON and C#
        
        [Required]
        public string Password {get; set;}
        
    }
}