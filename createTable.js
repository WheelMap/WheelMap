
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'wm'
});

function createTable() {
  db.query(`
    CREATE TABLE IF NOT EXISTS user_info (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      profile_picture_url VARCHAR(255)
    )
  `, (err, result) => {
    if (err) {
      console.error('테이블 생성 중 오류 발생:', err);
      throw err;
    }
    console.log('user_info 테이블이 생성되었습니다.');
  });
}

module.exports = createTable;
