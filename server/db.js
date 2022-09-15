const Pool = require("pg").Pool;
const pool = new Pool({
    user: "hadilekhalifa",
    password: "Hadile1997",
    host: "localhost",
    port: 5432,
    database: "postgres" 
})

module.exports = pool;