using Model;
using Repository.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace View.Controllers
{
    public class HospitalController : Controller
    {
        private HospitalRepository repository;

        public HospitalController()
        {
            repository = new HospitalRepository();
        }

        // GET: Hospital
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObterTodos()
        {
            List<Hospital> hospitais = repository.ObterTodos("");
            return Json(hospitais, JsonRequestBehavior.AllowGet);
        }

        // JsonResult retorna um json para a requisição
        public JsonResult Store(Hospital hospital)
        {
            repository.Inserir(hospital);
            // retorna um formato de json o objeto de hospital
            // que foi persistido no banco de dados.
            return Json(hospital);
        }
    }
}