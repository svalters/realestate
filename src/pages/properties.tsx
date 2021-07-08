import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { startCase } from "lodash"

import Select from "@/components/select"
import Loader from "@/components/loader"
import Error from "@/components/error"
import PropertyChart from "@/components/propertyChart"
import { PROPERTIES_SCHEMA, SUB_LOCATION_SCHEMA } from "@/schema"
import {
  REAL_ESTATE_LOCATIONS,
  DEFAULT_SUB_LOCATIONS,
  DEFAULT_REAL_ESTATE_LOCATION,
  DEFAULT_SUB_LOCATION,
} from "@/constants"
import { ValueOf } from "@/types"

const Properties = () => {
  const [location, setLocation] = useState(DEFAULT_REAL_ESTATE_LOCATION)
  const [subLocation, setSubLocation] = useState(DEFAULT_SUB_LOCATION)

  const { data: subLocationData, loading: loadingSubLocation } = useQuery(
    SUB_LOCATION_SCHEMA,
    { variables: { location } }
  )

  const { data, loading, error } = useQuery(PROPERTIES_SCHEMA, {
    variables: { location, subLocation },
  })

  return (
    <>
      <section className='flex justify-end flex-wrap'>
        <Select
          value={location}
          disabled={loadingSubLocation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const newLocation = e.currentTarget.value as REAL_ESTATE_LOCATIONS
            setSubLocation(DEFAULT_SUB_LOCATIONS[newLocation])
            setLocation(newLocation)
          }}
        >
          {Object.values(REAL_ESTATE_LOCATIONS).map(optionLocation => (
            <option key={optionLocation} value={optionLocation}>
              {startCase(optionLocation)}
            </option>
          ))}
        </Select>
        <Select
          value={subLocation}
          disabled={loadingSubLocation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSubLocation(e.currentTarget.value)
          }
        >
          {(subLocationData?.subLocations ?? [subLocation]).map(
            (optionSubLocation: ValueOf<typeof DEFAULT_SUB_LOCATIONS>) => (
              <option key={optionSubLocation} value={optionSubLocation}>
                {startCase(optionSubLocation)}
              </option>
            )
          )}
        </Select>
      </section>
      {!loading && !error && (
        <article className='relative flex flex-1'>
          <div className='absolute inset-0'>
            <PropertyChart data={data?.entries ?? []} />
          </div>
        </article>
      )}
      {loading && !error && <Loader />}
      {error && <Error />}
    </>
  )
}

export default Properties
