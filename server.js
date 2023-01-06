const { Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

app.use(express.static("public"));

app.get("/users", async (req, res) => {
  const results = await client
    .query("SELECT * FROM users")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.post("/user", async (req, res) => {
  const results = await client
    .query({text: `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email `, values: [req.body.name, req.body.email]})
    .then((payload) => {
      return [payload.rows];
    })
    .catch(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(500);
      res.send(JSON.stringify({message: "Erro inserindo dados"}));
    });
  res.setHeader("Content-Type", "application/json");
  res.status(201);
  res.send(JSON.stringify(results));
});

app.delete("/user/:userId", async (req, res) => {
  const results = await client
    .query({text: `DELETE FROM users WHERE id=$1 RETURNING id, name, email `, values: [ req.params.userId ]})
    .then((payload) => {
      return [payload.rows];
    })
    .catch(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(500);
      res.send(JSON.stringify({message: "Erro excluindo usuário"}));
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

(async () => {
  await client.connect();

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
})();
