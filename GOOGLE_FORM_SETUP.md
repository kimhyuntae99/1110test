# Google Form 설정 가이드

## 1. Google Form 생성

1. https://forms.google.com 접속
2. "빈 양식" 클릭
3. 제목: "학습 목표 설정 대화 기록"
4. 설명: "챗봇과의 대화 내용이 자동으로 기록됩니다"

## 2. 질문 추가

Google Form에 다음 3개의 질문을 추가해야 합니다:

1. **학번** (단답형)
   - 질문 제목: "학번"
   - "필수" 옵션 체크

2. **이름** (단답형) 
   - 질문 제목: "이름"
   - "필수" 옵션 체크

3. **대화 내용** (장문형)
   - 질문 제목: "대화 내용"
   - "필수" 옵션 체크

## 3. Entry ID 찾기

각 질문마다 고유한 entry ID가 있습니다. 3개 모두 찾아야 합니다:

### 방법 1: 페이지 소스 보기
1. 양식 미리보기 클릭
2. 우클릭 → "페이지 소스 보기"
3. `entry.` 검색하여 3개의 entry 번호 확인:
   - 학번: entry.877816296
   - 이름: entry.1590256368  
   - 대화내용: entry.1968981508

### 방법 2: 개발자 도구 사용
1. 양식 미리보기 페이지에서 F12 키 누르기
2. Network 탭 열기
3. 양식에 테스트 데이터 입력 후 제출
4. 네트워크 요청에서 각 필드의 entry 번호 확인

## 4. Form ID 추출

양식 편집 URL에서:
```
https://docs.google.com/forms/d/1FAIpQLSd_FORM_ID_HERE/edit
```

Form ID는 `1FAIpQLSd_` 뒤의 긴 문자열입니다.

## 5. 환경변수 설정

`.env` 파일에 다음과 같이 설정:

```env
VITE_GOOGLE_FORM_URL=https://docs.google.com/forms/u/0/d/e/1FAIpQLSd_YOUR_FORM_ID_HERE/formResponse
VITE_FORM_ENTRY_CONVERSATION=entry.1968981508
VITE_FORM_ENTRY_STUDENT_ID=entry.877816296
VITE_FORM_ENTRY_NAME=entry.1590256368
```

## 6. 테스트

1. 챗봇에서 몇 개의 메시지 교환
2. "Google Form에 대화내용 제출" 버튼 클릭
3. Google Form 응답 탭에서 제출된 내용 확인

## 문제 해결

### Q: 제출은 되는데 응답이 보이지 않아요
A: 다음을 확인하세요:
- Google Form이 "응답 수집" 상태인지 확인
- Entry ID가 정확한지 확인
- Form URL의 `/viewform`을 `/formResponse`로 변경했는지 확인

### Q: CORS 오류가 발생해요
A: 브라우저 콘솔에서 확인하고, iframe 방식으로 자동 우회됩니다.

### Q: 제출 후 아무 일도 일어나지 않아요
A: 콘솔(F12)을 열어서 오류 메시지를 확인하세요.