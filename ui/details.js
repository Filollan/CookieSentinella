document.addEventListener('DOMContentLoaded', async () => {
  const protectedCookiesList = document.getElementById('protectedCookiesList');
  const xssAttemptsList = document.getElementById('xssAttemptsList');
  const fingerprintChangesList = document.getElementById('fingerprintChangesList');
  const exportAttemptsList = document.getElementById('exportAttemptsList');

  await loadDetails();

  async function loadDetails() {
    const result = await chrome.storage.local.get([
      'protected_cookies',
      'xss_attempts',
      'fingerprint_changes',
      'export_attempts'
    ]);

    // Protected Cookies
    if (result.protected_cookies) {
      const cookies = JSON.parse(result.protected_cookies);
      cookies.forEach(([key, cookie]) => {
        const li = document.createElement('li');
        li.textContent = `${cookie.name} (${cookie.domain})`;
        protectedCookiesList.appendChild(li);
      });
    }

    // XSS Attempts
    if (result.xss_attempts) {
      result.xss_attempts.forEach(attempt => {
        const li = document.createElement('li');
        li.textContent = `${attempt.details} at ${new Date(attempt.timestamp).toLocaleString()}`;
        xssAttemptsList.appendChild(li);
      });
    }

    // Fingerprint Changes
    if (result.fingerprint_changes) {
      result.fingerprint_changes.forEach(change => {
        const li = document.createElement('li');
        li.textContent = `Change detected at ${new Date(change.timestamp).toLocaleString()}`;
        fingerprintChangesList.appendChild(li);
      });
    }

    // Export Attempts
    if (result.export_attempts) {
      result.export_attempts.forEach(attempt => {
        const li = document.createElement('li');
        li.textContent = `Attempt at ${new Date(attempt.timestamp).toLocaleString()}`;
        exportAttemptsList.appendChild(li);
      });
    }
  }
});