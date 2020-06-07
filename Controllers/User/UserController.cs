using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ServerAdmin.Controllers
{
    public class UserController : IEntityController
    {
        public object Create([FromBody] object entity = null)
        {
            return null;
        }

        public object Delete([FromRoute] Guid id)
        {
            return null;
        }

        public object Detail([FromRoute] Guid id)
        {
            return null;
        }

        public object List()
        {
            Random random = new Random();
            object[] entities = new object[random.Next(20)];
            for(int i = 0;i < entities.Length;i++)
            {
                entities[i] = GenerateEntity(i);
            }
            return new {
                canCreateEntity = true,
                columns = new object[] {
                    new {
                        detailProperty = "id",
                        detailUrl = "user",
                        name = "UserName",
                        title = "Uživatelské jméno",
                        width = "25%"
                    },
                    new {
                        detailProperty = "IdPerson",
                        detailUrl = "person",
                        name = "PersonFullName",
                        title = "Osoba",
                        width = "25%"
                    },
                    new {
                        detailProperty = "IdPartner",
                        detailUrl = "partner",
                        name = "PartnerName",
                        title = "Partner",
                        width = "25%"
                    },
                    new {
                        name = "RolesString",
                        title = "Seznam rolí",
                        width = "25%"
                    }
                },
                detailUrl = "user?id=",
                entityList = entities,
                filterColumns = new object[] {
                    new {
                        name = "UserName",
                        title = "Uživatelské jméno",
                        width = "col-md-4"
                    },
                    new {
                        name = "PersonFullName",
                        title = "Osoba",
                        width = "col-md-4"
                    },
                    new {
                        name = "PartnerName",
                        title = "Partner",
                        width = "col-md-4"
                    }
                },
                listTitle = "Filtrování přehledu - Uživatelé"
            };

            object GenerateEntity(int i)
            {
                return new {
                    userName = "mock.user"+i+"@server.admin",
                    personFullName = "Mock User"+i,
                    partnerName = "",
                    roleString = "Mock Role",
                    id = Guid.NewGuid(),
                    idUser = Guid.NewGuid(),
                    idPerson = Guid.NewGuid(),
                    idPartner = Guid.NewGuid(),
                    roles = new object[] { "Mock Role"}
                };
            }
        }

        public object Update([FromRoute] Guid id)
        {
            return null;
        }
    }
}
