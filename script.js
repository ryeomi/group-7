/* ===== 공연메이트 showmate - script.js =====
   기능: 공연 목록 / 검색 / 장르 필터 / 상세 모달 / 찜(localStorage) / 메이트 모집 */

/* ---------- 데이터 ---------- */
const GENRES = ['전체', '뮤지컬', '콘서트', '연극', '클래식', '전시'];

const PERFORMANCES = [
  { id: 1,  title: '뮤지컬 〈레미제라블〉', genre: '뮤지컬', region: '서울', venue: '블루스퀘어 신한카드홀', date: '2026.07.10 ~ 09.27', price: 'VIP 190,000원 / R 150,000원', emoji: '🎭', colors: ['#312e81', '#7c3aed'], desc: '빅토르 위고의 대작을 무대로 옮긴 세계 4대 뮤지컬. 장발장의 구원과 혁명의 시대를 웅장한 넘버로 그려냅니다.' },
  { id: 2,  title: '뮤지컬 〈위키드〉', genre: '뮤지컬', region: '부산', venue: '드림씨어터', date: '2026.08.01 ~ 10.11', price: 'VIP 170,000원 / R 140,000원', emoji: '🧙', colors: ['#065f46', '#10b981'], desc: '오즈의 마법사, 그 이전의 이야기. 초록 마녀 엘파바와 글린다의 우정을 그린 브로드웨이 히트작.' },
  { id: 3,  title: '아이유 콘서트 〈HEREH〉', genre: '콘서트', region: '서울', venue: '올림픽공원 KSPO돔', date: '2026.09.18 ~ 09.20', price: '전석 154,000원', emoji: '🎤', colors: ['#9d174d', '#f472b6'], desc: '아이유 월드투어 서울 앙코르. 3일간 KSPO돔에서 펼쳐지는 감성 보컬의 정점.' },
  { id: 4,  title: '성시경 콘서트 〈축가〉', genre: '콘서트', region: '대구', venue: '엑스코 동관', date: '2026.08.15 ~ 08.16', price: 'R 143,000원 / S 121,000원', emoji: '🎙️', colors: ['#1e3a8a', '#38bdf8'], desc: '발라드의 왕자 성시경의 대구 단독 콘서트. 여름밤을 채우는 명곡 라이브.' },
  { id: 5,  title: '연극 〈햄릿〉', genre: '연극', region: '서울', venue: '국립극장 해오름극장', date: '2026.07.05 ~ 08.30', price: 'R 90,000원 / S 60,000원', emoji: '💀', colors: ['#111827', '#6b7280'], desc: '셰익스피어 4대 비극의 정수. 국립극단 시즌 레퍼토리로 돌아온 정통 햄릿.' },
  { id: 6,  title: '연극 〈옥탑방 고양이〉', genre: '연극', region: '서울', venue: '대학로 틴틴홀', date: '상시 공연', price: '전석 40,000원', emoji: '🐱', colors: ['#b45309', '#fbbf24'], desc: '대학로 스테디셀러 로맨틱 코미디. 20년 넘게 사랑받은 청춘 동거 로맨스.' },
  { id: 7,  title: '조성진 피아노 리사이틀', genre: '클래식', region: '서울', venue: '예술의전당 콘서트홀', date: '2026.10.24', price: 'R 150,000원 / S 100,000원', emoji: '🎹', colors: ['#0f172a', '#818cf8'], desc: '쇼팽 콩쿠르 우승자 조성진의 가을 리사이틀. 라벨과 쇼팽으로 구성된 프로그램.' },
  { id: 8,  title: '빈 필하모닉 내한공연', genre: '클래식', region: '서울', venue: '롯데콘서트홀', date: '2026.11.03 ~ 11.04', price: 'R 450,000원 / S 320,000원', emoji: '🎻', colors: ['#7f1d1d', '#f59e0b'], desc: '세계 최정상 오케스트라 빈 필하모닉의 정기 내한. 브람스 교향곡 사이클.' },
  { id: 9,  title: '반 고흐 인사이드', genre: '전시', region: '서울', venue: 'DDP 뮤지엄', date: '2026.07.01 ~ 10.31', price: '성인 25,000원', emoji: '🌻', colors: ['#92400e', '#fde047'], desc: '반 고흐의 명작을 미디어아트로 재해석한 몰입형 전시. 별이 빛나는 밤 속을 걷는 경험.' },
  { id: 10, title: '모네: 빛의 정원', genre: '전시', region: '경기', venue: '수원컨벤션센터', date: '2026.08.10 ~ 11.15', price: '성인 22,000원', emoji: '🪷', colors: ['#14532d', '#86efac'], desc: '인상주의 거장 모네의 수련 연작 중심 대형 미디어 전시. 지베르니 정원 포토존.' },
  { id: 11, title: '뮤지컬 〈시카고〉', genre: '뮤지컬', region: '인천', venue: '인천 아트센터', date: '2026.09.05 ~ 09.28', price: 'VIP 160,000원 / R 130,000원', emoji: '💃', colors: ['#18181b', '#ef4444'], desc: '브로드웨이 최장수 리바이벌 뮤지컬. 재즈 시대 시카고의 치명적 매력.' },
  { id: 12, title: '2026 펜타포트 락 페스티벌', genre: '콘서트', region: '인천', venue: '송도달빛축제공원', date: '2026.08.07 ~ 08.09', price: '3일권 330,000원', emoji: '🤘', colors: ['#4c1d95', '#fb7185'], desc: '대한민국 대표 록 페스티벌. 국내외 라인업과 함께하는 여름의 하이라이트 3일.' },
];

