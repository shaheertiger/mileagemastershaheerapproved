import styles from './Testimonials.module.css'

const QUOTES = [
  {
    quote:
      'Same API SP licence I was paying a premium for, about a third off per case. We switched every bay over in a week.',
    name: 'DAN M. · SERVICE MANAGER',
    city: 'BRAMPTON, ON',
  },
  {
    quote:
      'Customers read the label. Made in Europe and the OEM specs printed right on the back ends the conversation.',
    name: 'PRIYA S. · OWNER',
    city: 'OAKVILLE, ON',
  },
  {
    quote:
      'Order by phone in the morning, on my shelf next day. Seven grades means one supplier instead of three.',
    name: 'MIKE T. · FLEET SHOP',
    city: 'MISSISSAUGA, ON',
  },
]

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={`mm-container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 className={`mm-h2 ${styles.heading}`}>What shops say</h2>
          <span className={styles.kicker}>THE SMART CHOICE</span>
        </div>

        <div className={styles.cards}>
          {QUOTES.map((item) => (
            <figure key={item.name} className={styles.card}>
              <blockquote className={styles.quote}>“{item.quote}”</blockquote>
              <figcaption className={styles.attribution}>
                {item.name}
                <br />
                {item.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
