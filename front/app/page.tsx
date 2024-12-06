import Link from 'next/link';

export default async function Home() {
    const response = await fetch('http://localhost:5000/countries', { cache: 'no-store' });
    const countries = await response.json();

    return (
        <div>
            <h1>Countries List</h1>
            <ul>
                {countries.map((country: { name: string; code: string }) => (
                    <li key={country.code}>
                        <Link href={`/countries/${country.code}`}>{country.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
