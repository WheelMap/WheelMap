let menuOpen = false;

document.addEventListener("DOMContentLoaded", function () {
    const loadMoreButton = document.getElementById("load-more-button");
    const divContainer = document.querySelector(".scroll");
    const initialDivs = divContainer.querySelectorAll(".hidden");
    let buttonClicked = false;

    // 더보기 버튼 클릭 시, 숨겨진 div를 보이도록 토글하고 스크롤을 활성화합니다.
    loadMoreButton.addEventListener("click", function () {
        if (!buttonClicked) {
            initialDivs.forEach(function (div) {
                div.style.display = "block";
                div.style.display = "flex"
                div.style.height = "55px";
                div.style.fontSize = "1.2rem";
                div.style.alignItems = "center";
                div.classList.remove("hidden");
            });

            // 스크롤을 활성화하고 컨테이너의 높이를 조절
            divContainer.style.overflow = "auto";
            divContainer.style.height = "auto";

            // "더보기" 버튼에 "clicked" 클래스 추가
            loadMoreButton.classList.add("clicked");

            buttonClicked = true;
        }
    });
});

function toggleMenu() {
    const menubox1 = document.getElementById('menubox1');
    const menubox2 = document.getElementById('menubox2');

    if (menuOpen) {
        menubox1.style.left = '-100%';
        menubox2.style.right = '-100%';
        menuOpen = false;
    } else {
        menubox1.style.left = '0';
        menubox2.style.right = '0';
        menuOpen = true;
    }
}

function toggleMenuIcon(element) {
    const navToggle = element;
    const icon = navToggle.querySelector('i')
    if (menuOpen) icon.classList.add('bx-x');
    else icon.classList.remove('bx-x');
}
