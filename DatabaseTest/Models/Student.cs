using System.ComponentModel.DataAnnotations;

namespace DatabaseTest.Models
{
    public class Student 
    {
        [Key]
        public int Id {set; get;}
        public string? Name {set; get;}
    }
}


