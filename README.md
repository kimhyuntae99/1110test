# AI 진로 상담 챗봇

AI 상담사와 대화하며 나의 진로를 탐색하고 구체적인 계획을 세울 수 있는 웹 애플리케이션입니다.

## 기능

- 🎯 AI 상담사와 진로에 대한 심도 깊은 대화
- 📝 상담 내용 Google Form 자동 제출
- 📱 반응형 디자인
- 🎨 현대적인 UI/UX

## 상담 영역

- **적성 탐색**: 개인의 관심 분야와 강점 파악
- **진로 계획**: 구체적인 진로 목표 설정
- **스킬 개발**: 필요한 역량과 경험 제안
- **취업/진학**: 실질적인 준비 방안 논의

## 설정 방법

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 값들을 설정하세요:

```env
# OpenAI API 키 (https://platform.openai.com/api-keys)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Google Form URL (실제 설정됨)
VITE_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/1FAIpQLSfetkQ9CCszyUePt2IsEgiXCk_OZrRrFCcvp_8AXB_u5utpEQ/formResponse

# Form Entry Points
VITE_FORM_ENTRY_CONVERSATION=entry.1968981508
VITE_FORM_ENTRY_STUDENT_ID=entry.877816296
VITE_FORM_ENTRY_NAME=entry.1590256368
```

### 2. Google Form 설정

1. Google Forms에서 새 양식을 생성
2. "긴 답변" 유형의 질문을 추가 (예: "학습 목표 대화 내용")
3. 양식 HTML 소스에서 `entry.` 값을 확인:
   - 양식 미리보기 → 개발자 도구(F12) → Network 탭
   - 테스트 제출 후 요청 URL에서 `entry.1234567890` 형태 확인
4. 양식 URL에서 Form ID를 추출하여 환경변수에 설정:
   ```
   https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
   →
   https://docs.google.com/forms/u/0/d/e/YOUR_FORM_ID/formResponse
   ```

**중요**: Google Form에서 "응답 수집" 설정이 활성화되어 있는지 확인하세요!

### 3. 개발 서버 실행

```bash
npm install
npm run dev
```

### 4. 빌드

```bash
npm run build
```

## 사용 방법

1. 웹사이트에 접속
2. 학번과 이름을 입력
3. AI 상담사와 진로에 대해 상담
4. 충분한 상담 후 "Google Form에 진로 상담 내용 제출" 버튼 클릭
5. 상담 내용이 자동으로 Google Form에 제출됨

## 기술 스택

- Vanilla JavaScript
- Vite
- CSS3 (Grid, Flexbox, Animations)
- OpenAI API (또는 다른 AI API)
- Google Forms API

## 주의사항

- 실제 사용을 위해서는 OpenAI API 키가 필요합니다
- Google Form URL과 Entry ID를 정확히 설정해야 합니다
- API 키는 절대 공개 저장소에 업로드하지 마세요
- 프로덕션 환경에서는 백엔드를 통해 API 호출을 하는 것을 권장합니다

## 라이선스

MIT License