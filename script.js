// PWA 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
      .then(function(registration) {
        console.log('SW registered: ', registration);
      })
      .catch(function(registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// PWA 설치 프롬프트
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // 설치 버튼 표시 (선택사항)
  // showInstallButton();
});

// 설치 함수
function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
}

// 로그인 버튼 클릭 이벤트
document.querySelector('.login-btn').addEventListener('click', function() {
    alert('로그인 기능은 준비중입니다.');
});

// 스크롤시 헤더 스타일 변경
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// =========================
// 히어로 캐러셀 기능 구현
// =========================

// 슬라이드 요소들을 모두 가져와요
const slides = document.querySelectorAll('.carousel-slide');
// 왼쪽, 오른쪽 화살표 버튼을 가져와요
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

let currentSlide = 0; // 현재 보여지는 슬라이드 번호
let slideInterval = null; // 자동 슬라이드 타이머

// 슬라이드를 보여주는 함수
function showSlide(idx) {
    // 모든 슬라이드에서 active 클래스 제거
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    // 선택한 슬라이드에 active 클래스 추가
    slides[idx].classList.add('active');
    currentSlide = idx;
}

// 다음 슬라이드로 이동하는 함수
function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

// 이전 슬라이드로 이동하는 함수
function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// 자동 슬라이드 시작 함수
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000); // 4초마다 다음 슬라이드로 이동
}

// 자동 슬라이드 멈추기 함수
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// 화살표 버튼에 클릭 이벤트 추가
leftArrow.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});
rightArrow.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

// 캐러셀에 마우스를 올리면 자동 슬라이드 멈춤, 내리면 다시 시작
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// 페이지가 열리면 첫 슬라이드 보여주고 자동 슬라이드 시작
showSlide(0);
startAutoSlide(); 

// =========================
// 제품 더보기 버튼 기능 구현
// =========================
// 모든 더보기 버튼을 찾아요
const moreBtns = document.querySelectorAll('.more-btn');

moreBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        // 버튼이 속한 카드에서 short, full 설명을 찾아요
        const card = btn.closest('.product-card');
        const shortDesc = card.querySelector('.product-desc.short');
        const fullDesc = card.querySelector('.product-desc.full');
        // short가 보이면 full을 보여주고, 버튼 텍스트를 '닫기'로
        if (shortDesc.style.display !== 'none') {
            shortDesc.style.display = 'none';
            fullDesc.style.display = 'block';
            btn.textContent = '닫기';
        } else {
            shortDesc.style.display = '';
            fullDesc.style.display = 'none';
            btn.textContent = '더보기';
        }
    });
}); 

// =========================
// 브랜드 히스토리 더보기/닫기 버튼 기능 구현
// =========================
const brandMoreBtn = document.querySelector('.brand-more-btn');
const brandCloseBtn = document.querySelector('.brand-close-btn');
const brandShort = document.querySelector('.brand-history-desc.short');
const brandFull = document.querySelector('.brand-history-desc.full');

if (brandMoreBtn && brandCloseBtn && brandShort && brandFull) {
    brandMoreBtn.addEventListener('click', function() {
        brandShort.style.display = 'none';
        brandFull.style.display = 'block';
        brandMoreBtn.style.display = 'none';
        brandCloseBtn.style.display = 'inline-block';
    });
    brandCloseBtn.addEventListener('click', function() {
        brandShort.style.display = '';
        brandFull.style.display = 'none';
        brandMoreBtn.style.display = 'inline-block';
        brandCloseBtn.style.display = 'none';
    });
} 