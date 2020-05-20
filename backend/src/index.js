const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { createIssuesRequest } = require("./jira");

const port = 3001;
const publicFolderPath = path.resolve(__dirname, "../public");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(publicFolderPath));

// client side routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(publicFolderPath, "index.html"));
});

// hit JIRA API endpoint
app.post("/", async (req, res) => {
  try {
    const status = await createIssuesRequest(req.body);
    if (status.toString()[0] !== "2") {
      res.status(400).send();
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));
