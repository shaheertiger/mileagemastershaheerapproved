import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { site } from '../data/site'
import { getGrade, OEM_SPECIFICATIONS, type GradeName } from '../data/grades'
import { PRODUCT_LINES } from '../data/products'
import { Button } from './Button'
import { Icon } from './Icon'
import styles from './SpecSheet.module.css'

interface SpecSheetProps {
  grade: GradeName
  onClose: () => void
}

/**
 * Printable product data sheet for a grade.
 *
 * Only data the brand actually publishes is shown. Full typical-properties
 * figures (viscosity index, flash point, pour point) come from the blender's
 * certificate of analysis and are offered on request rather than invented here.
 */
export function SpecSheet({ grade, onClose }: SpecSheetProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.classList.add('mm-printing-sheet')
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('mm-printing-sheet')
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  const detail = getGrade(grade)
  const packs = PRODUCT_LINES.map((line) => `${line.packSize} jug, ${line.perCase} per case`)

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${grade} product data sheet`}
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) onClose()
      }}
    >
      <div className={styles.sheet}>
        <div className={styles.top}>
          <strong>MILEAGE MASTER</strong>
          <span className={styles.docType}>
            PRODUCT DATA SHEET
            <br />
            GASOLINE ENGINE OIL
          </span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close spec sheet"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className={styles.kicker}>VISCOSITY GRADE</div>
        <div className={styles.grade}>{grade}</div>
        <div className={styles.line}>PREMIUM FULL SYNTHETIC</div>
        <p className={styles.blurb}>{detail.blurbLong}</p>

        <table className={styles.table}>
          <tbody>
            <tr>
              <th scope="row">Industry licences</th>
              <td>{detail.service}</td>
            </tr>
            <tr>
              <th scope="row">OEM specifications</th>
              <td>{OEM_SPECIFICATIONS.join(' · ')}</td>
            </tr>
            <tr>
              <th scope="row">Drain interval</th>
              <td>{detail.drain}</td>
            </tr>
            <tr>
              <th scope="row">Pack sizes</th>
              <td>{packs.join(' · ')}</td>
            </tr>
            <tr>
              <th scope="row">Origin</th>
              <td>Blended and filled in Europe</td>
            </tr>
            <tr>
              <th scope="row">Distributed by</th>
              <td>
                {site.distributor}, Mississauga, ON · {site.phone}
              </td>
            </tr>
          </tbody>
        </table>

        <p className={styles.note}>
          OEM specifications listed are those carried by the 0W-20 reference fill; each grade
          carries its own licence set. Typical properties and a batch certificate of analysis are
          available on request. Always confirm the requirement against the vehicle owner's manual.
        </p>

        <div className={styles.actions}>
          <Button variant="red" size="md" onClick={() => window.print()}>
            PRINT / SAVE AS PDF
          </Button>
          <Button variant="outline" size="md" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
