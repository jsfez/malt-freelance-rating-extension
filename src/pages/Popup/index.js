import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

const container = window.document.querySelector('#app-container')
const root = createRoot(container)
root.render(<App />)

if (module.hot) module.hot.accept()
