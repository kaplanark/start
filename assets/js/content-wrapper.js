/** content wrapper */

var contentWrapperFloatLeftImage = $('.content-wrapper img[style="float: left;"]');

contentWrapperFloatLeftImage.addClass('leftImage');
contentWrapperFloatLeftImage.parent('a').addClass('floatLeft');

var contentWrapperFloatRightImage = $('.content-wrapper img[style="float: right;"]');

contentWrapperFloatRightImage.parent('a').addClass('floatRight');
contentWrapperFloatRightImage.addClass('rightImage');

/** content wrapper */