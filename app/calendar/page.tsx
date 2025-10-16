import { parseICS, formatDateRange } from "@/lib/ics";

async function getIcsText(): Promise<string> {
  const res = await fetch("/calendar/demo.ics", { cache: "no-store" });
  if (!res.ok) throw new Error("Impossible de charger le fichier ICS.");
  return await res.text();
}

export default async function CalendarPage() {
  const ics = await getIcsText();
  const events = parseICS(ics);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Calendrier</h1>
      <ul className="space-y-4">
        {events.map((ev, i) => {
          const { date, time } = formatDateRange(ev.dtstart, ev.dtend);
          return (
            <li key={i} className="rounded-2xl border p-4 bg-white shadow-sm">
              <div className="text-xl font-semibold">{ev.summary}</div>
              <div className="text-sm text-gray-700">{date}</div>
              <div className="text-sm text-gray-700">{time}</div>
              {ev.location && <div className="text-sm text-gray-700">📍 {ev.location}</div>}
              {ev.description && <p className="mt-2 text-gray-800">{ev.description}</p>}
            </li>
          );
        })}
      </ul>
      <div>
        <a className="inline-block rounded-xl border px-4 py-2 underline" href="/calendar/demo.ics">Télécharger l’ICS</a>
      </div>
    </main>
  );
}
