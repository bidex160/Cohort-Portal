"use client";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarClock,
  Check,
  CircleCheck,
  Clock,
  CreditCard,
  Download,
  FileHeart,
  FileSignature,
  HeartHandshake,
  Mail,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Upload,
  WalletCards,
} from "lucide-react";

const hospitals = [
  "National Hospital Abuja",
  "Federal Medical Centre Abuja (Jabi)",
  "University of Abuja Teaching Hospital",
  "Federal Medical Centre Keffi",
  "Jos University Teaching Hospital",
  "National Orthopaedic Hospital Igbobi",
  "Federal Neuropsychiatric Hospital Yaba",
  "Federal Medical Centre Ebute-Metta",
  "University College Hospital Ibadan",
  "Obafemi Awolowo University Teaching Hospitals Complex",
  "University of Port Harcourt Teaching Hospital",
  "University of Uyo Teaching Hospital",
  "University of Benin Teaching Hospital",
  "Aminu Kano Teaching Hospital",
  "Federal Neuropsychiatric Hospital Kano",
  "Federal Medical Centre Birnin Kudu",
  "Federal Medical Centre Jalingo",
  "Abubakar Tafawa Balewa University Teaching Hospital",
];
type FormState = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
};
const emptyForm: FormState = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
};
const organiserEmail = "primeddiagnostics@gmail.com";
const programmeWhatsApp = "2348052058628";

