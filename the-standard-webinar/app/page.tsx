"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const PRIVACY_POLICY_URL = "https://martinee.notion.site/7cab6d3779c546fc801f79415646c03c";
const GAS_WEB_APP_URL = process.env.NEXT_PUBLIC_THE_STANDARD_GAS_WEB_APP_URL;

const navItems = [["행사 소개", "#about"], ["연사", "#speaker"], ["프로그램", "#program"], ["등록", "#apply"]] as const;
const speakers = ["SPEAKER 01", "SPEAKER 02", "SPEAKER 03"];
const timetable = [
  ["01", "시간 미정", "OPENING", "오프닝 세션 제목", "연사 정보는 추후 공개됩니다.", "행사 시작 및 웨비나 안내"],
  ["02", "시간 미정", "SESSION", "세션 제목", "연사 정보는 추후 공개됩니다.", "변화하는 환경에 대한 실무 인사이트"],
  ["03", "시간 미정", "TALK", "토크 세션 제목", "연사 정보는 추후 공개됩니다.", "질문과 대화로 이어지는 마무리"],
];

const initialFields = { name: "", company: "", department: "", position: "", email: "", phone: "", agreement: false };
type Fields = typeof initialFields;
type SubmitStatus = "idle" | "sending" | "success" | "error";

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function StandardLogoPlaceholder({ className = "" }: { className?: string }) {
  return <span className={`standard-logo-placeholder ${className}`} role="img" aria-label="THE STANDARD 이미지 로고 자리">LOGO IMAGE</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof Fields, string>> = {};

    (["name", "company", "department", "position", "email", "phone"] as const).forEach((field) => {
      if (!fields[field].trim()) nextErrors[field] = "필수 입력 항목입니다.";
    });
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) nextErrors.email = "올바른 이메일 주소를 입력해 주세요.";
    if (fields.phone && !/^01[0-9]-?\d{3,4}-?\d{4}$/.test(fields.phone)) nextErrors.phone = "휴대폰 번호를 확인해 주세요. 예: 010-0000-0000";
    if (!fields.agreement) nextErrors.agreement = "개인정보 수집 및 이용에 동의해 주세요.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (!GAS_WEB_APP_URL) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      // Apps Script는 application/json 요청에 대한 CORS preflight를 처리하지 않으므로 text/plain을 사용합니다.
      const response = await fetch(GAS_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...fields,
          privacyConsent: fields.agreement,
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });
      const result = await response.json();
      setStatus(response.ok && result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="페이지 상단으로 이동"><StandardLogoPlaceholder /></a>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#apply">무료 등록하기 <Arrow /></a>
        <button className="menu-button" aria-label="메뉴 열기" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-head"><StandardLogoPlaceholder /><button onClick={() => setMenuOpen(false)} aria-label="메뉴 닫기">×</button></div>
        <nav>{navItems.map(([label, href], index) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}<Arrow /></a>)}</nav>
      </div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb orb-one" aria-hidden="true" />
          <div className="hero-orb orb-two" aria-hidden="true" />
          <div className="hero-inner">
            <p className="eyebrow reveal">ONLINE WEBINAR <span>·</span> 2026</p>
            <h1 id="hero-title"><span className="hero-logo reveal delay-1"><StandardLogoPlaceholder /></span><strong className="reveal delay-2">AI 에이전트 시대,</strong><strong className="reveal delay-3">변하지 않는 마케팅의 표준</strong></h1>
            <div className="hero-bottom reveal delay-4">
              <div className="event-meta"><div><small>FORMAT</small><b>온라인 웨비나</b></div><div><small>DATE</small><b>2026. 09. 17 <em>(THU)</em></b></div></div>
              <a className="button button-primary hero-cta" href="#apply">무료 등록하기 <Arrow /></a>
            </div>
          </div>
        </section>

        <section id="about" className="section section-about">
          <div className="section-index"><span>01</span><span>WHY THIS WEBINAR</span></div>
          <div className="about-card observe">
            <p className="section-kicker">THE QUESTION</p>
            <h2>AI가 바꾸는 것은<br /><em>실행의 방식</em>입니다.<br />기준까지 바꿀 필요는 없습니다.</h2>
            <div className="about-copy"><p>AI 에이전트는 마케팅의 실행 방식을 빠르게 바꾸고 있습니다. 하지만 고객을 이해하고, 올바른 질문을 설계하며, 성과를 검증하는 마케팅의 기준은 달라지지 않습니다.</p><p>이번 웨비나에서는 변화하는 기술 환경 속에서도 놓치지 말아야 할 마케팅의 표준과 AI 에이전트를 실무에 적용하는 관점을 함께 살펴봅니다.</p></div>
          </div>
        </section>

        <section id="speaker" className="section">
          <div className="section-index"><span>02</span><span>WHO&apos;S SPEAKING</span></div>
          <div className="title-row observe"><h2>Speaker</h2><p>연사 정보는 순차적으로 공개됩니다.</p></div>
          <div className="speaker-grid">
            {speakers.map((speaker, index) => <article className="speaker-card observe" key={speaker} style={{ transitionDelay: `${index * 100}ms` }}><div className="speaker-portrait"><span>{speaker}</span><div className="portrait-shape" aria-hidden="true" /></div><div className="speaker-info"><small>연사 정보 준비 중</small><h3>이름 <span>추후 공개</span></h3><p>소속 · 직책 정보가 제공될 예정입니다.</p><div className="topic-line"><span>발표 주제</span><b>세션 주제 준비 중 <Arrow /></b></div></div></article>)}
          </div>
        </section>

        <section id="program" className="section section-program">
          <div className="section-index"><span>03</span><span>PROGRAM AT A GLANCE</span></div>
          <div className="title-row observe"><h2>Time Table</h2><p>세부 시간과 프로그램은 변경될 수 있습니다.</p></div>
          <div className="timetable observe"><div className="table-heading"><span>NO.</span><span>TIME</span><span>PROGRAM</span><span>DETAIL</span></div>
            {timetable.map(([num, time, type, title, speaker, description]) => <article className="time-row" key={num}><span className="time-num">{num}</span><span className="time-slot">{time}</span><div className="session-title"><small>{type}</small><h3>{title}</h3></div><div className="session-detail"><b>{speaker}</b><p>{description}</p></div><Arrow /></article>)}
          </div>
        </section>

        <section id="apply" className="section section-apply">
          <div className="apply-card observe">
            <div className="apply-intro"><h2>무료로<br />웨비나에<br /><em>등록하세요.</em></h2><p>등록 정보를 남겨주시면 웨비나 참여 방법을 이메일로 안내해 드립니다.</p><dl><div><dt>DATE</dt><dd>2026년 9월 17일 (목)</dd></div><div><dt>FORMAT</dt><dd>온라인 웨비나</dd></div><div><dt>FEE</dt><dd>무료</dd></div></dl></div>
            <div className="form-area">
              {status === "success" ? <div className="success-message" role="status"><span>✓</span><p className="section-kicker">REGISTRATION COMPLETE</p><h3>등록이 완료되었습니다.</h3><p>참여 방법은 입력하신 이메일로 안내드릴 예정입니다.<br />2026년 9월 17일(목)에 만나요.</p><button className="button button-light" onClick={() => { setStatus("idle"); setFields(initialFields); }}>다른 참가자 등록하기</button></div> : <form onSubmit={submitForm} noValidate><div className="form-heading"><p>등록 정보</p><span><b>*</b> 필수 입력</span></div><div className="form-grid">
                {([ ["name", "이름", "이름을 입력해 주세요", "text"], ["company", "회사", "회사명을 입력해 주세요", "text"], ["department", "부서", "부서를 입력해 주세요", "text"], ["position", "직책", "직책을 입력해 주세요", "text"], ["email", "이메일", "name@company.com", "email"], ["phone", "휴대폰번호", "010-0000-0000", "tel"] ] as const).map(([key, label, placeholder, type]) => <label key={key} className={`form-field ${errors[key] ? "has-error" : ""}`}><span>{label} <b>*</b></span><input type={type} placeholder={placeholder} value={fields[key]} onChange={(event) => updateField(key, event.target.value)} aria-invalid={Boolean(errors[key])} />{errors[key] && <small role="alert">{errors[key]}</small>}</label>)}
              </div><label className={`agreement ${errors.agreement ? "has-error" : ""}`}><input type="checkbox" checked={fields.agreement} onChange={(event) => updateField("agreement", event.target.checked)} /><span><a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer">개인정보 수집 및 이용</a>에 동의합니다. <b>(필수)</b></span></label>{errors.agreement && <small className="agree-error" role="alert">{errors.agreement}</small>}<button className="button button-primary submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "등록 중입니다..." : <>무료 등록하기 <Arrow /></>}</button>{status === "error" && <p className="submit-error" role="alert">등록 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>}</form>}
            </div>
          </div>
        </section>
      </main>
      <footer><div><StandardLogoPlaceholder className="footer-logo" /><p>AI 에이전트 시대, 변하지 않는 마케팅의 표준<br />2026. 09. 17 (THU) · ONLINE WEBINAR</p></div><div className="footer-right"><span className="host-placeholder">HOST LOGO</span><a href="#top">BACK TO TOP ↑</a><small>© 2026 Martinee io. All Rights Reserved</small></div></footer>
    </>
  );
}
