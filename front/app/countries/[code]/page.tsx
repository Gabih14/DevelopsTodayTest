import React from 'react';
import PopulationChart from '../../components/PopulationChart';

interface BorderCountry {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: any;  
}

interface PopulationData {
    year: number;
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/details/${code}`, {
        cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-semibold text-red-600">Error</h1>
                <p className="text-gray-500">Could not fetch data or some of the data is missing for country code: {code}</p>
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
                <PopulationChart populationData={country.populationData} />
            </section>
        </div>
    );
}
