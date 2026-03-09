// root/app/admin/crm/page.tsx
"use client";

// npm install chart.js react-chartjs-2
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Filler);

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */
type LeadStatus = "new" | "contacted" | "qualified" | "proposal_sent" | "negotiation" | "won" | "lost";

interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  website_url: string | null;
  service: string;
  message: string;
  source_page: string | null;
  lead_status: LeadStatus;
  notes: string | null;
}

type NavItem = "dashboard" | "service_leads" | "get_a_quote" | "contact_us";

/* ══════════════════════════════════════════════════════════
   STATUS CONFIG
══════════════════════════════════════════════════════════ */
const STATUS_CONFIG: Record<LeadStatus, { label: string; text: string; bg: string; dot: string; border: string }> = {
  new:           { label: "New",           text: "text-blue-700",    bg: "bg-blue-50",    dot: "bg-blue-500",    border: "border-blue-200" },
  contacted:     { label: "Contacted",     text: "text-violet-700",  bg: "bg-violet-50",  dot: "bg-violet-500",  border: "border-violet-200" },
  qualified:     { label: "Qualified",     text: "text-cyan-700",    bg: "bg-cyan-50",    dot: "bg-cyan-500",    border: "border-cyan-200" },
  proposal_sent: { label: "Proposal Sent", text: "text-amber-700",   bg: "bg-amber-50",   dot: "bg-amber-500",   border: "border-amber-200" },
  negotiation:   { label: "Negotiation",   text: "text-orange-700",  bg: "bg-orange-50",  dot: "bg-orange-500",  border: "border-orange-200" },
  won:           { label: "Won",           text: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500", border: "border-emerald-200" },
  lost:          { label: "Lost",          text: "text-red-700",     bg: "bg-red-50",     dot: "bg-red-500",     border: "border-red-200" },
};
const ALL_STATUSES = Object.keys(STATUS_CONFIG) as LeadStatus[];

/* Source page filters */
const SOURCE_FILTERS: Record<Exclude<NavItem, "dashboard">, (s: string | null) => boolean> = {
  service_leads: (s) => !s || s.includes("service") || s.includes("social") || s.includes("marketing"),
  get_a_quote:   (s) => !!s && s.includes("get-a-quote"),
  contact_us:    (s) => !!s && s.includes("contact"),
};

/* ══════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════ */
const Icon = {
  Dashboard: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Leads: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Quote: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Contact: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Logout: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Edit: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Delete: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  Eye: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Close: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Save: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Menu: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════
   STATUS BADGE
══════════════════════════════════════════════════════════ */
function StatusBadge({ status }: { status: LeadStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   STATUS SELECT
══════════════════════════════════════════════════════════ */
function StatusSelect({ value, onChange, disabled }: { value: LeadStatus; onChange: (v: LeadStatus) => void; disabled?: boolean }) {
  const c = STATUS_CONFIG[value];
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LeadStatus)}
        disabled={disabled}
        className={`appearance-none pl-2.5 pr-6 py-1 rounded-full text-[11px] font-semibold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:opacity-50 ${c.bg} ${c.text} ${c.border}`}
        style={{ backgroundImage: "none" }}
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
        ))}
      </select>
      <span className={`absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none ${c.text}`}>
        <Icon.ChevronDown />
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LEAD DETAIL MODAL
   — scrollbar hidden via inline style on the scrollable div
