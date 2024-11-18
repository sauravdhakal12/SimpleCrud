import app from "./app.js"
import config from "./utils/config.utils.js"

app.listen(config.PORT || 4000, () => {
  console.log(`Listining on port ${config.PORT || 4000}`);
})
