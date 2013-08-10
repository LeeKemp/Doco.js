// Selectors
// http://www.qaautomation.net/?p=388 

var doco = (function () {

   var doco = {

   		init: function (docoPath) {
			
      		var params = this.queryParameters();

      		if(params["doco"])
      		{
      			info.init();
				info.addInfo("Doco Enabled.")

				if(markdown)
      				info.addInfo("Markdown Enabled.");
			}

			if(!docoPath)
				docoPath = "doco.json";

			info.addInfo("Doco file is '"+docoPath+"'.");

			var jqxhr = $.getJSON( "doco.json", function(json) {
				doco.loadDoco(json["doco"]);
			})
			//.done(function() { console.log( "second success" ); })
			.fail(function(e) { 
				info.addInfo("Error loading doco. Check that your json is valid <a href='http://jsonlint.com/'>jsonlint</a>");
			})
			//.always(function() { console.log( "complete" ); });


      	},  // init

		createDocoOverlay: function(elem, doc) {

			if(elem == null)
			{
				console.log("Elem was null");
				return;
			}

			// console.log(elem);

			elem.className = elem.className + " doco_docoed";
			var elemOffset = elem.offset();

			// Overlay Div
		    var over = $("<div>");
		    over.css({
		    	left:elemOffset.left,
		    	top:elemOffset.top,
		    	height:elem.outerHeight(),
		    	width:elem.outerWidth()
		    });
		    over.addClass("doco_overlay");
			over.html(doc.title);	
			// over.title = doc.description;
			$("body").append(over);

			// Description Div
		    var desc = $("<div>");
		    desc.addClass("doco_overlay_desc");
			desc.css({
		    	//left:document.body.clientWidth - desc.width,
		    	top:elemOffset.top - 5,
		    });
			desc.hide();

		    if(markdown)
		    {
		    	desc.html(markdown.toHTML(doc.description)); // MD
		    }
		    else
		    {
		    	desc.html(doc.description); // HTML
		    }
		    $("body").append(desc);

		    var onmouseover = function(e) {
		    	desc.show();
		    	over.addClass("doco_overlay_over");
		    }

		    var onmouseout = function(e) {
		    	desc.hide();	
		    	over.removeClass("doco_overlay_over");
		    }

		    over.mouseover(onmouseover);
		    over.mouseout(onmouseout);
		    desc.mouseover(onmouseover);
		    desc.mouseout(onmouseout);

			return over;
		},

      	loadDoco: function(data) {
			console.log("loadDoco");

			for(var i=0; i<data.length; i++)
			{

				var doc = data[i];

				var pageMatches = true;
				if(doc.page && !window.location.pathname.match(doc.page)) {
					pageMatches = false;
				}

				if(doc.selector && pageMatches) {
					// console.log($(doc.selector));

					$(doc.selector).each(function() {
							doco.createDocoOverlay($(this), doc);
						}
					);

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
    
	var info = {

		div:$("<div>"),  

		init: function() {
			this.div.addClass("doco_info");
			$("body").append(this.div);
		},

		addInfo: function(message) {
			this.div.html(this.div.html() + message + "<br/>");
		}
	};

   return doco;
}());

