import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import rootReducer from './Redux/Reducer/rootReducer'
import { Provider } from 'react-redux'
import { createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const root = ReactDOM.createRoot(document.getElementById('root'))
const store = createStore(rootReducer, applyMiddleware(thunk))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()