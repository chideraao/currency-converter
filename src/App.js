import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
	const [exchangeRates, setExchangeRates] = useState();

	//calculate exchange rates depending on source of currency
	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRates;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRates;
	}

	//useEffect to handle initial state changes(first render)
	useEffect(() => {
		Axios.get("https://api.exchangeratesapi.io/latest").then((res) => {
			const firstCurrency = Object.keys(res.data.rates)[0];
			console.log(res.data);
			return (
				setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]),
				setFromCurrency(res.data.base),
				setToCurrency(firstCurrency),
				setExchangeRates(res.data.rates[firstCurrency])
			);
		});
	}, []);

	//useEffect to handle further state changes(changing of base currency and other currencies)
	useEffect(() => {
		if (fromCurrency !== null && toCurrency !== null) {
			Axios.get(
				`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`
			).then((res) => {
				setExchangeRates(res.data.rates[toCurrency]);
			});
		}
	}, [fromCurrency, toCurrency]);

	const handleFromAmountChange = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	};

	const handleToAmountChange = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	};

	return (
		<>
			<h1>Convert</h1>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
				amount={fromAmount}
				onchangeAmount={handleFromAmountChange}
			/>
			<div className="equals">=</div>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
				amount={toAmount}
				onchangeAmount={handleToAmountChange}
			/>
		</>
	);
}

export default App;
