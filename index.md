---
layout: default
---

{% assign upcoming = site.data.editions | where: "status", "upcoming" | first %}

<section class="hero">
  <div class="wrap">
    <span class="eyebrow">{{ site.series_full }}</span>
    <h1 class="hero__title">Engineering the missions that robots carry out</h1>
    <p class="hero__lede">
      RoME is an international summer school that advances the engineering of
      robotic missions through systematic approaches drawn from Software
      Engineering. This site collects every edition of the series.
    </p>

    {%- if upcoming %}
    <div class="next">
      <span class="next__badge">Next edition</span>
      <h2 class="next__title">RoME {{ upcoming.year }} — {{ upcoming.city }}</h2>
      <p class="next__meta">
        <strong>{{ upcoming.ordinal }} edition</strong> ·
        {{ upcoming.dates }} ·
        {{ upcoming.host }}, {{ upcoming.city }}, {{ upcoming.country }}
      </p>
      {%- if upcoming.url %}
      <a class="btn" href="{{ upcoming.url }}">Visit the RoME {{ upcoming.year }} site</a>
      {%- else %}
      <p>
        The edition website is in preparation. Details will be announced here and
        sent to <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a>.
      </p>
      {%- endif %}
    </div>
    {%- else %}
    <div class="next">
      <span class="next__badge">Next edition</span>
      <p class="next__meta">The next edition of RoME will be announced here.</p>
    </div>
    {%- endif %}
  </div>
</section>

<section class="section" id="about">
  <div class="wrap">
    <div class="section__head">
      <span class="eyebrow">About</span>
      <h2>What the school is about</h2>
    </div>

    <p class="lede">
      Robots are increasingly asked to carry out missions that are long-running,
      safety-critical and only partly known in advance. Specifying those missions,
      verifying them, and adapting them at runtime are software engineering
      problems as much as they are robotics problems.
    </p>

    <p>
      RoME brings the two communities into the same room for a week. Each edition
      combines lectures from internationally recognised speakers with working
      sessions, discussions and hands-on activities, so that participants leave
      with both a view of the state of the art and the beginnings of a
      collaboration.
    </p>

    <p>The series exists to:</p>

    <ul>
      <li>
        disseminate scientific research, and its practical application, on the
        engineering of autonomous robotic missions through systematic approaches
        to Software Engineering;
      </li>
      <li>
        promote technological innovation together with the robotics and software
        engineering research communities;
      </li>
      <li>attract students to contribute to this line of research; and</li>
      <li>
        foster research collaboration between international centres of
        excellence.
      </li>
    </ul>

    <h3>Who should attend</h3>

    <p>
      PhD candidates, master's students and advanced undergraduates in computer
      science, engineering, mechatronics and related fields. Early-career
      researchers and practitioners working on robotic software are equally
      welcome.
    </p>

    <h3>Recurring topics</h3>

    <ul>
      <li>Self-adaptiveness and autonomy in robotic mission engineering</li>
      <li>Requirements modelling, specification and verification</li>
      <li>Runtime architectures and runtime verification</li>
      <li>Verification of safety-critical missions, and formal methods</li>
      <li>Simulation-oriented and field-based testing of robotic systems</li>
      <li>Empirical methods for robotic mission engineering</li>
      <li>Behaviour-tree modelling and execution</li>
      <li>Large language models in multi-robot systems</li>
      <li>ROS-based systems</li>
    </ul>
  </div>
</section>

<section class="section section--muted" id="editions">
  <div class="wrap">
    <div class="section__head">
      <span class="eyebrow">Editions</span>
      <h2>Every edition of RoME</h2>
      <p class="lede">
        Each edition keeps its own website, maintained by its organising team.
        This list is the permanent index to all of them.
      </p>
    </div>

    {% include editions.html %}
  </div>
</section>

<section class="section" id="hosts">
  <div class="wrap">
    <div class="section__head">
      <span class="eyebrow">Hosts &amp; Supporters</span>
      <h2>The institutions behind the series</h2>
      <p class="lede">
        RoME is made possible by the universities that host each edition and by
        the organisations that fund student participation.
      </p>
    </div>

    {% include institutions.html %}
  </div>
</section>

<section class="section section--muted" id="committee">
  <div class="wrap">
    <div class="section__head">
      <span class="eyebrow">Steering Committee</span>
      <h2>Who runs the series</h2>
    </div>

    {% include committee.html %}

    <div class="contact-note">
      <p>
        For questions about the series, hosting a future edition, or proposing a
        topic, write to
        <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a>.
      </p>
    </div>
  </div>
</section>
