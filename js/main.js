/**
 * JavaScript for:
 * International Workshop on Physics of Near- and Mid-UV Radiation from the Sun & Its Effects on Climate
 * IUCAA, Pune | October 21–23, 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  initMainTabs();
  initDayScheduleTabs();
  initParticipantSearch();
});

/* --------------------------------------------------------------------------
   1. Main Section Navigation Tabs (Program, Posters, Participants, Venue, Contact)
   -------------------------------------------------------------------------- */
function initMainTabs() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  function activateTab(targetId) {
    tabBtns.forEach(b => {
      const isTarget = b.getAttribute('data-tab') === targetId;
      b.classList.toggle('active', isTarget);
      b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    panels.forEach(p => {
      p.classList.toggle('active', p.id === targetId);
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      activateTab(targetId);
      history.replaceState(null, null, '#' + targetId);
    });
  });

  // Handle hash on load
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const validTab = Array.from(panels).some(p => p.id === hash);
    if (validTab) {
      activateTab(hash);
    }
  }

  // Handle links that target tabs (e.g. data-switch-tab="tab-contact")
  document.querySelectorAll('[data-switch-tab]').forEach(el => {
    el.addEventListener('click', () => {
      const targetId = el.getAttribute('data-switch-tab');
      activateTab(targetId);
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Program Day Switcher (Day 1, Day 2, Day 3)
   -------------------------------------------------------------------------- */
function initDayScheduleTabs() {
  const dayBtns = document.querySelectorAll('.day-btn');
  const dayViews = document.querySelectorAll('.day-schedule-view');

  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetDay = btn.getAttribute('data-day');

      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      dayViews.forEach(view => {
        if (view.id === targetDay) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Participant Live Search (By Name or Institute)
   -------------------------------------------------------------------------- */
function initParticipantSearch() {
  const searchInput = document.getElementById('p-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const rows = document.querySelectorAll('#p-tbody tr');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (searchTerm === '' || text.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}
