using DatabaseTest.Data;
using DatabaseTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatabaseTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly DataContext _context;

        public StudentController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Student>> GetStudents()
        {
            return _context.Students.ToList();
        }


        [HttpPost]
        public ActionResult<Student> AddStudent(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetStudents), new { id = student.Id }, student);
        }  
    }
}