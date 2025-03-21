import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.post(
  "/",
  zValidator(
    "form",
    z.object({
      id: z.string(),
    })
  ),
  (c) => {
    const { id } = c.req.valid("form");

    console.log(id);

    c.env.NEW_TRACK_WORKFLOW.create({
      id,
    });
    return c.json({ message: "Track ingested" });
  }
);

export default app;
