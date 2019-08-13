using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using Todo.Entities;
using Todo.DataAccess.Contract;

namespace Todo.DataAccess.DAL
{
    public class TodoDal : BaseDal, ITodoDal
    {
        public int Insert(TodoDTO todo)
        {        
            var parameters = new List<SqlParameter>();
            parameters.Add(sqlHelper.CreateParameter("@Title", todo.Title, DbType.String));
            parameters.Add(sqlHelper.CreateParameter("@Complete", todo.Complete, DbType.Boolean));

            int lastId = 0;
            sqlHelper.Insert("sp_InsertTodo", CommandType.StoredProcedure, parameters.ToArray(), out lastId);

            return lastId;
        }

        public void Update(TodoDTO todo)
        {
            var parameters = new List<SqlParameter>();
            parameters.Add(sqlHelper.CreateParameter("@Id", todo.Id, DbType.Int32));
            parameters.Add(sqlHelper.CreateParameter("@Title", todo.Title, DbType.String));
            parameters.Add(sqlHelper.CreateParameter("@Complete", todo.Complete, DbType.Boolean));

            sqlHelper.Update("sp_UpdateTodo", CommandType.StoredProcedure, parameters.ToArray());
        }

        public void Delete(int id)
        {
            var parameters = new List<SqlParameter>();
            parameters.Add(sqlHelper.CreateParameter("@Id", id, DbType.Int32));

            sqlHelper.Delete("sp_DeleteTodo", CommandType.StoredProcedure, parameters.ToArray());
        }

        public TodoDTO GetById(int id)
        {
            var parameters = new List<SqlParameter>();
            parameters.Add(sqlHelper.CreateParameter("@Id", id, DbType.Int32));

            var dataReader = sqlHelper.GetDataReader("sp_GetTodoById", CommandType.StoredProcedure, parameters.ToArray(), out connection);

            try
            {
                var todo = new TodoDTO();
                while (dataReader.Read())
                {
                    todo.Title = Convert.ToString(dataReader["Title"]);
                    todo.Complete = Convert.ToBoolean(dataReader["Complete"]);
                    todo.Id = Convert.ToInt32(dataReader["Id"]);
                }

                return todo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dataReader.Close();
                CloseConnection();
            }
        }

        public IEnumerable<TodoDTO> GetAll()
        {
            var parameters = new List<SqlParameter>();
            var dataReader = sqlHelper.GetDataReader("sp_GetAllTodo", CommandType.StoredProcedure, null, out connection);

            try
            {
                var todos = new List<TodoDTO>();
                while (dataReader.Read())
                {
                    var todo = new TodoDTO();
                    todo.Title = Convert.ToString(dataReader["Title"]);
                    todo.Complete = Convert.ToBoolean(dataReader["Complete"]);
                    todo.Id = Convert.ToInt32(dataReader["Id"]);

                    todos.Add(todo);
                }

                return todos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dataReader.Close();
                CloseConnection();
            }
        }
    }
}
