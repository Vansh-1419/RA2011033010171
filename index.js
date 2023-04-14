import express from "express";
import "dotenv/config";
const app = express();
app.use(express.json());
async function register() {
  const response = await axios.post("http:localhost:3000/register", {
    companyName: "something",
  });
  const { clientID, clientSecret } = response.data;
  return { clientID, clientSecret };
}
async function getAuth() {
  const { clientID, clientSecret } = await register;
  const response = await axios.post("http:localhost:3000/auth", {
    companyName,
    clientID,
    clientSecret,
  });

  return response.data.access_token;
}
async function GetallTrains() {
  const response = await axios.post("http:localhost:3000/trains", {
    headers: {
      Authorization: getAuth(),
    },
  });
  return console.log(response.data);
}
app.get("/register", register());
app.get("/", GetallTrains());
app.get("/auth", getAuth());
app.listen(process.env.PORT, () =>
  console.log(`App Started on http://localhost:${process.env.PORT}`)
);
