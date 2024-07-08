import { PageType } from "./types"

export const Pagination = ({fetchData}: PageType) => {
  return (
    <>
    <button onClick={() => fetchData(1)}>Prev</button>
    <button onClick={() => fetchData(2)}>Next</button>
    </>
  )
}
