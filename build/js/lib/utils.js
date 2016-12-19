define(function() {
	var utils = {},
		loading_fn = {},
		UA = window && window.navigator.userAgent.toLowerCase(),
		CSSPREFIX = ["webkit", "moz", "o", "ms"];
	
	var upperRE = /([^-])-([a-z])/g,
		idclassRE = /(?:.|#)(\w+)$/;

	utils.is_old_ie = UA && (UA.indexOf("msie 8.0") > 0);
	
	// hack ie8
	utils.hack_ie_load = function(namespace, cb) {
		loading_fn[namespace] ? 
			loading_fn[namespace].push(cb) : 
			(loading_fn[namespace] = [cb]);
		setTimeout(function() {
			for (var i = 0, len = loading_fn[namespace].length; i < len; i++) {
				loading_fn[namespace][i]();
			}
		});
	};

	utils.toUpper = function(str) {
		function replace_fn(_, $1, $2) {
			return $1 + $2.toUpperCase();
		}
		return str.replace(upperRE, replace_fn)
				  .replace(upperRE, replace_fn);
	};
	utils.get_realy_name = function(selector) {
		return selector.match(idclassRE)[1];
	};
	utils.compatible_css3 = function() {

	};
	return utils;
});