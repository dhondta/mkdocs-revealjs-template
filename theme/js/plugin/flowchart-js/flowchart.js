/*
 * Reveal.js flowchart plugin
 * (c) Alexandre D'Hondt 2016
 *
 * See Flowchart.js at: https://github.com/adrai/flowchart.js/
 */
$(function () {
    var diagram = $("div#flowchart"), fn = "process.diag";
    if (diagram.length) {
        loadResource( '../../js/plugin/flowchart-js/flowchart.css', 'stylesheet', function() {
        loadResource( '../../js/plugin/flowchart-js/svg-innerhtml.js', 'script', function() {
            var get_flowchart = new XMLHttpRequest();
            get_flowchart.overrideMimeType( 'text/plain; charset=utf-8' );

		    get_flowchart.onreadystatechange = function() {
			    if( get_flowchart.readyState === 4 ) {
				    if ( ( get_flowchart.status >= 200 && get_flowchart.status < 300 ) || get_flowchart.status === 0 ) {
                        var p = flowchart.parse(get_flowchart.responseText), diagram = $("div#flowchart");
              // NB: of course, flowchart_options is loaded in an apart js file
					    p.drawSVG(this, flowchart_options);
                        $('svg').appendTo(diagram);
				    } else {
					    diagram.text('ERROR: The attempt to fetch "' + fn + '" failed with HTTP status ' + get_flowchart.status + '.' +
						    'Check your browser\'s JavaScript console for more details.' +
						    '<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>');
						  console.log(get_flowchart.status);
				    }
			    }
		    };

		    get_flowchart.open( 'GET', './' + fn, false );

		    try {
			    get_flowchart.send();
		    } catch ( e ) {
			    alert( 'Failed to get the flowchart file "' + fn +
                       '". Make sure that the file is served by an HTTP server and the file can be found there. ' + e );
		    }
        })
        });
    };

	// modified from math plugin
	function loadResource( url, type, callback ) {
		var head = document.querySelector( 'head' );
		var resource;

		if ( type === 'script' ) {
			resource = document.createElement( 'script' );
			resource.type = 'text/javascript';
			resource.src = url;
		}
		else if ( type === 'stylesheet' ) {
			resource = document.createElement( 'link' );
			resource.rel = 'stylesheet';
			resource.href = url;
		}

		// Wrapper for callback to make sure it only fires once
		var finish = function() {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		}

		resource.onload = finish;

		// IE
		resource.onreadystatechange = function() {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		}

		// Normal browsers
		head.appendChild( resource );
	}
});
