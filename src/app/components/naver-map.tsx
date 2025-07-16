'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

interface NaverMapProps {
  lat: number
  lng: number
  zoom?: number
  markerTitle?: string
}

export default function NaverMap({
  lat,
  lng,
  zoom = 15,
  markerTitle,
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapLoaded || !window.naver || !mapRef.current) return

    const location = new window.naver.maps.LatLng(lat, lng)
    const mapOptions = {
      center: location,
      zoom,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    }

    const map = new window.naver.maps.Map(mapRef.current, mapOptions)

    const marker = new window.naver.maps.Marker({
      position: location,
      map,
    })

    if (markerTitle) {
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding: 8px; font-size: 14px;">${markerTitle}</div>`,
      })

      window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindow.getMap() ? infoWindow.close() : infoWindow.open(map, marker)
      })
    }
  }, [lat, lng, zoom, markerTitle, mapLoaded])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onReady={() => setMapLoaded(true)}
      />
      <div ref={mapRef} className="h-64 w-full rounded-lg" />
    </>
  )
}
