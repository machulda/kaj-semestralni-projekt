using Microsoft.AspNetCore.Mvc;
using System;

namespace ServerAdmin.Controllers
{
    interface IEntityController
    {
        [HttpGet]
        public object List();

        [HttpGet]
        public object Detail([FromRoute] Guid id);

        [HttpPost]
        public object Create([FromBody] object entity);

        [HttpPut]
        public object Update([FromRoute] Guid id);

        [HttpDelete]
        public object Delete([FromRoute] Guid id);
    }
}
