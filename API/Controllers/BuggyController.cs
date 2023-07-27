using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController : ControllerBase
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public IActionResult UnauthorizedAccess()
        {
            return Unauthorized("Unauthorized Access - !");
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
             var thing = _context.Users.Find(-1);

            if (thing == null) return Content("Not Found");

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            var thing = _context.Users.Find(-1);
            var thingToReturn = thing.ToString();

            return Content(thingToReturn);
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("Bad!");    
        }
    }


}