import { MapPinIcon, StarIcon } from 'lucide-react'

import { useGetPropertyQuery } from '@/state/api'

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
  const { data: property, isError, isLoading } = useGetPropertyQuery(propertyId)

  if (isLoading) return <div>Loading...</div>
  if (isError || !property) return <>Property Not Found</>

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">
          {property.location?.country} / {property.location?.state} /{' '}
          <span className="font-semibold text-gray-600">
            {property.location?.city}
          </span>
        </div>
        <h1 className="text-3xl font-bold my-5">{property.name}</h1>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-gray-500">
            <MapPinIcon className="size-4 mr-1 text-gray-700" />{' '}
            {property.location?.city}, {property.location?.state},{' '}
            {property.location?.country}
          </span>
          <div className="flex justify-between items-center gap-3">
            <span className="flex items-center text-yellow-500">
              <StarIcon className="size-4 mr-1 fill-current" />
              {property.averageRating.toFixed(1)} ({property.numberOfReviews}{' '}
              Reviews)
            </span>
            <span className="text-green-600">Verified Listing</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border border-primary-200 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center gap-4 px-5">
          <div>
            <div className="text-sm text-gray-500">Monthly Rent</div>
            <div className="font-semibold">
              ${property.pricePerMonth.toLocaleString()}
            </div>
          </div>
          <div className="border-l h-10 border-gray-300" />
          <div>
            <div className="text-sm text-gray-500">Bedrooms</div>
            <div className="font-semibold">{property.beds} bd</div>
          </div>
          <div className="border-l h-10 border-gray-300" />
          <div>
            <div className="text-sm text-gray-500">Bathrooms</div>
            <div className="font-semibold">{property.baths} ba</div>
          </div>
          <div className="border-l h-10 border-gray-300" />
          <div>
            <div className="text-sm text-gray-500">Square Feet</div>
            <div className="font-semibold">
              {property.squareFeet.toLocaleString()} sq ft
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="my-16">
        <h2 className="text-xl font-semibold mb-5">About {property.name}</h2>
        <p className="text-gray-500 leading-7 text-justify">
          {property.description} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque vel deleniti, veniam excepturi accusamus,
          consectetur sed vero aut alias similique quisquam! Suscipit maiores
          sunt, ipsum vel earum minus eveniet veritatis ea dolores nostrum
          laboriosam blanditiis mollitia officiis. Asperiores accusamus
          assumenda alias libero a praesentium. Libero laudantium esse expedita,
          odio aliquam perferendis autem magnam sequi. Ut omnis asperiores culpa
          ullam quo consequatur voluptate vel facere iure illum, deserunt quasi
          exercitationem nemo quos impedit neque maxime tempora voluptatum,
          deleniti cupiditate ipsum hic! Soluta recusandae doloremque ea
          quisquam cum iusto eius, saepe consectetur, eveniet iure qui aperiam
          quia aliquid ducimus vitae debitis dignissimos molestiae autem
          incidunt ipsam nobis amet! Debitis soluta, fuga voluptate,
          reprehenderit recusandae tempora similique eaque nulla impedit
          deserunt pariatur, explicabo temporibus dolore aut ex accusantium?
          Tenetur labore, sequi quisquam voluptas sapiente sunt perspiciatis non
          facilis vero explicabo odit dolorem esse voluptatum maiores tempora
          similique quasi unde reiciendis laboriosam in, aliquid totam expedita
          provident quod? Amet fugiat quisquam necessitatibus nemo odio dolorum
          impedit sint recusandae mollitia iusto doloribus ut, accusantium sed
          quod, autem modi a quibusdam veritatis ipsam officiis quia nobis
          eveniet dolores! Optio excepturi maiores dolorum fuga officia
          accusamus quibusdam, molestiae, incidunt nam animi voluptatem
          veritatis consectetur voluptates. Aliquid, hic.
        </p>
      </div>
    </div>
  )
}
export default PropertyOverview
