import { PropertyCards } from './propertycards'
import { PropertyTypes } from './propertytypes'
import { NearbyProperties } from './nearbyPorperties'


export const ExploreProperty = () => {
  return (
    <main className="min-h-screen bg-white">
      <PropertyCards />
      <PropertyTypes />
      <NearbyProperties />

    </main>
  )
}

