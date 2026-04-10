'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {

      /* ── COVER: load animation ── */
      const loadTl = gsap.timeline({ delay: 0.2 })
      loadTl
        .from('.cover-tag', { opacity: 0, y: 8, duration: 0.5, ease: 'power3.out' })
        .from('.cover-word', {
          opacity: 0, y: 50, rotationX: 20,
          stagger: 0.06, duration: 0.7, ease: 'power4.out',
        }, '-=0.2')
        .from('.cover-sub', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from('.cover-lines-anim', { opacity: 0, y: 10, stagger: 0.04, duration: 0.3, ease: 'power3.out' }, '-=0.2')
        .from('.cover-btn', { opacity: 0, y: 16, scale: 0.95, duration: 0.5, ease: 'power3.out' }, '-=0.15')
        .from('.cover-meta span', { opacity: 0, stagger: 0.05, duration: 0.3, ease: 'power3.out' }, '-=0.15')
        .from('.cover-warning', { opacity: 0, duration: 0.4 }, '-=0.1')

      /* ── COVER: pin + scroll exit ── */
      gsap.timeline({
        scrollTrigger: {
          trigger: coverRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })
        .to({}, { duration: 0.4 })
        .to('.cover-content', { opacity: 0, y: -40, scale: 0.97, duration: 0.3, ease: 'power2.in' })
        .to('.scroll-hint', { opacity: 0, duration: 0.15 }, '<')

      /* ── PAPER: slides up ── */
      if (paperRef.current) {
        gsap.from(paperRef.current, {
          y: 100, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: paperRef.current, start: 'top 88%', once: true },
        })

        // Instructions
        gsap.from('.instructions-anim', {
          opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.instructions-anim', start: 'top 82%', once: true },
        })

        // Exam fields
        gsap.from('.exam-field-anim', {
          opacity: 0, x: -16, stagger: 0.05, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: '.exam-header-anim', start: 'top 80%', once: true },
        })

        // Questions
        gsap.from('.q-anim', {
          opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.q-anim', start: 'top 84%', once: true },
        })

        // Table rows slide in
        gsap.from('.table-row-anim', {
          opacity: 0, x: -24, stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.table-row-anim', start: 'top 86%', once: true },
        })

        // Bar fills
        paperRef.current.querySelectorAll<HTMLElement>('.table-bar-fill').forEach((bar) => {
          gsap.to(bar, {
            width: `${bar.dataset.w ?? 0}%`, duration: 1.3, ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
          })
        })

        // Keywords bounce in
        gsap.from('.kw-anim', {
          opacity: 0, scale: 0.75, stagger: 0.035, duration: 0.4, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.kw-anim', start: 'top 85%', once: true },
        })

        // Margin notes fade in with slight drift
        gsap.from('.margin-anim', {
          opacity: 0, x: 20, stagger: 0.2, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.margin-anim', start: 'top 80%', once: true },
        })

        // Final grade rubber stamp
        gsap.from('.stamp-anim', {
          scale: 3, rotation: -15, opacity: 0, duration: 0.6, ease: 'power4.out',
          scrollTrigger: { trigger: '.stamp-anim', start: 'top 78%', once: true },
        })

        // Grade number
        gsap.from('.grade-mark-anim', {
          scale: 1.8, opacity: 0, duration: 0.7, ease: 'power4.out',
          scrollTrigger: { trigger: '.grade-mark-anim', start: 'top 80%', once: true },
        })

        gsap.from('.grade-comment-anim', {
          opacity: 0, y: 16, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.grade-comment-anim', start: 'top 85%', once: true },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const titleWords = ['Does', 'your', 'resume', 'pass', 'the']

  return (
    <div ref={containerRef}>

      {/* ── BLUE COVER ── */}
      <section ref={coverRef} className="cover-page">
        <div className="cover-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>

          <p className="cover-tag">Examination Booklet</p>

          <h1 className="cover-title" style={{ perspective: 400, marginBottom: 4 }}>
            {titleWords.map((w, i) => (
              <span key={i} className="cover-word" style={{ display: 'inline-block', marginRight: '0.28em' }}>{w}</span>
            ))}
            <br />
            <span className="cover-word" style={{ display: 'inline-block' }}>
              <em>test?</em>
            </span>
          </h1>

          <p className="cover-sub">
            76% of resumes are automatically failed by ATS screening
            before a human ever opens the file.
          </p>

          {/* Cover writing lines — like a real blue book */}
          <div className="cover-lines">
            <div className="cover-line-field cover-lines-anim">
              <span>Name</span><div className="cover-line-blank" />
            </div>
            <div className="cover-line-field cover-lines-anim">
              <span>Course</span><div className="cover-line-blank" />
            </div>
            <div className="cover-line-field cover-lines-anim">
              <span>Date</span><div className="cover-line-blank" />
            </div>
          </div>

          <Link href="/analyzer" className="cover-btn" style={{ marginTop: 8 }}>Begin Examination →</Link>

          <div className="cover-meta">
            <span>DR4FT / Spring 2026</span>
            <span>Time: 30 seconds</span>
            <span>100 points</span>
          </div>

          <p className="cover-warning" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.15)',
            marginTop: 8,
          }}>
            Do not open this booklet until instructed to do so
          </p>
        </div>

        <div className="scroll-hint">
          <span>Open booklet</span>
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── WHITE PAPER PAGE ── */}
      <div className="paper-page" ref={paperRef}>
        {/* Physical details */}
        <div className="staple" />
        <div className="paper-margin-line" />
        <div className="fold-crease" />

        <div className="paper-inner">

          {/* Exam header */}
          <div className="exam-header exam-header-anim">
            <div>
              <div className="exam-field exam-field-anim">Name: <span className="fill-blank">Your Resume</span></div>
              <div className="exam-field exam-field-anim">Date: <span className="fill-blank">Today</span></div>
              <div className="exam-field exam-field-anim">Course: <span className="fill-blank">ATS 101 — Resume Screening</span></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="exam-field exam-field-anim">Instructor: <span className="fill-blank">The Algorithm</span></div>
              <div className="exam-field exam-field-anim">Section: <span className="fill-blank">Job Applications</span></div>
              <div className="exam-field exam-field-anim">Time Allowed: <span className="fill-blank">30 seconds</span></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="exam-instructions instructions-anim">
            <div className="exam-instructions-title">Instructions</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--color-pencil)', lineHeight: 1.9, margin: 0 }}>
              Upload your resume in PDF or DOCX format and select a target role.
              Your submission will be graded on ATS compatibility, keyword match, format compliance, and section coverage.
              A score of 60% or higher is required to pass. You may resubmit as many times as needed.
            </p>
          </div>

          {/* Q1 */}
          <div className="question q-anim">
            <div className="q-num">QUESTION 1 — 40 POINTS</div>
            <div className="q-text">Does your resume contain the required keywords for the target role?</div>
            <div className="q-answer">
              Your resume matched 44% of required keywords. 10 critical terms are
              completely absent. ATS systems don&apos;t infer synonyms... they match exact strings.
            </div>
            <div className="margin-note margin-anim">
              Needs work! Missing too many terms.
            </div>
          </div>

          <div className="page-divider"><span>Score Report</span></div>

          {/* Score table */}
          <table className="exam-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'ATS Compatibility', val: 31, cls: 'fail', grade: 'F' },
                { name: 'Keyword Match', val: 44, cls: 'fail', grade: 'D-' },
                { name: 'Format Compliance', val: 87, cls: 'pass', grade: 'B+' },
                { name: 'Section Coverage', val: 62, cls: 'mid', grade: 'C' },
              ].map((r) => (
                <tr key={r.name} className="table-row-anim">
                  <td>{r.name}</td>
                  <td><span className={`val ${r.cls}`}>{r.val}%</span></td>
                  <td>
                    <span className={`circled-grade ${r.val >= 60 ? 'pass' : ''}`} style={{ width: 36, height: 36, fontSize: 14 }}>
                      {r.grade}
                    </span>
                  </td>
                  <td>
                    <div className="table-bar">
                      <div className={`table-bar-fill ${r.cls}`} data-w={r.val} />
                    </div>
                  </td>
                  <td>
                    <span className={`stamp ${r.val >= 60 ? 'pass' : 'fail'}`}>
                      {r.val >= 60 ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="page-divider"><span>Continue to Question 2</span></div>

          {/* Q2 */}
          <div className="question q-anim">
            <div className="q-num">QUESTION 2 — 30 POINTS</div>
            <div className="q-text">
              List the <span className="red-underline">missing keywords</span> that would have earned you the interview.
            </div>
            <div className="margin-note blue margin-anim">
              These are the exact terms the ATS scans for.
            </div>
          </div>

          <div className="highlight-box">
            <div className="highlight-label">Highlighted Terms — Not Found in Submission</div>
            <div className="kw-grid">
              {['Kubernetes', 'FastAPI', 'Python 3.x', 'CI/CD pipelines', 'Docker', 'Agile', 'REST APIs', 'PostgreSQL', 'Microservices', 'AWS'].map((kw) => (
                <span key={kw} className="kw-chip kw-anim">{kw}</span>
              ))}
            </div>
          </div>

          <div className="page-divider"><span>Continue to Question 3</span></div>

          {/* Q3 */}
          <div className="question q-anim">
            <div className="q-num">QUESTION 3 — 30 POINTS</div>
            <div className="q-text">What corrections must be made before resubmission?</div>
            <div className="q-answer">
              <span className="red-strike">Improved system performance</span> →
              &quot;Reduced API response time by 40% using Redis caching.&quot;
              Add technical keywords verbatim. Add a dedicated Skills section.
            </div>
            <div className="margin-note margin-anim">
              Quantify everything. Numbers score higher.
            </div>
          </div>

          <div className="page-divider"><span>End of Examination</span></div>

          {/* Final grade */}
          <div className="final-grade">
            <div>
              <div className="final-grade-label">Final Score</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
                <div className="final-grade-mark grade-mark-anim" style={{ color: 'var(--color-red-grade)' }}>
                  31/100
                </div>
                <span className="rubber-stamp fail stamp-anim">Needs Revision</span>
              </div>
              <div className="final-grade-comment grade-comment-anim">
                Strong formatting, but the content doesn&apos;t match what the grading system expects.
                Add the missing keywords from Q2 verbatim and resubmit.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="paper-cta">
            <div className="paper-cta-title">Ready to retake the exam?</div>
            <p className="paper-cta-body">
              Upload your resume and get your full score in 30 seconds. No account required.
            </p>
            <Link href="/analyzer" className="paper-btn">Submit for Grading →</Link>
          </div>

          <div className="page-num">— Page 1 of 1 —</div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        background: 'var(--color-cover-deep)',
      }}>
        <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)' }}>
          DR4FT — AI Resume Intelligence
        </span>
        <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.15)' }}>
          built by Thomas Ou
        </span>
      </footer>
    </div>
  )
}
