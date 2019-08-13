using System;
using System.Collections.Generic;
using System.Linq;
using Moq;
using NUnit.Framework;
using Todo.Entities;
using Todo.DataAccess.Contract;
using Todo.DataAccess.DAL;
using Todo.Api.Controllers;
using System.Web.Http.Results;
using System.Net;

namespace Todo.Api.Tests
{
    [TestFixture]
    public class TodoControllerTest
    {
        private ITodoDal todoMockDal;
        private TodoController todoController;

        [SetUp]
        public void ReInitializeTest()
        {
            todoMockDal = setupTodoDal();
        }

        private ITodoDal setupTodoDal()
        {
            // Initialise repository
            var mockDal = new Mock<ITodoDal>();

            // Setup mocking behavior
            mockDal.Setup(p => p.Delete(It.IsAny<int>())).Verifiable();
            mockDal.Setup(p => p.Update(It.IsAny<TodoDTO>())).Verifiable();
            mockDal.Setup(p => p.Insert(It.IsAny<TodoDTO>())).Returns(0);
            mockDal.Setup(p => p.GetAll()).Returns(new List<TodoDTO>()
            {
                new TodoDTO() { Complete = true, Id = 1, Title = "Title1" },
                 new TodoDTO() { Complete = true, Id = 2, Title = "Title2" }
            });
            mockDal.Setup(p => p.GetById(It.IsAny<int>())).Returns(new TodoDTO() { Complete = false, Id = 1, Title = "Title" });
            return mockDal.Object;
        }


        [Test]
        public void AddTodo_Null_Request()
        {
            // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.AddTodo(null);

            //Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
            Assert.AreEqual(HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Test]
        public void AddTodo_Insert_Failed()
        {
            // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.AddTodo(new TodoDTO());

            //Assert
            Assert.AreEqual(HttpStatusCode.InternalServerError, result.StatusCode);
        }

        [Test]
        public void AddTodo_Positive()
        {
            // Arrange
            var tempTodoDal = new Mock<ITodoDal>();
            tempTodoDal.Setup(m => m.Insert(It.IsAny<TodoDTO>())).Returns(1);
            todoMockDal = tempTodoDal.Object;

            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.AddTodo(new TodoDTO());

            //Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [Test]
        public void UpdateTodo_Positive()
        {
            // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.AddTodo(new TodoDTO());

            //Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }


        [Test]
        public void UpdateTodo_Invalid_Request()
        {
            // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.UpdateTodo(null);

            //Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
            Assert.AreEqual(HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Test]
        public void DeleteTodo_Invalid_Request()
        {
            // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.DeleteTodo(0);

            //Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
            Assert.AreEqual(HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Test]
        public void DeleteTodo_Positive()
        {
            // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.DeleteTodo(1);

            //Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [Test]
        public void GetAllTodo_Positive()
        {
            // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.GetAllTodo();

            //Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            //Assert.AreEqual(2, result.Content.);
        }

        [Test]
        public void GetTodoById_Positive()
        {        // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.GetTodoById(1);

            //Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [Test]
        public void GetTodoById_Invalid_Id()
        {        // Arrange
            todoController = new TodoController(todoMockDal);

            //Act
            var result = todoController.GetTodoById(0);

            //Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
            Assert.AreEqual(HttpStatusCode.BadRequest, result.StatusCode);
        }
    }
}
