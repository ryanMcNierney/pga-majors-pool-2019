const { db } = require('./database/')
const app = require('./index.js')
const PORT = process.env.PORT || 3000

const init = async () => {
  await db.sync({ force: true }) //INSERT { force: true } INTO SYNC CALL IF TESTING
  app.listen(`${PORT}`, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init()
