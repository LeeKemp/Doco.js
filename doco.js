// Selectors
// http://www.qaautomation.net/?p=388 

var doco = (function () {

	// This will be stored on the server one day
	var data = [
		{
			id: "inner",
			title: "This is the innter title",
			description: "This is the description"
		},{ 
			className: "footer",
			title: "This is the innter title 1",
			description: "This is the description 1"
		},{ 
			className: "breadcrumb",
			title: "These are generated using X",
			description: "This is the description 1"
		}
	];

   var doco = {
   		init: function () {
      		console.log("init");
			
      		var params = this.queryParameters();

      		console.log(params);

      		if(params["doco"])
      		{
				this.loadDoco();
			}

			document.body.onmouseover = function(element) {
			
				// console.log("Mouse over");
				// console.log(element);
			};



      	},  // init

		createDocoOverlay: function(elem, doc) {
			console.log(elem);

			elem.className = elem.className + " doco_docoed";

		    var rect = elem.getBoundingClientRect();
		    var over = document.createElement('div');

		    over.style.position = 'absolute';
		    over.style.top =    rect.top+'px';
		    over.style.left=    rect.left+'px';
		    over.style.height = rect.height+'px';
		    over.style.width=   rect.width+'px';
		    over.className = "doco_overlay";
			document.body.appendChild(over);

			over.innerHTML = doc.title;
			over.title = doc.description;
			return over;
		},

      	loadDoco: function() {
			console.log("loadDoco");

			for(var i=0; i<data.length; i++)
			{
				var doc = data[i];
				console.log(doc);

				if(doc.id)
				{
					var elem = document.getElementById(doc.id);
					var over = this.createDocoOverlay(elem, doc);
				}
				else if(doc.className)
				{
					var elems = document.getElementsByClassName(doc.className);		
					for(var j=0; j<elems.length; j++)
					{
						var elem = elems[j];
						var over = this.createDocoOverlay(elem, doc);
					}
				}
			}

	

      	}, // loadDoco
		
		queryParameters: function() {
		  var keyValuePairs = window.location.search.split(/[&?]/g);
		  var params = {};
		  for (var i = 0, n = keyValuePairs.length; i < n; ++i) {
		    var m = keyValuePairs[i].match(/^([^=]+)(?:=([\s\S]*))?/);
		    if (m) {
		      var key = decodeURIComponent(m[1]);
		      (params[key] || (params[key] = [])).push(decodeURIComponent(m[2]));
		    }
		  }
		  return params;
		}

   };
    
   return doco;
}());

