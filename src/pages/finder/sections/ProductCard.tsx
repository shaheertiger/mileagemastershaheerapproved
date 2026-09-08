import { Button } from '../../../components/Button'
import type { Product } from '../../../data/products'
import { useQuotePrefill } from '../../../lib/quote'
import { routes } from '../../../lib/routes'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
  onSpecSheet: () => void
}

/** One recommended product in the catalogue results list. */
export function ProductCard({ product, onSpecSheet }: ProductCardProps) {
  const { requestQuote } = useQuotePrefill()

  return (
    <article className={styles.card}>
      <div className={styles.plate}>
        <img
          className={styles.jug}
          src={product.image}
          alt={product.imageAlt}
          width={1023}
          height={1600}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span
            className={styles.tag}
            style={{
              background: product.line.tagBackground,
              color: product.line.tagForeground,
            }}
          >
            {product.line.tag}
          </span>
          <span className={styles.pack}>{product.line.pack}</span>
          <span className={styles.sku}>SKU {product.sku}</span>
        </div>

        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.blurb}>{product.blurb}</p>

        <div className={styles.actions}>
          <Button href={`${routes.home}#grades`} variant="ink" size="sm">
            VIEW PRODUCT
          </Button>
          <Button
            variant="red"
            size="sm"
            onClick={() => requestQuote(`${product.name} (${product.sku})`)}
          >
            REQUEST CASE PRICE
          </Button>
          <Button variant="outlineGold" size="sm" onClick={onSpecSheet}>
            SPEC SHEET
          </Button>
        </div>
      </div>
    </article>
  )
}