const MATES = [
  { id: 1, name: '뮤덕이', avatar: '🐰', dept: '경영학과 22학번', showId: 1, msg: '레미제라블 3번째 관람이에요! 커튼콜까지 함께할 분 구해요 🙌', tags: ['#뮤지컬덕후', '#커튼콜필수', '#관극후수다'] },
  { id: 2, name: '준서', avatar: '🐻', dept: '컴퓨터공학과 21학번', showId: 3, msg: '아이유 콘서트 첫날 티켓 있어요. 같이 응원봉 흔들 메이트 찾아요!', tags: ['#유애나', '#첫콘', '#떼창환영'] },
  { id: 3, name: '클래식소녀', avatar: '🐱', dept: '피아노과 23학번', showId: 7, msg: '조성진 리사이틀 혼자 가기 아쉬워요. 공연 후 감상 나눌 분!', tags: ['#클래식입문환영', '#조용히관람', '#카페수다'] },
  { id: 4, name: '연뮤랑', avatar: '🦊', dept: '국문과 20학번', showId: 6, msg: '옥탑방 고양이 N차 관람러입니다. 대학로 맛집도 같이 가요 🍜', tags: ['#대학로', '#맛집투어', '#N차관람'] },
  { id: 5, name: '락페처돌이', avatar: '🐯', dept: '전자공학과 19학번', showId: 12, msg: '펜타포트 3일권 질렀습니다!! 텐트 존 같이 뛸 사람 🤘', tags: ['#락페', '#3일완주', '#슬램존'] },
  { id: 6, name: '그림조아', avatar: '🐹', dept: '시각디자인과 24학번', showId: 9, msg: '반 고흐전 평일 오후에 여유롭게 보실 분~ 사진 잘 찍어드려요 📸', tags: ['#전시메이트', '#인생샷', '#평일관람'] },
];

/* ---------- 상태 ---------- */
const LS_KEY = 'showmate_favs';
let state = {
  keyword: '',
  genre: '전체',
  onlyFavs: false,
  favs: JSON.parse(localStorage.getItem(LS_KEY) || '[]'),
};

const $ = (sel) => document.querySelector(sel);

/* ---------- 찜 ---------- */
function isFav(id) {
  return state.favs.includes(id);
}

function toggleFav(id) {
  const show = PERFORMANCES.find((p) => p.id === id);
  if (isFav(id)) {
    state.favs = state.favs.filter((x) => x !== id);
    showToast(`'${show.title}' 찜을 해제했어요`);
  } else {
    state.favs.push(id);
    showToast(`'${show.title}' 찜 목록에 저장했어요 ❤️`);
  }
  localStorage.setItem(LS_KEY, JSON.stringify(state.favs));
  renderCards();
  renderFavCount();
}

function renderFavCount() {
  $('#fav-count').textContent = state.favs.length;
  const btn = $('#fav-toggle');
  btn.innerHTML = `${state.onlyFavs ? '❤️' : '🤍'} 찜 목록 <span id="fav-count">${state.favs.length}</span>`;
  btn.classList.toggle('active', state.onlyFavs);
}

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2200);
}

/* ---------- 장르 칩 ---------- */
function renderChips() {
  $('#genre-chips').innerHTML = GENRES.map(
    (g) => `<button class="chip ${state.genre === g ? 'active' : ''}" data-genre="${g}">${g}</button>`
  ).join('');
}

/* ---------- 공연 카드 ---------- */
function getFiltered() {
  const kw = state.keyword.trim().toLowerCase();
  return PERFORMANCES.filter((p) => {
    if (state.onlyFavs && !isFav(p.id)) return false;
    if (state.genre !== '전체' && p.genre !== state.genre) return false;
    if (kw && !p.title.toLowerCase().includes(kw) && !p.venue.toLowerCase().includes(kw)) return false;
    return true;
  });
}

