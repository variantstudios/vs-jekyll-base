---
title: Style Guide
permalink: "/styleguide/"
description: This is just a sample general page.
layout: styleguide
---
{% for block in site.sg %}
   <div class="sg-block">
     <h6 class="sg-label">{{ block.title }}</h6>
     {{ block.content }}
   </div>
{% endfor %}



