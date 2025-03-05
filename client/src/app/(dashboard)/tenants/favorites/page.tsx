'use client'

import Header from '@/components/Header'
import Loading from '@/components/Loading'
import PropertyCard from '@/components/PropertyCard'
import {
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
} from '@/state/api'

const FavoritesPage = () => {
  const { data: authUser } = useGetAuthUserQuery()
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || '',
    {
      skip: !authUser?.cognitoInfo.userId,
    }
  )

  const {
    data: favoriteProperties,
    isLoading,
    error,
  } = useGetPropertiesQuery(
    {
      favoriteIds: tenant?.favorites?.map((fav: { id: number }) => fav.id),
    },
    { skip: !tenant?.favorites || tenant?.favorites.length === 0 }
  )

  if (isLoading) return <Loading />
  if (error) return <div>Error loading favorites</div>

  return (
    <div className="dashboard-container">
      <Header
        title="Favorite Properties"
        subtitle="Browse and manage your saved property listings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProperties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={true}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!favoriteProperties || favoriteProperties.length === 0) && (
        <p>You don&apos;t have any favorited properties</p>
      )}
    </div>
  )
}

export default FavoritesPage
