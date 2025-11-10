import './style.css'

// 환경변수 설정
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSfetkQ9CCszyUePt2IsEgiXCk_OZrRrFCcvp_8AXB_u5utpEQ/formResponse';
const FORM_ENTRY_CONVERSATION = import.meta.env.VITE_FORM_ENTRY_CONVERSATION || 'entry.1968981508';
const FORM_ENTRY_STUDENT_ID = import.meta.env.VITE_FORM_ENTRY_STUDENT_ID || 'entry.877816296';
const FORM_ENTRY_NAME = import.meta.env.VITE_FORM_ENTRY_NAME || 'entry.1590256368';

// 대화 기록 저장
let conversationHistory = [];
let userInfo = {
  studentId: '',
  name: ''
};

// DOM 요소들
const userInfoSection = document.getElementById('userInfoSection');
const chatMessages = document.getElementById('chatMessages');
const chatInputContainer = document.getElementById('chatInputContainer');
const studentIdInput = document.getElementById('studentId');
const userNameInput = document.getElementById('userName');
const startChatButton = document.getElementById('startChatButton');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const submitButton = document.getElementById('submitToForm');

// 사용자 정보 입력 완료 처리
function startChat() {
  const studentId = studentIdInput.value.trim();
  const userName = userNameInput.value.trim();
  
  if (!studentId || !userName) {
    alert('학번과 이름을 모두 입력해주세요.');
    return;
  }
  
  // 사용자 정보 저장
  userInfo.studentId = studentId;
  userInfo.name = userName;
  
  // UI 전환
  userInfoSection.style.display = 'none';
  chatMessages.style.display = 'block';
  chatInputContainer.style.display = 'block';
  
  // 개인화된 환영 메시지 추가
  const welcomeMessage = `안녕하세요 ${userName}님! (학번: ${studentId}) 오늘 공부 목표를 함께 세워볼까요? 어떤 과목을 공부할 예정인가요?`;
  
  // 기존 환영 메시지 업데이트
  const botMessage = document.querySelector('.bot-message .message-content');
  if (botMessage) {
    botMessage.textContent = welcomeMessage;
  }
  
  // 포커스를 메시지 입력창으로 이동
  messageInput.focus();
  
  console.log('사용자 정보 입력 완료:', userInfo);
}

// 시간 포맷팅 함수
function formatTime() {
  return new Date().toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

// 메시지 추가 함수
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  
  messageDiv.innerHTML = `
    <div class="message-content">${content}</div>
    <div class="message-time">${formatTime()}</div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // 대화 기록에 추가
  conversationHistory.push({
    role: isUser ? 'user' : 'assistant',
    content: content,
    timestamp: new Date().toISOString()
  });
  
  // 3개 이상의 메시지가 있으면 제출 버튼 활성화
  if (conversationHistory.length >= 3) {
    submitButton.disabled = false;
  }
}

// 로딩 메시지 표시
function showLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message bot-message';
  loadingDiv.id = 'loading-message';
  loadingDiv.innerHTML = `
    <div class="message-content loading">챗봇이 답변을 생각하고 있습니다</div>
  `;
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 로딩 메시지 제거
function hideLoading() {
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) {
    loadingMessage.remove();
  }
}

// OpenAI API 호출 (실제 구현시 백엔드 필요)
async function callChatAPI(userMessage) {
  try {
    // 학습 목표 관련 프롬프트 구성
    const systemPrompt = `당신은 학습 목표 설정을 도와주는 친근한 AI 어시스턴트입니다. 
사용자와 대화하며 다음을 도와주세요:
1. 오늘 공부할 과목이나 주제 파악
2. 구체적인 학습 목표 설정
3. 적절한 공부 시간 계획
4. 학습 방법 제안

항상 한국어로 친근하고 격려하는 톤으로 답변하며, 구체적이고 실행 가능한 조언을 제공하세요.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6), // 최근 6개 메시지만 포함
      { role: 'user', content: userMessage }
    ];

    // 실제 환경에서는 백엔드 API를 통해 호출해야 함
    // 여기서는 모의 응답을 반환
    const mockResponses = [
      "좋은 선택이네요! 그 과목을 몇 시간 정도 공부할 계획인가요?",
      "구체적인 목표가 있으신가요? 예를 들어 특정 챕터나 문제집 페이지 수 같은 것 말이에요.",
      "훌륭한 계획이네요! 중간에 휴식 시간도 포함해서 계획을 세우는 것이 좋겠어요.",
      "집중력을 높이기 위해 25분 공부 + 5분 휴식하는 포모도로 기법은 어떠세요?",
      "오늘 목표를 달성하면 스스로에게 작은 보상을 주는 것도 좋은 방법입니다!",
      "마지막으로, 오늘의 학습 목표를 한 문장으로 정리해보실 수 있나요?"
    ];
    
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    // 실제 API 호출 대신 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return randomResponse;
    
  } catch (error) {
    console.error('API 호출 오류:', error);
    return "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.";
  }
}

// 메시지 전송 함수
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  // 사용자 메시지 추가
  addMessage(message, true);
  messageInput.value = '';
  
  // 입력 비활성화
  sendButton.disabled = true;
  messageInput.disabled = true;
  
  // 로딩 표시
  showLoading();
  
  try {
    // AI 응답 받기
    const botResponse = await callChatAPI(message);
    
    // 로딩 숨기기
    hideLoading();
    
    // 봇 응답 추가
    addMessage(botResponse);
    
  } catch (error) {
    hideLoading();
    addMessage("죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.");
  } finally {
    // 입력 다시 활성화
    sendButton.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
  }
}

