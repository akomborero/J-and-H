import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.83c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.9 2H22l-7.2 8.2L23 22h-6.9l-5.4-7-6.2 7H1.3l7.7-8.8L1 2h7l4.9 6.4L18.9 2Zm-2.4 18h1.9L7.6 4H5.6L16.5 20Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2ZM1.2 8h3.6v14H1.2V8Zm6.5 0h3.46v1.93h.05c.48-.9 1.66-1.93 3.42-1.93 3.66 0 4.33 2.4 4.33 5.53V22h-3.6v-6.75c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.6 1.76-2.6 3.57V22H7.7V8Z" />
    </svg>
  );
}

const SOCIAL_ICONS = [FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon];

const SERVICE_LINKS = [
  "Private Limited Company Registration",
  "PBC Registration",
  "Company Re-registration",
  "BP Number Application",
  "Tax Clearance Certificate",
  "VAT Registration",
  "Tax Returns Filing",
  "NSSA Registration",
  "NEC Registration",
  "PRAZ Registration",
  "Company Profile Creation",
  "Vendor Number Application",
];

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Compliance", to: "/compliance" },
  { label: "Knowledge Base", to: "/client/knowledge-base" },
  { label: "Contact Us", to: "/contact" },
  { label: "Client Portal", to: "/login" },
];

export function PublicFooter() {
  return (
    <footer className="bg-forest-dark text-paper/85">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1.2fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ochre font-display text-base font-semibold text-ink">
                J&amp;H
              </div>
              <div className="leading-none">
                <p className="font-display text-base font-semibold text-paper">J&amp;H Consultancy</p>
                <p className="text-[10px] uppercase tracking-wider text-paper/50">Services</p>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/65">
              A Zimbabwean consultancy specializing in company registration, tax services,
              and statutory compliance — built to take your business off WhatsApp and onto record.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL_ICONS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:border-ochre-light hover:text-ochre-light"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ochre-light">Our Services</h3>
            <div className="mt-1 h-px w-8 bg-ochre-light/50" />
            <ul className="mt-4 space-y-2 text-sm text-paper/65">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <Link to="/services" className="transition-colors hover:text-ochre-light">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ochre-light">Company</h3>
            <div className="mt-1 h-px w-8 bg-ochre-light/50" />
            <ul className="mt-4 space-y-2 text-sm text-paper/65">
              {COMPANY_LINKS.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="transition-colors hover:text-ochre-light">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ochre-light">Contact Us</h3>
            <div className="mt-1 h-px w-8 bg-ochre-light/50" />
            <ul className="mt-4 space-y-3 text-sm text-paper/65">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ochre-light" />
                <span>+263 77 200 0000<br />+263 71 200 0000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ochre-light" />
                <a href="mailto:info@jhconsultancy.co.zw" className="hover:text-ochre-light">info@jhconsultancy.co.zw</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ochre-light" />
                <span>88 Samora Machel Ave<br />Harare, Zimbabwe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-paper/50 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} J&amp;H Consultancy Services. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-ochre-light">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-ochre-light">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
