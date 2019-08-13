using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Todo.DataAccess.Contract;
using Todo.Entities;

namespace Todo.Api.Controllers
{
    public class TodoController: ApiController
    {
        private readonly ITodoDal _todoDal;
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public TodoController(ITodoDal todoDal)
        {
            _todoDal = todoDal;
        }

  
        [HttpPost]
        [Route("add-todo")]
        public HttpResponseMessage AddTodo([FromBody]TodoDTO todo)
        {
            if(todo == null)
            {
                var exception = new Exception("Requested todo object is invalid");
                logger.Log(LogLevel.Error, exception);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }

            int id = _todoDal.Insert(todo);

            if(id == 0)
            {
                var exception = new Exception("Error creating todo");
                logger.Log(LogLevel.Error, exception);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception);
            }else
            {
                return Request.CreateResponse(HttpStatusCode.OK, id);
            }
        }

        [HttpPut]
        [Route("update-todo")]
        public HttpResponseMessage UpdateTodo([FromBody]TodoDTO todo)
        {
            if (todo == null)
            {
                var exception = new Exception("Requested todo object is empty");
                logger.Log(LogLevel.Error, exception);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }
            _todoDal.Update(todo);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("delete-todo")]
        public HttpResponseMessage DeleteTodo(int id)
        {
            if (id == 0)
            {
                var exception = new Exception("Please provide a valid todo");
                logger.Log(LogLevel.Error, exception);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }
            _todoDal.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("get-all-todo")]
        public HttpResponseMessage GetAllTodo()
        {
            var todos = _todoDal.GetAll();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, todos);
            return response;
        }

        [HttpGet]
        [Route("get-single-todo")]
        public HttpResponseMessage GetTodoById(int id)
        {
            var todo = _todoDal.GetById(id);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, todo);
            return response;
        }
    }
}