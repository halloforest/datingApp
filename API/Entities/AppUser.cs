namespace API.Entities
{
    public class AppUser
    {
       public int Id { get; set; }

       public string UserName { get; set; }
       
    }

    public class KeyValue 
    {
        public string key { get; set; }
        public string value { get; set; }
    }
}