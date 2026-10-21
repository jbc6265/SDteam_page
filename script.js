(() => {
  'use strict';
  const content = window.SITE_CONTENT;
  if (!content) return;
  const categoryLabels = { innovation: '제조 혁신', partnership: '파트너십', company: '기업 소식' };
  const arrow = '<svg class="arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const articleUrl = (article) => `https://hi-connect.blog/${encodeURIComponent(article.id)}`;
  const sortedArticles = [...content.articles].sort((a, b) => b.date.localeCompare(a.date));
  const result = document.querySelector('#news-results');
  const filters = document.querySelectorAll('[data-filter]');
  function renderNews(category = 'all') {
    const articles = sortedArticles.filter((article) => category === 'all' || article.category === category);
    const featured = articles.slice(0, 3);
    const remaining = articles.slice(3);
    const formatDate = (article) => `<time datetime="${escape(article.date)}">${escape(article.date.replaceAll('-', '.'))}</time>`;
    result.innerHTML = articles.length ? `<div class="news-grid">${featured.map((article) => `
      <article class="news-card"><a href="${articleUrl(article)}" target="_blank" rel="noopener noreferrer">
        <div class="news-image"><img src="assets/news-${encodeURIComponent(article.id)}.jpg" alt="${escape(article.title)} 기사 썸네일" width="800" height="400" loading="lazy"></div>
        <div class="news-meta"><span class="news-category">${escape(categoryLabels[article.category] || '소식')}</span>${formatDate(article)}</div>
        <h3>${escape(article.title)}</h3><p>${escape(article.summary)}</p><span class="sr-only">원문 보기 (새 창)</span>
      </a></article>`).join('')}</div>${remaining.length ? `<div class="news-list">${remaining.map((article) => `<a href="${articleUrl(article)}" target="_blank" rel="noopener noreferrer"><span class="news-category">${escape(categoryLabels[article.category] || '소식')}</span><h3>${escape(article.title)}</h3>${formatDate(article)}${arrow}<span class="sr-only">원문 보기 (새 창)</span></a>`).join('')}</div>` : ''}` : '<p>등록된 기사가 없습니다.</p>';
    document.querySelector('#news-count').textContent = `${category === 'all' ? '전체 소식' : categoryLabels[category]} ${articles.length}건`;
    filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  }
  filters.forEach((button) => button.addEventListener('click', () => renderNews(button.dataset.filter)));
  renderNews();

  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    navigation.classList.remove('is-open');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navigation.querySelectorAll('a').forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
  }

  document.querySelector('#contact-description').textContent = content.contact.description;
  const contactDetails = document.querySelector('#contact-details');
  function contactLink(label, href) {
    const link = document.createElement('a');
    link.className = 'contact-detail'; link.textContent = label; link.href = href;
    contactDetails.append(link);
  }
  if (content.contact.email) contactLink(content.contact.email, `mailto:${encodeURIComponent(content.contact.email)}`);
  if (content.contact.phone) contactLink(content.contact.phone, `tel:${content.contact.phone.replace(/[^\d+]/g, '')}`);
  if (content.programs.length) {
    document.querySelector('#program-status').textContent = '사업별 공식 공고에서 지원 내용과 참여 조건을 확인하세요.';
    document.querySelector('.program-note').hidden = true;
    const list = document.querySelector('#program-list');
    content.programs.forEach((program) => {
      const item = document.createElement('article'); item.className = 'program-item';
      const heading = document.createElement('h3'); heading.textContent = program.title;
      const description = document.createElement('p'); description.textContent = program.description;
      item.append(heading, description);
      try {
        const url = new URL(program.url);
        if (url.protocol === 'https:') {
          const link = document.createElement('a'); link.href = url.href; link.textContent = '공식 공고 확인 (새 창)'; link.target = '_blank'; link.rel = 'noopener noreferrer'; item.append(link);
        }
      } catch { /* Invalid URLs remain plain text; no misleading application button. */ }
      list.append(item);
    });
  }
})();
