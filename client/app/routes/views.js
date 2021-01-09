import express from "express";

import React from "react";
import { renderToString } from "react-dom/server";

import { ServerStyleSheet } from "styled-components";

import { StaticRouter as Router } from "react-router-dom";

import SwitchApp from "../router";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sheet = new ServerStyleSheet();

    const App = ({ location, context }) => (
      <Router location={location} context={context}>
        <SwitchApp language="en" />
      </Router>
    );

    const reactComp = renderToString(
      sheet.collectStyles(
        <App location={req.url} context={{}} cookies={req.cookies} />,
      ),
    );

    const styles = sheet.getStyleTags();

    return res.status(200).render("main", {
      reactApp: reactComp,
      styles,
    });
  } catch (ex) {
    console.error(ex);

    const App = () => (
      <div
        className="container is-fluid"
        style={{
          padding: "15px",
          height: "100vh",
        }}
      >
        <article className="message is-danger">
          <div className="message-header">
            <p> Server Error: </p>
{" "}
          </div>
{" "}
          <div
            className="message-body"
            style={{
              height: "100%",
            }}
          >
            {" "}
            {`${ex}`}
{" "}
          </div>
{" "}
        </article>
{" "}
      </div>
    );

    const reactComp = renderToString(
      <App location={req.url} context={{}} cookies={req.cookies} />,
    );

    return res.status(500).render("main", {
      reactApp: reactComp,
      styles: "",
    });
  }
});

export default router;
