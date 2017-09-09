$(document).ready(function () {
  $('ul.subnav').each(function () {
    $(this).find('span:first').remove();
  });
  $('li.toctree-l1').each(function () {
    var next = $(this).next();
    if (next.hasClass('subnav')) {
      if (!next.children('li.toctree-l2.current').length) {
        next.hide();
        $('<a class="fa fa-caret-left collapse-navbar" href="#"></a>')
          .insertAfter($(this).find('a'));
      } else {
        $('<a class="fa fa-caret-down collapse-navbar" href="#"></a>')
          .insertAfter($(this).find('a'));
      }
    }
  });
  $('a.collapse-navbar').click(function () {
    var parent = $(this).closest('li.toctree-l1');
    if ($(this).hasClass('fa-caret-left')) {
      parent.next().show();
      $(this).removeClass('fa-caret-left');
      $(this).addClass('fa-caret-down');
    } else {
      parent.next().hide();
      $(this).addClass('fa-caret-left');
      $(this).removeClass('fa-caret-down');
    }
  });
});
