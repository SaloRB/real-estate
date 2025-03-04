import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { useGetPropertyQuery } from '@/state/api'
import { CompassIcon, MapPinIcon } from 'lucide-react'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

const PropertyLocation = ({ propertyId }: PropertyOverviewProps) => {
  const { data: property, isError, isLoading } = useGetPropertyQuery(propertyId)
  const mapContainerRef = useRef(null)

  useEffect(() => {
    if (isLoading || isError || !property) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/stark0612/cm7tqx37x00bd01sa7x8fa5vo',
      center: [
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ],
      zoom: 14,
    })

    const marker = new mapboxgl.Marker()
      .setLngLat([
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ])
      .addTo(map)

    const markerElement = marker.getElement()
    const path = markerElement.querySelector('path[fill="#3FB1CE"]')
    if (path) path.setAttribute('fill', '#000000')

    return () => map.remove()
  }, [property, isLoading, isError])

  if (isLoading) return <div>Loading...</div>
  if (isError || !property) return <>Property Not Found</>

  return (
    <div className="py-16">
      <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
        Map and Location
      </h3>
      <div className="flex justify-between items-center text-sm text-primary-500 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPinIcon className="size-4 mr-1 text-gray-700" />
          Property Address:{' '}
          <span className="ml-2 font-semibold text-gray-700">
            {property.location?.address || 'Address not available'}
          </span>
        </div>
        <a
          href={`https://maps.google.com?q=${encodeURIComponent(
            property.location?.address || ''
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center hover:underline gap-2 text-primary-600"
        >
          <CompassIcon className="size-4" /> Get Directions
        </a>
      </div>
      <div
        className="relative mt-4 h-[300px] rounded-lg overflow-hidden"
        ref={mapContainerRef}
      />
    </div>
  )
}
export default PropertyLocation
