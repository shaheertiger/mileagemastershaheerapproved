import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SitemapPage } from '../pages/sitemap/SitemapPage'
import '../styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('Missing #root element')

createRoot(container).render(
  <StrictMode>
    <SitemapPage />
  </StrictMode>,
)
