const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Ruta para obtener todos los países
app.get('/countries', async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        const countries = response.data.map(country => ({
            name: country.name,
            code: country.countryCode
        }));
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries' });
    }
});

// Endpoint para obtener detalles de un país
app.get('/countries/details/:code', async (req, res) => {
    const { code } = req.params;

    try {
        // Obtener datos del país (incluye países fronterizos)
        const countryInfoResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`);
        const countryInfo = countryInfoResponse.data;


        // Obtener datos históricos de población
        const populationResponse = await axios.post(
            'https://countriesnow.space/api/v0.1/countries/population',
            { country: countryInfo.commonName } // Nombre común del país
        );
        const populationData = populationResponse.data.data.populationCounts;

        // Obtener URL de la bandera
        const flagResponse = await axios.post(
            'https://countriesnow.space/api/v0.1/countries/flag/images',
            { country: countryInfo.commonName } // Nombre común del país
        );
        const flagUrl = flagResponse.data.data.flag;

        // Construir la respuesta
        const response = {
            name: countryInfo.commonName,
            borders: countryInfo.borders, // Códigos de países fronterizos
            populationData: populationData.map((data) => ({
                year: data.year,
                population: data.value,
            })),
            flag: flagUrl,
        };

        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error retrieving country details' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
