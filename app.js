const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'wm'
});

app.post('/search',function(request, response){   
  var body = request.body;
  
  console.log('body : ' + body);
   //input으로 받은 menu 값 출력 확인
});


db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    throw err;
  }
  console.log('MySQL 데이터베이스에 연결되었습니다.');

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
      return;
    }
    console.log('user_info 테이블이 생성되었습니다.');

    const userInfo = {
      name: '카카오톡에서 받은 이름',
      email: '카카오톡에서 받은 이메일',
      profile_picture_url: '프로필 사진 링크 URL'
    };
    app.get('/search/:name',function(request, response){   
      //var body = request.body;
  
      
      console.log(request.params.name);
       //input으로 받은 menu 값 출력 확인
   });
    db.query('INSERT INTO user_info SET ?', userInfo, (err, result) => {
      if (err) {
        console.error('데이터 저장 중 오류 발생:', err);
        db.end(); // 에러 발생 시 연결 종료
        return;
      }
      console.log('데이터가 성공적으로 저장되었습니다.');

      db.end((err) => {
        if (err) {
          console.error('MySQL 연결 종료 오류:', err);
        }
        console.log('MySQL 데이터베이스 연결이 종료되었습니다.');
      });
    });
  });
});
