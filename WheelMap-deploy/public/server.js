const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL 서버 연결 정보
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'wm',
};

// MySQL 데이터베이스 연결
const conn = mysql.createConnection(dbConfig);
conn.connect((err) => {
    if (err) {
        console.error('MySQL 서버 연결 실패: ' + err.stack);
        return;
    }
    console.log('MySQL 서버에 연결되었습니다.');
});

// 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST 요청 처리
app.post('/search', (req, res) => {
    const searchQuery = req.body.searchQuery;

    // 검색어를 기반으로 데이터를 가져오는 SQL 쿼리
    const sql = `
        SELECT *
        FROM wm
        WHERE facility_name LIKE '%${searchQuery}%'
        OR sido_name LIKE '%${searchQuery}%'
        OR sigungu_name LIKE '%${searchQuery}%'
        OR road_address LIKE '%${searchQuery}%'
        OR jibun_address LIKE '%${searchQuery}%'
        OR installation_description LIKE '%${searchQuery}%'
        OR managing_organization LIKE '%${searchQuery}%'
        OR providing_agency_name LIKE '%${searchQuery}%'
    `;

    // 쿼리를 실행하고 결과
    conn.query(sql, (err, result) => {
        if (err) {
            console.error('쿼리 실행 오류: ' + err.stack);
            res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
            return;
        }

        if (result.length > 0) {
           
            res.json({ results: result });
        } else {
            res.json({ message: '검색 결과가 없습니다.' });
        }
    });
});


const port = process.env.PORT || 3007;
app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
