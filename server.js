const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        return rate;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
};

app.post('/api/convert', async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;

    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    if (exchangeRate) {
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        res.json({ convertedAmount });
    } else {
        res.status(500).json({ error: 'Could not fetch exchange rate' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