function nextBriefingSlots() {
  const slots: { start: Date; end: Date; label: string }[] = [];
  const day = new Date();
  day.setUTCDate(day.getUTCDate() + 1);
  day.setUTCHours(0, 0, 0, 0);
  while (slots.length < 4) {
    const weekday = day.getUTCDay();
    if (weekday !== 0 && weekday !== 6) {
      for (const utcHour of [9, 13]) {
        if (slots.length === 4) break;
        const start = new Date(day);
        start.setUTCHours(utcHour);
        const end = new Date(start.getTime() + 15 * 60 * 1000);
        slots.push({
          start,
          end,
          label:
            start.toLocaleString("en-NG", {
              timeZone: "Africa/Lagos",
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "2-digit",
            }) + " WAT",
        });
      }
    }
    day.setUTCDate(day.getUTCDate() + 1);
  }
  return slots;
}
function googleCalendarUrl(start: Date, end: Date, form: FormState) {
  const stamp = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `THIE opportunity briefing — ${form.organisation}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    ctz: "Africa/Lagos",
    details: `A focused 15-minute briefing for ${form.name} on how ${form.organisation} can gain patient reach, specialist access and new revenue channels through the Smart Clinic Exchange.\n\nCMD email: ${form.email}\nCMD phone: ${form.phone}`,
    add: organiserEmail,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
function whatsappUrl(slot: string, form: FormState, reference: string) {
  const message = `Hello, I have selected a THIE briefing time.\n\nName: ${form.name}\nHospital: ${form.organisation}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred time: ${slot}\nReference: ${reference}\n\nPlease confirm the meeting and send the joining link.`;
  return `https://wa.me/${programmeWhatsApp}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [form, setForm] = useState(emptyForm);
  const [stage, setStage] = useState<"intro" | "interest" | "success">("intro");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [mouStatus, setMouStatus] = useState("");
  const interestRef = useRef<HTMLDivElement>(null);
  const briefingSlots = stage === "success" ? nextBriefingSlots() : [];
  const chosenSlot = selectedSlot === null ? null : briefingSlots[selectedSlot];
  const begin = () => {
    setStage("interest");
    setTimeout(
      () =>
        interestRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      20,
    );
  };
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("https://api.smartclinicnetwork.com/api/v1/cohort/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: "Chief Medical Director",
          // cohort: "To be discussed",
          // wave: "To be discussed",
          message: "Requested a short hospital opportunity briefing.",
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "We could not save your response.");
      setSubmissionId(data.id);
      setStage("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  async function uploadMou(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !submissionId) return;
    if (file.type !== "application/pdf")
      return setMouStatus("Please upload the MOU as a PDF.");
    if (file.size > 10 * 1024 * 1024)
      return setMouStatus("The PDF must be 10 MB or smaller.");
    setMouStatus("Uploading…");
    const body = new FormData();
    body.set("file", file);
    body.set("submissionId", submissionId);
    const res = await fetch("/api/mou", { method: "POST", body });
    const data = await res.json();
    setMouStatus(
      res.ok
        ? "MOU received for programme review."
        : data.error || "Upload failed. Please try again.",
    );
  }
  return (
    <main>
      <header className="topbar">
        <a href="#top" className="brand">
          <span className="brandmark">SC</span>
          <span>
            SMART CLINIC EXCHANGE
            <br />
            <b>TERTIARY HEALTH INFORMATION EXCHANGE</b>
          </span>
        </a>
        <span className="powered">The connected hospital network</span>
      </header>
      <div className="institution-bar">
        <span>
          <b>Powered by</b> Committee of Chief Medical Directors
        </span>
        <i />
        <span>
          <b>Born from</b> the NCC 2021 Health-Tech Hackathon
        </span>
      </div>
      {stage !== "success" ? (
        <>
          <section id="top" className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <span />
                Nigeria’s connected tertiary hospital network
              </div>
              <h1>
                One card. One ID. One wallet.
                <br />
                <em>Multiple hospitals.</em>
              </h1>
              <p className="lead">
                Join the network without giving up control. Your patients can
                carry their identity, access approved records, find specialist
                care and pay across connected hospitals—while your hospital
                gains reach, referrals and new revenue channels.
              </p>
              <div className="hero-actions">
                <button className="primary" onClick={begin}>
                  Show me what my hospital gains <ArrowRight size={18} />
                </button>
                <span>60 seconds. No commitment.</span>
              </div>
              <div className="assurances">
                <span>
                  <Check />
                  Keep your EMR
                </span>
                <span>
                  <Check />
                  Keep your payment system
                </span>
                <span>
                  <Check />
                  Keep full hospital control
                </span>
              </div>
            </div>
            <div className="network-visual">
              <div className="smart-card">
                <div className="card-brand">
                  <CreditCard />
                  <b>SMART CLINIC</b>
                </div>
                <strong>ONE HEALTH ID</strong>
                <span>One patient • One wallet • Every connected hospital</span>
                <div className="card-number">SCX •••• 2026</div>
              </div>
              <div className="hospital-network">
                <span>
                  <Building2 />
                  Your hospital
                </span>
                <span>
                  <Building2 />
                  Hospital B
                </span>
                <span>
                  <Building2 />
                  Hospital C
                </span>
                <span className="more">+ the national network</span>
              </div>
              <div className="network-result">
                <b>One connection</b>
                <span>opens an entire care network</span>
              </div>
            </div>
          </section>
          <section className="quiet-proof">
            <span>
              <b>More patients</b> beyond your walls
            </span>
            <span>
              <b>More doctors</b> across the network
            </span>
            <span>
              <b>More revenue</b> from connected care
            </span>
          </section>
          <section className="value-section">
            <div className="section-heading">
              <span>THE EXECUTIVE CASE</span>
              <h2>Your hospital should not operate like an island.</h2>
              <p>
                A connected hospital keeps its independence—but gains the
                patient reach, specialist capacity and earning opportunities of
                the wider network.
              </p>
            </div>
            <div className="value-grid power-grid">
              <article>
                <HeartHandshake />
                <div className="metric">20</div>
                <h3>Target pilot hospitals</h3>
                <p>
                  Be discoverable to patients, families, employers, schools and
                  communities connected to the exchange.
                </p>
              </article>
              <article>
                <Stethoscope />
                <div className="metric">Network</div>
                <h3>More doctors available</h3>
                <p>
                  Limited specialists on site no longer limit access. Connect
                  appropriate cases to doctors across participating hospitals.
                </p>
              </article>
              <article>
                <TrendingUp />
                <div className="metric">100×</div>
                <h3>Growth ambition</h3>
                <p>
                  Build toward transformational revenue through appointments,
                  diagnostics, pharmacy, checkups, referrals and digital
                  collections.
                </p>
                <small>
                  Ambition, not a guaranteed return. Your projection uses your
                  real volumes.
                </small>
              </article>
            </div>
          </section>
          <section className="proof-section">
            <div>
              <span>NATIONAL ROLLOUT IN PROGRESS</span>
              <h2>The Exchange is moving cohort by cohort.</h2>
              <p className="proof-intro">
                Lagos has opened the pathway. Abuja is next. Every participating
                hospital can enter through the cohort that fits its readiness.
              </p>
            </div>
            <div className="proof-events">
              <article className="cohort-win">
                <b>01</b>
                <p>
                  <strong>Lagos cohort activated</strong>
                  <span>
                    <b>National Orthopaedic Hospital, Igbobi</b> — first
                    hospital MOU signed
                    <br />
                    <b>Federal Medical Centre, Ebute-Metta</b> — commencement
                    approved
                    <br />
                    <b>Federal Neuro-Psychiatric Hospital, Yaba</b> — CMD
                    aligned
                  </span>
                </p>
              </article>
              <article>
                <b>02</b>
                <p>
                  <strong>Abuja cohort is next</strong>
                  <span>
                    <b>Federal Medical Centre, Abuja (Jabi)</b> is positioned
                    for the next coordinated activation.
                  </span>
                </p>
              </article>
              <article>
                <b>03</b>
                <p>
                  <strong>Your hospital can join</strong>
                  <span>
                    Select the cohort that best suits your hospital and
                    implementation timeline.
                  </span>
                </p>
              </article>
            </div>
          </section>
          <section className="revenue-section">
            <div>
              <span>ONE CONNECTION. MULTIPLE REVENUE CHANNELS.</span>
              <h2>Stop earning only when a patient walks through the gate.</h2>
              <p>
                The Exchange keeps your hospital connected to well and sick
                patients—before the visit, during care and after discharge.
              </p>
            </div>
            <div className="revenue-list">
              <span>Appointments</span>
              <span>Registration</span>
              <span>Diagnostics</span>
              <span>Pharmacy</span>
              <span>Checkups</span>
              <span>Referrals</span>
            </div>
          </section>
          <section className="clarity-section">
            <div>
              <span>The simplest reason to join</span>
              <h2>You remain independent. You stop being isolated.</h2>
            </div>
            <div className="clarity-list">
              <p>
                <CircleCheck />
                One patient ID links to your existing hospital number.
              </p>
              <p>
                <CircleCheck />
                One wallet can pay your hospital and other connected providers.
              </p>
              <p>
                <CircleCheck />
                One card keeps your hospital in the patient’s care journey.
              </p>
            </div>
            <div className="not-changing">
              <b>Your hospital remains yours</b>
              <p>
                Your leadership, clinical authority, EMR ownership, data
                governance and operational independence remain with your
                hospital.
              </p>
            </div>
          </section>
          <section className="resources-section">
            <div>
              <span>REVIEW AT YOUR OWN PACE</span>
              <h2>Take the full picture back to your team.</h2>
              <p>
                Start with the short executive pack, explore the complete
                hospital story, or review the participation framework when your
                team is ready.
              </p>
            </div>
            <div className="resource-cards">
              <a href="/resources/THIE-Hospital-Participation-MOU.pdf" download>
                <FileSignature />
                <span>
                  <b>Download participation MOU</b>
                  <small>Review the hospital framework</small>
                </span>
                <Download />
              </a>
              <a
                href="/resources/SmartClinic-Exchange-CMD-Information-Pack.pdf"
                download
              >
                <BookOpen />
                <span>
                  <b>Download CMD information pack</b>
                  <small>Read the concise executive overview</small>
                </span>
                <Download />
              </a>
              <a
                href="/resources/THIE-Hospital-Storybook-for-CMDs.pdf"
                download
              >
                <FileHeart />
                <span>
                  <b>Download the hospital storybook</b>
                  <small>Explore the full patient and hospital journey</small>
                </span>
                <Download />
              </a>
            </div>
          </section>
          <section ref={interestRef} id="interest" className="interest-section">
            <div className="interest-copy">
              <span>THE NEXT STEP</span>
              <h2>Be open to a short conversation.</h2>
              <p>
                Share four details. We will prepare a concise, hospital-specific
                briefing covering the patient, operational and financial
                opportunity. This is an expression of interest—not an
                implementation commitment.
              </p>
            </div>
            <form onSubmit={submit} className="interest-form">
              <div className="form-title">
                <b>Show me what this means for my hospital</b>
                <small>About 60 seconds</small>
              </div>
              <label>
                CMD / Hospital Administrator name
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Professor / Dr / Mr / Mrs"
                />
              </label>
              <label>
                Hospital
                <select
                  required
                  value={form.organisation}
                  onChange={(e) =>
                    setForm({ ...form, organisation: e.target.value })
                  }
                >
                  <option value="">Select hospital</option>
                  {hospitals.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                  <option>My hospital is not listed</option>
                </select>
              </label>
              <div className="form-grid">
                <label>
                  Official email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="name@hospital.gov.ng"
                  />
                </label>
                <label>
                  Telephone / WhatsApp
                  <input
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+234"
                  />
                </label>
              </div>
              {error && <div className="error">{error}</div>}
              <button className="submit" disabled={busy}>
                {busy ? "Saving…" : "I’m open to a 15-minute briefing"}
                <ArrowRight size={18} />
              </button>
              <p className="privacy">
                No patient information. No commitment to deploy.
              </p>
            </form>
          </section>
        </>
      ) : (
        <section className="success-screen booking-screen">
          <div className="success-icon">
            <CalendarClock />
          </div>
          <span className="success-label">ONE FINAL STEP</span>
          <h1>Choose your briefing time.</h1>
          <p>
            Your hospital’s interest has been recorded. Select a 15-minute time,
            then confirm it through Google Calendar or WhatsApp.
          </p>
          <div className="booking-card">
            <div className="booking-head">
              <div>
                <h2>Available briefing times</h2>
                <p>West Africa Time · 15 minutes</p>
              </div>
              <Clock />
            </div>
            <div className="slot-grid">
              {briefingSlots.map((slot, index) => (
                <button
                  type="button"
                  className={selectedSlot === index ? "selected" : ""}
                  key={slot.start.toISOString()}
                  onClick={() => setSelectedSlot(index)}
                >
                  <CalendarClock />
                  <span>
                    <b>{slot.label}</b>
                    <small>
                      {selectedSlot === index ? "Selected" : "Select this time"}
                    </small>
                  </span>
                  {selectedSlot === index ? <Check /> : <ArrowRight />}
                </button>
              ))}
            </div>
            {chosenSlot ? (
              <div className="booking-actions">
                <a
                  className="calendar-action"
                  href={googleCalendarUrl(
                    chosenSlot.start,
                    chosenSlot.end,
                    form,
                  )}
                >
                  <CalendarClock />
                  <span>
                    <b>Add to Google Calendar</b>
                    <small>Invitation and reminders</small>
                  </span>
                </a>
                <a
                  className="whatsapp-action"
                  href={whatsappUrl(chosenSlot.label, form, submissionId)}
                >
                  <MessageCircle />
                  <span>
                    <b>Confirm on WhatsApp</b>
                    <small>Send time and contact details</small>
                  </span>
                </a>
              </div>
            ) : (
              <div className="choose-prompt">
                Select a time above to continue.
              </div>
            )}
            <div className="calendar-note">
              <Mail />
              <p>
                <b>Two reliable ways to confirm</b>
                <span>
                  Calendar prepares the invitation in the same window. WhatsApp
                  sends your selected time, hospital and contact details
                  directly to the programme team for confirmation.
                </span>
              </p>
            </div>
            <details>
              <summary>Already have an MOU to share?</summary>
              <label className="upload">
                <Upload />
                <span>
                  <b>Upload MOU PDF</b>
                  <small>Optional · Maximum 10 MB</small>
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={uploadMou}
                />
              </label>
              {mouStatus && <p className="upload-status">{mouStatus}</p>}
            </details>
          </div>
          <div className="reference">
            Interest reference: <b>{submissionId}</b>
          </div>
          <button
            className="text-button"
            onClick={() => {
              setStage("intro");
              setSelectedSlot(null);
              setForm(emptyForm);
            }}
          >
            Return to overview
          </button>
        </section>
      )}
      <footer>
        <div className="brand">
          <span className="brandmark">SC</span>
          <span>
            SMART CLINIC EXCHANGE
            <br />
            <b>TERTIARY HEALTH INFORMATION EXCHANGE</b>
          </span>
        </div>
        <p>
          Powered by the Committee of Chief Medical Directors
          <br />
          Born from the NCC 2021 Health-Tech Hackathon.
        </p>
        <span>© 2026 Primed E-Health</span>
      </footer>
    </main>
  );
}
