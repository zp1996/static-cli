define(["jquery"], function($) {
	/**
 	 * lazyload img
 	 * @module img
	 */
	function Img(ele) {
		this.ele = ele;
		this.url = ele.data("url");
		this.flag = +ele.data("loaded");
	}
	Img.prototype.load = function () {
		this.ele.attr("src", this.url);
	};
	return Img;
});