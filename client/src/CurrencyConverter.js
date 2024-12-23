import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(null);

    const handleConvert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/convert', {
                fromCurrency,
                toCurrency,
                amount,
            });
            setConvertedAmount(response.data.convertedAmount);
        } catch (error) {
            console.error('Error during conversion:', error);
        }
    };

    return (
        <div>
            <h1>Currency Converter</h1>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add more currency options as needed */}
            </select>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                {/* Add more currency options as needed */}
            </select>
            <button onClick={handleConvert}>Convert</button>

            {convertedAmount && (
                <div>
                    <h2>Converted Amount: {convertedAmount}</h2>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;