══════════════════════════════════════════════════════════ */
function LeadModal({ lead, onClose, onSave }: {
  lead: Lead;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Lead>) => Promise<void>;
}) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [status, setStatus] = useState<LeadStatus>(lead.lead_status);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(lead.id, { notes, lead_status: status });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-2xl shadow-2xl shadow-gray-200 flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — fixed */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60 rounded-t-2xl flex-shrink-0">
          <div>
            <h2 className="text-gray-900 font-bold text-base">{lead.full_name}</h2>
            <p className="text-gray-400 text-xs mt-0.5">{lead.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={lead.lead_status} />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <Icon.Close />
            </button>
          </div>
        </div>

        {/* Body — scrollable, scrollbar hidden */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-5"
          style={{
            scrollbarWidth: "none",       /* Firefox */
            msOverflowStyle: "none",      /* IE/Edge */
          }}
        >
          {/* Webkit scrollbar hidden via global style injected below */}
          <style>{`.modal-scroll::-webkit-scrollbar { display: none; }`}</style>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Full Name",   value: lead.full_name },
              { label: "Email",       value: lead.email },
              { label: "Phone",       value: lead.phone || "—" },
              { label: "Website",     value: lead.website_url || "—" },
              { label: "Service",     value: lead.service },
              { label: "Source Page", value: lead.source_page || "—" },
              {
                label: "Submitted",
                value: new Date(lead.created_at).toLocaleString("en-GB", {
                  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                }),
              },
            ].map((f) => (
              <div key={f.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{f.label}</p>
                <p className="text-gray-800 text-sm break-all">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
            <p className="text-orange-600 text-[10px] font-bold uppercase tracking-wider mb-2">Message</p>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{lead.message}</p>
          </div>

          {/* Status picker */}
          <div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-3">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map((s) => {
                const c = STATUS_CONFIG[s];
                const isActive = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      isActive
                        ? `${c.bg} ${c.text} ${c.border} ring-2 ring-offset-1 ring-orange-300`
                        : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? c.dot : "bg-gray-300"}`} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Internal Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add internal notes about this lead…"
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none cursor-text"
            />
          </div>
        </div>

        {/* Footer — fixed */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/40 rounded-b-2xl flex-shrink-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors cursor-pointer font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              saved
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 hover:shadow-orange-300 disabled:opacity-50"
            }`}
          >
            {saving ? (
              <><svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Saving…</>
            ) : saved ? (
              <><Icon.Check />Saved!</>
            ) : (
              <><Icon.Save />Save Changes</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DELETE CONFIRM MODAL
══════════════════════════════════════════════════════════ */
function DeleteModal({ lead, onCancel, onConfirm }: {
  lead: Lead;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white border border-red-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-red-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4 text-red-500">
          <Icon.Delete />
        </div>
        <h3 className="text-gray-900 font-bold text-base text-center mb-2">Delete Lead?</h3>
        <p className="text-gray-500 text-sm text-center mb-6">
          This will permanently delete <span className="text-gray-800 font-semibold">{lead.full_name}</span>'s lead. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer">
            Cancel
          </button>
          <button
            onClick={async () => { setLoading(true); await onConfirm(); }}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════════════ */
function StatCard({ label, value, sub, accent = "text-gray-900" }: {
  label: string; value: string | number; sub?: string; accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-orange-200 hover:shadow-md transition-all duration-200">
      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">{label}</p>
      <p className={`text-2xl font-black ${accent}`}>{value}</p>
      {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════ */
function Dashboard({ leads }: { leads: Lead[] }) {
  const total = leads.length;
  const newLeads = leads.filter((l) => l.lead_status === "new").length;
  const won = leads.filter((l) => l.lead_status === "won").length;
  const convRate = total > 0 ? ((won / total) * 100).toFixed(1) : "0";

  const statusCounts = ALL_STATUSES.map((s) => leads.filter((l) => l.lead_status === s).length);
  const chartColors = ["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#f97316","#10b981","#ef4444"];

  const last30: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    last30[d.toISOString().split("T")[0]] = 0;
  }
  leads.forEach((l) => {
    const day = l.created_at.split("T")[0];
    if (last30[day] !== undefined) last30[day]++;
  });
  const timeLabels = Object.keys(last30).map((d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
  );
  const timeCounts = Object.values(last30);

  const serviceCounts: Record<string, number> = {};
  leads.forEach((l) => { serviceCounts[l.service] = (serviceCounts[l.service] || 0) + 1; });
  const topServices = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const tooltipDefaults = {
    backgroundColor: "#fff",
    titleColor: "#111827",
    bodyColor: "#6b7280",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    padding: 10,
    cornerRadius: 10,
  };
  const axisDefaults = {
    x: { grid: { color: "#f3f4f6" }, ticks: { color: "#9ca3af", font: { size: 10 } } },
    y: { grid: { color: "#f3f4f6" }, ticks: { color: "#9ca3af", font: { size: 10 }, stepSize: 1 } },
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={total} sub="All time" />
        <StatCard label="New Leads" value={newLeads} sub="Awaiting contact" accent="text-blue-600" />
        <StatCard label="Deals Won" value={won} sub="Converted" accent="text-emerald-600" />
        <StatCard label="Conversion Rate" value={`${convRate}%`} sub="Won ÷ Total" accent="text-orange-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-gray-800 font-bold text-sm mb-4">Status Breakdown</p>
          <div className="h-52 flex items-center justify-center">
            {total > 0 ? (
              <Doughnut
                data={{
                  labels: ALL_STATUSES.map((s) => STATUS_CONFIG[s].label),
                  datasets: [{
                    data: statusCounts,
                    backgroundColor: chartColors.map((c) => c + "26"),
                    borderColor: chartColors,
                    borderWidth: 2,
                    hoverOffset: 6,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "68%",
                  plugins: {
                    legend: { position: "right", labels: { color: "#6b7280", font: { size: 10 }, padding: 10, boxWidth: 10, boxHeight: 10 } },
                    tooltip: tooltipDefaults,
                  },
                }}
              />
            ) : (
              <p className="text-gray-400 text-sm">No data yet</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-gray-800 font-bold text-sm mb-4">Leads — Last 30 Days</p>
          <div className="h-52">
            <Line
              data={{
                labels: timeLabels,
                datasets: [{
                  data: timeCounts,
                  borderColor: "#f97316",
                  backgroundColor: "rgba(249,115,22,0.07)",
                  borderWidth: 2.5,
                  pointBackgroundColor: "#f97316",
                  pointRadius: 3,
                  pointHoverRadius: 5,
                  tension: 0.4,
                  fill: true,
                }],
              }}
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: tooltipDefaults },
                scales: axisDefaults,
              }}
            />
          </div>
        </div>
      </div>

      {topServices.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-gray-800 font-bold text-sm mb-4">Leads by Service (Top 6)</p>
          <div className="h-44">
            <Bar
              data={{
                labels: topServices.map(([s]) => s.length > 30 ? s.slice(0, 30) + "…" : s),
                datasets: [{
                  data: topServices.map(([, c]) => c),
                  backgroundColor: "rgba(249,115,22,0.15)",
                  borderColor: "#f97316",
                  borderWidth: 2,
                  borderRadius: 6,
                  borderSkipped: false,
                }],
              }}
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: tooltipDefaults },
                scales: axisDefaults,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LEADS TABLE
══════════════════════════════════════════════════════════ */
const PAGE_SIZE = 15;

function LeadsTable({ leads, onRefresh, onUpdate, onDelete }: {
  leads: Lead[];
  onRefresh: () => void;
  onUpdate: (id: string, updates: Partial<Lead>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      l.full_name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.service.toLowerCase().includes(q) ||
      (l.phone || "").includes(q);
    const matchStatus = statusFilter === "all" || l.lead_status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [search, statusFilter]);

  async function handleStatusChange(lead: Lead, status: LeadStatus) {
    setUpdatingId(lead.id);
    await onUpdate(lead.id, { lead_status: status });
    setUpdatingId(null);
  }

  return (
    <>
      {viewLead && (
        <LeadModal
          lead={viewLead}
          onClose={() => setViewLead(null)}
          onSave={async (id, updates) => {
            await onUpdate(id, updates);
            setViewLead((prev) => prev ? { ...prev, ...updates } : null);
          }}
        />
      )}
      {deleteLead && (
        <DeleteModal
          lead={deleteLead}
          onCancel={() => setDeleteLead(null)}
          onConfirm={async () => { await onDelete(deleteLead.id); setDeleteLead(null); }}
        />
      )}

      <div className="space-y-3">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Icon.Search /></span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, service…"
              className="w-full bg-white border border-gray-200 text-gray-700 placeholder-gray-400 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-text"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")}
              className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:border-orange-400 cursor-pointer transition-all"
            >
              <option value="all">All Statuses</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Icon.ChevronDown /></span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-gray-400 text-xs">{filtered.length} of {leads.length} leads</span>
            <button
              onClick={onRefresh}
              title="Refresh"
              className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-300 transition-colors cursor-pointer"
            >
              <Icon.Refresh />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Name", "Email", "Phone", "Service", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-gray-400 text-sm">
                      {search || statusFilter !== "all" ? "No leads match your filters." : "No leads yet."}
                    </td>
                  </tr>
                ) : (
                  paginated.map((lead, i) => (
                    <tr
                      key={lead.id}
                      className={`border-b border-gray-50 hover:bg-orange-50/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                    >
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 text-[10px] font-black">{lead.full_name.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="text-gray-800 font-semibold text-sm">{lead.full_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <a href={`mailto:${lead.email}`} className="text-gray-500 text-xs hover:text-orange-500 transition-colors cursor-pointer flex items-center gap-1 group">
                          {lead.email}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity"><Icon.ExternalLink /></span>
                        </a>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-gray-400 text-xs">{lead.phone || "—"}</span>
                      </td>
                      <td className="px-4 py-3.5 max-w-[180px]">
                        <span className="text-gray-600 text-xs">{lead.service}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <StatusSelect
                          value={lead.lead_status}
                          disabled={updatingId === lead.id}
                          onChange={(v) => handleStatusChange(lead, v)}
                        />
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-gray-400 text-xs">
                          {new Date(lead.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setViewLead(lead)} title="View" className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer">
                            <Icon.Eye />
                          </button>
                          <button onClick={() => setViewLead(lead)} title="Edit" className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 transition-colors cursor-pointer">
                            <Icon.Edit />
                          </button>
                          <button onClick={() => setDeleteLead(lead)} title="Delete" className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer">
                            <Icon.Delete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 bg-gray-50/50">
              <p className="text-gray-400 text-xs">Page {page} of {totalPages} · {filtered.length} results</p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors cursor-pointer">
                  <Icon.ChevronLeft />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pg = Math.min(Math.max(page - 2, 1) + i, totalPages);
                  return (
                    <button key={pg} onClick={() => setPage(pg)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        pg === page
                          ? "bg-orange-500 text-white border border-orange-500 shadow-sm"
                          : "bg-white border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
                      }`}
                    >{pg}</button>
                  );
                })}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors cursor-pointer">
                  <Icon.ChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN CRM PAGE
══════════════════════════════════════════════════════════ */
const NAV_ITEMS: { id: NavItem; label: string; NavIcon: React.FC }[] = [
  { id: "dashboard",     label: "Dashboard",     NavIcon: Icon.Dashboard },
  { id: "service_leads", label: "Service Leads", NavIcon: Icon.Leads },
  { id: "get_a_quote",   label: "Get A Quote",   NavIcon: Icon.Quote },
  { id: "contact_us",    label: "Contact Us",    NavIcon: Icon.Contact },
];

const SECTION_TITLES: Record<Exclude<NavItem, "dashboard">, string> = {
  service_leads: "Service Leads",
  get_a_quote:   "Get A Quote",
  contact_us:    "Contact Us",
};

export default function CRMPage() {
  const router = useRouter();
  const [active, setActive] = useState<NavItem>("dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/leads");
      const json = await res.json();
      if (json.error) setFetchError(json.error);
      else setLeads(json.data || []);
    } catch {
      setFetchError("Network error — could not fetch leads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function handleUpdate(id: string, updates: Partial<Lead>) {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!json.error) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function getServiceLeads(): Lead[] {
    const f = leads.filter((l) => SOURCE_FILTERS.service_leads(l.source_page));
    return f.length > 0 ? f : leads;
  }

  function getFilteredLeads(section: Exclude<NavItem, "dashboard">): Lead[] {
    if (section === "service_leads") return getServiceLeads();
    return leads.filter((l) => SOURCE_FILTERS[section](l.source_page));
  }

  function renderContent() {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin w-7 h-7 text-orange-500 mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            <p className="text-gray-400 text-sm">Loading leads…</p>
          </div>
        </div>
      );
    }

    if (fetchError) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 className="text-gray-800 font-bold mb-2">Could not load leads</h3>
            <p className="text-gray-500 text-sm mb-1">{fetchError}</p>
            <p className="text-gray-400 text-xs mb-4">
              Make sure <code className="bg-gray-100 px-1.5 py-0.5 rounded text-orange-600">NEXT_PUBLIC_SUPABASE_SECRET_KEY</code> is set in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-orange-600">.env.local</code>
            </p>
            <button onClick={fetchLeads} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer">
              <Icon.Refresh /> Retry
            </button>
          </div>
        </div>
      );
    }

    if (active === "dashboard") {
      return (
        <div className="flex-1 overflow-y-auto p-5 lg:p-8">
          <div className="max-w-6xl">
            <div className="mb-6">
              <h1 className="text-gray-900 font-black text-xl">Dashboard</h1>
              <p className="text-gray-400 text-sm mt-0.5">{leads.length} total leads across all sources</p>
            </div>
            <Dashboard leads={leads} />
          </div>
        </div>
      );
    }

    const tableLeads = getFilteredLeads(active);
    return (
      <div className="flex-1 overflow-y-auto p-5 lg:p-8">
        <div className="max-w-6xl">
          <div className="mb-6">
            <h1 className="text-gray-900 font-black text-xl">{SECTION_TITLES[active]}</h1>
            <p className="text-gray-400 text-sm mt-0.5">{tableLeads.length} lead{tableLeads.length !== 1 ? "s" : ""}</p>
          </div>
          <LeadsTable leads={tableLeads} onRefresh={fetchLeads} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} shadow-xl shadow-gray-100 lg:shadow-none`}>
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-200">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-black text-sm leading-none">Junixo CRM</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Internal Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest px-3 mb-3">Navigation</p>
          {NAV_ITEMS.map(({ id, label, NavIcon }) => {
            const isActive = active === id;
            const count =
              id === "dashboard" ? null
              : id === "service_leads" ? getServiceLeads().length
              : leads.filter((l) => SOURCE_FILTERS[id](l.source_page)).length;
            return (
              <button
                key={id}
                onClick={() => { setActive(id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left cursor-pointer ${
                  isActive
                    ? "bg-orange-50 text-orange-600 border border-orange-200 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <NavIcon />
                <span className="flex-1">{label}</span>
                {count !== null && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="border-t border-gray-100 my-3" />
          <div className="px-3 py-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-400 text-[10px]">Live · Supabase</span>
            </div>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 mb-2">
            <div className="w-7 h-7 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 text-[10px] font-black">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-700 text-xs font-bold truncate">shubhadipdev</p>
              <p className="text-gray-400 text-[10px]">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all text-sm cursor-pointer"
          >
            <Icon.Logout />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm shadow-gray-100/60">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
            <Icon.Menu />
          </button>
          <div className="flex-1">
            <h2 className="text-gray-800 font-bold text-sm">{NAV_ITEMS.find((n) => n.id === active)?.label}</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {(["new", "won", "lost"] as LeadStatus[]).map((s) => {
              const count = leads.filter((l) => l.lead_status === s).length;
              const c = STATUS_CONFIG[s];
              return (
                <span key={s} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${c.bg} ${c.text} ${c.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />{count} {c.label}
                </span>
              );
            })}
          </div>
          <button onClick={fetchLeads} title="Refresh" className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
            <Icon.Refresh />
          </button>
        </header>

        <div className="flex-1 flex flex-col">{renderContent()}</div>
      </div>
    </div>
  );
}