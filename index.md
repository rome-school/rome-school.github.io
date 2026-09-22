---
layout: default
---

{% assign upcoming = site.data.editions | where: "status", "upcoming" | first %}

<section id="about">
  <h1>International Summer School on Robotic Mission Engineering</h1>

  <p class="lead">
    RoME is a recurring educational programme dedicated to training the next
    generation of robotics researchers in systematic, software-engineering-based
    approaches to the design, deployment and verification of autonomous robotic
    missions. It has been held annually since 2023, with all editions funded by
    ACM SIGSOFT.
  </p>

  <p>
    Rather than treating robotics, software engineering, verification and ethics
    as separate subjects, the school is structured to show how they interact
    across the lifecycle of an autonomous mission: from mission specification,
    software architecture and deployment, through runtime monitoring and
    adaptation, to simulation-based validation and responsible operation.
  </p>

  {%- if upcoming %}
  <div class="next-edition">
    <h2>Next edition</h2>
    <dl class="dl-facts">
      <dt>Edition</dt>
      <dd>RoME {{ upcoming.year }}, the {{ upcoming.ordinal | downcase }} edition</dd>
      <dt>Host</dt>
      <dd><a href="{{ upcoming.host_url }}">{{ upcoming.host }}</a>, {{ upcoming.city }}, {{ upcoming.country }}</dd>
      <dt>Dates</dt>
      <dd>{{ upcoming.dates }}</dd>
      {%- if upcoming.url %}
      <dt>Website</dt>
      <dd><a href="{{ upcoming.url }}">{{ upcoming.url }}</a></dd>
      {%- endif %}
    </dl>
    {%- unless upcoming.url %}
    <p>
      The edition website is in preparation. Announcements will be posted here
      and sent to <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a>.
    </p>
    {%- endunless %}
  </div>
  {%- endif %}
</section>

<section id="scope">
  <h2>Scope</h2>

  <p>The curriculum is organised around four mutually reinforcing threads.</p>

  <h3>Robotics software foundations for autonomy</h3>
  <p>
    Architectures, middleware, component models, deployment and mission
    execution patterns for ROS 2-based systems.
  </p>

  <h3>Mission engineering and coordination</h3>
  <p>
    Systematic approaches for specifying, decomposing, implementing and
    coordinating robotic missions, including heterogeneous and multi-robot
    settings, together with emerging workflows that use large language models to
    translate natural-language mission descriptions into structured artefacts.
  </p>

  <h3>Verification, testing and assurance</h3>
  <p>
    Formal verification, runtime monitoring, runtime assurance and
    simulation-based testing for autonomous robots and ROS-based applications.
  </p>

  <h3>Responsible and ethics-aware robotics</h3>
  <p>
    Normative requirements, trustworthiness, and ethics-aware decision making for
    autonomous systems operating in socially embedded environments. This thread
    is treated as cross-cutting rather than as a standalone session.
  </p>
</section>

<section id="format">
  <h2>Format and audience</h2>

  <p>
    Each edition runs for four to five days and combines four kinds of activity:
    keynote lectures by invited researchers; technical sessions in which
    participants present their ongoing work and receive moderated feedback;
    hands-on working sessions in small teams, which account for a substantial
    part of the programme; and a closing student showcase.
  </p>

  <p>
    The school is intended primarily for early-stage PhD students and
    research-oriented MSc students in computer science, software engineering,
    mechatronics and robotics. A limited number of advanced undergraduates with
    prior research or competition experience in robotics may also be admitted.
    Recent editions have had between 30 and 60 participants and have been held in
    English.
  </p>
</section>

<section id="editions">
  <h2>Editions</h2>

  <p>
    Each edition maintains its own website, and credits the institutions and
    funding bodies that supported it. This page is the permanent index to them.
  </p>

  {% include editions.html %}
</section>

<section id="hosts">
  <h2>Host institutions</h2>

  {% include institutions.html %}
</section>

<section id="committee">
  <h2>Steering committee</h2>

  {% include committee.html %}

  <p>
    For questions about the series, hosting a future edition or proposing a
    topic, please write to
    <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a>.
  </p>
</section>
