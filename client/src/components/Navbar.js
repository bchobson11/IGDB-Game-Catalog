import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav>
      <p className={styles.title}><Link className={styles.text}style={{textDecoration: 'none'}} to="/">GameTopia</Link></p>
    </nav>
  )
}