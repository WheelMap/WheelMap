const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5500; // 포트 번호를 필요에 따라 수정
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'wm'
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    throw err;
  }
  console.log('MySQL 데이터베이스에 연결되었습니다.');
});

// user_info 테이블 생성
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
    db.end(); // 에러 발생 시 연결 종료
    throw err;
  }
  console.log('user_info 테이블이 생성되었습니다.');
});

// Express 미들웨어 및 설정 코드...

// 검색 경로 설정
app.get('/search', (req, res) => {
  const searchQuery = req.query.name; // 'name' 파라미터에서 검색어 읽기

  // 데이터베이스에서 검색
  db.query('SELECT * FROM wm WHERE name LIKE ?', [`%${searchQuery}%`], (err, results) => {
    if (err) {
      console.error('데이터베이스에서 검색 중 오류 발생:', err);
      res.status(500).json({ error: '검색 중 오류 발생' });
      return;
    } 

    // 검색 결과를 클라이언트에 응답으로 반환
    res.json({ results });
  });
});

// 다른 라우트 및 설정 코드...

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
