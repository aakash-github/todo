using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Entities;

namespace Todo.DataAccess.Contract
{
    public interface ITodoDal
    {
        int Insert(TodoDTO todo);

        void Update(TodoDTO todo);

        void Delete(int id);

        TodoDTO GetById(int id);

        IEnumerable<TodoDTO> GetAll();
    }
}
