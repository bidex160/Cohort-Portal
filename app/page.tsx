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
  Stethoscope,
  TrendingUp,
  Upload,
} from "lucide-react";

const hospitals = [
  // Abuja / FCT
  "National Hospital Abuja",
  "Federal Medical Centre Abuja (Jabi)",
  "University of Abuja Teaching Hospital",
  "Nisa Premier Hospital Abuja",
  "Cedarcrest Hospitals Abuja",
  "Kelina Hospital Abuja",
  "Primus International Super Speciality Hospital Abuja",
  "Alliance Hospital Abuja",
  "Wuse District Hospital",
  "Asokoro District Hospital",
  "Gwarinpa General Hospital",
  "Maitama District Hospital",

  // Lagos
  "Lagos University Teaching Hospital",
  "National Orthopaedic Hospital Igbobi",
  "Federal Neuropsychiatric Hospital Yaba",
  "Federal Medical Centre Ebute-Metta",
  "Lagos State University Teaching Hospital",
  "General Hospital Lagos",
  "Gbagada General Hospital",
  "Lagos Island Maternity Hospital",
  "Massey Street Children's Hospital",
  "Reddington Hospital Lagos",
  "Lagoon Hospitals",
  "Eko Hospital",
  "St. Nicholas Hospital Lagos",
  "Evercare Hospital Lekki",
  "First Cardiology Consultants Hospital",
  "Duchess International Hospital",
  "George's Memorial Medical Centre",
  "Nigerian Navy Reference Hospital Ojo",

  // Oyo
  "University College Hospital Ibadan",
  "Federal Medical Centre Oyo",
  "Adeoyo Maternity Teaching Hospital",
  "Ring Road State Hospital Ibadan",
  "Jericho Specialist Hospital Ibadan",
  "Our Lady of Apostles Catholic Hospital Oluyoro",
  "Molly Specialist Hospital Ibadan",

  // Osun
  "Obafemi Awolowo University Teaching Hospitals Complex",
  "Wesley Guild Hospital Ilesa",
  "UNIOSUN Teaching Hospital Osogbo",
  "State Specialist Hospital Asubiaro Osogbo",

  // Ogun
  "Federal Medical Centre Abeokuta",
  "Olabisi Onabanjo University Teaching Hospital",
  "Neuropsychiatric Hospital Aro Abeokuta",
  "State Hospital Ijaye Abeokuta",
  "Babcock University Teaching Hospital",

  // Ondo
  "Federal Medical Centre Owo",
  "University of Medical Sciences Teaching Hospital Ondo",
  "University of Medical Sciences Teaching Hospital Akure",

  // Ekiti
  "Federal Teaching Hospital Ido-Ekiti",
  "Ekiti State University Teaching Hospital",

  // Edo
  "University of Benin Teaching Hospital",
  "Federal Neuropsychiatric Hospital Benin City",
  "Edo Specialist Hospital",
  "Central Hospital Benin City",
  "Irrua Specialist Teaching Hospital",

  // Delta
  "Federal Medical Centre Asaba",
  "Delta State University Teaching Hospital Oghara",
  "Central Hospital Warri",
  "Central Hospital Agbor",

  // Rivers
  "University of Port Harcourt Teaching Hospital",
  "Rivers State University Teaching Hospital",
  "Military Hospital Port Harcourt",
  "Braithwaite Memorial Specialist Hospital",
  "Princess Medical Centre Port Harcourt",

  // Bayelsa
  "Federal Medical Centre Yenagoa",
  "Niger Delta University Teaching Hospital Okolobiri",

  // Akwa Ibom
  "University of Uyo Teaching Hospital",
  "Ibom Specialist Hospital",
  "St. Luke's Hospital Anua",

  // Cross River
  "University of Calabar Teaching Hospital",
  "Federal Neuropsychiatric Hospital Calabar",
  "General Hospital Calabar",

  // Abia
  "Federal Medical Centre Umuahia",
  "Abia State University Teaching Hospital",
  "Federal Medical Centre Umuahia",

  // Imo
  "Federal University Teaching Hospital Owerri",
  "Imo State University Teaching Hospital Orlu",
  "Federal Medical Centre Owerri",

  // Anambra
  "Nnamdi Azikiwe University Teaching Hospital Nnewi",
  "Chukwuemeka Odumegwu Ojukwu University Teaching Hospital Awka",
  "St. Charles Borromeo Specialist Hospital Onitsha",

  // Enugu
  "University of Nigeria Teaching Hospital Enugu",
  "National Orthopaedic Hospital Enugu",
  "Federal Neuropsychiatric Hospital Enugu",
  "Enugu State University Teaching Hospital Parklane",
  "Mother of Christ Specialist Hospital Enugu",

  // Ebonyi
  "Alex Ekwueme Federal University Teaching Hospital Abakaliki",
  "National Obstetric Fistula Centre Abakaliki",

  // Kano
  "Aminu Kano Teaching Hospital",
  "Federal Neuropsychiatric Hospital Kano",
  "National Orthopaedic Hospital Dala Kano",
  "Murtala Mohammed Specialist Hospital Kano",
  "Muhammad Abdullahi Wase Teaching Hospital",
  "Sir Muhammad Sunusi Specialist Hospital Kano",

  // Kaduna
  "Ahmadu Bello University Teaching Hospital Zaria",
  "Federal Neuropsychiatric Hospital Kaduna",
  "National Ear Care Centre Kaduna",
  "Barau Dikko Teaching Hospital Kaduna",
  "44 Nigerian Army Reference Hospital Kaduna",
  "St. Gerard's Catholic Hospital Kaduna",

  // Katsina
  "Federal Teaching Hospital Katsina",
  "General Amadi Rimi Specialist Hospital Katsina",

  // Jigawa
  "Federal Medical Centre Birnin Kudu",
  "Rasheed Shekoni Federal University Teaching Hospital Dutse",

  // Kebbi
  "Federal Medical Centre Birnin Kebbi",
  "Sir Yahaya Memorial Hospital Birnin Kebbi",

  // Sokoto
  "Usmanu Danfodiyo University Teaching Hospital Sokoto",
  "Federal Neuropsychiatric Hospital Kware",
  "Sokoto Specialist Hospital",

  // Zamfara
  "Federal Medical Centre Gusau",
  "Yariman Bakura Specialist Hospital Gusau",

  // Bauchi
  "Abubakar Tafawa Balewa University Teaching Hospital",
  "Federal Medical Centre Azare",
  "Specialist Hospital Bauchi",

  // Gombe
  "Federal Teaching Hospital Gombe",
  "State Specialist Hospital Gombe",

  // Adamawa
  "Federal Medical Centre Yola",
  "Modibbo Adama University Teaching Hospital Yola",
  "Specialist Hospital Yola",

  // Taraba
  "Federal Medical Centre Jalingo",
  "Taraba State Specialist Hospital Jalingo",

  // Borno
  "University of Maiduguri Teaching Hospital",
  "Federal Neuropsychiatric Hospital Maiduguri",
  "State Specialist Hospital Maiduguri",

  // Yobe
  "Federal Medical Centre Nguru",
  "Yobe State University Teaching Hospital Damaturu",

  // Plateau
  "Jos University Teaching Hospital",
  "Plateau State Specialist Hospital Jos",
  "Bingham University Teaching Hospital Jos",
  "Our Lady of Apostles Hospital Jos",

  // Nasarawa
  "Federal Medical Centre Keffi",
  "Dalhatu Araf Specialist Hospital Lafia",

  // Benue
  "Federal University Teaching Hospital Makurdi",
  "Benue State University Teaching Hospital Makurdi",

  // Niger
  "Federal Medical Centre Bida",
  "Ibrahim Badamasi Babangida Specialist Hospital Minna",
  "General Hospital Minna",

  // Kwara
  "University of Ilorin Teaching Hospital",
  "General Hospital Ilorin",
  "Sobi Specialist Hospital Ilorin",

  // Kogi
  "Federal Teaching Hospital Lokoja",
  "Kogi State Specialist Hospital Lokoja",
  "Prince Abubakar Audu University Teaching Hospital Anyigba",
];
type FormState = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  otherOrganisation: string;
};
const emptyForm: FormState = {
  name: "",
  organisation: "",
  email: "",
  phone: "+234",
  otherOrganisation: "",
};
const organiserEmail = "primeddiagnostics@gmail.com";
const programmeWhatsApp = "+2348052058628";

