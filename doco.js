// Selectors
// http://www.qaautomation.net/?p=388 

var doco = (function () {

	// This will be stored on the server one day
	var data = [
		{
			id: "inner",
			title: "This is the innter title",
			description: "## Usage \n### Node\nThe simple way to use it with node is:\n\n```js\nvar markdown = require(\"markdown\" ).markdown;\nconsole.log( markdown.toHTML( \"Hello *World*!\" ) );```"
		},{ 
			className: "footer",
			title: "This is the innter title 1",
			description: "This is the description 1 \n \n The footer is generated \n### Footer"
		},{ 
			className: "breadcrumb",
			title: "These are generated using X",
			description: "This content is generated using the <br/>/some/service <br/> Call.. more info... "
		},{ 
			className: "active",
			title: "Link",
			description: "This is the description for the link"
		}

	];

   var doco = {
   		init: function () {
			
      		var params = this.queryParameters();

      		if(params["doco"])
      		{
      			console.log("Doco Enabled");

				if(markdown)
      				console.log("Markdown Enabled");

				this.loadDoco();
			}

      	},  // init

		createDocoOverlay: function(elem, doc) {
			console.log(elem);

			elem.className = elem.className + " doco_docoed";

		    var rect = elem.getBoundingClientRect();
		    var over = document.createElement('div');
		    var desc = document.createElement('div');

		    over.style.position = 'absolute';
		    over.style.top =    rect.top+'px';
		    over.style.left=    rect.left+'px';
		    over.style.height = rect.height+'px';
		    over.style.width=   rect.width+'px';
		    over.className = "doco_overlay";
			over.innerHTML = doc.title;
			// over.title = doc.description;
			document.body.appendChild(over);

			desc.style.position = 'absolute';
			desc.style.width = '400px';
		    desc.className = "doco_overlay_desc";
			desc.style.top =    (rect.top - 2)+'px';

			var left = document.body.clientWidth - 400;

		    desc.style.left=left+"px";
		    console.log(document.body.clientWidth);
		    console.log(desc.style.width);
		    console.log(left);
		    desc.style.visibility = "hidden";

		    if(markdown)
		    {
		    	desc.innerHTML = markdown.toHTML(doc.description); // MD
		    }
		    else
		    {
		    	desc.innerHTML = doc.description; // HTML
		    }
		    document.body.appendChild(desc);

		    var onmouseover = function(e) {
		    	console.log("Over Element");
		    	desc.style.visibility= "visible";
		    	over.className = "doco_overlay_over";
		    }

		    var onmouseout = function(e) {
		    	console.log("Out Element");
		    	desc.style.visibility="hidden";	
		    	over.className = "doco_overlay";
		    }

		    over.onmouseover = onmouseover;
		    over.onmouseout = onmouseout;
		    desc.onmouseover = onmouseover;
		    desc.onmouseout = onmouseout;

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

