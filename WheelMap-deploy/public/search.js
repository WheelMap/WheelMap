document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 동작 방지 (페이지 새로고침)

    const searchQuery = document.getElementById('search-query').value;

    
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
    })
    .then(response => response.json())
    .then(data => {
        
        console.log(data);  //임시로 콘솔에 추가
    })
    .catch(error => {
        console.error('오류 발생: ', error);
    });
});