type BriefingSlot = {
  start: Date;
  end: Date;
  label: string;
};

function toDateInputValue(date: Date) {
  return date.toLocaleDateString("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function createBriefingSlotsForDate(dateValue: string): BriefingSlot[] {
  // Explicit +01:00 offset keeps these times in West Africa Time.
  return [9, 13].map((hour) => {
    const hourString = String(hour).padStart(2, "0");
    const start = new Date(`${dateValue}T${hourString}:00:00+01:00`);
    const end = new Date(start.getTime() + 15 * 60 * 1000);

    return {
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
          hour12: true,
        }) + " WAT",
    };
  });
}

function nextFourBriefingDays(): BriefingSlot[] {
  const slots: BriefingSlot[] = [];
  const cursor = new Date();

  // Start from tomorrow.
  cursor.setDate(cursor.getDate() + 1);

  let workingDays = 0;

  while (workingDays < 4) {
    const dateValue = toDateInputValue(cursor);

    // Check weekday in Lagos by using midday WAT for the selected calendar date.
    const dateAtNoon = new Date(`${dateValue}T12:00:00+01:00`);
    const weekday = Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Lagos",
        weekday: "short",
      })
        .formatToParts(dateAtNoon)
        .find((part) => part.type === "weekday")?.value === "Sun"
        ? 0
        : new Intl.DateTimeFormat("en-US", {
              timeZone: "Africa/Lagos",
              weekday: "short",
            }).format(dateAtNoon) === "Sat"
          ? 6
          : 1,
    );

    if (weekday !== 0 && weekday !== 6) {
      slots.push(...createBriefingSlotsForDate(dateValue));
      workingDays++;
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return slots;
}

