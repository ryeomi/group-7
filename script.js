/* ===== 공연메이트 showmate — 통합 + 확장(v2) =====
   원본: 공연 목록 / 검색 / 장르 필터 / 상세 모달 / 찜(localStorage) / 동행 게시판
   추가: 포스터풍 배경 / 티켓인증 뱃지 / 매너온도 평가 / 작성폼 스크롤 /
        마이페이지(캘린더·찜·내 글·예정 동행) / 예매 페이지 */

/* ---------- 데이터 ---------- */
const GENRES = ['전체', '뮤지컬', '콘서트', '연극', '클래식', '전시'];
const REGIONS = ['전체', '서울', '경기', '부산', '인천', '대구'];
const SCHEDULES = ['전체', '이번 달', '주말', '상시 공연'];
const SORTS = ['기본순', '동행 인기순', '가격 낮은순'];
const THIS_MONTH = 7; // 데모 기준: 2026년 7월
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

const REVIEWS = {
  _default: [
    { av:'🦊', who:'연뮤랑', stars:'★★★★★', txt:'몰입감이 정말 좋았어요. 다음에 또 보고 싶은 무대!' },
    { av:'🐹', who:'그림조아', stars:'★★★★☆', txt:'구성이 알차서 시간 가는 줄 몰랐습니다.' },
    { av:'🐱', who:'클래식소녀', stars:'★★★★★', txt:'같이 본 메이트랑 끝나고 얘기 나누니 감상이 더 깊어졌어요.' },
  ],
};

/* 동행 모집글 (showId로 공연과 연결) — verified: 티켓 인증 여부 */
let MATEPOSTS = [
  { id:1, showId:1, status:'open', verified:true, title:'레미제라블 커튼콜까지 함께할 분 구해요 🙌', nick:'뮤덕이', av:'🐰', temp:68.5,
    tags:['#뮤지컬덕후','#커튼콜필수','#관람후토론'], cur:1, max:2, when:'7월 19일 (토) 오후 2:00', age:'20대', sex:'성별무관', style:'관람 후 작품 토론',
    body:'레미제라블 3번째 관람이에요!\n커튼콜까지 남아서 여운 함께 나눌 분 찾아요. 끝나고 근처에서 감상 수다도 좋아요 :)',
    interests:['#뮤지컬','#넘버분석','#커튼콜'], intro:'좋은 무대를 함께 나눌 때 감동이 두 배가 된다고 믿어요.' },
  { id:2, showId:3, status:'open', verified:true, title:'아이유 첫콘 같이 응원봉 흔들 메이트!', nick:'준서', av:'🐻', temp:74.1,
    tags:['#유애나','#첫콘','#떼창환영'], cur:1, max:2, when:'9월 18일 (금) 오후 7:00', age:'연령무관', sex:'성별무관', style:'사진 촬영 위주',
    body:'아이유 콘서트 첫날 티켓 있어요!\n같이 응원봉 흔들고 떼창할 메이트 구합니다. 공연 전 저녁도 같이 먹어요 🍽️',
    interests:['#아이유','#콘서트','#응원봉'], intro:'같이 목청껏 떼창할 사람이면 무조건 환영이에요!' },
  { id:3, showId:7, status:'open', verified:false, title:'조성진 리사이틀 후 감상 나눌 분 (커피 쏩니다)', nick:'클래식소녀', av:'🐱', temp:64.0,
    tags:['#클래식입문환영','#관람후토론','#조용한관람'], cur:1, max:2, when:'10월 24일 (토) 오후 5:00', age:'20대', sex:'동성만', style:'관람 후 작품 토론',
    body:'조성진 리사이틀 혼자 가기 아쉬워요.\n클래식 입문이셔도 괜찮아요. 공연 후 커피 마시며 감상 나눠요 ☕',
    interests:['#클래식','#피아노','#쇼팽'], intro:'선율이 남긴 여운을 함께 곱씹는 시간을 좋아합니다.' },
  { id:4, showId:6, status:'open', verified:false, title:'옥탑방 고양이 N차 + 대학로 맛집 투어 🍜', nick:'연뮤랑', av:'🦊', temp:59.3,
    tags:['#대학로','#맛집투어','#당일관람'], cur:1, max:3, when:'7월 12일 (토) 오후 3:00', age:'연령무관', sex:'성별무관', style:'조용히 감상만',
    body:'옥탑방 고양이 N차 관람러입니다.\n관람 끝나고 대학로 맛집도 같이 도실 분! 소소하게 수다 떨어요.',
    interests:['#연극','#대학로','#맛집'], intro:'대학로 구석구석 맛집은 저한테 맡기세요 😎' },
  { id:5, showId:12, status:'open', verified:true, title:'펜타포트 3일권 텐트존 같이 뛸 사람 🤘', nick:'락페처돌이', av:'🐯', temp:81.7,
    tags:['#락페','#주말','#3일완주'], cur:2, max:4, when:'8월 7일 (금) ~ 8월 9일', age:'20대', sex:'성별무관', style:'사진 촬영 위주',
    body:'펜타포트 3일권 질렀습니다!!\n텐트존에서 같이 슬램 뛸 메이트 구해요. 체력 자신 있는 분 환영 🔥',
    interests:['#록페스티벌','#슬램','#캠핑'], intro:'무대 앞에서 끝까지 뛰는 게 인생 낙입니다.' },
  { id:6, showId:9, status:'open', verified:false, title:'반 고흐전 평일 오후 · 사진 찍으며 도실 분!', nick:'그림조아', av:'🐹', temp:71.2,
    tags:['#인생샷','#평일관람','#몰입전시'], cur:1, max:3, when:'7월 15일 (수) 오후 4:00', age:'연령무관', sex:'성별무관', style:'사진 촬영 위주',
    body:'반 고흐전 평일 오후에 여유롭게 보실 분~\n몰입 공간에서 서로 사진 잘 찍어드려요 📸 사람 적을 때 여유롭게 돌아요.',
    interests:['#전시사진','#미디어아트','#필름카메라'], intro:'빛과 공간을 프레임에 담는 걸 좋아해요.' },
  { id:7, showId:9, status:'closed', verified:false, title:'[마감] 반 고흐전 주말 관람 감사했어요!', nick:'그림조아', av:'🐹', temp:71.2,
    tags:['#주말','#조용한관람'], cur:2, max:2, when:'7월 6일 (일) 오전 11:00', age:'20대', sex:'성별무관', style:'조용히 감상만',
    body:'주말 오전에 함께 관람했습니다. 좋은 동행 감사했어요!',
    interests:['#전시','#현대미술'], intro:'조용한 오전 미술관의 분위기를 사랑합니다.' },
  /* 내가 쓴 글 (마이페이지 데모용) */
  { id:8, showId:5, status:'open', verified:true, title:'햄릿 정통 연출 같이 보고 해석 나눌 분!', nick:'나', av:'🙋', temp:42.0,
    tags:['#조용히감상만','#20대'], cur:1, max:2, when:'7월 25일 (토) 오후 3:00', age:'20대', sex:'성별무관', style:'조용히 감상만',
    body:'국립극단 햄릿 보러 갑니다.\n관람 후 해석 같이 나눌 분이면 좋겠어요. 조용히 몰입하는 스타일이에요.',
    interests:['#연극','#셰익스피어'], intro:'막 등록한 나의 모집글이에요.' },
];

