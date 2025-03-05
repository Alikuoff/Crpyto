type FormatStyle = "decimal" | "currency" | "percent"

export function formatNumber(value: number, style: FormatStyle = "decimal", maximumFractionDigits = 2): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "N/A"
  }

  try {
    const options: Intl.NumberFormatOptions = {
      maximumFractionDigits,
    }

    if (style === "currency") {
      options.style = "currency"
      options.currency = "USD"
    } else if (style === "percent") {
      options.style = "percent"
      options.minimumFractionDigits = 2
    }

    // For large numbers (millions+), use compact notation
    if (Math.abs(value) >= 1000000 && style === "currency") {
      options.notation = "compact"
      options.compactDisplay = "short"
    }

    return new Intl.NumberFormat("en-US", options).format(value)
  } catch (error) {
    console.error("Error formatting number:", error)
    return value.toString()
  }
}

export function formatPercent(value: number): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "N/A"
  }

  return formatNumber(value / 100, "percent")
}

export function formatDate(timestamp: number, includeTime = false): string {
  if (!timestamp) return "N/A"

  const date = new Date(timestamp)

  try {
    if (includeTime) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(date)
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date)
    }
  } catch (error) {
    console.error("Error formatting date:", error)
    return date.toDateString()
  }
}

export function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ")
}

