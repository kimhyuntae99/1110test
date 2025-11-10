// Using a hidden iframe and normal form POST to submit to Google Forms.
// This avoids fetch(mode:'no-cors') opaque responses and lets us detect completion
// via the iframe's load event. We still cannot read response body due to cross-origin,
// but onload reliably indicates the form post finished and the remote page loaded.
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSexRJEkTwAe9aBOh3FEenQeKZUl0ZqkalrsZdmPEKDqCEXPsQ/formResponse';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gform');
  const status = document.getElementById('status');
  const iframe = document.getElementById('hidden_iframe');

  // Ensure form action is set (redundant if set in HTML)
  form.action = FORM_URL;
  form.method = 'POST';
  form.target = 'hidden_iframe';

  let submitting = false;

  form.addEventListener('submit', (e) => {
    const name = form.querySelector('input[name="entry.1313417914"]').value.trim();
    const student = form.querySelector('input[name="entry.684936081"]').value.trim();

    if (!name || !student) {
      e.preventDefault();
      status.textContent = '이름과 학번을 입력하세요.';
      status.style.color = 'crimson';
      return;
    }

    // Let the browser perform the normal form POST to the iframe
    submitting = true;
    status.textContent = '전송 중...';
    status.style.color = '#444';

    // Fallback timeout: if iframe doesn't load in X ms, consider done (prevents stuck UI)
    setTimeout(() => {
      if (submitting) {
        submitting = false;
        status.textContent = '전송 완료 (타임아웃)';
        status.style.color = 'green';
        form.reset();
      }
    }, 8000);
  });

  // iframe onload -> submission completed (remote page loaded into iframe)
  iframe.addEventListener('load', () => {
    if (!submitting) return;
    submitting = false;
    status.textContent = '전송 완료 (Google Form에 제출됨)';
    status.style.color = 'green';
    form.reset();
  });
});
