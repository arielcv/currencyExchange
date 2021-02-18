import img1 from "./img/money.png"
import axios from "./services/httpService"
import React, {useState, useEffect} from "react"
import config from "./config"
import SelectCurrency from "./components/selectCurrency";

export default function App() {

    const [currencies, setCurrencies] = useState({
            c1: {
                name: 'USD',
                amount: 1
            },
            c2: {
                name: 'USD',
                amount: 1
            },
            rate: 1
        },
    )
    const [currenciesList, setCurrenciesList] = useState([])

    useEffect(async () => {
            const rateFetched = await axios.get(config.urlAPI + currencies.c1.name)
            const response = rateFetched.data
            const newRate = (response.conversion_rates[currencies.c2.name]).toFixed(2)
            setCurrencies((prevState) => ({
                    ...prevState,
                    rate: newRate
                })
            )
            setCurrenciesList(response.conversion_rates)
        },
        []
    )

    const swap = () => {
        setCurrencies(
            {
                rate: (1 / currencies.rate).toFixed(2),
                c1: currencies.c2,
                c2: currencies.c1,
            })
    }

    const update = async (event) => {
        const type = event.target.id
        const value = event.target.value
        const temp = currencies
        if (type === 'currency-one') {
            temp.c1.name = value
            const rateFetched = await axios.get(config.urlAPI + currencies.c1.name)
            const response = rateFetched.data
            temp.rate = (response.conversion_rates[currencies.c2.name]).toFixed(2)
            temp.c1.amount = temp.c2.amount / temp.rate
        } else if (type === 'currency-two') {
            temp.c2.name = value
            const rateFetched = await axios.get(config.urlAPI + currencies.c1.name)
            const response = rateFetched.data
            temp.rate = (response.conversion_rates[currencies.c2.name]).toFixed(2)
            temp.c2.amount = temp.c1.amount * temp.rate
        } else if (type === 'amount-one') {
            temp.c1.amount = value
            temp.c2.amount = value * temp.rate
        } else if (type === 'amount-two') {
            temp.c2.amount = value
            temp.c1.amount = value / temp.rate
        }

        setCurrencies(
            {
                c1: {
                    name: temp.c1.name,
                    amount: (+temp.c1.amount).toFixed(2)
                },
                c2: {
                    name: temp.c2.name,
                    amount: (+temp.c2.amount).toFixed(2)
                },
                rate: temp.rate
            }
        )
    }

    return (
        <body >
            <img src={img1} id="" className="money-img"/>
            <h1>Exchange Rate Calculator</h1>
            <p>Choose the currency and the amounts to get the exchange rate</p>
            <div className="container">
                {<SelectCurrency id='one'
                                 update={update}
                                 currency={currencies.c1.name}
                                 amount={currencies.c1.amount}
                                 currenciesList={currenciesList}
                />}
                <div className="swap-rate-container">
                    <button className="btn" id="rate-btn" onClick={swap}>
                        Swap
                    </button>
                    <div className="rate"
                         id="rate">{`1 ${currencies.c1.name} = ${currencies.rate} ${currencies.c2.name}`}</div>
                </div>
                {<SelectCurrency id='two'
                                 update={update}
                                 currency={currencies.c2.name}
                                 amount={currencies.c2.amount}
                                 currenciesList={currenciesList}
                />}
            </div>
        </body>
    )
}
