import { useEffect, useState } from 'react';

type Bedrijf = {
  Bedrijf: string;
  Directie: string;
  RvC: string;
  Kernactiviteiten: string;
  Cijfers_2023: string;
  Cijfers_2024: string;
  Cijfers_2025: string;
  Werknemers: string;
  Issues: string;
  Observaties: string;
};

export default function Home() {
  const [bedrijven, setBedrijven] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [info, setInfo] = useState<Bedrijf | null>(null);
  const [activeTab, setActiveTab] = useState<'algemeen' | 'research' | 'news'>('algemeen');

  useEffect(() => {
    fetch('https://api.sheetbest.com/sheets/77cb9403-eaff-49f3-bd6d-452e7c294296')
      .then(res => res.json())
      .then((data: Bedrijf[]) => {
        const unique = Array.from(new Set(data.map(row => row.Bedrijf))) as string[];
        setBedrijven(unique);
        setSelected(unique[0]);
      });
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch('https://api.sheetbest.com/sheets/77cb9403-eaff-49f3-bd6d-452e7c294296')
      .then(res => res.json())
      .then((data: Bedrijf[]) => {
        const bedrijf = data.find(row => row.Bedrijf === selected) || null;
        setInfo(bedrijf);
      });
  }, [selected]);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center mb-10">
          <img src="/logo.png" alt="Logo" className="w-40 mb-4" />
          <h1 className="text-3xl font-bold text-center">Top 100 Dashboard</h1>
        </div>

        <div className="flex flex-col items-center mb-6">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-base shadow"
          >
            {bedrijven.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <button onClick={() => setActiveTab('algemeen')} className={activeTab === 'algemeen' ? 'font-semibold underline' : ''}>Algemeen</button>
          <button onClick={() => setActiveTab('research')} className={activeTab === 'research' ? 'font-semibold underline' : ''}>Research</button>
          <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? 'font-semibold underline' : ''}>Nieuws</button>
        </div>

        {activeTab === 'algemeen' && info && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <p><strong>Directie:</strong> {info.Directie}</p>
            <p><strong>RvC:</strong> {info.RvC}</p>
            <p><strong>Kernactiviteiten:</strong> {info.Kernactiviteiten}</p>
            <p><strong>Cijfers 2023:</strong> €{info.Cijfers_2023} mln</p>
            <p><strong>Cijfers 2024:</strong> €{info.Cijfers_2024} mln</p>
            <p><strong>Cijfers 2025:</strong> €{info.Cijfers_2025} mln</p>
            <p><strong>Werknemers:</strong> {info.Werknemers}</p>
            <p><strong>Issues:</strong> {info.Issues}</p>
            <p><strong>Observaties:</strong> {info.Observaties}</p>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="text-center text-sm text-gray-500">[Research-tab placeholder – formulier of PDF-lijst komt hier]</div>
        )}

        {activeTab === 'news' && (
          <div className="text-center text-sm text-gray-500">[Nieuws-tab placeholder – met kwartaalfilter en NewsAPI-koppeling]</div>
        )}
      </div>
    </main>
  );
}