/* 공연별 "찾는 중" 인원 (매칭 온도바용) */
const SEEK = { 1:15, 3:42, 5:6, 6:11, 7:9, 9:15, 12:33 };
function seekCount(showId){
  const base = SEEK[showId] || 0;
  const open = MATEPOSTS.filter(p=>p.showId===showId && p.status==='open').length;
  return Math.max(base, open);
}

/* 티켓 인증 상태 (예매 시 갱신) / 내 매너온도 */
let userVerified = { 5:true }; // 데모: 햄릿은 예매내역 확인됨
let myTemp = 42.0;

/* 확정된 동행 일정 (마이페이지 캘린더) — 데모 1건 시드 */
let MYSCHEDULE = [
  { postId:1, showId:1, nick:'뮤덕이', av:'🐰', when:'7월 19일 (토) 오후 2:00', rated:false }
];

/* ---------- 상태 ---------- */
const LS_KEY = 'showmate_favs';
let storedFavs = localStorage.getItem(LS_KEY);
let state = {
  keyword: '', genre: '전체', region: '전체', schedule: '전체', sort: '기본순', onlyFavs: false,
  favs: storedFavs ? JSON.parse(storedFavs) : [3, 9], // 첫 방문 데모용 찜
};
if (!storedFavs) localStorage.setItem(LS_KEY, JSON.stringify(state.favs));

let mateFilter = '전체';
let modalTab = 'info';
const MATE_CHIPS = ['전체','#당일관람','#주말','#20대','#동성만','#관람후토론'];

const $ = (sel) => document.querySelector(sel);

/* ---------- 공통 헬퍼 ---------- */
function tclassOf(t){ return t>=70 ? 't-hot' : t>=55 ? 't-warm' : 't-cool'; }
function parseWhen(w){ const m=w.match(/(\d+)월\s*(\d+)일/); return m ? {mo:+m[1], d:+m[2]} : {mo:0, d:0}; }
function verifiedBadge(on, lg){ return on ? `<span class="verified ${lg?'lg':''}">✅ 티켓인증</span>` : ''; }

/* 포스터풍 배경 (실제 저작권 포스터 대신 공연 색감 기반 디자인) */
function posterBg(p){
  return `radial-gradient(circle at 80% 12%, rgba(255,255,255,.28), transparent 42%),`
       + `radial-gradient(circle at 12% 90%, rgba(255,255,255,.14), transparent 40%),`
       + `linear-gradient(150deg, ${p.colors[0]}, ${p.colors[1]})`;
}
function posterHTML(p, opts){
  opts = opts || {};
  const seek = opts.seek ? seekCount(p.id) : 0;
  return `
    <span class="poster-emoji ${opts.big?'big':''}">${p.emoji}</span>
    ${opts.big ? '' : verifiedInPoster(p)}
    ${opts.big ? `<div class="poster-scrim">
      <span class="poster-kicker">${p.genre} · ${p.region}</span>
      <span class="poster-name lg">${p.title}</span>
    </div>` : ''}
    ${seek ? `<span class="seek-badge">🔥 ${seek}명이 동행 찾는 중</span>` : ''}`;
}
function verifiedInPoster(p){
  // 이 공연에 티켓 인증 모집글이 하나라도 있으면 포스터에 인증 표시
  const has = MATEPOSTS.some(m=>m.showId===p.id && m.verified);
  return has ? `<span class="verified poster-verified">✅ 인증</span>` : '';
}

/* ================= 찜 ================= */
function isFav(id){ return state.favs.includes(id); }
function toggleFav(id){
  const show = PERFORMANCES.find((p) => p.id === id);
  if (isFav(id)) { state.favs = state.favs.filter((x)=>x!==id); showToast(`'${show.title}' 찜을 해제했어요`); }
  else { state.favs.push(id); showToast(`'${show.title}' 찜 목록에 저장했어요 ❤️`); }
  localStorage.setItem(LS_KEY, JSON.stringify(state.favs));
  renderCards(); renderFavCount();
  if (!$('#mypage-overlay').classList.contains('hidden')) renderMyPage();
}
function renderFavCount(){
  const btn = $('#fav-toggle');
  btn.innerHTML = `${state.onlyFavs ? '❤️' : '🤍'} 찜 목록 <span id="fav-count">${state.favs.length}</span>`;
  btn.classList.toggle('active', state.onlyFavs);
}

/* ================= Toast ================= */
let toastTimer = null;
function showToast(msg){
  const toast = $('#toast');
  toast.textContent = msg; toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.add('hidden'), 2200);
}

/* ================= 장르 칩 ================= */
function renderChips(){
  $('#genre-chips').innerHTML = GENRES.map(
    (g)=>`<button class="chip ${state.genre===g?'active':''}" data-genre="${g}">${g}</button>`
  ).join('');
}

/* ================= 상세 필터 칩 (지역 / 일정 / 정렬) ================= */
function renderFilterChips(){
  $('#region-chips').innerHTML = REGIONS.map(
    (r)=>`<button class="chip ${state.region===r?'active':''}" data-region="${r}">${r}</button>`
  ).join('');
  $('#schedule-chips').innerHTML = SCHEDULES.map(
    (s)=>`<button class="chip ${state.schedule===s?'active':''}" data-schedule="${s}">${s}</button>`
  ).join('');
  $('#sort-chips').innerHTML = SORTS.map(
    (s)=>`<button class="chip ${state.sort===s?'active':''}" data-sort="${s}">${s}</button>`
  ).join('');
}

/* ---------- 필터/정렬 헬퍼 ---------- */
function priceMin(p){
  const nums = [...p.price.matchAll(/([\d,]+)\s*원/g)].map(m=>+m[1].replace(/,/g,'')).filter(n=>n>0);
  return nums.length ? Math.min(...nums) : Infinity;
}

