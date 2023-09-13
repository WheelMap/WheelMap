const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
const port = 3000;

app.use(cors());

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '990327',
    database: 'charge'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
    } else {
        console.log('MySQL 데이터베이스에 연결되었습니다.');
    }
});

app.get('/sendLocation', async (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    const sql = `
    SELECT facility_name, latitude, longitude, ST_Distance_Sphere(Point(?, ?), Point(charge.longitude, charge.latitude)) AS distance
    FROM charge
    ORDER BY distance
    LIMIT 5;
    `;

    db.query(sql, [longitude, latitude], (err, results) => {
        if (err) {
            console.log('쿼리 실행 오류', err);
            res.status(500).send('서버 오류');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

