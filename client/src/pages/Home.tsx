/**
 * Style reminder — «دفتر المُحمِّص»: واجهة تقرير تحريرية بألوان الحبر والورق والنحاس،
 * تعمل كإطار تنقّل محسّن للمحتوى الأصلي دون تغيير نصوصه أو ترتيب أقسامه.
 */
import { Menu, Printer, Share2, ChevronUp, Coffee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { StudyEmbed } from "@/components/StudyEmbed";

const sections = [
  ["sec1", "01", "الملخص التنفيذي"],
  ["sec2", "02", "وصف المشروع"],
  ["sec3", "03", "تحليل السوق"],
  ["sec4", "04", "شخصية العميل"],
  ["sec5", "05", "تحليل المنافسين"],
  ["sec6", "06", "تحليل الموردين"],
  ["sec7", "07", "نموذج العمل"],
  ["sec8", "08", "المستلزمات"],
  ["sec9", "09", "تحليل المخاطر"],
  ["sec10", "10", "التحليل المالي"],
  ["sec11", "11", "المتطلبات القانونية"],
  ["sec12", "12", "استراتيجية التسويق"],
  ["sec13", "13", "خارطة الطريق"],
  ["sec14", "14", "خطة النمو"],
  ["sec15", "15", "بحث السوق"],
  ["sec16", "16", "التقييم والخطوات التالية"],
] as const;

export default function Home() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 650);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id: string) => {
    const target = frameRef.current?.contentDocument?.getElementById(id);
    if (!target) return;
    const frameTop = frameRef.current?.getBoundingClientRect().top ?? 0;
    const pageTop = window.scrollY + frameTop + target.getBoundingClientRect().top - 92;
    window.scrollTo({ top: pageTop, behavior: "smooth" });
    setMenuOpen(false);
  };

  const printStudy = () => frameRef.current?.contentWindow?.print();

  const shareStudy = async () => {
    const shareData = { title: "دراسة جدوى محل تحميص وطحن قهوة", text: "دراسة جدوى شاملة لمشروع محل تحميص وطحن قهوة." };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="site-shell" dir="rtl">
      <div className="reading-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="العودة إلى بداية الدراسة">
          <img src="/manus-storage/roastery-mark_e06e81f0.png" alt="رمز حبة قهوة وخط نمو" className="brand-mark" />
          <span>
            <strong>دفتر المُحمِّص</strong>
            <small>دراسة جدوى متكاملة</small>
          </span>
        </a>
        <div className="header-actions">
          <button className="header-action nav-trigger" type="button" onClick={() => setMenuOpen(true)} aria-label="فتح فهرس الدراسة">
            <Menu size={18} />
            <span>الفهرس</span>
          </button>
          <button className="header-action desktop-action" type="button" onClick={shareStudy} aria-label="مشاركة الدراسة">
            <Share2 size={17} />
            <span>مشاركة</span>
          </button>
          <button className="print-action" type="button" onClick={printStudy}>
            <Printer size={17} />
            <span>طباعة الدراسة</span>
          </button>
        </div>
      </header>

      <nav className={`mobile-index ${menuOpen ? "is-open" : ""}`} aria-label="فهرس الدراسة">
        <button className="index-backdrop" onClick={() => setMenuOpen(false)} aria-label="إغلاق الفهرس" />
        <div className="index-panel">
          <div className="index-heading">
            <div><small>دليل القراءة</small><h2>فهرس الدراسة</h2></div>
            <button className="close-index" type="button" onClick={() => setMenuOpen(false)} aria-label="إغلاق الفهرس">×</button>
          </div>
          <div className="index-list">
            {sections.map(([id, number, label]) => (
              <button key={id} type="button" onClick={() => goToSection(id)}>
                <span>{number}</span><b>{label}</b>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main id="top" className="study-layout">
        <aside className="desktop-index" aria-label="فهرس الدراسة">
          <div className="desktop-index-top">
            <img src="/manus-storage/roastery-insight_a820f344.jpg" alt="بن وأدوات قياس ضمن دراسة المحمصة" />
            <div><Coffee size={16} /><span>دليل القراءة</span></div>
            <h2>دراسة جدوى<br />قابلة للتنفيذ</h2>
          </div>
          <div className="index-list">
            {sections.map(([id, number, label]) => (
              <button key={id} type="button" onClick={() => goToSection(id)}>
                <span>{number}</span><b>{label}</b>
              </button>
            ))}
          </div>
        </aside>
        <section className="study-content" aria-label="محتوى دراسة الجدوى">
          <StudyEmbed onFrameReady={(frame) => { frameRef.current = frame; }} />
        </section>
      </main>

      {showTop && (
        <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="العودة إلى الأعلى">
          <ChevronUp size={21} />
        </button>
      )}
    </div>
  );
}
