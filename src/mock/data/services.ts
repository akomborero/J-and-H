import type { Service, ServicePackage } from "../../types";

export const services: Service[] = [
  // ── Company Registration ─────────────────────────────────────────────
  {
    id: "svc-pvt-ltd",
    category: "company_registration",
    name: "Private Limited Company Registration",
    description:
      "Full incorporation of a private limited company, including name reservation, CR documents, and share certificates.",
    price: 180,
    estimatedDays: 10,
    popular: true,
    fields: [
      { key: "proposedName1", label: "Proposed Company Name (1st choice)", type: "text", required: true },
      { key: "proposedName2", label: "Proposed Company Name (2nd choice)", type: "text", required: false },
      { key: "businessActivity", label: "Principal Business Activity", type: "textarea", required: true },
      { key: "numDirectors", label: "Number of Directors", type: "number", required: true },
      { key: "shareCapital", label: "Authorised Share Capital (USD)", type: "number", required: true },
    ],
    documents: [
      { key: "directorIds", label: "Director ID Documents", required: true },
      { key: "proofOfAddress", label: "Proof of Residential Address", required: true },
      { key: "passportPhotos", label: "Passport-Size Photos", required: false },
    ],
  },
  {
    id: "svc-pbc",
    category: "company_registration",
    name: "PBC Registration",
    description:
      "Registration of a Private Business Corporation — a faster, lower-cost structure for small and micro businesses.",
    price: 90,
    estimatedDays: 7,
    fields: [
      { key: "proposedName1", label: "Proposed PBC Name (1st choice)", type: "text", required: true },
      { key: "businessActivity", label: "Principal Business Activity", type: "textarea", required: true },
      { key: "numMembers", label: "Number of Members", type: "number", required: true },
    ],
    documents: [
      { key: "memberIds", label: "Member ID Documents", required: true },
      { key: "proofOfAddress", label: "Proof of Residential Address", required: true },
    ],
  },
  {
    id: "svc-reregistration",
    category: "company_registration",
    name: "Company Re-registration",
    description:
      "Re-registration of an existing company under the Companies and Other Business Entities Act.",
    price: 120,
    estimatedDays: 14,
    fields: [
      { key: "existingRegNumber", label: "Existing Registration Number", type: "text", required: true },
      { key: "currentName", label: "Current Registered Name", type: "text", required: true },
    ],
    documents: [
      { key: "originalCertificate", label: "Original Certificate of Incorporation", required: true },
      { key: "cr14", label: "Latest CR14", required: true },
    ],
  },

  // ── Tax Services ──────────────────────────────────────────────────────
  {
    id: "svc-bp-number",
    category: "tax_services",
    name: "BP Number Application",
    description: "Business Partner number registration with ZIMRA for tax administration purposes.",
    price: 40,
    estimatedDays: 5,
    popular: true,
    fields: [
      { key: "companyRegNumber", label: "Company Registration Number", type: "text", required: true },
      { key: "businessActivity", label: "Nature of Business", type: "text", required: true },
    ],
    documents: [
      { key: "certificateOfIncorporation", label: "Certificate of Incorporation", required: true },
      { key: "cr14", label: "CR14", required: true },
      { key: "directorId", label: "Director's National ID", required: true },
    ],
  },
  {
    id: "svc-tax-clearance",
    category: "tax_services",
    name: "Tax Clearance Certificate (ITF263)",
    description: "Application and renewal of your annual ZIMRA tax clearance certificate.",
    price: 50,
    estimatedDays: 5,
    popular: true,
    fields: [{ key: "bpNumber", label: "BP Number", type: "text", required: true }],
    documents: [
      { key: "latestReturns", label: "Latest Tax Returns", required: true },
      { key: "proofOfPayment", label: "Proof of Outstanding Payments (if any)", required: false },
    ],
  },
  {
    id: "svc-vat",
    category: "tax_services",
    name: "VAT Registration",
    description: "Value Added Tax registration with ZIMRA for businesses meeting the turnover threshold.",
    price: 60,
    estimatedDays: 7,
    fields: [
      { key: "bpNumber", label: "BP Number", type: "text", required: true },
      { key: "annualTurnover", label: "Estimated Annual Turnover (USD)", type: "number", required: true },
    ],
    documents: [
      { key: "financialStatements", label: "Recent Financial Statements", required: true },
      { key: "bankStatements", label: "3 Months Bank Statements", required: true },
    ],
  },
  {
    id: "svc-tax-returns",
    category: "tax_services",
    name: "Tax Returns Filing",
    description: "Preparation and submission of monthly or annual tax returns to ZIMRA.",
    price: 35,
    estimatedDays: 3,
    fields: [
      { key: "period", label: "Return Period", type: "text", required: true },
      { key: "returnType", label: "Return Type", type: "select", required: true, options: ["PAYE", "VAT", "QPD", "Income Tax"] },
    ],
    documents: [{ key: "supportingFinancials", label: "Supporting Financial Records", required: true }],
  },

  // ── Compliance Services ───────────────────────────────────────────────
  {
    id: "svc-nssa-reg",
    category: "compliance_services",
    name: "NSSA Registration",
    description: "Registration of employer and employees with the National Social Security Authority.",
    price: 45,
    estimatedDays: 5,
    fields: [
      { key: "companyRegNumber", label: "Company Registration Number", type: "text", required: true },
      { key: "numEmployees", label: "Number of Employees", type: "number", required: true },
    ],
    documents: [
      { key: "certificateOfIncorporation", label: "Certificate of Incorporation", required: true },
      { key: "employeeList", label: "Employee List with IDs", required: true },
    ],
  },
  {
    id: "svc-nssa-p4",
    category: "compliance_services",
    name: "NSSA P4 Returns",
    description: "Monthly P4 contribution returns filing with NSSA.",
    price: 25,
    estimatedDays: 2,
    fields: [
      { key: "period", label: "Return Month", type: "date", required: true },
      { key: "numEmployees", label: "Number of Employees This Period", type: "number", required: true },
    ],
    documents: [{ key: "payrollSchedule", label: "Payroll Schedule", required: true }],
  },
  {
    id: "svc-nec-reg",
    category: "compliance_services",
    name: "NEC Registration",
    description: "Registration with the relevant National Employment Council for your industry sector.",
    price: 40,
    estimatedDays: 5,
    fields: [{ key: "sector", label: "Industry Sector", type: "text", required: true }],
    documents: [{ key: "certificateOfIncorporation", label: "Certificate of Incorporation", required: true }],
  },
  {
    id: "svc-praz-reg",
    category: "compliance_services",
    name: "PRAZ Registration",
    description: "Procurement Regulatory Authority of Zimbabwe supplier registration and renewal.",
    price: 70,
    estimatedDays: 10,
    fields: [
      { key: "supplyCategory", label: "Supply Category", type: "text", required: true },
      { key: "yearsInOperation", label: "Years in Operation", type: "number", required: true },
    ],
    documents: [
      { key: "certificateOfIncorporation", label: "Certificate of Incorporation", required: true },
      { key: "taxClearance", label: "Valid Tax Clearance Certificate", required: true },
      { key: "financialStatements", label: "Audited Financial Statements", required: false },
    ],
  },

  // ── Business Support ──────────────────────────────────────────────────
  {
    id: "svc-profile",
    category: "business_support",
    name: "Company Profile Creation",
    description: "Professional company profile document for tenders, banking, and client presentations.",
    price: 55,
    estimatedDays: 4,
    fields: [{ key: "purpose", label: "Intended Use", type: "text", required: true }],
    documents: [{ key: "companyInfo", label: "Company Information Sheet", required: false }],
  },
  {
    id: "svc-logo",
    category: "business_support",
    name: "Company Logo Design",
    description: "Custom logo design with brand colour palette and usage files.",
    price: 65,
    estimatedDays: 5,
    fields: [{ key: "brandDescription", label: "Brand Style / Preferences", type: "textarea", required: true }],
    documents: [],
  },
  {
    id: "svc-vendor",
    category: "business_support",
    name: "Vendor Number Application",
    description: "Registration of a vendor number with government and private supplier databases.",
    price: 50,
    estimatedDays: 6,
    fields: [{ key: "targetEntity", label: "Target Vendor Database / Entity", type: "text", required: true }],
    documents: [
      { key: "certificateOfIncorporation", label: "Certificate of Incorporation", required: true },
      { key: "taxClearance", label: "Tax Clearance Certificate", required: true },
    ],
  },
];

export const servicePackages: ServicePackage[] = [
  {
    id: "pkg-startup",
    name: "Startup Package",
    description: "Everything a new business needs to register and become fully compliant from day one.",
    serviceIds: ["svc-pvt-ltd", "svc-bp-number", "svc-tax-clearance", "svc-nssa-reg"],
    price: 280,
    discountPercent: 15,
  },
  {
    id: "pkg-compliance",
    name: "Compliance Package",
    description: "Stay on top of recurring statutory obligations with one bundled service.",
    serviceIds: ["svc-tax-returns", "svc-vat", "svc-nssa-p4"],
    price: 95,
    discountPercent: 10,
  },
];

export const findService = (id: string) => services.find((s) => s.id === id);
