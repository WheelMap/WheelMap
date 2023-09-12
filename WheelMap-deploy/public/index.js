const express = require('express');
const mysql = require('mysql');
const app = express();

var map;
 var latitude;
 var longitude;
 var endlatitude;
 var endlongitude;
 var locationArr=[];

 // MySQL 접속 설정
const conn = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '990327',
    database: 'charge'
  };
  
  const connection = mysql.createConnection(conn);
  connection.connect();
  
  const port = 3000;
  

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
        await getUserLocation();
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

async function calculateDistance(endLatitude, endlongitude){
    return new Promise (function (resolve, reject){
     var headers = {};
     headers["appKey"] = "q1hz24YqUC7g84TRhAW3v8a52xq51B3472o9tPeF";

     $.ajax({
         method: "POST",
         headers: headers,
         url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
         async: false,
         data: {
             "startX": longitude.toString(),
             "startY": latitude.toString(),
             "endX": endLatitude.toString(),
             "endY": endlongitude.toString(),
             "reqCoordType": "WGS84GEO",
             "resCoordType": "EPSG3857",
             "startName": "출발지",
             "endName": "도착지"
           },
           success: function(response) {
             var resultData = response.features;
             var tDistance = (resultData[0].properties.totalTime/60).toFixed(0);
             return tDistance;
           }
        });
    });
}

app.get('/search', (req, res) => {
    try{
        const distanceQuery = " SELECT id, facility_name, latitude, longitude from charge";

    connection.query(distanceQuery, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Database error" });
        }
        
        for(var row of results){
            var endLatitude = row.latitude;
            var endlongitude = row.longitude;
        }
        var distace = await calculateDistance(endLatitude, endlongitude);

        locationArr.push(distance);
    });
}catch(error){
    console.log("Error", error);
    res.status(500).json({error: "Internal server error"});
}

console.log(locationArr);
});
    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

