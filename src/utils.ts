import { format } from "date-fns"
import Dinero, { Dinero as DineroInterface } from "dinero.js"
import { DATE_FORMAT } from "@/constants"

export const formatTimestamp = (unixTimestamp: string) =>
  format(new Date(+unixTimestamp), DATE_FORMAT)

export const formatPrice = (price: DineroInterface) => price.toFormat("$0,0")
export const parsePrice = (amount: number, precision = 0) =>
  Dinero({ amount: Math.trunc(amount), currency: "EUR", precision })
