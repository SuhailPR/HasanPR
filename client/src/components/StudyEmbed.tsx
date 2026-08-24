/**
 * Style reminder — «دفتر المُحمِّص»: ورق عاجي، حبر كحلي، ونحاس تحميص؛
 * المحتوى المصدر محفوظ حرفياً ويُعرض داخل إطار مستقل بترتيب الأقسام الأصلي.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import sourceDocument from "@/data/HasanPRBYB.html?raw";

const studyEnhancements = String.raw`
  :root {
    --p: #101b33; --p-l: #162845; --p-d: #0b1427;
    --accent: #c28b45; --accent-l: #efd9ad; --accent-d: #9b672d;
    --bg: #f6f1e8; --card: #fffdfa; --txt: #28364a; --txt-l: #667487;
    --brd: #e8dfcf; --sh: 0 18px 42px rgba(16,27,51,.08); --r: 18px; --rs: 12px;
  }

  * { box-sizing: border-box; }
  html { background: var(--bg); scroll-behavior: smooth; overflow-x: hidden; }
  body { background: radial-gradient(circle at 80% 0%, rgba(194,139,69,.12), transparent 26rem), var(--bg); color: var(--txt); font-family: 'Noto Sans Arabic', Tahoma, Arial, sans-serif; font-size: 15px; line-height: 1.95; overflow-x: hidden; }
  body::before { content: ''; pointer-events: none; position: fixed; inset: 0; opacity: .22; z-index: -1; background-image: url('/manus-storage/roastery-paper-texture_88d7eb0e.jpg'); background-size: 680px auto; mix-blend-mode: multiply; }

  .cover { min-height: min(90vh, 760px); padding: clamp(64px, 10vw, 128px) 24px; background: linear-gradient(112deg, rgba(9,18,35,.96), rgba(17,35,65,.9) 48%, rgba(16,31,56,.75)), url('/manus-storage/roastery-hero_3fdb8598.jpg') center/cover; isolation: isolate; }
  .cover::before { inset: 0; width: auto; height: auto; top: 0; left: 0; opacity: 1; background: radial-gradient(circle at 78% 28%, rgba(194,139,69,.24), transparent 20rem), linear-gradient(180deg, rgba(10,18,35,.1), rgba(10,18,35,.68)); animation: none; }
  .cover::after { content: ''; position: absolute; z-index: -1; inset: 18px; border: 1px solid rgba(239,217,173,.28); border-radius: 28px; }
  .cover-content { max-width: 790px; padding: 24px; }
  .cover-icon { width: 106px; height: 106px; display: grid; place-items: center; margin: 0 auto 24px; font-size: 0; border: 1px solid rgba(239,217,173,.52); border-radius: 50%; background: rgba(12,26,49,.55) url('/manus-storage/roastery-mark_e06e81f0.png') center/72px no-repeat; box-shadow: 0 0 0 12px rgba(194,139,69,.07), 0 16px 34px rgba(0,0,0,.18); }
  .cover h1 { font-family: 'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif; font-size: clamp(2rem, 5.5vw, 4rem); letter-spacing: -.04em; text-shadow: 0 14px 28px rgba(0,0,0,.25); }
  .cover h2 { font-size: clamp(1rem, 2.2vw, 1.35rem); letter-spacing: .02em; max-width: 680px; margin-inline: auto; }
  .cover-badge { border-radius: 999px; padding: 9px 22px; box-shadow: 0 12px 22px rgba(0,0,0,.22); }
  .cover-meta { gap: 12px 20px; }

  .container { max-width: 1120px; padding: clamp(28px, 5vw, 62px) 18px; }
  .section { position: relative; isolation: isolate; overflow: visible; margin-bottom: clamp(22px, 4vw, 38px); background: linear-gradient(118deg, rgba(255,253,250,.98), rgba(250,245,236,.96)), url('/manus-storage/roastery-paper-texture_88d7eb0e.jpg'); background-size: auto, 510px auto; border: 1px solid var(--brd); border-radius: var(--r); box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 18px 42px rgba(16,27,51,.08), 7px 8px 0 rgba(194,139,69,.055); }
  .section::before { content: ''; position: absolute; right: 23px; top: -1px; z-index: 3; width: 86px; height: 4px; background: var(--accent); border-radius: 0 0 6px 6px; box-shadow: 18px 0 0 rgba(194,139,69,.22); }
  .section::after { content: ''; position: absolute; z-index: -1; left: 18px; bottom: 20px; width: 72px; height: 72px; opacity: .075; background: url('/manus-storage/roastery-mark_e06e81f0.png') center/contain no-repeat; filter: sepia(.45); }
  .section-header { position: relative; min-height: 88px; padding: 19px clamp(18px, 3vw, 32px); border-radius: var(--r) var(--r) 0 0; background: linear-gradient(105deg, #101b33, #172b4a); box-shadow: inset 0 -1px 0 rgba(255,255,255,.12); }
  .section:nth-of-type(3n) .section-header { background: linear-gradient(105deg, #17283e, #2a3f59); }
  .section:nth-of-type(5n) .section-header { background: linear-gradient(105deg, #13243c, #35506c); }
  .section-header:hover { filter: none; background: linear-gradient(105deg, #14213c, #1b3255); }
  .section-header .icon { width: 38px; height: 38px; display: grid; place-items: center; font-size: 1.25rem; border: 1px solid rgba(239,217,173,.28); border-radius: 12px; background: rgba(255,255,255,.08); }
  .section-header h2 { font-family: 'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif; font-size: clamp(1rem, 2vw, 1.34rem); line-height: 1.65; }
  .section-header .toggle { flex: 0 0 auto; width: 36px; height: 36px; background: rgba(194,139,69,.18); border: 1px solid rgba(239,217,173,.28); }
  .chapter-tab { position: absolute; top: -14px; left: 25px; z-index: 4; min-width: 74px; padding: 5px 10px 6px; color: #4f3515; background: #e9c98d; border: 1px solid rgba(255,255,255,.45); border-radius: 0 0 10px 10px; box-shadow: 0 6px 10px rgba(16,27,51,.1); font-family: 'Noto Kufi Arabic', sans-serif; font-size: .62rem; text-align: center; letter-spacing: .04em; }
  .section-body { padding: clamp(24px, 4vw, 40px); }
  .section-opening { position: relative; margin: 0 0 28px; padding: 17px 19px 17px 24px; color: #24364d; border-right: 3px solid var(--accent); border-radius: 0 12px 12px 0; background: linear-gradient(90deg, rgba(239,217,173,.29), rgba(255,253,249,.22)); font-size: clamp(.98rem, 1.7vw, 1.12rem); line-height: 2.1; box-shadow: 0 1px 0 rgba(255,255,255,.8) inset; }
  .section-opening::before { content: 'موجز الفصل'; display: block; margin-bottom: 5px; color: #a56d2b; font-family: 'Noto Kufi Arabic', sans-serif; font-size: .66rem; font-weight: 700; letter-spacing: .04em; }

  h3 { position: relative; font-family: 'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif; font-size: clamp(1rem, 1.9vw, 1.25rem); margin-top: 34px; padding-bottom: 11px; border-bottom-color: var(--accent-l); }
  h3::after { content: ''; position: absolute; right: 0; bottom: -2px; width: 46px; height: 3px; border-radius: 2px; background: var(--accent); }
  h3:first-child { margin-top: 0; }
  h4 { font-weight: 800; }
  p { line-height: 2; }
  strong { font-weight: 800; }

  .table-scroll { width: 100%; overflow-x: auto; overscroll-behavior-inline: contain; margin: 20px 0; border: 1px solid var(--brd); border-radius: 12px; background: rgba(255,253,249,.88); box-shadow: 0 8px 18px rgba(16,27,51,.035); scrollbar-color: var(--accent) #f3eadc; scrollbar-width: thin; }
  .table-scroll table { min-width: 680px; margin: 0; border-collapse: separate; border-spacing: 0; }
  table { color: var(--txt); }
  thead th { position: sticky; top: 0; padding: 13px 15px; background: #14233e; font-family: 'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif; font-size: .78rem; }
  tbody td { padding: 12px 15px; vertical-align: top; }
  tbody tr:nth-child(even) { background: #faf7f0; }
  tbody tr:hover { background: #f4eddf; }
  .badge { padding: 4px 11px; border-radius: 999px; white-space: nowrap; }

  .stats-grid { gap: 13px; margin: 26px 0; }
  .stat-card { position: relative; overflow: hidden; min-height: 138px; border-radius: 15px; background: linear-gradient(135deg, #fffdfa, #f5eddf); box-shadow: 0 8px 18px rgba(16,27,51,.04); }
  .stat-card::after { content: ''; position: absolute; inset: auto -15px -28px auto; width: 72px; height: 72px; border: 1px solid rgba(194,139,69,.24); border-radius: 50%; }
  .stat-card .number { font-family: 'Noto Kufi Arabic', sans-serif; font-size: clamp(1.25rem, 2.6vw, 1.75rem); }

  .alert { align-items: flex-start; border-radius: 13px; box-shadow: inset 0 0 0 1px rgba(16,27,51,.03), 0 7px 15px rgba(16,27,51,.025); }
  .section-body > .alert:first-child { position: relative; margin: 0 0 28px; padding: 19px 20px; font-size: .96rem; }
  .swot-grid { gap: 14px; }
  .swot-box { border-width: 1px; border-radius: 14px; box-shadow: 0 8px 18px rgba(16,27,51,.03); }
  .persona-card { border-radius: 16px; box-shadow: 0 12px 28px rgba(16,27,51,.04); }
  .timeline { padding-right: 38px; }
  .timeline::before { width: 2px; }
  .timeline-item { border-radius: 14px; background: #fffdf9; box-shadow: 0 8px 18px rgba(16,27,51,.035); }
  .risk-matrix { min-width: 580px; }
  .bmc-grid { border: 1px solid var(--brd); box-shadow: 0 12px 24px rgba(16,27,51,.04); }

  @media (max-width: 720px) {
    body { font-size: 14px; line-height: 1.85; }
    .cover { min-height: 640px; padding: 72px 18px; }
    .cover::after { inset: 12px; border-radius: 20px; }
    .cover-content { padding: 18px 4px; }
    .cover-icon { width: 82px; height: 82px; margin-bottom: 18px; background-size: 56px; }
    .cover-meta { flex-direction: column; align-items: center; }
    .container { padding-inline: 12px; }
    .section { border-radius: 14px; }
    .section::before { right: 18px; width: 62px; }
    .section-header { min-height: 66px; padding: 14px 16px; gap: 9px; }
    .section-header .icon { width: 33px; height: 33px; font-size: 1rem; border-radius: 10px; }
    .section-header .toggle { width: 31px; height: 31px; }
    .section-body { padding: 24px 16px; }
    .chapter-tab { left: 16px; min-width: 64px; padding-inline: 8px; font-size: .56rem; }
    .section-opening { padding: 14px 15px 14px 18px; font-size: .94rem; }
    .stats-grid, .swot-grid, .persona-grid { grid-template-columns: 1fr; }
    .stat-card { min-height: 108px; padding: 17px; }
    .bmc-grid, .bmc-full { display: block; }
    .bmc-box { border-bottom: 1px solid var(--brd); }
    .risk-matrix { font-size: .7rem; }
    .alert { padding: 14px 15px; }
    .timeline { padding-right: 26px; }
    .timeline-item::before { right: -21px; }
  }

  @media (prefers-reduced-motion: no-preference) {
    .section { animation: settle .38s cubic-bezier(.23,1,.32,1) both; }
    .section:nth-of-type(2n) { animation-delay: .04s; }
    @keyframes settle { from { opacity: .88; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  }
`;

const enhancementScript = String.raw`
<script>
  (function () {
    document.querySelectorAll('.section').forEach(function (section, index) {
      section.classList.remove('collapsed');
      var header = section.querySelector('.section-header');
      if (header && !header.querySelector('.chapter-tab')) {
        var tab = document.createElement('span');
        tab.className = 'chapter-tab';
        tab.textContent = 'الفصل ' + String(index + 1).padStart(2, '0');
        header.appendChild(tab);
      }
      var opening = section.querySelector('.section-body > p:first-child');
      if (opening) opening.classList.add('section-opening');
    });
    document.querySelectorAll('.section-body table').forEach(function (table) {
      if (table.parentElement && !table.parentElement.classList.contains('table-scroll')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'table-scroll';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
    var queuedFrame = 0;
    function reportHeight() {
      queuedFrame = 0;
      var root = document.documentElement;
      var body = document.body;
      var content = document.querySelector('.container');
      var contentBottom = content ? Math.ceil(content.getBoundingClientRect().bottom) : 0;
      var h = Math.max(body.scrollHeight, root.scrollHeight, body.offsetHeight, root.offsetHeight, contentBottom);
      parent.postMessage({ source: 'hasanprbyb-study', height: h }, '*');
    }
    function queueHeightReport() {
      if (queuedFrame) cancelAnimationFrame(queuedFrame);
      queuedFrame = requestAnimationFrame(reportHeight);
    }
    window.addEventListener('load', queueHeightReport);
    window.addEventListener('resize', queueHeightReport);
    window.addEventListener('orientationchange', queueHeightReport);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(queueHeightReport).observe(document.body);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueHeightReport);
    [80, 260, 700, 1500, 2600].forEach(function (delay) { setTimeout(queueHeightReport, delay); });
  })();
</script>`;

function prepareDocument(documentHtml: string) {
  return documentHtml
    .replace(
      "</head>",
      `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet"></head>`,
    )
    .replace("</style>", `${studyEnhancements}</style>`)
    .replace("</body>", `${enhancementScript}</body>`);
}

type StudyEmbedProps = {
  onFrameReady?: (frame: HTMLIFrameElement) => void;
};

export function StudyEmbed({ onFrameReady }: StudyEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(2600);
  const documentSource = useMemo(() => prepareDocument(sourceDocument), []);

  const updateHeight = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    const nextHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight) + 8;
    setFrameHeight(Math.max(1200, nextHeight));
  }, []);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.source === "hasanprbyb-study" && typeof event.data.height === "number") {
        setFrameHeight(Math.max(1200, Math.ceil(event.data.height) + 8));
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return (
    <iframe
      ref={frameRef}
      title="دراسة جدوى محل تحميص وطحن قهوة"
      srcDoc={documentSource}
      className="study-frame"
      style={{ height: `${frameHeight}px` }}
      onLoad={() => {
        updateHeight();
        if (frameRef.current) onFrameReady?.(frameRef.current);
      }}
    />
  );
}
