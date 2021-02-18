import React from 'react';

function SelectCurrency(props) {
    const {id, update, currency, amount, currenciesList} = props

    return (
        <div className="currency">
            {console.log(currency)}
            <select id={`currency-${id}`}
                    onChange={update}
                    defaultValue={currency}
            >
                {Object.keys(currenciesList).map((c) =>
                    <option key={c+id}
                            value={c}
                    >
                        {c}
                    </option>)}
            </select>
            <i className="fa fa-caret-down fa-2x"></i>
            <input type="number"
                   id={`amount-${id}`}
                   step={0.01}
                   value={amount}
                   onInput={update}
            />
        </div>
    );
}

export default SelectCurrency;