function briefingSlotsForDate(dateValue: string): BriefingSlot[] {
  if (!dateValue) return nextFourBriefingDays();

  const selectedDate = new Date(`${dateValue}T12:00:00+01:00`);
  const weekdayName = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Lagos",
    weekday: "short",
  }).format(selectedDate);

  // No briefing slots on weekends.
  if (weekdayName === "Sat" || weekdayName === "Sun") {
    return [];
  }

  return createBriefingSlotsForDate(dateValue).filter(
    (slot) => slot.start.getTime() > Date.now(),
  );
}

function resolvedOrganisation(form: FormState) {
  return form.organisation === OTHER_HOSPITAL
    ? form.otherOrganisation.trim()
    : form.organisation;
}

function googleCalendarUrl(start: Date, end: Date, form: FormState) {
  const stamp = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

  const organisation = resolvedOrganisation(form);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `THIE opportunity briefing — ${organisation}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    ctz: "Africa/Lagos",
    details: `A focused 15-minute briefing for ${form.name} on how ${organisation} can gain patient reach, specialist access and new revenue channels through the Smart Clinic Exchange.\n\nCMD email: ${form.email}\nCMD phone: ${form.phone}`,
    add: organiserEmail,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function whatsappUrl(slot: string, form: FormState, reference: string) {
  const organisation = resolvedOrganisation(form);

  const message = `Hello, I have selected a THIE briefing time.\n\nName: ${form.name}\nHospital: ${organisation}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred time: ${slot}\nReference: ${reference}\n\nPlease confirm the meeting and send the joining link.`;

  return `https://wa.me/${programmeWhatsApp}?text=${encodeURIComponent(message)}`;
}

const OTHER_HOSPITAL = "__other__";

export default function Home() {
  const [form, setForm] = useState(emptyForm);
  const [stage, setStage] = useState<"intro" | "interest" | "success">("intro");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedBriefingDate, setSelectedBriefingDate] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [mouStatus, setMouStatus] = useState("");
  const interestRef = useRef<HTMLDivElement>(null);

  const briefingSlots =
    stage === "success"
      ? selectedBriefingDate
        ? briefingSlotsForDate(selectedBriefingDate)
        : nextFourBriefingDays()
      : [];

  const chosenSlot =
    briefingSlots.find(
      (slot) => slot.start.toISOString() === selectedSlot,
    ) ?? null;

  const [hospitalSearch, setHospitalSearch] = useState("");
  const [showHospitals, setShowHospitals] = useState(false);

  const filteredHospitals = hospitals
    .filter((hospital) =>
      hospital.toLowerCase().includes(hospitalSearch.toLowerCase()),
    )
    .sort();

  const todayInputValue = toDateInputValue(new Date());

  const selectedBriefingDateLabel = selectedBriefingDate
    ? new Date(`${selectedBriefingDate}T12:00:00+01:00`).toLocaleDateString(
        "en-NG",
        {
          timeZone: "Africa/Lagos",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      )
    : "";
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
    const organisation =
      form.organisation === OTHER_HOSPITAL
        ? form.otherOrganisation.trim()
        : form.organisation;

    const payload = {
      ...form,
      organisation,
    };

    // Remove this if your backend actually expects otherOrganisation
    delete (payload as any).otherOrganisation;
    try {
      const res = await fetch(
        "https://api.smartclinicnetwork.com/api/v1/cohort/contact",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            ...payload,
            subject: "Chief Medical Director",
            // cohort: "To be discussed",
            // wave: "To be discussed",
            message: "Requested a short hospital opportunity briefing.",
          }),
        },
      );
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // always ensure it starts with +234
    if (!val.startsWith("+234")) {
      val = "+234" + val.replace(/^\+?234?/, ""); // strip any other +234 user typed
    }

    // only allow numbers after +234
    const numbersOnly = val.replace(/[^0-9]/g, "");
    const formatted = "+234" + numbersOnly.slice(3); // keep max after 234

    setForm({ ...form, phone: formatted });
  };
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
                Join the tertiary hospital network powered by committe of chief medical directors, without giving up control. Your patients can
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
              <a
                href="/resources/Smart_Clinic_CMD_Regional_Hub_3_Page_Summary-1.pdf"
                download
              >
                <FileHeart />
                <span>
                  <b>Summary</b>
                  <small>Explore hospital journey summary</small>
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
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Professor / Dr / Mr / Mrs"
                />
              </label>
