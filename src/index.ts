import "dotenv/config";
import express, { json } from "express";
import { ChatOpenAI } from "@langchain/openai";

const app = express();

app.use(json());

const model = new ChatOpenAI({
  model: "nvidia/nemotron-3-ultra-550b-a55b:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

app.post("/chat", async (req, res) => {
  const stream = await model.stream(req.body.question);

  for await (const chunk of stream) {
    res.write(chunk.content);
  }

  res.end();
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
