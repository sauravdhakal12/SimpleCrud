import app from "./app.js"
import { PORT } from "./utils/config.js";

app.listen(PORT || 4000, () => {
  console.log(`Listining on port ${PORT || 4000}`);
})
