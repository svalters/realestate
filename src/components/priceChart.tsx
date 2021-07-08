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
  Bar,
} from "recharts"

import { formatTimestamp, parsePrice, formatPrice } from "@/utils"
import { COLORS, CHART_SPACER, M2_FORMAT, TICK } from "@/constants"
import { Entry } from "@/types"

const ITEMS_NAME = "Sales Ad Count"
const MEDIAN_PRICE_NAME = "Median Price"
const MEAN_PRICE_NAME = "Mean Price"

const priceFormatter = (
  value: string | number | Array<string | number>,
  name: string,
  { payload: { minPriceM2, maxPriceM2, meanPriceM2, medianPriceM2 } }: any
) => {
  if (value instanceof Array) {
    const priceItems = value.map(item => formatPrice(parsePrice(+item)))
    const priceM2Items = [minPriceM2, maxPriceM2].map(item =>
      formatPrice(parsePrice(+item))
    )
    return `${priceItems.join(" ~ ")} (${priceM2Items.join(
      " ~ "
    )} ${M2_FORMAT})`
  }
  if (name === ITEMS_NAME) return value
  return `${formatPrice(parsePrice(+value))} (${formatPrice(
    parsePrice(name === MEAN_PRICE_NAME ? meanPriceM2 : medianPriceM2)
  )} ${M2_FORMAT})`
}

const formatPriceTick = (item: number) => {
  if (item >= 1_000_000) return `${parsePrice(item, 6).toRoundedUnit(1)}m €`
  if (item >= 1_000) return `${parsePrice(item, 3).toRoundedUnit(1)}k €`
  return `${parsePrice(item).toUnit()} €`
}

interface Props {
  data: Entry[]
}

const PriceChart: React.FC<Props> = ({ data }) => {
  const dataWithVariation = data.map(entry => ({
    ...entry,
    variationPrice: [entry.minPrice, entry.maxPrice],
  }))

  return (
    <ResponsiveContainer minWidth='100%' id='chart'>
      <ComposedChart data={dataWithVariation}>
        <Tooltip formatter={priceFormatter} labelFormatter={formatTimestamp} />
        <Legend verticalAlign='top' align='right' iconType='line' />
        <Area
          name='Variation'
          type='monotone'
          dataKey='variationPrice'
          stroke={COLORS.PRIMARY}
          fill={COLORS.PRIMARY}
          fillOpacity={0.2}
          strokeWidth={3}
          yAxisId='price'
        />
        <Bar
          name={MEDIAN_PRICE_NAME}
          dataKey='medianPrice'
          fill={COLORS.SECONDARY}
          yAxisId='price'
          fillOpacity={0.8}
          maxBarSize={CHART_SPACER * 3}
        />
        <Line
          name={MEAN_PRICE_NAME}
          dataKey='meanPrice'
          stroke={COLORS.TERTIARY}
          strokeWidth={4}
          yAxisId='price'
          dot={false}
        />
        <Line
          yAxisId='items'
          name={ITEMS_NAME}
          type='monotone'
          dataKey='items'
          stroke={COLORS.QUATERNARY}
          strokeWidth={4}
          strokeOpacity={0}
          dot={false}
          activeDot={false}
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
          tickMargin={CHART_SPACER * 2}
          minTickGap={40}
          angle={325}
          tick={TICK}
          mirror
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default PriceChart
