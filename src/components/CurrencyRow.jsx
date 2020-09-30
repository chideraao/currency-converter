import React from "react";

function CurrencyRow({
	currencyOptions,
	selectedCurrency,
	onChangeCurrency,
	amount,
	onchangeAmount,
}) {
	return (
		<div>
			<input
				type="number"
				className="input"
				value={amount}
				onChange={onchangeAmount}
			/>
			<select value={selectedCurrency} onChange={onChangeCurrency}>
				{currencyOptions.map((option) => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default CurrencyRow;
