// 首页公共部分js：header+aside
require.config({
	baseUrl: "../js/",
	paths: {
		"jquery": "lib/jquery"
	}
});
require(["unfold"], function(unfold) {
	unfold({
		selector: ".unfold-default"
	});
	// 更换验证码
	$(".validate-img").click(function() {
		var self = $(this),
			src = self.attr("src").replace(
				/(\=)\d+/, 
				"$1" + Number(new Date())
			);
		self.attr("src", src);
		return false;
	});
	// 提交表单
	var type = ["email", "password", "vcode"],
		type_len = type.length,
		data_input = {},
		remember_me = $("#remember-me");
	for (var i = 0; i < type_len; i++) {
		var t = type[i],
			ele = $("#login-" + t),
			tip = $("#tip-" + t);
		data_input[t] = {
			ele: ele,
			tip: tip,
			flag: false
		};
		(function(type) {
			ele.on("input", function() {
				if (data_input[type].flag && $(this).val()) {
					data_input[type].flag = false;
					data_input[type].tip.text("");
				}
			});
		})(t); 
	}
	function base_empty_error(input, text) {
		input.flag = true;
		input.tip.text(text);
	}
	// 报错
	var error = {
		email: {
			empty: function(input) {
				base_empty_error(input, "帐号不能为空");
			}
		},
		password: {
			empty: function(input) {
				base_empty_error(input, "密码不能为空");
			}
		},
		vcode: {
			empty: function(input) {
				base_empty_error(input, "验证码不能为空");
			}
		}
	};
	$("#login-btn").click(function() {
		var data = {};
		//email, password, vcode
		for (var i = 0; i < type_len; i++) {
			data[type[i]] = data_input[type[i]].ele.val();
			if (!data[type[i]]) {
				return error[type[i]].empty(data_input[type[i]]);
			}
		}
		data.remember_me = remember_me.is(':checked') ? "on" : "off";
		$.ajax({
            url: 'http://www.kuaizhan.com/passport/ajax-login',
            type: 'POST',
            dataType: "json",
            data,
            success: function (data) {
                if (data.ret === 0) {
                    if (data.data.referer) {
                        window.location = data.data.referer;
                    }
                } else {
             		console.log(data);       
                }
            }
        });
	});
});