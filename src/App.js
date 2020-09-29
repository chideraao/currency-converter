import Axios from "axios";
import React, { useEffect, useState } from "react";

import "./App.css";
import CurrencyRow from "./components/CurrencyRow";

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	useEffect(() => {
		Axios.get("https://api.exchangeratesapi.io/latest").then((res) =>
			setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)])
		);
	}, []);
	return (
		<>
			<h1>Convert</h1>
			<CurrencyRow currencyOptions={currencyOptions} />
			<div className="equals">=</div>
			<CurrencyRow currencyOptions={currencyOptions} />
		</>
	);
}

export default App;
