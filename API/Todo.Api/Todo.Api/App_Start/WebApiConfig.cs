using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.ExceptionHandling;
using Todo.Api.App_Start;
using System.Web.Http.Cors;

namespace Todo.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            //See if below has to be registered in startup.cs
            //https://github.com/filipw/apress-recipes-webapi/blob/master/Chapter%2007/7-3/Apress.Recipes.WebApi/Apress.Recipes.WebApi/Startup.cs
            config.Services.Add(typeof(IExceptionLogger), new GlobalExceptionLogger());

            var cors = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*");
            config.EnableCors(cors);
            // Web API routes
            config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);
        }
    }
}
