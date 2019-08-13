using System;
using System.Data;
using System.Data.SqlClient;

namespace Todo.DataAccess.Core
{
    public class SqlHelper
    {
        private string ConnectionString { get; set; }

        public SqlHelper(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public void CloseConnection(SqlConnection connection)
        {
            connection.Close();
        }

        public SqlParameter CreateParameter(string name, object value, DbType dbType)
        {
            return new SqlParameter
            {
                DbType = dbType,
                ParameterName = name,
                Value = value
            };
        }

        public IDataReader GetDataReader(string commandText, CommandType commandType, SqlParameter[] parameters, out SqlConnection connection)
        {
            IDataReader reader = null;
            connection = new SqlConnection(ConnectionString);
            connection.Open();

            var command = new SqlCommand(commandText, connection);
            command.CommandType = commandType;
            if (parameters != null)
            {
                foreach (var parameter in parameters)
                {
                    command.Parameters.Add(parameter);
                }
            }

            reader = command.ExecuteReader();

            return reader;
        }


        public void Delete(string commandText, CommandType commandType, SqlParameter[] parameters = null)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(commandText, connection))
                {
                    command.CommandType = commandType;
                    if (parameters != null)
                    {
                        foreach (var parameter in parameters)
                        {
                            command.Parameters.Add(parameter);
                        }
                    }

                    command.ExecuteNonQuery();
                }
            }
        }

        public int Insert(string commandText, CommandType commandType, SqlParameter[] parameters, out int lastId)
        {
            lastId = 0;
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(commandText, connection))
                {
                    command.CommandType = commandType;
                    if (parameters != null)
                    {
                        foreach (var parameter in parameters)
                        {
                            command.Parameters.Add(parameter);
                        }
                    }

                    object newId = command.ExecuteScalar();
                    lastId = Convert.ToInt32(newId);
                }
            }

            return lastId;
        }

        public void Update(string commandText, CommandType commandType, SqlParameter[] parameters)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(commandText, connection))
                {
                    command.CommandType = commandType;
                    if (parameters != null)
                    {
                        foreach (var parameter in parameters)
                        {
                            command.Parameters.Add(parameter);
                        }
                    }

                    command.ExecuteNonQuery();
                }
            }
        }

    }
}
