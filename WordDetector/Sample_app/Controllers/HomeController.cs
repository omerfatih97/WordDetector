using Sample_app.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sample_app.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}

		[HttpGet]
		public ActionResult SampleUpload()
		{
			return View();
		}

		public ActionResult UploadFiles()
		{
			Session.Remove("LastIndex");

			string FileName = "";
			HttpFileCollectionBase files = Request.Files;
			List<DetectedWords> result = new List<DetectedWords>();
			for (int i = 0; i < files.Count; i++)
			{ 
				HttpPostedFileBase selected_file = files[i];
				if (selected_file == null)
				{
					ViewBag.Error = "Please Choose Text File.";
				}
				else
				{
					HttpPostedFileBase file = selected_file;
					if (file != null)
					{
						if (file.ContentType != "text/plain")
						{
							ViewBag.Error = "Selected File Must Be .txt File.";
						}
						else
						{
							string read_txt = new StreamReader(file.InputStream).ReadToEnd();
							if (!string.IsNullOrEmpty(read_txt))
							{
								result = this.detectedWordFunc(read_txt);
								ViewBag.Success = "Process Successfully Done.";
								ViewBag.Result = result;
							}
							else
							{
								ViewBag.Error = "Selected File Must Be .txt File.";
							}
						}
					}
				}
				
			}
			return Json(result, JsonRequestBehavior.AllowGet);
		}

		public List<DetectedWords> detectedWordFunc(string txt)
		{
			List < DetectedWords >  result = new List<DetectedWords>();
			string[] subs = txt.Replace("\n", " ").Replace("\r", " ").Split(' ');

			foreach(var item in subs)
			{
				if (!result.Where( x => x.Word == item).Any())
				{
					result.Add(new DetectedWords
					{
						Word = item,
						Count = 1
					});
				}
				else
				{
					var tmp = result.Where(x => x.Word == item).Single();
					tmp.Count++;
				}
			}

			if(result.Where(x => x.Word == "").Any())
			{
				var tmp = result.Where(x => x.Word == "" || x.Word == "").Single();
				tmp.Word = "Extra Lined Sentences";
			}

			Session["ProcResult"] = result;

			return result;
		}

		public void setLastIndex(int lastIndex)
		{
			Session["LastIndex"] = lastIndex;
		}

		public void ExportToTxtFile()
		{
			List<DetectedWords> list = Session["ProcResult"] as List<DetectedWords>;
			List<DetectedWords> listTmp = new List<DetectedWords>();
			if (list.Count == 0)
				list = new List<DetectedWords>();

			int lastIndex = list.Count;
			if (Session["LastIndex"] != null)
			{
				lastIndex = (int) Session["LastIndex"];
			}

			string metin = string.Format(" {0}               {1} \n", "Word", "Occurence");
			metin += " \n ";

			if (list.Count > 0)
			{
				listTmp = list.Take(lastIndex).ToList();

				foreach (var item in listTmp)
				{
					metin += string.Format(" {0}               {1} \n", item.Word, item.Count);
				}
			}

			Response.Clear();
			Response.AddHeader("content-disposition", "attachment; filename=ResultTxt_" + Guid.NewGuid() + ".txt");
			Response.AddHeader("content-type", "text/plain");

			using (StreamWriter writer = new StreamWriter(Response.OutputStream))
			{
				writer.WriteLine(metin);
			}
			Response.End();
		}
	}
}