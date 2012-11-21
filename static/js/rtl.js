exports.postAceInit = function (hook_name, args, cb) {
  $('#chattext').addClass("rtl");
  $('.popup').addClass("rtl");
  $('input').addClass("rtl");
  pad.changeViewOption('rtlIsTrue', true);
}

