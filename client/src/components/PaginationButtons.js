
export default function PaginationButtons(props) {

  return (
    <div>
      <button onClick={props.handlePrev} disabled={props.offset === 0}>
            Previous Page
        </button>

        <button onClick={props.handleNext} disabled={props.gamesLength < props.limit}>
          Next Page
        </button>
    </div>
  )
}