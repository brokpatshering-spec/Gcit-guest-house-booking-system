// const app = require('./app');


// /* Starting the server on port 4001*/
// const port  = 4001;
// app.listen(port, () => {
//    console.log(`server is listening on port ${port}`);
// });
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const app = require('./app');
const sequelize = require("./config/db");
/* Starting the server on port 4001*/
const PORT  =  process.env.PORT || 4001;
(async () => {
 try {
   // Test database connection
   await sequelize.authenticate();
   console.log("✅ Connected to Neon PostgreSQL");


   // Create tables if they don't exist (optional during development)
   await sequelize.sync();
   console.log("✅ Database synchronized");


   app.listen(PORT, () => {
     console.log(`🚀 Server running on port ${PORT}`);
   });
 } catch (error) {
   console.error("❌ Unable to connect to the database:", error);
   process.exitCode = 1;
 }
})();
// app.listen(port, () => {
//    console.log(`server is listening on port ${port}`);
// });

