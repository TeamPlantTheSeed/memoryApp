import {interval, reminders} from '../config/scheduler.js'
import routers from "./routes";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

export default path => {
  // Create Instance of Express
  const app = express();

  // Run Morgan for Logging
  app.use(logger("dev"));
  app.use(bodyParser.json());

  app.use(express.static(`${path}/client/`));

  app.use("/api/cards", routers.card);
  app.use("/api/users", routers.user);

  app.get("/api/config", (req, res) => {
    res.json({
      interval,
      reminders,
    })
  })

  // Any non API GET routes will be directed to our React App and handled by React Router
  app.get("*", (req, res) => {
    res.sendFile(`${path}/client/index.html`);
  });

  return app;
  // -------------------------------------------------
};
