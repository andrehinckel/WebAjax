using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Intefaces
{
    interface IHospitalRepository
    {
        List<Hospital> ObterTodos(string busca);

        int Inserir(Hospital hospital);

        bool Delete(int id);

        bool Update(Hospital hospital);

        Hospital ObterPeloId(int id);
    }
}
