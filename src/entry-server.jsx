/**
 * Build-time renderer (not shipped to browsers).
 * scripts/seo-build.mjs calls render('/about') etc. and puts the resulting HTML
 * inside <div id="root"> of each page file, so search engines and link
 * previews see the real page text without running JavaScript.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
