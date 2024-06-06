import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { CompraVentaProvider } from './context/CompraVentaProvider.jsx'
import router from './router.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CompraVentaProvider>
      <RouterProvider router={router} />
    </CompraVentaProvider>
  </React.StrictMode>,
)
