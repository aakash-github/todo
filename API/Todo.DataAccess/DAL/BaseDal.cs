using System.Configuration;
using System.Data.SqlClient;
using Todo.DataAccess.Core;

namespace Todo.DataAccess.DAL
{
    public class BaseDal
    {
        public SqlHelper sqlHelper = null;
        public SqlConnection connection = null;

        public BaseDal()
        {
            sqlHelper = new SqlHelper(ConfigurationManager.ConnectionStrings["TodoConnection"].ToString());
        }

        public void CloseConnection()
        {
            sqlHelper.CloseConnection(connection);
        }
    }
}
