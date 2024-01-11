import React from 'react'
import SiteHeader from "../components/SiteHeader.js";
import Navbar from "../components/Navbar";

export default function MapPage() {
  return (
    <div>
      <SiteHeader /><Navbar />
      <iframe
  src='https://flo.uri.sh/visualisation/15516363/embed'
  title='Interactive or visual content'
  className='flourish-embed-iframe'
  frameBorder='0'
  scrolling='no'
  style={{ width: '100%', height: '600px' }}
  sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
></iframe>
<div
  style={{ width: '100%', marginTop: '4px', textAlign: 'right' }}
>
</div>
</div>
  )
}
