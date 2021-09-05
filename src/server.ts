/* eslint-disable prettier/prettier */
import { app } from "./app";
import { db } from "./database/db";

app.listen(3000, async () => {
  await db.sync();
  console.log("Server is running at port 3000...");
});
