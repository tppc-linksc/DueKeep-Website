/* 在样式和 Vue 应用启动前恢复主题，避免页面先亮后暗。 */
(() => {
  const storageKey = 'duekeep-theme';
  const root = document.documentElement;
  let savedTheme = '';

  try {
    savedTheme = window.localStorage.getItem(storageKey) || '';
  } catch {
    // 浏览器禁用本地存储时仍可跟随系统主题。
  }

  const theme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  root.dataset.theme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    const lightColor = root.dataset.page === 'home' ? '#ffffff' : '#f7f8fc';
    themeColor.setAttribute('content', theme === 'dark' ? '#0b0d12' : lightColor);
  }
})();
