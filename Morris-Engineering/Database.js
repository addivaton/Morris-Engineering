const mysql = require('mysql2/promise');

async function insertIntoDatabase(fname, lname, email, message) {
    console.log("We're in the database function now...");
    let conn;
    try {
    conn = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '123456789',
        database: 'contact'
    });
        console.log("Connected to server!");

        const sql = `INSERT INTO contact (fname, lname, email, message) VALUES(?, ?, ?, ?)`;
        await conn.execute(sql, [fname, lname, email, message]);
        console.log("Successfully added record to database.");
    }
    catch (err) {
        console.error("SQL error: ", err.message);
        throw new Error("Database insertion failed.");
    }
    finally {
        if (conn) await conn.end();
    }

}

module.exports = { insertIntoDatabase };