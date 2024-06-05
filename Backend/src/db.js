import { createPool } from "mysql2/promise.js";
import { DBHOST, DBUSER, DBPASSWORD, DBPORT, DBNAME } from './config.js'

export const pool = createPool({
    host:DBHOST,
    user:DBUSER,
    password:DBPASSWORD,
    port:DBPORT,
    database:DBNAME,
})
