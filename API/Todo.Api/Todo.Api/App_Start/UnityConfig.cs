using System.Web.Http;
using Todo.DataAccess.DAL;
using Todo.DataAccess.Contract;
using Unity;
using Unity.WebApi;

namespace Todo.Api
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            //container.RegisterType<ITodoDal, TodoDal>();
            container.RegisterType<ITodoDal, TodoDal>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}