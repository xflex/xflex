// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { WithNotes } from '@storybook/addon-notes'
import { boolean } from '@storybook/addon-knobs'
import style from './designGrid.css'

export default class WithExtensions extends React.PureComponent {
  static childContextTypes = {
    devMode: PropTypes.bool,
  }

  getChildContext() {
    return {
      devMode: boolean('Dev Mode', true),
    }
  }

  getDesignGrid = () =>
    <div className={style.designGrid}>
      <div className={style.contentArea} />
    </div>

  props: {
    notes?: string,
    className?: string,
  }

  render() {
    const { notes, className, ...props } = this.props
    // defaults to last used value, when changed it updates it. This allows us to persist the 'show overlay' setting across examples
    const showOverlay = boolean('Overlay', false)

    const designGrid = showOverlay && this.getDesignGrid()

    if (notes) {
      return (
        <div>
          {designGrid}
          <WithNotes notes={notes}>
            <div {...props} />
          </WithNotes>
        </div>
      )
    }

    return (
      <div>
        {designGrid}
        <div {...props} />
      </div>
    )
  }
}