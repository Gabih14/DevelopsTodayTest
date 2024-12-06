import Link from 'next/link';
import { Card } from '@/app/components/ui/card';


export default async function Home() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { cache: 'no-store' });
    const countries = await response.json();

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Countries List</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {countries.map((country: { name: string; code: string }) => (
                        <li key={country.code}>
                            <Link href={`/countries/${country.code}`}><Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <h2 className="text-xl font-semibold">{country.name}</h2>
                                <p className="text-muted-foreground mt-2">{country.code}</p>
                            </Card></Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
