'use strict';

// Force RTL on by default for every pad load.
//
// Earlier revision:
//   $('#chattext').addClass('rtl');
//   $('.popup').addClass('rtl');
//   $('input').addClass('rtl');
//   pad.changeViewOption('rtlIsTrue', true);
//
// Two problems with that:
//
// 1. pad.changeViewOption('rtlIsTrue', true) re-runs setViewOptions for
//    *every* option, falling back to defaults for keys that aren't
//    persisted to pad.padOptions. That clobbered the URL-derived
//    `?rtl=false` override (rtl_url_param.spec.ts:16) and any other
//    in-flight option. Same cascade bug fixed in ep_hide_line_numbers.
//
// 2. The three .addClass('rtl') calls were dead weight: core's
//    rtlistrue ace property already does
//        body.classList.toggle('rtl', value)
//        document.documentElement.dir = 'rtl'
//    so direction cascades to every descendant including #chattext,
//    popups, and inputs. Adding the class manually on top of that
//    broke two unrelated tests:
//      - change_user_name.spec.ts uses an exact-match selector
//        `[class="popup popup-show"]` which never matched once the
//        plugin appended ` rtl` to the class attribute.
//      - chat.spec.ts:142 measures left/right padding symmetry on the
//        chat title bar; flipping just #chattext to rtl (without
//        flipping the parent) threw the flex centering off by ~170px.
//
// Fix: set the ace property directly + sync the settings checkbox.
// No cascade through setViewOptions, no redundant className mutation.
exports.postAceInit = (hook, context) => {
  context.ace.setProperty('rtlistrue', true);
  $('#options-rtlcheck').prop('checked', true);
};
