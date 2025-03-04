'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import ImagePreviews from '@/components/search/ImagePreviews'
import PropertyDetails from '@/components/search/PropertyDetails'
import PropertyOverview from '@/components/search/PropertyOverview'
import PropertyLocation from '@/components/search/PropertyLocation'
import ContactWidget from '@/components/search/ContactWidget'

const SingleListingPage = () => {
  const { id } = useParams()
  const propertyId = Number(id)
  const [, setIsModalOpen] = useState(false)

  return (
    <div>
      <ImagePreviews
        images={['/singlelisting-2.jpg', '/singlelisting-3.jpg']}
      />
      <div className="flex flex-col md:flex-row justify-center gap-10 mx-10 md:w-2/3 md:mx-auto mt-16 mb-8">
        <div className="order-2 md:order-1">
          <PropertyOverview propertyId={propertyId} />
          <PropertyDetails propertyId={propertyId} />
          <PropertyLocation propertyId={propertyId} />
        </div>

        <div className="order-1 md:order-2">
          <ContactWidget onOpenModal={() => setIsModalOpen(true)} />
        </div>
      </div>
    </div>
  )
}
export default SingleListingPage
