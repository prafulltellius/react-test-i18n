import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n/i18nWrapper.js'
import withTranslation from './i18n/i18nReact.jsx'

const AppWithLocale = withTranslation(App)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithLocale />
  </React.StrictMode>,
)
