import React from 'react'
import styles from './Loader.module.sass'

const Loader = props => (
    <div className={styles.center}>
        <div className={styles.Loader}>
            <div />
            <div />
        </div>
    </div>
)

export default Loader