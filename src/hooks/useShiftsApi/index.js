import useSWR, { mutate } from "swr"

// Get all shifts
export function useShifts() {
  return useSWR("http://localhost:8080/shifts", async (url) => {
    try {
      const result = await fetch(url)
      let r = {}
      const data = await result.json()
      data.map((d) => (r[d.id] = d))
      return r
    } catch (error) {
      console.error(error)
    }
  })
}

// Book a shift
export async function useBookShift(shift, id) {
  const response = await fetch(`http://localhost:8080/shifts/${id}/book`, {
    method: "POST",
    body: JSON.stringify({ id }),
  })

  const data = await response.json()
  if (response.status !== 200) throw Error(data.message)

  mutate("http://localhost:8080/shifts", {
    ...shift,
    [id]: {
      // Optimistic ui
      ...shift[id],
      booked: true,
    },
  })
}

// Cancel a shift
export async function useCancelShift(shift, id) {
  const response = await fetch(`http://localhost:8080/shifts/${id}/cancel`, {
    method: "POST",
    body: JSON.stringify({ id }),
  })

  const data = await response.json()
  if (response.status !== 200) throw Error(data.message)

  mutate("http://localhost:8080/shifts", {
    ...shift,
    [id]: {
      // Optimistic ui
      ...shift[id],
      booked: false,
    },
  })
}
