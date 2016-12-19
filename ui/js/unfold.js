define(["jquery", "lib/utils"], function($, util) {
	var default_class = ".unfold",
		default_click = default_class + "-click",
		default_todo = default_class + "-todo";
	Unfold.sport_methods = {
		change_height: {
			init: function(todo) {
				todo.height = todo.ele.height();
				todo.hide = 1;
				todo.ele.hide();
				todo.ele.height(0);
				return todo;
			},
			show: function(todo) {
				var ele = todo.ele;
				this.show_cb(todo);
				ele.show();
				ele.animate({ height: todo.height });
			},
			hide: function(todo) {
				var ele = todo.ele;
				this.hide_cb(todo);
				ele.animate({ height: 0 }, function() {
					ele.hide();
				});
			}
		},
		default_method: {
			show: function(todo) {
				this.show_cb(todo);
				todo.ele.show();
			},
			hide: function(todo) {
				this.hide_cb(todo);
				todo.ele.hide();
			}
		}
	};
	function Unfold(opts) {
		opts = opts || {};
		if (this instanceof Unfold) {
			this.class_name = opts.selector || default_class;
			this.click_name = this.class_name + "-click";
			this.todo_name = this.class_name + "-todo";
			this.show_cb = opts.show_cb || Unfold.noop;
			this.hide_cb = opts.hide_cb || Unfold.noop;
			this.way = opts.way || "default_method";
			this.close = opts.close || false;
			this.init();
		} else {
			return new Unfold(opts);
		}
	}
	Unfold.noop = function() {};
	Unfold.prototype.init = function() {
		var self = this,
			unfolds = $(self.class_name);
		unfolds.each(function(i) {
			var todo = $(this).find(self.todo_name),
				click_ele = $(this).find(self.click_name),
				hide = Number(todo.css("display") === "none"),
				methods = Unfold.sport_methods[self.way];
			todo = {
				ele: todo,
				click: click_ele
			};
			methods.init && methods.init.call(self, todo, click_ele);
			hide = todo.hide || hide;
			click_ele.click(function() {
				if (hide++ % 2) {
					methods.show.call(self, todo);
				} else {
					methods.hide.call(self, todo);
				}
			});
		});
	};
	return Unfold;
});