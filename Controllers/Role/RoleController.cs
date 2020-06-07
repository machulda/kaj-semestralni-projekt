using System;
using Microsoft.AspNetCore.Mvc;

namespace ServerAdmin.Controllers.Role
{
    public class RoleController : IEntityController
    {
        public object Create([FromBody] object entity=null)
        {
            if(entity!=null)
            {
                return GenerateDetail(true);
            }
            else
            {
                return GenerateDetail(false);
            }
        }

        public object Delete([FromRoute] Guid id)
        {
            return null;
        }

        public object Detail([FromRoute] Guid id)
        {
            return GenerateDetail(true);
        }

        public object List()
        {
            Random random = new Random();
            object[] entities = new object[random.Next(500)];
            for(int i = 0;i < entities.Length;i++)
            {
                entities[i] = GenerateEntity(i);
            }
            return new {
                canCreateEntity = true,
                columns = new object[] {
                    new {
                        detailProperty = "id",
                        detailUrl = "role",
                        name = "Name",
                        title = "Název role",
                        width = "40%"
                    },
                    new {
                        name = "Code",
                        title = "Kód role",
                        width = "60%"
                    }
                },
                detailUrl = "role?id=",
                entityList = entities,
                filterColumns = new object[] {
                    new {
                        name = "Name",
                        title = "Název role",
                        width = "col-md-5"
                    },
                    new {
                        name = "Code",
                        title = "Kód role",
                        width = "col-md-7"
                    }
                },
                listTitle = "Filtrování přehledu - Role"
            };

            object GenerateEntity(int i)
            {
                return new {
                    code = "MR"+i,
                    id = Guid.NewGuid(),
                    idRole = Guid.NewGuid(),
                    name = "Mock role " + i
                };
            }
        }

        public object Update([FromRoute] Guid id)
        {
            return null;
        }

        private object GenerateDetail(bool filled)
        {
            Random random = new Random();
            object[] users = new object[random.Next(10)];
            for(int i = 0;i < users.Length;i++)
            {
                users[i] = GenerateUser(i);
            }
            return new {
                detailCollections = new object[] {
                        new {
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
                            entityList = filled ? users : new object[]{ },
                            listTitle = "Uživatelé role"
                        }
                    },
                detailElements = new object[] {
                    new {
                        caption = "Kód role",
                        elementType = 0,
                        propertyName = "Code",
                        value = filled ? "MR" : "",
                        width = "50%"
                    },
                    new {
                        caption = "Název",
                        elementType = 0,
                        propertyName = "Name",
                        value = filled ? "Mock Role" : "",
                        width = "50%"
                    }
                },
                detailTitle = "Role",
                id = Guid.NewGuid(),
                readOnly = false
            };

            object GenerateUser(int i)
            {
                return new {
                    userName = "mock.user" + i + "@server.admin",
                    personFullName = "Mock User" + i,
                    partnerName = "",
                    roleString = "Mock Role",
                    id = Guid.NewGuid(),
                    idUser = Guid.NewGuid(),
                    idPerson = Guid.NewGuid(),
                    idPartner = Guid.NewGuid(),
                    roles = new object[] { "Mock Role" }
                };
            }
        }
    }
}
