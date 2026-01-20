const http = require("http");
const fs = require("fs");

const requestCycle = (req, res) => {
  let filepath = "";

  switch (req.url) {
    case '/':
      filepath = './index.html';
      break;

    case '/about':
      filepath = './about.html';
      break;

    case '/product':
      filepath = './product.html';
      break;

    default:
      filepath = './notFound.html';
  }

  let result = fs.readFileSync(filepath, "utf8");
  res.end(result);
};

const server = http.createServer(requestCycle);

server.listen(8000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server start at http://localhost:8000`);
});
