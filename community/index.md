---
title: Zarr Community
---

<PageHero
  eyebrow="Community"
  headline="An open community, federated by domain."
  lead="Zarr is built and stewarded in the open. The core community meets bi-weekly; sister communities like NGFF, GeoZarr, and Anndata build domain conventions on top with their own governance. Everyone is welcome."
/>

<div class="community-cards">
  <article class="community-card">
    <div class="community-card__icon" aria-hidden="true">📅</div>
    <h2 class="community-card__h">Meet</h2>
    <p class="community-card__lead">Bi-weekly community calls and ZEP meetings, open to all.</p>
    <ul class="community-card__list">
      <li><a href="https://zarr.dev/community-calls">Community calls</a> — agenda, joining info, calendar</li>
      <li><a href="https://zarr.dev/zeps/meetings/">ZEP meetings</a> — proposal review and discussion</li>
      <li><a href="/office-hours">Office hours</a> — drop in with questions</li>
    </ul>
  </article>

  <article class="community-card">
    <div class="community-card__icon" aria-hidden="true">📐</div>
    <h2 class="community-card__h">Build</h2>
    <p class="community-card__lead">Propose changes to the spec, ship implementations, contribute conventions.</p>
    <ul class="community-card__list">
      <li><a href="https://zarr.dev/zeps/">Zarr Enhancement Proposals (ZEPs)</a> — how the spec evolves</li>
      <li><a href="https://github.com/zarr-developers/zarr-specs">zarr-specs</a> — issues, discussion, drafts</li>
      <li><a href="https://github.com/zarr-developers/governance">Governance</a> — steering council, voting</li>
    </ul>
  </article>

  <article class="community-card">
    <div class="community-card__icon" aria-hidden="true">💬</div>
    <h2 class="community-card__h">Connect</h2>
    <p class="community-card__lead">Chat, share work, follow updates.</p>
    <ul class="community-card__list">
      <li><a href="https://ossci.zulipchat.com/">Zulip</a> — real-time chat with maintainers and users</li>
      <li><a href="https://github.com/zarr-developers/zarr-python/discussions">GitHub Discussions</a> — Python usage questions</li>
      <li><a href="https://zarr.dev/blog/">Blog</a> — updates and guest posts</li>
      <li><a href="https://bsky.app/profile/zarr.dev">Bluesky</a> · <a href="https://fosstodon.org/@zarr">Mastodon</a> · <a href="https://www.youtube.com/@zarr_dev/playlists">YouTube</a></li>
    </ul>
  </article>
</div>

<section class="related-communities">
  <h2 class="related-communities__h">Related communities</h2>
  <p class="related-communities__lead">Several communities build domain conventions on top of the Zarr specification with their own meetings and governance. They are independent of <code>zarr-developers</code> — you are welcome in any of them.</p>

  <div class="related-grid">
    <article class="related-card">
      <a class="related-card__title" href="https://ngff.openmicroscopy.org/" rel="noopener" target="_blank">
        NGFF / OME-Zarr <span aria-hidden="true">→</span>
      </a>
      <p class="related-card__body">Next-Generation File Format community for bio-imaging. Governed by the OME consortium with its own meetings and process.</p>
    </article>
    <article class="related-card">
      <a class="related-card__title" href="https://www.ogc.org/projects/groups/geozarrswg" rel="noopener" target="_blank">
        GeoZarr OGC SWG <span aria-hidden="true">→</span>
      </a>
      <p class="related-card__body">An Open Geospatial Consortium Standards Working Group developing GeoZarr for Earth-observation data.</p>
    </article>
    <article class="related-card">
      <a class="related-card__title" href="https://anndata.readthedocs.io/" rel="noopener" target="_blank">
        Anndata-Zarr <span aria-hidden="true">→</span>
      </a>
      <p class="related-card__body">Single-cell and genomics data on Zarr. Built and governed within the Scverse ecosystem.</p>
    </article>
  </div>

  <p class="related-communities__note">We coordinate through shared ZEPs and the Zarr specification.</p>
</section>

<p class="community-coc">
  All community spaces follow the <a href="https://github.com/zarr-developers/.github/blob/main/CODE_OF_CONDUCT.md">Zarr Code of Conduct</a>.
</p>

<style scoped>
.community-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin: 8px 0 56px;
}
.community-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 24px 22px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.community-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.community-card__icon {
  font-size: 28px;
  line-height: 1;
  margin-bottom: 12px;
}
.community-card__h {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 6px;
  border: none;
  padding: 0;
}
.community-card__lead {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0 0 14px;
}
.community-card__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}
.community-card__list a {
  font-weight: 500;
}
.community-card__list li {
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.related-communities {
  margin-top: 64px;
  padding-top: 40px;
  border-top: 1px solid var(--vp-c-divider);
}
.related-communities__h {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 8px;
  border: none;
  padding: 0;
}
.related-communities__lead {
  font-size: 14px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  max-width: 640px;
  margin: 0 0 24px;
}
.related-communities__note {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 18px;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}
.related-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 18px 18px 16px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.related-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.related-card__title {
  font-weight: 600;
  font-size: 15px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.related-card__title:hover {
  color: var(--vp-c-brand-1);
}
.related-card__body {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
}

.community-coc {
  margin-top: 64px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
