/*
 * Reveal.js jsmind plugin
 * (c) Alexandre D'Hondt 2016
 *
 * See Jsmind at: https://github.com/hizzgdev/jsmind/
 */
$(function () {
    var mindmap = $("div#mindmap"), fn = "mindmap.json";
    if (mindmap.length) {
        loadResource( '../../../js/plugin/jsmind/jsmind.css', 'stylesheet', function() {
            var get_mindmap = new XMLHttpRequest();
            get_mindmap.overrideMimeType( 'text/plain; charset=utf-8' );
            
		    get_mindmap.onreadystatechange = function() {
			    if( get_mindmap.readyState === 4 ) {
				    if ( ( get_mindmap.status >= 200 && get_mindmap.status < 300 ) || get_mindmap.status === 0 ) {
                        var jsmind_data = JSON.parse(get_mindmap.responseText);
                        var jm = jsMind.show(jsmind_options, jsmind_data);
                        // NB: of course, jsmind_options is loaded in an apart js file
				    } else {
					    mindmap.text('ERROR: The attempt to fetch "' + fn + '" failed with HTTP status ' + get_mindmap.status + '.' +
						    'Check your browser\'s JavaScript console for more details.' +
						    '<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>');
				    }
			    }
		    };

		    get_mindmap.open( 'GET', './' + fn, false );

		    try {
			    get_mindmap.send();
		    } catch ( e ) {
			    alert( 'Failed to get the mindmap file "' + fn +
                       '". Make sure that the file is served by an HTTP server and the file can be found there. ' + e );
		    }
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
