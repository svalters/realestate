import React from "react"
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Area,
} from "recharts"

import { formatTimestamp, parsePrice, formatPrice } from "@/utils"
import { COLORS, CHART_SPACER, TICK } from "@/constants"
import { GroupedEntry } from "@/types"

const ITEMS_NAME = "Sales Ad Count"

const priceFormatter = (
  value: string | number | Array<string | number>,
  name: string
) => {
  if (name === ITEMS_NAME) return value
  if (value instanceof Array) {
    const priceItems = value.map(item => formatPrice(parsePrice(+item)))
    return `${priceItems.join(" ~ ")}`
  }
  return formatPrice(parsePrice(+value))
}

const formatPriceTick = (item: number) => {
  if (item >= 1_000_000) return `${parsePrice(item, 6).toRoundedUnit(1)}m €`
  if (item >= 1_000) return `${parsePrice(item, 3).toRoundedUnit(1)}k €`
  return `${parsePrice(item).toUnit()} €`
}

interface Props {
  data: GroupedEntry[]
}

const TrendChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer minWidth='100%' id='chart'>
      <ComposedChart data={data}>
        <Tooltip formatter={priceFormatter} labelFormatter={formatTimestamp} />
        <Legend verticalAlign='top' align='right' iconType='line' />
        <Line
          yAxisId='items'
          name={ITEMS_NAME}
          type='monotone'
          dataKey='items'
          stroke={COLORS.TERTIARY}
          strokeWidth={4}
          dot={false}
        />
        <Area
          name='Mean PriceM2'
          type='monotone'
          dataKey='meanPriceM2'
          stroke={COLORS.SECONDARY}
          fill={COLORS.SECONDARY}
          fillOpacity={0.4}
          strokeWidth={3}
          yAxisId='price'
          stackId={1}
        />
        <Area
          name='Mean Price'
          dataKey='meanPrice'
          stroke={COLORS.PRIMARY}
          fill={COLORS.PRIMARY}
          fillOpacity={0.2}
          yAxisId='price'
          strokeWidth={3}
          stackId={1}
        />
        <YAxis
          yAxisId='price'
          type='number'
          scale='sqrt'
          domain={[0, (dataMax: number) => dataMax * 1.5]}
          tickFormatter={formatPriceTick}
          tickMargin={CHART_SPACER}
          tick={TICK}
          mirror
        />
        <YAxis
          hide
          yAxisId='items'
          orientation='right'
          type='number'
          domain={[0, (dataMax: number) => dataMax * 1.5]}
          tickMargin={CHART_SPACER}
        />
        <XAxis
          type='number'
          scale='time'
          domain={["dataMin", "dataMax"]}
          dataKey='createdAt'
          tickFormatter={formatTimestamp}
          tickMargin={CHART_SPACER * 1.5}
          minTickGap={40}
          angle={325}
          tick={TICK}
          mirror
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default TrendChart
