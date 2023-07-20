import styles from './Websites.module.css'
import steam from '../assets/steam.png'
import twitter from '../assets/twitter.png'
import twitch from '../assets/twitch.png'
import official from '../assets/official.png'

export default function Websites({ webs }) {
  return (
    <div className={styles.container} >
      {webs && webs.map(site => {
        if (site.category === 1) { // official
          return (
            <a href={site.url} target='_blank'>
              <img src={official} className={styles.logo} alt='official' />
            </a>
          )

        } else if (site.category === 5) { // twitter
          return (
            <a href={site.url} target='_blank'>
              <img src={twitter} className={styles.logo} alt='twitter' />
            </a>
          )
        } else if (site.category === 6) { // twitch
          return (
            <a href={site.url} target='_blank'>
              <img src={twitch} className={styles.logo} alt='twitch' />
            </a>
          )
        } else if (site.category === 13) { // steam
          return (
            <a href={site.url} target='_blank'>
              <img src={steam} className={styles.logo} alt='steam' />
            </a>
          )
        } else {
          return
        }
        
      })}
      
    </div>
  )
}