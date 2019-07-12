using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DataBase
{
   public class SistemaContext : DbContext
    {
        public SistemaContext(): base("DefaulConnection")
        {

        }
        public DbSet<Hospital> Hospitais { get; set; }
    }
}
