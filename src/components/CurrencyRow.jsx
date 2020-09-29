import React from "react";

function CurrencyRow({ currencyOptions }) {
	return (
		<div>
			<input type="number" className="input" />
			<select>
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
