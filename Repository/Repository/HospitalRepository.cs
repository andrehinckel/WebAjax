using Model;
using Repository.DataBase;
using Repository.Intefaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class HospitalRepository : IHospitalRepository
    {
        public SistemaContext Context;

        // Construtor
        public HospitalRepository()
        {
            //Instancia um objeto da classe sistema context que nos
            // permite ter acesso as tabelas do banco de dados

            Context = new SistemaContext();
        }

        public bool Delete(int id)
        {
            // linq
            Hospital hospital = (from hospitais in Context.Hospitais where hospitais.Id == id select hospitais).FirstOrDefault();
            if (hospital == null)
            {
                return false;
            }
            hospital.RegistroAtivo = false;
            Context.SaveChanges();
            return true;
        }

        public int Inserir(Hospital hospital)
        {
            hospital.DataCriacao = DateTime.Now;
            Context.Hospitais.Add(hospital);
            Context.SaveChanges();
            return hospital.Id;
        }

        public Hospital ObterPeloId(int id)
        {
            return (from hospitais in Context.Hospitais where hospitais.Id == id select hospitais).FirstOrDefault();
        }

        public List<Hospital> ObterTodos(string busca)
        {
            
            return (from hospital in Context.Hospitais where hospital.RazaoSocial.Contains(busca) || hospital.Cnpj.Contains(busca) orderby hospital.RazaoSocial select hospital).ToList();
        }

        public bool Update(Hospital hospital)
        {
            Hospital hospitalOriginal = (from x in Context.Hospitais where x.Id == hospital.Id select x).FirstOrDefault();
            if (hospitalOriginal == null)
            {
                return false;
            }

            hospitalOriginal.RazaoSocial = hospital.RazaoSocial;
            hospitalOriginal.Particular = hospital.Particular;
            hospitalOriginal.Faturamento = hospital.Faturamento;
            Context.SaveChanges();
            return true;
        }
    }
}