function firstShowDate(p){
  const m = p.date.match(/(\d{4})\.(\d{2})\.(\d{2})/);
  return m ? new Date(+m[1], +m[2]-1, +m[3]) : null;
}

function isWeekendShow(p){
  const d = firstShowDate(p);
  return d ? (d.getDay()===0 || d.getDay()===6) : false;
}

function matchesSchedule(p){
  const s = state.schedule;
  if (s==='전체') return true;
  if (s==='상시 공연') return p.date.includes('상시');
  if (s==='주말') return isWeekendShow(p);
  if (s==='이번 달'){
    if (p.date.includes('상시')) return true;
    const start = p.date.match(/(\d{4})\.(\d{2})\.(\d{2})/);
    if (!start) return false;
    const startMo = +start[2];
    let endMo = startMo;
    const range = p.date.split('~')[1];
    if (range){
      const em = range.match(/(\d{2})\.(\d{2})/);
      if (em) endMo = +em[1];
    }
    return startMo <= THIS_MONTH && THIS_MONTH <= endMo;
  }
  return true;
}

/* ================= 공연 카드 ================= */
function getFiltered(){
  const kw = state.keyword.trim().toLowerCase();
  let list = PERFORMANCES.filter((p)=>{
    if (state.onlyFavs && !isFav(p.id)) return false;
    if (state.genre !== '전체' && p.genre !== state.genre) return false;
    if (state.region !== '전체' && p.region !== state.region) return false;
    if (!matchesSchedule(p)) return false;
    if (kw && !p.title.toLowerCase().includes(kw) && !p.venue.toLowerCase().includes(kw)) return false;
    return true;
  });
  if (state.sort === '동행 인기순') list = list.slice().sort((a,b)=>seekCount(b.id)-seekCount(a.id) || a.id-b.id);
  else if (state.sort === '가격 낮은순') list = list.slice().sort((a,b)=>priceMin(a)-priceMin(b) || a.id-b.id);
  else list = list.slice().sort((a,b)=>a.id-b.id);
  return list;
}

function renderCards(){
  const list = getFiltered();
  $('#empty-msg').classList.toggle('hidden', list.length>0);
  const rc = $('#result-count');
  if (rc) rc.textContent = `${list.length}개`;
  $('#card-grid').innerHTML = list.map((p)=>`
      <article class="card" data-id="${p.id}">
        <div class="poster" style="background:${posterBg(p)}">${posterHTML(p, {seek:true})}</div>
        <button class="heart-btn ${isFav(p.id)?'liked':''}" data-fav="${p.id}" aria-label="찜하기">${isFav(p.id)?'❤️':'🤍'}</button>
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-date">🗓️ ${p.date}</p>
          <p class="card-venue">📍 ${p.venue}</p>
          <div class="card-tags"><span class="tag-genre">${p.genre}</span><span class="tag-region">📍 ${p.region}</span></div>
        </div>
      </article>`).join('');
}

