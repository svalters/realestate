import React, { useState } from "react"
import { startCase } from "lodash"
import { useQuery } from "@apollo/client"

import Select from "@/components/select"
import Loader from "@/components/loader"
import Error from "@/components/error"
import TrendChart from "@/components/trendChart"
import { TREND_SCHEMA } from "@/schema"
import {
  REAL_ESTATE_TYPES,
  REAL_ESTATE_LOCATIONS,
  DEFAULT_REAL_ESTATE_TYPE,
  DEFAULT_REAL_ESTATE_LOCATION,
} from "@/constants"

const Trend = () => {
  const [type, setType] = useState(DEFAULT_REAL_ESTATE_TYPE)
  const [location, setLocation] = useState(DEFAULT_REAL_ESTATE_LOCATION)

  const { loading, error, data } = useQuery(TREND_SCHEMA, {
    variables: { type, location },
  })

  return (
    <>
      <section className='flex justify-end flex-wrap'>
        <Select
          value={type}
          disabled={loading}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setType(e.currentTarget.value as REAL_ESTATE_TYPES)
          }
        >
          {Object.values(REAL_ESTATE_TYPES).map(optionType => (
            <option key={optionType} value={optionType}>
              {startCase(optionType)}
            </option>
          ))}
        </Select>
        <Select
          value={location}
          disabled={loading}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setLocation(e.currentTarget.value as REAL_ESTATE_LOCATIONS)
          }
        >
          {Object.values(REAL_ESTATE_LOCATIONS).map(optionLocation => (
            <option key={optionLocation} value={optionLocation}>
              {startCase(optionLocation)}
            </option>
          ))}
        </Select>
      </section>
      {!loading && !error && (
        <article className='relative flex flex-1'>
          <div className='absolute inset-0'>
            <TrendChart data={data?.groupedEntries ?? []} />
          </div>
        </article>
      )}
      {loading && !error && <Loader />}
      {error && <Error />}
    </>
  )
}

export default Trend
