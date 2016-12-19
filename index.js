const express = require("express"),
	path = require("path"),
	app = express(),
	server = require("http").createServer(app),
	port = require("./port.json").port;

app.set("views", "./");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "build/")));

app.get('/homepage/zp', (req, res) => {
	res.render("./views/recruit", {
		pretty: true,
		pg_title: "招聘",
		data: "hello zp"
	});
});

app.get('/homepage/cf', (req, res) => {
	// 
});

server.listen(port, () => {
	console.log(`server is on port ${port}`);
});