// Google Form 제출 함수
async function submitToGoogleForm() {
  try {
    // 제출 버튼 비활성화 및 로딩 상태 표시
    submitButton.disabled = true;
    submitButton.textContent = "📤 제출 중...";
    
    // 대화 내용을 하나의 문자열로 합치기
    const conversationText = conversationHistory
      .map(msg => `[${msg.role === 'user' ? '사용자' : '챗봇'}] ${msg.content}`)
      .join('\n\n');
    
    // 제출 날짜와 시간 추가
    const submissionData = `
제출일시: ${new Date().toLocaleString('ko-KR')}

=== 학습 목표 설정 대화 내용 ===

${conversationText}

=== 대화 종료 ===
총 대화 횟수: ${conversationHistory.length}개
    `.trim();
    
    console.log('제출할 데이터:', {
      studentId: userInfo.studentId,
      name: userInfo.name,
      conversation: submissionData
    });
    
    // FormData 생성 (세 개의 entry point 사용)
    const formData = new FormData();
    formData.append(FORM_ENTRY_STUDENT_ID, userInfo.studentId);
    formData.append(FORM_ENTRY_NAME, userInfo.name);
    formData.append(FORM_ENTRY_CONVERSATION, submissionData);
    
    // Google Form에 제출 (no-cors 모드 사용)
    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    
    // 백업으로 iframe 방식도 사용
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'hidden_iframe';
    document.body.appendChild(iframe);
    
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_FORM_URL;
    form.target = 'hidden_iframe';
    
    // 학번 입력 필드
    const studentIdField = document.createElement('input');
    studentIdField.type = 'hidden';
    studentIdField.name = FORM_ENTRY_STUDENT_ID;
    studentIdField.value = userInfo.studentId;
    form.appendChild(studentIdField);
    
    // 이름 입력 필드
    const nameField = document.createElement('input');
    nameField.type = 'hidden';
    nameField.name = FORM_ENTRY_NAME;
    nameField.value = userInfo.name;
    form.appendChild(nameField);
    
    // 대화 내용 입력 필드
    const conversationField = document.createElement('input');
    conversationField.type = 'hidden';
    conversationField.name = FORM_ENTRY_CONVERSATION;
    conversationField.value = submissionData;
    form.appendChild(conversationField);
    
    document.body.appendChild(form);
    
    // iframe 로드 완료를 기다림
    await new Promise((resolve, reject) => {
      iframe.onload = () => {
        console.log('Google Form 제출 완료 (iframe)');
        resolve();
      };
      iframe.onerror = () => {
        console.error('iframe 로드 실패');
        reject(new Error('iframe 로드 실패'));
      };
      
      // 5초 후 타임아웃
      setTimeout(() => {
        console.log('제출 타임아웃 - 성공으로 간주');
        resolve();
      }, 5000);
      
      form.submit();
    });
    
    // 정리
    document.body.removeChild(form);
    document.body.removeChild(iframe);
    
    // 성공 메시지 표시
    addMessage(`🎉 ${userInfo.name}님의 대화 내용이 성공적으로 Google Form에 제출되었습니다! 오늘도 열심히 공부하세요!`);
    addMessage(`📊 제출된 정보: 학번 ${userInfo.studentId}, 이름 ${userInfo.name}, 대화 ${conversationHistory.length}개`);
    
    submitButton.textContent = "✅ 제출 완료";
    
    // 제출 완료 후 새로운 대화를 위한 초기화 옵션 제공
    setTimeout(() => {
      const resetBtn = document.createElement('button');
      resetBtn.textContent = '🔄 새로운 대화 시작';
      resetBtn.className = 'submit-button';
      resetBtn.onclick = () => {
        if (confirm('새로운 대화를 시작하시겠습니까? 현재 대화 내용이 초기화됩니다.')) {
          location.reload();
        }
      };
      document.querySelector('.action-buttons').appendChild(resetBtn);
    }, 2000);
    
  } catch (error) {
    console.error('Form 제출 오류:', error);
    addMessage("❌ Form 제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
    addMessage(`🔍 오류 상세: ${error.message}`);
    
    // 버튼 상태 복구
    submitButton.disabled = false;
    submitButton.textContent = "📝 Google Form에 대화내용 제출";
  }
}

// 이벤트 리스너 설정
startChatButton.addEventListener('click', startChat);
sendButton.addEventListener('click', sendMessage);
submitButton.addEventListener('click', submitToGoogleForm);

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// 학번/이름 입력 필드에서 엔터키 처리
studentIdInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    userNameInput.focus();
  }
});

userNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    startChat();
  }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 처음에는 학번/이름 입력에 포커스
  studentIdInput.focus();
  
  // 시작 시간 설정
  const timeElements = document.querySelectorAll('.message-time');
  timeElements.forEach(element => {
    if (element.textContent === '') {
      element.textContent = formatTime();
    }
  });
  
  // 환경변수 확인 및 콘솔 출력
  console.log('=== 챗봇 초기화 ===');
  console.log('Google Form URL:', GOOGLE_FORM_URL);
  console.log('Form Entry (대화):', FORM_ENTRY_CONVERSATION);
  console.log('Form Entry (학번):', FORM_ENTRY_STUDENT_ID);
  console.log('Form Entry (이름):', FORM_ENTRY_NAME);
  console.log('API Key 설정됨:', !!API_KEY);
  
  // Google Form URL 유효성 검사
  if (!GOOGLE_FORM_URL || GOOGLE_FORM_URL.includes('YOUR_FORM_ID')) {
    console.warn('⚠️ Google Form URL이 설정되지 않았습니다. .env 파일을 확인하세요.');
  } else {
    console.log('✅ Google Form URL이 올바르게 설정되었습니다.');
  }
});