<label>
  Hospital

  <div className="relative">
    <input
      type="text"
      required
      placeholder="Search hospital..."
      value={
        showHospitals
          ? hospitalSearch
          : form.organisation === OTHER_HOSPITAL
            ? "My hospital is not listed"
            : form.organisation
      }
      onFocus={() => {
        setHospitalSearch("");
        setShowHospitals(true);
      }}
      onChange={(e) => {
        setHospitalSearch(e.target.value);
        setShowHospitals(true);
      }}
      className="w-full"
    />

    {showHospitals && (
      <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-md border bg-white shadow-lg">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <button
              key={hospital}
              type="button"
              className="block w-full px-3 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                setForm({
                  ...form,
                  organisation: hospital,
                  otherOrganisation: "",
                });

                setHospitalSearch(hospital);
                setShowHospitals(false);
              }}
            >
              {hospital}
            </button>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-gray-500">
            No hospitals found
          </div>
        )}

        <button
          type="button"
          className="block w-full border-t px-3 py-2 text-left font-medium hover:bg-gray-100"
          onClick={() => {
            setForm({
              ...form,
              organisation: OTHER_HOSPITAL,
            });

            setHospitalSearch("");
            setShowHospitals(false);
          }}
        >
          My hospital is not listed
        </button>
      </div>
    )}

    {form.organisation === OTHER_HOSPITAL && (
      <input
        type="text"
        required
        placeholder="Enter hospital name"
        className="mt-2 w-full"
        value={form.otherOrganisation}
        onChange={(e) =>
          setForm({
            ...form,
            otherOrganisation: e.target.value,
          })
        }
      />
    )}
  </div>
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
                    onChange={handlePhoneChange}
                    placeholder="+234 801 234 5678"
                    inputMode="tel"
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

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-end",
                flexWrap: "wrap",
                margin: "18px 0 12px",
              }}
            >
              <label
                style={{
                  flex: "1 1 240px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: 0
                }}
              >
                Need another day?
                <input
                  type="date"
                  min={todayInputValue}
                  value={selectedBriefingDate}
                  onChange={(e) => {
                    setSelectedBriefingDate(e.target.value);
                    setSelectedSlot(null);
                  }}
                  style={{
                    width: "100%",
                    minHeight: "46px",
                    boxSizing: "border-box",
                    border: "1px solid #ddd4e8",
                    borderRadius: "10px",
                    padding: "10px 12px",
                    background: "#fff",
                    font: "inherit",
                  }}
                />
              </label>

              {selectedBriefingDate && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBriefingDate("");
                    setSelectedSlot(null);
                  }}
                  style={{
                    minHeight: "46px",
                    padding: "0 16px",
                    borderRadius: "10px",
                    border: "1px solid #52258b",
                    background: "#fff",
                    color: "#52258b",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  <CalendarClock size={17} />
                  Show next 4 days
                </button>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
                padding: "10px 12px",
                borderRadius: "9px",
                background: "#f4f0f9",
                color: "#655c73",
                fontSize: "13px",
              }}
            >
              <CalendarClock size={17} />
              <span>
                {selectedBriefingDate
                  ? `Showing availability for ${selectedBriefingDateLabel}`
                  : "Showing the next 4 available working days"}
              </span>
            </div>

            {briefingSlots.length > 0 ? (
              <div className="slot-grid">
                {briefingSlots.map((slot) => {
                  const slotId = slot.start.toISOString();
                  const isSelected = selectedSlot === slotId;

                  return (
                    <button
                      type="button"
                      className={isSelected ? "selected" : ""}
                      key={slotId}
                      onClick={() => setSelectedSlot(slotId)}
                    >
                      <CalendarClock />
                      <span>
                        <b>{slot.label}</b>
                        <small>
                          {isSelected ? "Selected" : "Select this time"}
                        </small>
                      </span>
                      {isSelected ? <Check /> : <ArrowRight />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="choose-prompt">
                No briefing times are available on this date. Please select
                another weekday.
              </div>
            )}

            {chosenSlot ? (
              <div className="booking-actions">
                <a
                  className="calendar-action"
                  href={googleCalendarUrl(
                    chosenSlot.start,
                    chosenSlot.end,
                    form,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
                  sends your selected time, hospital and contact details directly
                  to the programme team for confirmation.
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
              setSelectedBriefingDate("");
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