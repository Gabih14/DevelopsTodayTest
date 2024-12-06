import React from 'react';

interface BorderCountry {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: any;  
}

interface PopulationData {
    year: string;
    population: number;
}

interface CountryDetails {
    name: string;
    borders: BorderCountry[];  
    populationData: PopulationData[];
    flag: string;
}

export default async function CountryPage({ params }: { params: { code: string } }) {
    const { code } = await params;

    // Fetch data from the backend
    const response = await fetch(`http://localhost:5000/countries/details/${code}`, {
        cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-semibold text-red-600">Error</h1>
                <p className="text-gray-500">Could not fetch data for country code: {code}</p>
            </div>
        );
    }

    const country: CountryDetails = await response.json();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">{country.name}</h1>
                <img src={country.flag} alt={`Flag of ${country.name}`} className="w-32 mx-auto mt-4" />
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Border Countries</h2>
                <ul className="space-y-2">
                    {country.borders.length > 0 ? (
                        country.borders.map((border) => (
                            <li key={border.countryCode} className="border p-4 rounded-lg shadow-md hover:bg-gray-50 transition duration-200">
                                <div className="text-lg font-medium">{border.commonName}</div>
                                <div className="text-sm text-gray-500">{border.officialName}</div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No border countries available</p>
                    )}
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Population Over Time</h2>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Year</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {country.populationData.map((data) => (
                            <tr key={data.year} className="border-t">
                                <td className="px-4 py-2 text-sm text-gray-700">{data.year}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{data.population.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
