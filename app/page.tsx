import Link from "next/link";

export default function Page() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">CLPlanning Lycéens — Final</h1>
      <p className="leading-relaxed">
        Projet Next.js + Tailwind avec un PDF et un ICS pré-intégrés pour le planning.
      </p>
      <div className="flex gap-4">
        <a className="underline" href="/docs/guide.pdf" target="_blank" rel="noreferrer">Ouvrir le PDF</a>
        <a className="underline" href="/calendar/demo.ics">Télécharger l’ICS</a>
        <Link className="underline" href="/calendar">Voir le calendrier</Link>
      </div>
    </main>
  );
}
