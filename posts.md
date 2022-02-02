---
layout: home
author_profile: false
title: Zarr Blog Posts
permalink: /posts/
sidebar:
  title: "Content"
  nav: sidebar
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
