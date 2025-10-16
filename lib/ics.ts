// Minimal ICS parser
export type IcsEvent = {
  dtstart?: string;
  dtend?: string;
  summary?: string;
  description?: string;
  location?: string;
};
export function parseICS(text: string): IcsEvent[] {
  const lines = text.split(/\r?\n/);
  const events: IcsEvent[] = [];
  let inEvent = false;
  let current: IcsEvent = {};
  for (const raw of lines) {
    const line = raw.trim();
    if (line === "BEGIN:VEVENT") { inEvent = true; current = {}; continue; }
    if (line === "END:VEVENT") { inEvent = false; events.push(current); current = {}; continue; }
    if (!inEvent) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":");
    const k = key.split(";")[0].toUpperCase();
    if (k === "DTSTART") current.dtstart = value;
    if (k === "DTEND") current.dtend = value;
    if (k === "SUMMARY") current.summary = value;
    if (k === "DESCRIPTION") current.description = value;
    if (k === "LOCATION") current.location = value;
  }
  return events;
}
export function formatDateRange(dtstart?: string, dtend?: string) {
  try {
    const start = dtstart ? new Date(dtstart.replace(/Z?$/, "Z")) : undefined;
    const end = dtend ? new Date(dtend.replace(/Z?$/, "Z")) : undefined;
    const optsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const optsTime = { hour: "2-digit", minute: "2-digit" };
    const fmt = (d: Date, o: any) => new Intl.DateTimeFormat("fr-FR", o).format(d);
    if (start && end) return { date: fmt(start, optsDate), time: `${fmt(start, optsTime)} – ${fmt(end, optsTime)}` };
    if (start) return { date: fmt(start, optsDate), time: fmt(start, optsTime) };
  } catch {}
  return { date: "", time: "" };
}
