const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { contactRouter } = require("./routes/contactRouter");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

exports.CRUDServer = class CRUDServer {
  constructor() {
    this.app = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.initListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("combined"));
  }

  initRoutes() {
    this.app.use("/api/contacts", contactRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, console.log("start app"));
  }

  initListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Started listening on port", process.env.PORT);
    });
  }
};
