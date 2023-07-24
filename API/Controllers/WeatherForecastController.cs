using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    public async Task<ActionResult<KeyValue>> Get()
    {
        // Simulate a 10-second delay
        await Task.Delay(1000);

        // Create the KeyValue object with the desired values
        var keyValue = new KeyValue
        {
            key = "KEY---",
            value = "I am the king 2!" 
        };

        // Return the KeyValue object as the ActionResult
        return keyValue;
    }
}
