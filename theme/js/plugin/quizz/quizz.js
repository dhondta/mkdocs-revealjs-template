/*
 * Reveal.js quizz plugin
 * (c) Alexandre D'Hondt 2016
 */
$(function () {
    var quizz = $(".quizz"), fn = "questions.json";
    if (quizz.length) {
        var qlist, nq = 0, ans = 0, over = false;

        loadResource( '../../../js/plugin/quizz/quizz.css', 'stylesheet', function() {
            var get_quiz = new XMLHttpRequest();
            get_quiz.overrideMimeType( 'application/json; charset=utf-8' );

		    get_quiz.onreadystatechange = function() {
			    if( get_quiz.readyState === 4 ) {
				    if ( ( get_quiz.status >= 200 && get_quiz.status < 300 ) || get_quiz.status === 0 ) {
                        try {
                            qlist = JSON.parse(get_quiz.responseText);
                            quizzStart();
                        } catch( e ) {
					        quizz.text('ERROR: "' + fn + '" appears to be an invalid JSON file. Please correct it so that it can be parsed.' +
						        '<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>');
                        }
				    } else {
					    quizz.text('ERROR: The attempt to fetch "' + fn + '" failed with HTTP status ' + get_quiz.status + '.' +
						    'Check your browser\'s JavaScript console for more details.' +
						    '<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>');
				    }
			    }
		    };

		    get_quiz.open( 'GET', './' + fn, false );

		    try {
			    get_quiz.send();
		    } catch ( e ) {
			    alert( 'Failed to get the questions file "' + fn +
                       '". Make sure that the file is served by an HTTP server and the file can be found there. ' + e );
		    }
        });

        function quizzRefresh() {
            var c, clist = $('.quizz-choices');
            $('.quizz-next').attr('disabled', true);
            $('.quizz-question').text(qlist[nq].question);
            clist.find("li").remove();
            for (i = 0; i < qlist[nq].choices.length; i++) {
                c = qlist[nq].choices[i];
                $('<li class="quizz-choice"><label><input type="radio" value=' + i
                     + ' class="quizz-radio"><span>' + c + '</span></label></li>').appendTo(clist);
            }
            $('.quizz-radio').click(function (e) {
                $('.quizz-next').removeAttr('disabled');
                $('.quizz-radio').removeAttr('checked');
                $(this).attr('checked', true);
            });
        }

        function quizzReset() {
            nq = 0, ans = 0, over = false;
            $('.quizz-next').text("Next");
            $('.quizz-result').hide();
        }

        function quizzStart() {
            if (qlist == undefined || qlist.length == 0) {
                $('.quizz-question').text("No question to display");
                $('.quizz-choices').remove();
                $('.quizz-next').remove();
                return;
            } else {
                quizzReset();
                quizzRefresh();
                $('.quizz-next').click(function (e) {
                    if (over) {
                        quizzReset();
                        quizzRefresh();
                    } else {
                        v = $('input[class="quizz-radio"]:checked').val();
                        if (v == undefined) {
                            $('.quizz-next').attr('disabled', true);
                        } else {
                            if (v == qlist[nq].answer) { ans++; }
                            nq++;
                            if (nq < qlist.length) {
                                quizzRefresh();
                            } else {
                                $('.quizz-result').text("Your score: " + ans + "/" + qlist.length).show();
                                $('.quizz-next').text("Restart");
                                over = true;
                            }
                        }
                    }
                });
            }
        }
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
