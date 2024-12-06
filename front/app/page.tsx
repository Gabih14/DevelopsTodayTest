import Link from 'next/link';

export default async function Home() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { cache: 'no-store' });
    const countries = await response.json();

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Countries List</h1>
            <ul>
                {countries.map((country: { name: string; code: string }) => (
                    <li key={country.code}>
                        <Link href={`/countries/${country.code}`}>{country.name}</Link>
                    </li>
                ))}
            </ul>
            </main>
        </div>
    );
}
