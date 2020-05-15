import app from "./app";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
