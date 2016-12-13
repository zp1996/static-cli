/**
 * judge function
 * @param {*} will judge
 * @return {boolean} is a function or not
*/
function isFunction(fn){
	return Object.prototype.toString.call(fn) === "[object Function]";
}
/**
 * Create a dot
 * @constructor
 * @param {number} x - The x value
 * @param {number} y - The y value
*/
function Dot(x, y){
	this.x = x;
	this.y = y;
}