---
title: Zarr Office Hours
---

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const iframe = document.getElementById('calendariframe')
  if (iframe) {
    iframe.src = iframe.src.replace('ctz=local', 'ctz=' + Intl.DateTimeFormat().resolvedOptions().timeZone)
  }
})
</script>

<PageHero
  eyebrow="Office Hours"
  headline="Drop in. Ask anything."
  lead="Bi-weekly office hours on Wednesdays — open to anyone using or considering Zarr. Bring questions about the spec, implementations, your data, or how to contribute. The agenda is shaped by the attendees in the room."
>
  <template #meta>
    <div class="oh-actions">
      <a class="oh-cta" href="https://us06web.zoom.us/j/83046491212?pwd=MV5dMCnYIy6E57Rn8IpmwasLX27wOd.1" target="_blank" rel="noopener noreferrer">Join the Zoom →</a>
      <a class="oh-link" href="https://calendar.google.com/calendar/ical/c_ba2k79i3u0lkf49vo0jre27j14%40group.calendar.google.com/public/basic.ics">Download .ics</a>
    </div>
  </template>
</PageHero>

<section class="oh-section">
  <h2 class="oh-section__h">What we cover</h2>
  <ul class="oh-list">
    <li>Spec questions and proposed changes (ZEPs)</li>
    <li>Implementation choices across languages</li>
    <li>What's new in the Zarr ecosystem — datasets, conventions, tools</li>
    <li>How to get involved as a contributor or user</li>
  </ul>
  <p class="oh-note">A few items kick off each session; the rest of the time follows the room.</p>
</section>

<section class="oh-section">
  <h2 class="oh-section__h">Schedule</h2>
  <p class="oh-note">Times below are in your local timezone (auto-detected). The calendar shows both the bi-weekly office hours and other Zarr community events.</p>
  <div class="oh-calendar-frame">
    <iframe
      id="calendariframe"
      src="https://calendar.google.com/calendar/embed?ctz=local&src=c_ba2k79i3u0lkf49vo0jre27j14%40group.calendar.google.com&ctz=Europe%2FBerlin"
      title="Zarr community calendar"
      style="border: 0"
      width="800"
      height="600"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</section>

<style scoped>
.oh-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 22px;
}
.oh-cta {
  display: inline-flex;
  align-items: center;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.oh-cta:hover {
  background: var(--vp-c-brand-2);
}
.oh-link {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.oh-section {
  margin-top: 56px;
}
.oh-section__h {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  margin: 0 0 14px;
  border: none;
  padding: 0;
}
.oh-list {
  margin: 0;
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}
.oh-note {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 12px 0 18px;
  max-width: 640px;
}

.oh-calendar-frame {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.12);
}
.oh-calendar-frame iframe {
  display: block;
  max-width: 100%;
  border-radius: 6px;
}
</style>
