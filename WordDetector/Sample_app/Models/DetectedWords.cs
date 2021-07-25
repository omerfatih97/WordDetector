using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Sample_app.Models
{

	[DataContract]
	public class DetectedWords
	{
		[DataMember]
		public string Word { get; set; }

		[DataMember]
		public int Count { get; set; }

	}
}