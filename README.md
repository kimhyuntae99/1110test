# 학습 목표 설정 챗봇

AI 챗봇과 대화하며 오늘의 학습 목표를 설정하고, 대화 내용을 Google Form에 제출할 수 있는 웹 애플리케이션입니다.

## 기능

- 🤖 AI 챗봇과 학습 목표에 대한 대화
- 📝 대화 내용 Google Form 자동 제출
- 📱 반응형 디자인
- 🎨 현대적인 UI/UX

## 설정 방법

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 값들을 설정하세요:

```env
# OpenAI API 키 (https://platform.openai.com/api-keys)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Google Form URL (실제 Google Form ID로 교체)
VITE_GOOGLE_FORM_URL=https://docs.google.com/forms/u/0/d/e/YOUR_FORM_ID/formResponse

# Form Entry Point
VITE_FORM_ENTRY=entry.1968981508
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
2. 챗봇과 학습 목표에 대해 대화
3. 충분한 대화 후 "Google Form에 대화내용 제출" 버튼 클릭
4. 대화 내용이 자동으로 Google Form에 제출됨

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