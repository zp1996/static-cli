define(["jquery", "img", "lib/utils"], function($, Img, util){
	var default_selector = ".slide-box";
	var sports_ways = {
		plane: function(index) {
			var self = this,
				temp = index % this.len;
			if (index === this.len) {
				this.ul.animate({
					left: -this.width * index
				}, function() {
					self.ul.css({ left: "0px" });
				})
			} else {
				this.ul.animate({
					left: -this.width * index
				});
			}
			if (this.dots) {
				this.dots[this.active].removeAttr("id");
				this.dots[temp].attr("id", "dot-active");
			}
			if (index === this.len)
				self.index++;
			this.active = temp;
		}
	};
	function Slide(opts) {
		opts = opts || {};

		this.wrapper = $(opts.selector || default_selector);
		this.ul = this.wrapper.find(".slide-ul");
		this.lis = this.ul.find(".slide-li");
		this.imgs = this.ul.find(".slide-img");
		this.dots = this.wrapper.find(".slide-dots li");
		
		this.way = opts.way || "plane";
		this.interval = opts.interval || 5000;

		this.width = this.wrapper.width();
		this.len = this.lis.length;

		// 提供页面名,兼容ie8 => $(window).load
		this.ns = opts.page_name;

		this.init();
	}

	Slide.prototype.collection = [];
	Slide.prototype.timer = null;
	Slide.prototype.index = 1;
	Slide.prototype.active = 0;

	Slide.prototype.init = function() {
		this.ul.width(this.width * (this.len + 1));
		this.ul.append($(this.lis[0].cloneNode(true)));
		this.wrap_img();
		this.register();
	};
	Slide.prototype.sport = function() {
		var self = this,
			len = self.len + 1;
		this.timer = setInterval(function() {
			sports_ways[self.way].call(
				self, 
				self.index++ % len
			);
		}, this.interval);
	};
	Slide.prototype.register = function() {
		var self = this,
			temp = [];
		this.dots.each(function(i, ele) {
			ele = $(ele);
			ele.click(function() {
				clearInterval(self.timer);
				self.timer = null;
				if (i !== self.active) {
					sports_ways[self.way].call(
						self, 
						i
					);
					self.index = (i + 1);
				}
			});
			ele.mouseout(function() {
				if (!self.timer) {
					self.sport();
				}
			});
			temp.push(ele);
		});
		this.dots = temp;
		if (util.is_old_ie) {
			util.hack_ie_load(this.ns, register_fn);
		} else {
			$(window).load(register_fn);
		}
		function register_fn() {
			self.sport();
			for (var i = 0, len = self.collection.length; i < len; i++) {
				self.collection[i].load();
			}	
			self.collection = null;
		}
	};
	Slide.prototype.wrap_img = function() {
		var self = this;
		$.each(this.imgs, function(i, img) {
			self.collection[i] = new Img($(img));
		});
	};
	return Slide;
});