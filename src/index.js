import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './floating-labels.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'
import App from "./App"
import {BrowserRouter} from "react-router-dom";

console.log("SUPERMAN", process.env.REACT_APP_NAME)

ReactDOM.render( < BrowserRouter > < App / > < /BrowserRouter>,document.getElementById('root'))
