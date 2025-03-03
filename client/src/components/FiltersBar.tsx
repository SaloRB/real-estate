import { FilterIcon, GridIcon, ListIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  maxPriceRanges,
  minPriceRanges,
  PropertyTypeIcons,
} from '@/lib/constants'
import { cn, formatPriceValue, updateUrl } from '@/lib/utils'
import { setFilters, setViewMode, toggleFiltersFullOpen } from '@/state'
import { useAppSelector } from '@/state/redux'

import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const FiltersBar = () => {
  const dispatch = useDispatch()
  const filters = useAppSelector((state) => state.global.filters)
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  )

  const viewMode = useAppSelector((state) => state.global.viewMode)
  const [searchInput, setSearchInput] = useState(filters.location)

  const handleFilterChange = (
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value

    if (key === 'priceRange' || key === 'squareFeet') {
      const currentArrayRange = [...filters[key]]
      if (isMin) {
        const index = isMin ? 0 : 1
        currentArrayRange[index] = value === 'any' ? null : Number(value)
      }
      newValue = currentArrayRange
    } else if (key === 'coordinates') {
      newValue = value === 'any' ? [0, 0] : value.map(Number)
    } else {
      newValue = value === 'any' ? 'any' : value
    }

    const newFilters = { ...filters, [key]: newValue }
    dispatch(setFilters(newFilters))
    updateUrl(newFilters)
  }

  const handleLocationSearch = () => {}

  return (
    <div className="flex justify-between items-center w-full py-5">
      <div className="flex justify-between items-center gap-4 p-2">
        {/* All Filters */}
        <Button
          variant="outline"
          className={cn(
            'gap-2 rounded-xl border-primary-400 hover:bg-primary-500 hover:text-primary-100',
            isFiltersFullOpen && 'bg-primary-700 text-primary-100'
          )}
          onClick={() => dispatch(toggleFiltersFullOpen())}
        >
          <FilterIcon className="size-4" />
          <span>All Filters</span>
        </Button>

        {/* Search Location */}
        <div className="flex items-center">
          <Input
            placeholder="Search location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-40 rounded-l-xl rounded-r-none border-primary-400 border-r-0"
          />
          <Button
            onClick={handleLocationSearch}
            className="rounded-r-xl rounded-l-none border-l-none border-primary-400 shadow-none border hover:bg-primary-700 hover:text-primary-50"
          >
            <SearchIcon className="size-4" />
          </Button>
        </div>

        {/* Price Range */}
        <div className="flex gap-1">
          {/* Minimum Price Selector */}
          <Select
            value={filters.priceRange[0]?.toString() || 'any'}
            onValueChange={(value) =>
              handleFilterChange('priceRange', value, true)
            }
          >
            <SelectTrigger className="w-22 rounded-xl border-primary-400">
              <SelectValue>
                {formatPriceValue(filters.priceRange[0], true)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Min Price</SelectItem>
              {minPriceRanges.map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  ${price / 1000}k+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Maximum Price Selector */}
          <Select
            value={filters.priceRange[1]?.toString() || 'any'}
            onValueChange={(value) =>
              handleFilterChange('priceRange', value, true)
            }
          >
            <SelectTrigger className="w-22 rounded-xl border-primary-400">
              <SelectValue>
                {formatPriceValue(filters.priceRange[1], true)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Max Price</SelectItem>
              {maxPriceRanges.map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  &lt;${price / 1000}k+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Beds and Baths */}
        <div className="flex gap-1">
          {/* Beds */}
          <Select
            value={filters.beds}
            onValueChange={(value) => handleFilterChange('beds', value, null)}
          >
            <SelectTrigger className="w-26 rounded-xl border-primary-400">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Beds</SelectItem>
              <SelectItem value="1">1+ bed</SelectItem>
              <SelectItem value="2">2+ beds</SelectItem>
              <SelectItem value="3">3+ beds</SelectItem>
              <SelectItem value="4">4+ beds</SelectItem>
            </SelectContent>
          </Select>

          {/* Baths */}
          <Select
            value={filters.baths}
            onValueChange={(value) => handleFilterChange('baths', value, null)}
          >
            <SelectTrigger className="w-26 rounded-xl border-primary-400">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Baths</SelectItem>
              <SelectItem value="1">1+ bath</SelectItem>
              <SelectItem value="2">2+ baths</SelectItem>
              <SelectItem value="3">3+ baths</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <Select
          value={filters.propertyType || 'any'}
          onValueChange={(value) =>
            handleFilterChange('propertyType', value, null)
          }
        >
          <SelectTrigger className="w-32 rounded-xl border-primary-400">
            <SelectValue placeholder="Home Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Type</SelectItem>
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <Icon className="size-4 mr-2" />
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* View Mode */}
      <div className="flex justify-between items-center gap-4 p-2">
        <div className="flex border rounded-xl">
          <Button
            variant="ghost"
            className={cn(
              'px-3 py-1 rounded-none rounded-l-xl hover:bg-primary-600 hover:text-primary-100',
              viewMode === 'list' && 'bg-primary-700 text-primary-50'
            )}
            onClick={() => dispatch(setViewMode('list'))}
          >
            <ListIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'px-3 py-1 rounded-none rounded-r-xl hover:bg-primary-600 hover:text-primary-100',
              viewMode === 'grid' && 'bg-primary-700 text-primary-50'
            )}
            onClick={() => dispatch(setViewMode('grid'))}
          >
            <GridIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
export default FiltersBar
