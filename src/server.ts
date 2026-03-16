import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { json } from "stream/consumers";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running ");
    //root route
    if (req.url == "/" && req.method === "GET") {
      res.writeHead(200, {
        "content-type": "application/json ",
      });
      res.end(
        JSON.stringify({
          message: "Hello Form Node js",
          path: req.url,
        }),
      );
    }
    //health route
    if (req.url == "/api" && req.method === "GET") {
      res.writeHead(200, {
        "content-type": "application/json ",
      });
      res.end(
        JSON.stringify({
          message: "status test",
          path: req.url,
        }),
      );
    }

    if (req.url == "/api/users" && req.method === "POST") {
      // const user = {
      //   id: 1,
      //   name: "Mintu",
      // };
      // res.writeHead(200, {
      //   "content-type": "application/json ",
      // });
      // res.end(JSON.stringify(user));
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const parsBody = JSON.parse(body);
          console.log(parsBody);
          res.end(JSON.stringify(parsBody));
        } catch (err: any) {
          console.log(err?.message);
        }
      });
    }
  },
);

server.listen(config.port, () => {
  console.log(`server is running ${config.port}`);
});
