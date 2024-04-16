const main = document.querySelector('main'); // 메인 화면 요소 선택
const menus = document.querySelectorAll('nav span'); // 네비게이션 메뉴 요소 선택
const numbers = document.querySelectorAll('.screen span'); // 시계 숫자 요소 선택
const [am, pm] = document.querySelectorAll('.screen em'); // 오전/오후 아이콘 요소 선택

setInterval(() => { // 1초마다 반복 실행
  let now = new Date(); // 현재 시간 객체 생성
  let hr = now.getHours(); // 현재 시간에서 시간을 가져옴

  // 시간대에 따른 클래스 및 메뉴 아이템에 'on' 클래스를 추가/제거하여 UI 변경
  const data = [
    {condition: hr >= 5 && hr < 11, name: 'morning'}, // 오전
    {condition: hr >= 11 && hr < 16, name: 'afternoon'}, // 오후
    {condition: hr >= 16 && hr < 19, name: 'evening'}, // 저녁
    {condition: hr >= 19 || hr < 5, name: 'night'} // 밤
  ];

  data.forEach((item, index) => { // 각 시간대에 따라 UI 변경
    if (item.condition) { // 해당 조건을 만족하면
      main.className = ''; // 메인 화면의 클래스 초기화
      main.classList.add(item.name); // 시간대에 해당하는 클래스 추가

      for (let menu of menus) menu.classList.remove('on'); // 모든 메뉴 아이템의 'on' 클래스 제거
      menus[index].classList.add('on'); // 해당하는 메뉴 아이템에 'on' 클래스 추가
    };
  });

  // 'afternoon' 클래스가 있으면 'dark_text' 클래스 추가, 그렇지 않으면 제거
  if (main.classList.contains('afternoon')) {
    main.classList.add('dark_text');
  } else {
    main.classList.remove('dark_text');
  }
  
  // 시간 설정 함수를 호출하여 시, 분, 초를 설정하고 화면에 표시
  const times = setTime(now);
  times.forEach((time, index) => getTime(time, index));
}, 1000);

// 시간 설정 함수
function setTime(now) {
  let hr2 = null; // 12시간 형식의 시간
  let hr = now.getHours(); // 현재 시간에서 시간을 가져옴
  let min = now.getMinutes(); // 현재 시간에서 분을 가져옴
  let sec = now.getSeconds(); // 현재 시간에서 초를 가져옴

  if (hr > 12) { // 시간이 12보다 크면
    hr2 = hr - 12; // 12를 빼서 12시간 형식으로 변환
    pm.classList.add('on'); // 'pm' 아이콘에 'on' 클래스 추가
    am.classList.remove('on'); // 'am' 아이콘에 'on' 클래스 제거
  } else { // 시간이 12 이하면
    hr2 = hr; // 그대로 사용
    am.classList.add('on'); // 'am' 아이콘에 'on' 클래스 추가
    pm.classList.remove('on'); // 'pm' 아이콘에 'on' 클래스 제거
  }
 
  return [hr2, min, sec]; // 시, 분, 초 배열 반환
}

// 시간 값을 화면에 표시하는 함수
function getTime(num, index) {
  if (num < 10) num = '0' + num; // 숫자가 10보다 작으면 앞에 '0'을 붙임
  numbers[index].innerText = num; // 시계 숫자 요소에 시간 값 적용
}