import styles from './Modal.module.css'

export default function Modal(props) {

  function onClose(e) {
    props.onClose && props.onClose(e);
  };

  function search(e) {
    console.log('New Games Searched')
    onClose(e)
  }

  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Advanced Filtering</h1>


      <button
        onClick={e => {onClose(e)}}
      >
        Close
      </button>

      <button
        onClick={e => {search(e)}}
      >
        Search
      </button>

    
    </div>
  )
}