using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ServerAdmin.Controllers.Version
{
    public class ScriptingServiceController : Controller
    {
        [HttpGet]
        public string Version()
        {
            return "0.0.0.0";
        }

        [HttpGet]
        public string BuildDate()
        {
            return DateTime.Now.ToString();
        }

        [HttpGet]
        public string HostIP()
        {
            return IPAddress.Loopback.ToString();
        }
    }
}