function renderCards() {
  const list = getFiltered();
  $('#empty-msg').classList.toggle('hidden', list.length > 0);
  $('#card-grid').innerHTML = list
    .map(
      (p) => `
      <article class="card" data-id="${p.id}">
        <div class="poster" style="background: linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})">${p.emoji}</div>
        <button class="heart-btn ${isFav(p.id) ? 'liked' : ''}" data-fav="${p.id}" aria-label="찜하기">
          ${isFav(p.id) ? '❤️' : '🤍'}
        </button>
        <div class="card-body">
          <div class="card-tags">
            <span class="tag-genre">${p.genre}</span>
            <span class="tag-region">📍 ${p.region}</span>
          </div>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-meta">${p.venue}<br>🗓️ ${p.date}</p>
        </div>
      </article>`
    )
    .join('');
}

/* ---------- 상세 모달 ---------- */
function openModal(id) {
  const p = PERFORMANCES.find((x) => x.id === Number(id));
  if (!p) return;
  $('#modal-body').innerHTML = `
    <div class="modal-poster" style="background: linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})">${p.emoji}</div>
    <div class="modal-content">
      <span class="tag-genre">${p.genre}</span>
      <h2 class="modal-title">${p.title}</h2>
      <div class="modal-row"><span class="label">🗓️ 일시</span><span>${p.date}</span></div>
      <div class="modal-row"><span class="label">📍 장소</span><span>${p.venue} (${p.region})</span></div>
      <div class="modal-row"><span class="label">💰 가격</span><span>${p.price}</span></div>
      <div class="modal-desc">${p.desc}</div>
      <div class="modal-actions">
        <button class="btn-like ${isFav(p.id) ? 'liked' : ''}" data-fav="${p.id}">
          ${isFav(p.id) ? '❤️ 찜 완료' : '🤍 찜하기'}
        </button>
        <button class="btn-book" data-book="${p.id}">예매하기</button>
      </div>
    </div>`;
  $('#modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ---------- 메이트 모집 ---------- */
function renderMates() {
  $('#mate-list').innerHTML = MATES.map((m) => {
    const show = PERFORMANCES.find((p) => p.id === m.showId);
    return `
      <article class="mate-card">
        <div class="mate-top">
          <div class="mate-avatar">${m.avatar}</div>
          <div>
            <p class="mate-name">${m.name}</p>
            <p class="mate-info">${m.dept}</p>
          </div>
        </div>
        <div class="mate-show" data-id="${show.id}">${show.emoji} ${show.title} · ${show.date}</div>
        <p class="mate-msg">${m.msg}</p>
        <div class="mate-tags">${m.tags.map((t) => `<span class="mate-tag">${t}</span>`).join('')}</div>
        <button class="mate-btn" data-mate="${m.name}">💬 말 걸어보기</button>
      </article>`;
  }).join('');
}

/* ---------- 이벤트 ---------- */
function bindEvents() {
  // 검색
  $('#search-input').addEventListener('input', (e) => {
    state.keyword = e.target.value;
    renderCards();
  });

  // 장르 칩 (이벤트 위임)
  $('#genre-chips').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-genre]');
    if (!chip) return;
    state.genre = chip.dataset.genre;
    renderChips();
    renderCards();
  });

  // 카드 클릭: 하트면 찜 토글, 아니면 상세 모달
  $('#card-grid').addEventListener('click', (e) => {
    const heart = e.target.closest('[data-fav]');
    if (heart) {
      toggleFav(Number(heart.dataset.fav));
      return;
    }
    const card = e.target.closest('.card');
    if (card) openModal(card.dataset.id);
  });

  // 찜 목록만 보기 토글
  $('#fav-toggle').addEventListener('click', () => {
    state.onlyFavs = !state.onlyFavs;
    renderFavCount();
    renderCards();
    showToast(state.onlyFavs ? '찜한 공연만 보여드릴게요 💜' : '전체 공연을 보여드릴게요');
  });

  // 모달 내부 버튼 (찜 / 예매)
  $('#modal-body').addEventListener('click', (e) => {
    const heart = e.target.closest('[data-fav]');
    if (heart) {
      const id = Number(heart.dataset.fav);
      toggleFav(id);
      openModal(id); // 모달 내용 갱신
      return;
    }
    if (e.target.closest('[data-book]')) {
      showToast('예매 페이지로 이동합니다 (데모) 🎟️');
    }
  });

  // 모달 닫기
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-overlay').addEventListener('click', (e) => {
    if (e.target === $('#modal-overlay')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 메이트 모집: 공연 클릭 → 상세, 말 걸기 → 데모 토스트
  $('#mate-list').addEventListener('click', (e) => {
    const show = e.target.closest('.mate-show');
    if (show) {
      openModal(show.dataset.id);
      return;
    }
    const btn = e.target.closest('[data-mate]');
    if (btn) showToast(`${btn.dataset.mate}님에게 메시지를 보냈어요 (데모) 💌`);
  });
}

/* ---------- 초기화 ---------- */
renderChips();
renderCards();
renderMates();
renderFavCount();
bindEvents();
