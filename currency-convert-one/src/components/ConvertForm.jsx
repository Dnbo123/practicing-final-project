import React, { useState,useEffect } from "react";
import CurrencySelect from "./CurrencySelect.jsx";

const ConvertForm = () => {
  // State variables to store form data
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD"); // Currency we're converting from
  const [toCurrency, setToCurrency] = useState("KES");     // Currency we're converting to
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 

  // Function to swap the 'from' and 'to' currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  //Function to fetch the exchange rate and update the result
  const getExchangeRate = async () => {
const API_KEY = import.meta.env.VITE_API_KEY;

    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Something went wrong!");

        const data = await response.json();
        const rate = (data.conversion_rate * amount).toFixed(2); //Sets the results of toFixed into 2 decimal points
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  }

  // Variable to handle form submission
const handleFormSubmit = (e) => {
    e.preventDefault(); //årevents default form actions
    getExchangeRate();
}

//Fetch exchange rate initial render
useEffect(() => getExchangeRate, []);

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      {/* Input field for the amount to convert */}
      <div className="form-group">
        <label className="form-label">Enter Amount</label>
        <input
          type="number"
          className="form-input"
          value={amount}
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)} // Update amount state on input change
          required
        />
      </div>

      <div className="form-group form-currency-group">
        {/* 'From' currency selection */}
        <div className="form-section">
          <label className="form-label">From</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)} // Update fromCurrency state
          />
        </div>

        {/* Currency swap button */}
        <div className="swap-icon" onClick={handleSwapCurrencies}>
          <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>

        {/* 'To' currency selection */}
        <div className="form-section">
          <label className="form-label">To</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)} // Update toCurrency state
          />
        </div>
      </div>

      {/* Submit button to trigger exchange rate fetch */}
      <button type="submit" className={`${isLoading ? "loading" : ""}submit-button`}>
        Get Exchange Rate
      </button>

      

      {/* Display the exchange rate result if available */}
        <p className="exchange-rate-result">
              {isLoading ? "Getting exchange Rates..." : result}    
        </p>
      
    </form>
  );
};

export default ConvertForm;