/* ================= 상세 모달 (탭: 상세 / 관람평 / 동행) ================= */
function openModal(id, tab){
  const p = PERFORMANCES.find((x)=>x.id===Number(id));
  if (!p) return;
  modalTab = tab || 'info';
  const posts = MATEPOSTS.filter(m=>m.showId===p.id && m.status==='open');
  const reviews = REVIEWS[p.id] || REVIEWS._default;

  let panel = '';
  if (modalTab === 'info') {
    panel = `
      <div class="modal-row"><span class="label">🗓️ 일시</span><span>${p.date}</span></div>
      <div class="modal-row"><span class="label">📍 장소</span><span>${p.venue} (${p.region})</span></div>
      <div class="modal-row"><span class="label">💰 가격</span><span>${p.price}</span></div>
      <div class="modal-desc">${p.desc}</div>
      <div class="modal-actions">
        <button class="btn-like ${isFav(p.id)?'liked':''}" data-fav="${p.id}">${isFav(p.id)?'❤️ 찜 완료':'🤍 찜하기'}</button>
        <button class="btn-book" data-book="${p.id}">예매하기</button>
      </div>`;
  } else if (modalTab === 'review') {
    panel = reviews.map(r=>`
      <div class="review-item"><div class="av">${r.av}</div>
        <div><p class="who">${r.who} <span class="stars">${r.stars}</span></p><p class="txt">${r.txt}</p></div>
      </div>`).join('');
  } else {
    const seek = seekCount(p.id);
    panel = `
      <div class="temp-card">
        <div class="temp-head"><span>🔥 매칭 활성도</span><span style="color:var(--pink)">${seek>=20?'HOT':seek>=8?'활발':'보통'}</span></div>
        <div class="temp-track"><div class="temp-fill" id="temp-fill"></div></div>
        <div class="temp-scale"><span>한산</span><span>보통</span><span>활발</span></div>
        <p class="temp-note">현재 ${seek}명이 이 공연의 메이트를 찾고 있어요!</p>
      </div>
      <p class="mate-sub-title">모집 중인 글 ${posts.length}개</p>
      ${posts.length ? posts.map(m=>`
        <div class="mini-post" data-post="${m.id}">
          <p class="t">${m.title} ${verifiedBadge(m.verified)}</p>
          <p class="m"><span>${m.av} ${m.nick}</span><span>🌡 ${m.temp.toFixed(1)}°</span><span>👥 ${m.cur}/${m.max}</span><span>🗓 ${m.when}</span></p>
        </div>`).join('') : `<p style="color:var(--gray);font-size:.84rem;padding:6px 0 14px">아직 모집글이 없어요. 첫 동행을 모집해보세요!</p>`}
      <button class="cta-recruit" data-recruit="${p.id}">＋ 이 공연 동행 모집하기</button>`;
  }

  $('#modal-body').innerHTML = `
    <div class="modal-poster" style="background:${posterBg(p)}">${posterHTML(p, {big:true})}</div>
    <div class="modal-content">
      <div class="modal-tabs">
        <button class="mtab ${modalTab==='info'?'active':''}" data-tab="info" data-id="${p.id}">상세 정보</button>
        <button class="mtab ${modalTab==='review'?'active':''}" data-tab="review" data-id="${p.id}">관람평</button>
        <button class="mtab ${modalTab==='mate'?'active':''}" data-tab="mate" data-id="${p.id}">동행 찾기<span class="n">N</span></button>
      </div>
      <div>${panel}</div>
    </div>`;
  $('#modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (modalTab==='mate') setTimeout(()=>{ const f=$('#temp-fill'); if(f) f.style.width = Math.min(100, seekCount(p.id)/40*100)+'%'; }, 120);
}
function closeModal(){ $('#modal-overlay').classList.add('hidden'); document.body.style.overflow=''; }

/* ================= 동행 게시판 ================= */
function renderMateChips(){
  $('#mate-filters').innerHTML = MATE_CHIPS.map(
    c=>`<button class="chip ${mateFilter===c?'active':''}" data-matechip="${c}">${c}</button>`
  ).join('');
}
function mateMatch(m){
  if (mateFilter==='전체') return true;
  if (mateFilter==='#20대') return m.age==='20대';
  if (mateFilter==='#동성만') return m.sex==='동성만';
  return m.tags.includes(mateFilter);
}
function renderMateBoard(){
  const list = MATEPOSTS.filter(mateMatch);
  $('#mate-empty').classList.toggle('hidden', list.length>0);
  $('#mate-list').innerHTML = list.map(m=>{
    const show = PERFORMANCES.find(p=>p.id===m.showId);
    return `
      <article class="mate-card" data-post="${m.id}">
        <div class="mate-status">
          <span class="badge ${m.status}">${m.status==='open'?'모집중':'모집마감'}</span>
          <span class="mate-showline">${show.emoji} ${show.title}</span>
        </div>
        <p class="mate-title">${m.title} ${verifiedBadge(m.verified)}</p>
        <div class="mate-top">
          <span class="mate-avatar">${m.av}</span>
          <div><p class="mate-name">${m.nick}</p><p class="mate-info">${m.age} · ${m.style}</p></div>
          <span class="mate-temp ${tclassOf(m.temp)}">🌡 ${m.temp.toFixed(1)}°</span>
        </div>
        <div class="mate-tags">${m.tags.map(t=>`<span class="mate-tag">${t}</span>`).join('')}</div>
        <div class="mate-foot">
          <span class="mate-people">👥 참여 <b>${m.cur}/${m.max}</b> · 🗓 ${m.when.split('~')[0].trim()}</span>
          <span class="mate-cta">자세히 ›</span>
        </div>
      </article>`;
  }).join('');
}

/* ================= 동행 플로우: 작성 ================= */
let W = { count:2, showId:null };
function openWrite(showId){
  W = { count:2, showId: showId || null };
  const opts = PERFORMANCES.map(p=>`<option value="${p.id}" ${p.id===showId?'selected':''}>${p.emoji} ${p.title}</option>`).join('');
  const verifiedNote = (sid)=> userVerified[sid]
    ? `<p style="font-size:.78rem;color:#0d9d68;font-weight:700;margin-top:8px">✅ 예매 내역이 확인되어 <b>티켓인증</b> 뱃지가 부여됩니다.</p>`
    : `<p style="font-size:.78rem;color:var(--gray);margin-top:8px">ℹ️ 예매 후 작성하면 <b>티켓인증</b> 뱃지를 받을 수 있어요.</p>`;
  $('#flow-inner').innerHTML = `
    <div class="flow-head">
      <button class="flow-back" onclick="closeFlow()">‹</button>
      <h3>동행 모집글 작성</h3>
      <button class="flow-close" onclick="closeFlow()">✕</button>
    </div>
    <div class="flow-body">
      <div class="field"><label>관람 공연 <span class="req">필수</span></label>
        <select class="select" id="w-show"><option value="">공연을 선택하세요</option>${opts}</select>
        <div id="w-verify">${showId?verifiedNote(showId):''}</div></div>
      <div class="field"><label>관람 일시 <span class="req">필수</span></label>
        <div class="two-col">
          <select class="select" id="w-date"><option value="">날짜</option><option>7월 12일 (토)</option><option>7월 19일 (토)</option><option>7월 26일 (토)</option><option>8월 2일 (토)</option></select>
          <select class="select" id="w-time"><option value="">시간</option><option>오전 11:00</option><option>오후 2:00</option><option>오후 4:00</option><option>야간 7:00</option></select>
        </div></div>
      <div class="field"><label>모집 인원 <span class="req">필수</span></label>
        <div class="stepper"><button type="button" onclick="step(-1)">−</button><span class="val" id="w-count">2</span><button type="button" onclick="step(1)">＋</button><span class="unit">명 (나 포함)</span></div></div>
      <div class="field"><label>연령대 <span class="opt">선택</span></label>
        <div class="toggle-grp" data-single="age"><button class="toggle on">20대</button><button class="toggle">30대</button><button class="toggle">연령무관</button></div></div>
      <div class="field"><label>성별 <span class="opt">선택</span></label>
        <div class="toggle-grp" data-single="sex"><button class="toggle">동성만</button><button class="toggle on">성별무관</button></div></div>
      <div class="field"><label>관람 스타일 <span class="opt">선택</span></label>
        <div class="radio-grp" data-radio="style"><div class="radio on"><span class="dot"></span>조용히 감상만</div><div class="radio"><span class="dot"></span>관람 후 작품 토론</div><div class="radio"><span class="dot"></span>사진 촬영 위주</div></div></div>
      <div class="field"><label>상세 내용 <span class="req">필수</span></label>
        <textarea id="w-body" placeholder="어떤 동행을 찾고 있는지 자유롭게 적어주세요."></textarea></div>
    </div>
    <div class="flow-foot"><button class="flow-submit" id="w-submit" disabled onclick="submitPost()">메이트 모집글 등록</button></div>`;
  if (showId) $('#w-show').value = showId;
  bindWrite(verifiedNote);
  openFlow();
}
function step(d){ W.count=Math.min(6,Math.max(2,W.count+d)); $('#w-count').textContent=W.count; }
function bindWrite(verifiedNote){
  $('#flow-inner').querySelectorAll('[data-single]').forEach(grp=>{
    grp.addEventListener('click',e=>{ const b=e.target.closest('.toggle'); if(!b)return;
      grp.querySelectorAll('.toggle').forEach(x=>x.classList.remove('on')); b.classList.add('on'); });
  });
  const rg = $('#flow-inner').querySelector('[data-radio]');
  rg.addEventListener('click',e=>{ const r=e.target.closest('.radio'); if(!r)return;
    rg.querySelectorAll('.radio').forEach(x=>x.classList.remove('on')); r.classList.add('on'); });
  const val=()=>{ $('#w-submit').disabled = !($('#w-show').value && $('#w-date').value && $('#w-time').value && $('#w-body').value.trim()); };
  ['#w-show','#w-date','#w-time','#w-body'].forEach(s=>$(s).addEventListener('input',val));
  $('#w-show').addEventListener('change',()=>{ const v=$('#w-show').value; $('#w-verify').innerHTML = v?verifiedNote(Number(v)):''; });
}
function submitPost(){
  const showId=Number($('#w-show').value);
  const age=$('#flow-inner').querySelector('[data-single="age"] .on').textContent;
  const sex=$('#flow-inner').querySelector('[data-single="sex"] .on').textContent;
  const style=$('#flow-inner').querySelector('[data-radio] .on').textContent.trim();
  const body=$('#w-body').value.trim();
  const newId = Math.max(...MATEPOSTS.map(p=>p.id))+1;
  MATEPOSTS.unshift({
    id:newId, showId, status:'open', verified: !!userVerified[showId],
    title: body.split('\n')[0].slice(0,42) || '동행 구해요',
    nick:'나', av:'🙋', temp: myTemp,
    tags:[`#${style.replace(/\s/g,'')}`, `#${age}`], cur:1, max:W.count,
    when:`${$('#w-date').value} ${$('#w-time').value}`, age, sex, style, body,
    interests:['#공연'], intro:'막 등록한 나의 모집글이에요.'
  });
  renderMateBoard(); renderCards();
  closeFlow();
  showToast('모집글을 등록했어요 🎉');
}

/* ================= 동행 플로우: 프로필 ================= */
let currentPostId = null;
function openProfile(postId){
  currentPostId = postId;
  const m = MATEPOSTS.find(x=>x.id===postId); if(!m) return;
  const show = PERFORMANCES.find(p=>p.id===m.showId);
  $('#flow-inner').innerHTML = `
    <div class="flow-head">
      <button class="flow-back" onclick="closeFlow()">‹</button>
      <h3>모집글 상세</h3>
      <button class="flow-close" onclick="closeFlow()">✕</button>
    </div>
    <div class="flow-body">
      <div class="pf-post">
        <span class="badge ${m.status}">${m.status==='open'?'모집중':'모집마감'}</span>
        <h2>${m.title}</h2>
        <div class="pf-meta">
          <span class="m">${show.emoji} ${show.title}</span>
          <span class="m">🗓 ${m.when}</span><span class="m">👥 ${m.cur}/${m.max}</span>
          <span class="m">${m.age}</span><span class="m">${m.sex}</span>
        </div>
        <p class="pf-body-txt">${m.body}</p>
      </div>
      <div class="pf-card">
        <div class="pf-headrow">
          <span class="pf-av">${m.av}</span>
          <div><p class="pf-nick">${m.nick} ${verifiedBadge(m.verified, true)}</p><p class="pf-mmeta">🌡 매너온도 ${m.temp.toFixed(1)}° · 관람 스타일: ${m.style}</p></div>
        </div>
        <p class="pf-sub">관심 키워드</p>
        <div class="kw-row">${m.interests.map(k=>`<span class="kw">${k}</span>`).join('')}</div>
        <p class="pf-sub">한줄 소개</p>
        <p class="pf-intro">“${m.intro}”</p>
      </div>
    </div>
    ${m.status==='open' ? `<div class="flow-foot"><button class="flow-submit" onclick="openSheet()">💬 1:1 채팅 보내기</button></div>` : `<div class="flow-foot"><button class="flow-submit" disabled>모집이 마감된 글이에요</button></div>`}`;
  openFlow();
}

/* 바텀시트 */
function openSheet(){ $('#sheet-dim').classList.add('show'); $('#sheet').classList.add('show'); }
function closeSheet(){ $('#sheet-dim').classList.remove('show'); $('#sheet').classList.remove('show'); }
function sendGreeting(){
  const g=$('#greet-text').value.trim()||'안녕하세요! 같이 관람해요 😊';
  closeSheet(); $('#greet-text').value='';
  openChat(currentPostId, g);
}

/* ================= 동행 플로우: 채팅 ================= */
let confirmDone=false, replyTimer=null;
function openChat(postId, firstMsg){
  const m = MATEPOSTS.find(x=>x.id===postId); if(!m) return;
  const show = PERFORMANCES.find(p=>p.id===m.showId);
  confirmDone=false;
  $('#flow-inner').innerHTML = `
    <div class="flow-head">
      <button class="flow-back" onclick="openProfile(${postId})">‹</button>
      <h3>${m.av} ${m.nick}</h3>
      <button class="confirm-btn" id="confirm-btn" onclick="confirmMate()">동행 확정하기</button>
    </div>
    <div class="chat-topchip" onclick="openModal(${m.showId},'info')">${show.emoji} ${show.title} · ${show.venue}<span class="go">›</span></div>
    <div class="chat-scroll" id="chat-scroll">
      <div class="sys">안전한 관람을 위해 서로 배려하는 대화를 나눠주세요. 무리한 개인정보 요구에 유의하시기 바랍니다.</div>
    </div>
    <div class="chat-input">
      <button class="pin-btn" onclick="dropPin()" title="만날 장소 핀 찍기">📍</button>
      <input id="chat-text" placeholder="메시지를 입력하세요" onkeydown="if(event.key==='Enter')sendMsg()"/>
      <button class="chat-send" onclick="sendMsg()">↑</button>
    </div>`;
  openFlow();
  if (firstMsg) setTimeout(()=>{ addMsg(firstMsg,'me'); replyLater(); }, 300);
}
function addMsg(text,who){
  const box = $('#chat-scroll');
  if (!box) return;
  const d = document.createElement('div');
  d.className = 'msg '+who;
  d.textContent = text;
  box.appendChild(d);
  scrollChat();
}
function scrollChat(){ const s=$('#chat-scroll'); s.scrollTop=s.scrollHeight; }
function sendMsg(){ const inp=$('#chat-text'); const v=inp.value.trim(); if(!v)return; addMsg(v,'me'); inp.value=''; replyLater(); }
function replyLater(){
  clearTimeout(replyTimer);
  replyTimer=setTimeout(()=>{
    const r=['좋아요! 그 시간 괜찮습니다 😊','네 저도 그렇게 관람하는 편이에요~','만날 장소는 공연장 로비 어떠세요?'];
    addMsg(r[Math.floor(Math.random()*r.length)],'them');
  },1100);
}
function dropPin(){
  const m = MATEPOSTS.find(x=>x.id===currentPostId);
  const show = PERFORMANCES.find(p=>p.id===m.showId);
  const d=document.createElement('div'); d.className='msg pin';
  d.innerHTML=`<div class="map">📍</div><div class="cap">${show.venue} 로비<span>공연 30분 전 · 지도 보기 ›</span></div>`;
  $('#chat-scroll').appendChild(d); scrollChat();
  showToast('만날 장소를 공유했어요 📍');
}
function confirmMate(){
  const btn=$('#confirm-btn'); if(confirmDone)return;
  btn.textContent='내가 확정함 ✓';
  const s=document.createElement('div'); s.className='sys'; s.textContent='나 님이 동행을 확정했어요. 상대의 확정을 기다리는 중…';
  $('#chat-scroll').appendChild(s); scrollChat();
  setTimeout(()=>{ addMsg('저도 좋아요, 확정할게요!','them');
    setTimeout(()=>{
      confirmDone=true; btn.textContent='동행 확정 완료'; btn.classList.add('done');
      const c=document.createElement('div'); c.className='sys confirm'; c.textContent='🎉 동행이 확정되었어요! 마이페이지 캘린더에 일정이 추가됩니다.';
      $('#chat-scroll').appendChild(c); scrollChat();
      const m=MATEPOSTS.find(x=>x.id===currentPostId);
      if(m){ m.status='closed'; m.cur=m.max;
        if(!MYSCHEDULE.some(s=>s.postId===m.id))
          MYSCHEDULE.push({ postId:m.id, showId:m.showId, nick:m.nick, av:m.av, when:m.when, rated:false });
      }
      renderMateBoard(); renderCards();
    },900);
  },1000);
}

/* ================= 매너온도 평가 ================= */
let rateState = { postId:null, tags:[] };
const MANNER_TAGS = ['시간 약속을 잘 지켜요','대화가 편했어요','매너가 좋아요','또 함께하고 싶어요','관람 스타일이 잘 맞아요'];
function openRate(postId){
  const sc = MYSCHEDULE.find(s=>s.postId===postId); if(!sc) return;
  const m = MATEPOSTS.find(x=>x.id===postId) || { nick:sc.nick, av:sc.av, temp:60 };
  rateState = { postId, tags:[] };
  $('#rate-inner').innerHTML = `
    <h3>동행 매너 평가</h3>
    <div class="who"><span class="av">${sc.av}</span><div><b>${sc.nick}</b><br><span>현재 매너온도 ${(m.temp||60).toFixed(1)}°</span></div></div>
    <div class="temp-gauge"><i style="width:${Math.min(100,(m.temp||60))}%"></i></div>
    <p style="font-size:.8rem;color:var(--gray);margin-top:10px">좋았던 점을 골라주세요. 상대의 매너온도가 올라가요.</p>
    <div class="rate-tags" id="rate-tags">${MANNER_TAGS.map((t,i)=>`<button class="rate-tag" data-i="${i}">${t}</button>`).join('')}</div>
    <div class="rate-actions">
      <button class="rate-cancel" onclick="closeRate()">취소</button>
      <button class="rate-submit" onclick="submitRate()">평가 남기기</button>
    </div>`;
  $('#rate-tags').addEventListener('click',e=>{ const b=e.target.closest('.rate-tag'); if(!b)return;
    b.classList.toggle('on'); const i=+b.dataset.i;
    rateState.tags = rateState.tags.includes(i) ? rateState.tags.filter(x=>x!==i) : [...rateState.tags, i];
  });
  $('#rate-overlay').classList.remove('hidden');
}
function closeRate(){ $('#rate-overlay').classList.add('hidden'); }
function submitRate(){
  const inc = 0.5 + rateState.tags.length * 0.4;
  const m = MATEPOSTS.find(x=>x.id===rateState.postId);
  if (m) m.temp = Math.min(99, m.temp + inc);
  const sc = MYSCHEDULE.find(s=>s.postId===rateState.postId); if (sc) sc.rated = true;
  renderMateBoard();
  closeRate();
  showToast(`매너온도를 +${inc.toFixed(1)}° 올렸어요 🌡`);
  renderMyPage();
}

/* ================= 예매 페이지 ================= */
let BK = { showId:null, qty:1, grade:0 };
function gradesOf(p){
  // price 문자열에서 등급/금액 파싱 (간단 파서)
  const parts = p.price.split('/').map(s=>s.trim());
  const out = [];
  parts.forEach(part=>{
    const mm = part.match(/([A-Za-z가-힣0-9]+)\s*([\d,]+)\s*원/);
    if (mm) out.push({ name: mm[1], price: +mm[2].replace(/,/g,'') });
  });
  return out.length ? out : [{ name:'일반', price: 50000 }];
}
function openBooking(showId){
  const p = PERFORMANCES.find(x=>x.id===Number(showId)); if(!p) return;
  BK = { showId:p.id, qty:1, grade:0 };
  renderBooking();
  $('#book-overlay').classList.remove('hidden');
  document.body.style.overflow='hidden';
}
function renderBooking(){
  const p = PERFORMANCES.find(x=>x.id===BK.showId);
  const grades = gradesOf(p);
  const g = grades[BK.grade];
  const total = g.price * BK.qty;
  $('#book-inner').innerHTML = `
    <div class="book-poster" style="background:${posterBg(p)}">${posterHTML(p,{big:true})}</div>
    <div class="flow-head" style="border-bottom:none;padding-bottom:6px">
      <h3>예매하기</h3><button class="flow-close" onclick="closeBook()">✕</button>
    </div>
    <div class="book-body">
      <div class="book-line"><span class="k">🗓 일정</span><span>${p.date}</span></div>
      <div class="book-line"><span class="k">📍 장소</span><span>${p.venue}</span></div>
      <div class="field" style="margin-top:16px"><label>좌석 등급</label>
        <select class="select" id="bk-grade" onchange="setGrade(this.value)">
          ${grades.map((x,i)=>`<option value="${i}" ${i===BK.grade?'selected':''}>${x.name} · ${x.price.toLocaleString()}원</option>`).join('')}
        </select></div>
      <div class="field"><label>매수</label>
        <div class="stepper"><button type="button" onclick="bkQty(-1)">−</button><span class="val">${BK.qty}</span><button type="button" onclick="bkQty(1)">＋</button><span class="unit">매</span></div></div>
      <div class="book-total"><span>결제 금액</span><span class="amt">${total.toLocaleString()}원</span></div>
      <p class="book-note">데모 화면입니다. 실제 결제는 이뤄지지 않아요.</p>
    </div>
    <div class="flow-foot"><button class="flow-submit" onclick="payBooking()">${total.toLocaleString()}원 결제하기</button></div>`;
}
function setGrade(i){ BK.grade=+i; renderBooking(); }
function bkQty(d){ BK.qty=Math.min(4,Math.max(1,BK.qty+d)); renderBooking(); }
function payBooking(){
  userVerified[BK.showId] = true; // 예매 완료 → 티켓 인증 가능
  closeBook();
  showToast('예매가 완료되었어요! 🎟️ 이제 이 공연에 티켓인증 뱃지를 받을 수 있어요');
  renderCards();
}
function closeBook(){ $('#book-overlay').classList.add('hidden'); document.body.style.overflow=''; }

/* ================= 마이페이지 ================= */
let mpTab = 'calendar';
let calYM = { y:2026, m:7 };
let calSel = null;

function openMyPage(){ mpTab='calendar'; calYM={y:2026,m:7}; calSel=null; renderMyPage(); $('#mypage-overlay').classList.remove('hidden'); document.body.style.overflow='hidden'; }
function closeMyPage(){ $('#mypage-overlay').classList.add('hidden'); document.body.style.overflow=''; }
function setMpTab(t){ mpTab=t; calSel=null; renderMyPage(); }

function myEvents(){
  const ev=[];
  MYSCHEDULE.forEach(s=>{ const d=parseWhen(s.when); ev.push({type:'confirm', mo:d.mo, d:d.d, ...s}); });
  MATEPOSTS.filter(p=>p.nick==='나').forEach(p=>{ const d=parseWhen(p.when); ev.push({type:'mine', mo:d.mo, d:d.d, postId:p.id, showId:p.showId, title:p.title, when:p.when}); });
  return ev;
}

function renderMyPage(){
  const myPosts = MATEPOSTS.filter(p=>p.nick==='나');
  $('#mypage-inner').innerHTML = `
    <div class="mp-head">
      <button class="mp-close" onclick="closeMyPage()">✕</button>
      <div class="mp-me">
        <span class="av">🙋</span>
        <div>
          <p class="nick">나 <span class="verified">✅ 티켓인증 ${Object.values(userVerified).filter(Boolean).length}건</span></p>
          <p class="meta">🌡 내 매너온도 ${myTemp.toFixed(1)}° · 찜 ${state.favs.length} · 확정 동행 ${MYSCHEDULE.length}</p>
        </div>
      </div>
    </div>
    <div class="mp-tabs">
      <button class="mp-tab ${mpTab==='calendar'?'active':''}" onclick="setMpTab('calendar')">📅 캘린더</button>
      <button class="mp-tab ${mpTab==='schedule'?'active':''}" onclick="setMpTab('schedule')">🤝 예정 동행</button>
      <button class="mp-tab ${mpTab==='favs'?'active':''}" onclick="setMpTab('favs')">❤️ 찜</button>
      <button class="mp-tab ${mpTab==='posts'?'active':''}" onclick="setMpTab('posts')">📝 내 글</button>
    </div>
    <div class="mp-body" id="mp-body"></div>`;
  if (mpTab==='calendar') renderCalendar();
  else if (mpTab==='schedule') renderSchedule();
  else if (mpTab==='favs') renderFavsTab();
  else renderMyPosts(myPosts);
}

function renderCalendar(){
  const ev = myEvents().filter(e=>e.mo===calYM.m);
  const dayHas = {};
  ev.forEach(e=>{ (dayHas[e.d]=dayHas[e.d]||{}); dayHas[e.d][e.type]=true; });
  const first = new Date(calYM.y, calYM.m-1, 1).getDay();
  const days = new Date(calYM.y, calYM.m, 0).getDate();
  const dows=['일','월','화','수','목','금','토'];
  let cells = dows.map(d=>`<div class="dow">${d}</div>`).join('');
  for(let i=0;i<first;i++) cells += `<div class="day muted"></div>`;
  for(let d=1; d<=days; d++){
    const has = dayHas[d];
    const dots = has ? `<span class="cal-dots">${has.confirm?'<i class="dot-confirm"></i>':''}${has.mine?'<i class="dot-mine"></i>':''}</span>` : '';
    cells += `<div class="day ${has?'has':''} ${calSel===d?'sel':''}" ${has?`onclick="selCalDay(${d})"`:''}>${d}${dots}</div>`;
  }
  let detail = '';
  if (calSel){
    const list = ev.filter(e=>e.d===calSel);
    detail = `<div class="cal-day-events"><h5>${calYM.m}월 ${calSel}일 일정</h5>${list.map(e=>{
      const show = PERFORMANCES.find(p=>p.id===e.showId);
      return e.type==='confirm'
        ? `<div class="mp-item" onclick="openModal(${e.showId},'info');closeMyPage()"><div class="thumb" style="background:${posterBg(show)}">${show.emoji}</div><div class="info"><p class="t">${e.av} ${e.nick} 님과 동행 확정</p><p class="s">${show.title} · ${e.when}</p></div><span class="mp-badge-done">확정</span></div>`
        : `<div class="mp-item" onclick="openProfile(${e.postId});closeMyPage()"><div class="thumb" style="background:${posterBg(show)}">${show.emoji}</div><div class="info"><p class="t">${e.title}</p><p class="s">${show.title} · ${e.when}</p></div><span class="mp-badge-open">내 글</span></div>`;
    }).join('')}</div>`;
  }
  $('#mp-body').innerHTML = `
    <div class="cal-wrap">
      <div class="cal-nav">
        <button onclick="calMove(-1)">‹</button>
        <h4>${calYM.y}년 ${calYM.m}월</h4>
        <button onclick="calMove(1)">›</button>
      </div>
      <div class="cal-grid">${cells}</div>
      <div class="cal-legend"><span><i class="dot-confirm"></i> 확정 동행</span><span><i class="dot-mine"></i> 내가 쓴 글</span></div>
    </div>
    ${detail}`;
}
function calMove(d){ let m=calYM.m+d, y=calYM.y; if(m<1){m=12;y--;} if(m>12){m=1;y++;} calYM={y,m}; calSel=null; renderCalendar(); }
function selCalDay(d){ calSel = (calSel===d?null:d); renderCalendar(); }

function renderSchedule(){
  if (!MYSCHEDULE.length){ $('#mp-body').innerHTML = `<p class="mp-empty">아직 확정된 동행이 없어요.<br>동행 채팅에서 ‘동행 확정하기’를 누르면 여기에 표시돼요 🤝</p>`; return; }
  $('#mp-body').innerHTML = MYSCHEDULE.map(s=>{
    const show = PERFORMANCES.find(p=>p.id===s.showId);
    return `<div class="mp-item">
      <div class="thumb" style="background:${posterBg(show)}">${show.emoji}</div>
      <div class="info" onclick="openModal(${s.showId},'info');closeMyPage()">
        <p class="t">${s.av} ${s.nick} 님과 동행</p>
        <p class="s">${show.title} · 🗓 ${s.when}</p>
      </div>
      ${s.rated ? `<span class="mp-badge-done">평가완료</span>` : `<button class="mp-rate-btn" onclick="openRate(${s.postId})">매너 평가</button>`}
    </div>`;
  }).join('');
}

function renderFavsTab(){
  const favs = PERFORMANCES.filter(p=>state.favs.includes(p.id));
  if (!favs.length){ $('#mp-body').innerHTML = `<p class="mp-empty">찜한 공연이 없어요.<br>공연 카드의 🤍 버튼을 눌러 담아보세요!</p>`; return; }
  $('#mp-body').innerHTML = favs.map(p=>`
    <div class="mp-item" onclick="openModal(${p.id},'info');closeMyPage()">
      <div class="thumb" style="background:${posterBg(p)}">${p.emoji}</div>
      <div class="info"><p class="t">${p.title}</p><p class="s">${p.venue} · 🗓 ${p.date}</p></div>
      <span class="go">보기 ›</span>
    </div>`).join('');
}

function renderMyPosts(myPosts){
  if (!myPosts.length){ $('#mp-body').innerHTML = `<p class="mp-empty">작성한 모집글이 없어요.<br>‘＋ 동행 모집하기’로 첫 글을 남겨보세요 📝</p>`; return; }
  $('#mp-body').innerHTML = myPosts.map(m=>{
    const show = PERFORMANCES.find(p=>p.id===m.showId);
    return `<div class="mp-item" onclick="openProfile(${m.id});closeMyPage()">
      <div class="thumb" style="background:${posterBg(show)}">${show.emoji}</div>
      <div class="info"><p class="t">${m.title}</p><p class="s">${show.title} · 👥 ${m.cur}/${m.max} · 🗓 ${m.when}</p></div>
      <span class="${m.status==='open'?'mp-badge-open':'mp-badge-done'}">${m.status==='open'?'모집중':'마감'}</span>
    </div>`;
  }).join('');
}

/* ================= 플로우 오버레이 공통 ================= */
function openFlow(){ $('#flow-overlay').classList.remove('hidden'); document.body.style.overflow='hidden'; }
function closeFlow(){ $('#flow-overlay').classList.add('hidden'); closeSheet(); document.body.style.overflow=''; }

/* ================= 이벤트 ================= */
function bindEvents(){
  $('#search-input').addEventListener('input',(e)=>{ state.keyword=e.target.value; renderCards(); });

  $('#genre-chips').addEventListener('click',(e)=>{ const c=e.target.closest('[data-genre]'); if(!c)return;
    state.genre=c.dataset.genre; renderChips(); renderCards(); });

  $('#region-chips').addEventListener('click',(e)=>{ const c=e.target.closest('[data-region]'); if(!c)return;
    state.region=c.dataset.region; renderFilterChips(); renderCards(); });
  $('#schedule-chips').addEventListener('click',(e)=>{ const c=e.target.closest('[data-schedule]'); if(!c)return;
    state.schedule=c.dataset.schedule; renderFilterChips(); renderCards(); });
  $('#sort-chips').addEventListener('click',(e)=>{ const c=e.target.closest('[data-sort]'); if(!c)return;
    state.sort=c.dataset.sort; renderFilterChips(); renderCards(); });

  $('#card-grid').addEventListener('click',(e)=>{
    const heart=e.target.closest('[data-fav]'); if(heart){ toggleFav(Number(heart.dataset.fav)); return; }
    const card=e.target.closest('.card'); if(card) openModal(card.dataset.id,'info');
  });

  $('#fav-toggle').addEventListener('click',()=>{ state.onlyFavs=!state.onlyFavs; renderFavCount(); renderCards();
    showToast(state.onlyFavs?'찜한 공연만 보여드릴게요 💜':'전체 공연을 보여드릴게요'); });

  $('#modal-body').addEventListener('click',(e)=>{
    const tab=e.target.closest('[data-tab]'); if(tab){ openModal(tab.dataset.id, tab.dataset.tab); return; }
    const heart=e.target.closest('[data-fav]'); if(heart){ const id=Number(heart.dataset.fav); toggleFav(id); openModal(id, modalTab); return; }
    const book=e.target.closest('[data-book]'); if(book){ closeModal(); openBooking(book.dataset.book); return; }
    const post=e.target.closest('[data-post]'); if(post){ closeModal(); openProfile(Number(post.dataset.post)); return; }
    const rec=e.target.closest('[data-recruit]'); if(rec){ closeModal(); openWrite(Number(rec.dataset.recruit)); return; }
  });

  $('#modal-close').addEventListener('click',closeModal);
  $('#modal-overlay').addEventListener('click',(e)=>{ if(e.target===$('#modal-overlay')) closeModal(); });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){ closeModal(); closeFlow(); closeBook(); closeRate(); closeMyPage(); } });

  $('#mate-filters').addEventListener('click',(e)=>{ const c=e.target.closest('[data-matechip]'); if(!c)return;
    mateFilter=c.dataset.matechip; renderMateChips(); renderMateBoard(); });
  $('#mate-list').addEventListener('click',(e)=>{ const card=e.target.closest('[data-post]'); if(card) openProfile(Number(card.dataset.post)); });

  $('#greet-quicks').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b)return; $('#greet-text').value=b.textContent; });

  $('#flow-overlay').addEventListener('click',(e)=>{ if(e.target===$('#flow-overlay')) closeFlow(); });
  $('#book-overlay').addEventListener('click',(e)=>{ if(e.target===$('#book-overlay')) closeBook(); });
  $('#rate-overlay').addEventListener('click',(e)=>{ if(e.target===$('#rate-overlay')) closeRate(); });
  $('#mypage-overlay').addEventListener('click',(e)=>{ if(e.target===$('#mypage-overlay')) closeMyPage(); });
}

/* ================= 히어로 통계 ================= */
function renderHeroStats(){
  const shows = $('#stat-shows');
  if (!shows) return;
  shows.textContent = PERFORMANCES.length;
  $('#stat-mates').textContent = MATEPOSTS.filter(p=>p.status==='open').length;
  $('#stat-genres').textContent = GENRES.length - 1;
}

/* ================= 초기화 ================= */
renderChips();
renderFilterChips();
renderCards();
renderMateChips();
renderMateBoard();
renderFavCount();
renderHeroStats();
bindEvents();
