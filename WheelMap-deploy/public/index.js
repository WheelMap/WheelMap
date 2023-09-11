var map;
 var latitude;
 var longitude;

// 위치 정보를 가져오는 비동기 함수
function getUserLocation() {
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(function(position){
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            resolve();
        }, function(error){
            reject(error);
        });
    });
}
 // 페이지가 로딩이 된 후 호출하는 함수입니다.
async function initializeMap(){
    try{
        await getUserLocation();
        // api 불러오기
        var headers = {};
        headers["appKey"] = "q1hz24YqUC7g84TRhAW3v8a52xq51B3472o9tPeF";
        // map 생성
        // Tmapv3.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
        map = new Tmapv2.Map("map", { // 지도가 생성될 div
            center : new Tmapv2.LatLng(latitude, longitude),
            width : "100%",   // 지도의 넓이
            height : "95%",   // 지도의 높이
            zoom : 16   // 지도 줌레벨
        });
        // 시작 심볼 찍기
        marker_s = new Tmapv2.Marker(
        {
            position: new Tmapv2.LatLng(latitude, longitude),
            icon: "image/MyLocationMarker.png",
            iconSize: new Tmapv2.Size(14, 14),
            map: map
        });
    } catch (error) {
        console.log("Error", error);
    }

}

async function initTmap(){
    try{
        await getUserLocation();
        initializeMap();
    }catch (error){
        console.log("Error");
    }
}
function detectLocationChange({ coords, timestamp }) {
    latitude = coords.latitude;   // 위도
    longitude = coords.longitude; // 경도
}

// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');

// const app = express();
// const port = 3000;
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const conn = {
//   host: 'localhost',
//   port: '3306',
//   user: 'root',
//   password: '990327',
//   database: 'charge'
// };

// var connection = mysql.createConnection(conn);
// connection.connect();

// //위치 정보를 기반으로 데이터 가져오기
// app.post("/", async(req, res)=> {
//     try{
//         await getUserLocation();
//         const distanceQuery = `
//         SELECT *, 6371 * acos(
//             cos(radians(${latitude})) * cos(radians(latitude)) * cos(radinas(longitude)-radians(${longitude})) +
//             sin(radians(${latitude})) * sin(radinas(latitude))
//             ) AS distance
//             FROM charge
//             ORDER BY distance
//             LIMIT 5`;

//             connection.query(distanceQuery, function(err, results, fields){
//                 if(err){
//                     console.log(err);
//                     res.status(500), json({error:"Database error"});
//                 } else {
//                     res.json({data: results});
//                 }
//             });
//     } catch(error){
//         console.log("Error", error);
//         res.status(500).json({error : "Internal server error"});
//     }
// })

// // 클라이언트의 GET 요청을 처리하는 라우터
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// // 정적 파일 서빙
// app.use(express.static(__dirname));

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
