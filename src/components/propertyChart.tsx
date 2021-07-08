import React from "react"
import { startCase } from "lodash"
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
} from "recharts"

import { formatTimestamp } from "@/utils"
import { COLORS, CHART_SPACER, TICK } from "@/constants"
import { Entry } from "@/types"

interface Props {
  data: Entry[]
}

const PropertyChart: React.FC<Props> = ({ data }) => {
  const propertyData = data.reduce((agg: any, entry: Entry) => {
    if (!agg[entry.type]) agg[entry.type] = []
    agg[entry.type].push(entry)
    return agg
  }, {})

  return (
    <ResponsiveContainer minWidth='100%' id='chart'>
      <LineChart>
        <Tooltip labelFormatter={formatTimestamp} />
        <Legend verticalAlign='top' align='right' iconType='line' />
        {Object.keys(propertyData).map((key, i) => (
          <Line
            key={key}
            name={startCase(key)}
            type='monotone'
            dataKey='items'
            data={propertyData[key]}
            stroke={Object.values(COLORS)[i]}
            strokeWidth={4}
            dot={false}
          />
        ))}
        <YAxis
          type='number'
          scale='sqrt'
          domain={[0, (dataMax: number) => dataMax * 1.5]}
          tickMargin={CHART_SPACER}
          tick={TICK}
          mirror
        />
        <XAxis
          type='number'
          scale='time'
          domain={["dataMin", "dataMax"]}
          dataKey='createdAt'
          tickFormatter={formatTimestamp}
          allowDuplicatedCategory={false}
          tickMargin={CHART_SPACER * 2}
          minTickGap={40}
          angle={325}
          tick={TICK}
          mirror
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PropertyChart
