using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using WebApp1.RealTime;

namespace WebApp1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacaoController : ControllerBase
    {

        private IHubContext<ChatHub> _hub;

        public NotificacaoController(IHubContext<ChatHub> hub)
        {
            _hub = hub;
        }

        [HttpPost]
        public IActionResult Notificar (string user, string message)
        {
            string response = string.Empty;

            try
            {
                _hub.Clients.All.SendAsync("ReceiveMessage", user, message);
                response = "Success";
            }
            catch (Exception e)
            {
                response = e.Message;
            }

            return Ok(response);
        }
    }
}