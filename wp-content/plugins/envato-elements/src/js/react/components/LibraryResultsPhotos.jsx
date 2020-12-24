import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { LazyLoadComponent, trackWindowScroll } from "react-lazy-load-image-component"
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock"
import styles from "./LibraryResultsPhotos.module.css"
import stylesShared from "../shared.module.css"
import Importer from "./Importer"
import Inserter from "./Inserter"
import LicenseButton from "./LicenseButton"
import ProjectName from "./ProjectName"
import { scroll } from "../util/scroll"
import { config } from "../util/config"

class LibraryResultsPhotos extends Component {
  constructor(props) {
    super(props)
    this.photoRef = null
    this.state = {
      isOpen: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // always update if the screensize changes
    if (this.props.getModalPos !== nextProps.getModalPos) {
      return true
    }
    // always update if the display state changes.
    if (this.props.layoutOptions.display !== nextProps.layoutOptions.display) {
      return true
    }
    // Update if import finishes
    if (nextProps.result.itemImported && this.props.result.itemImported !== nextProps.result.itemImported) {
      return true
    }
    // Only update if the open state changes of a photo
    if (this.props.openItem !== nextProps.openItem) {
      return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState) {
    // Toggle scroll locking of the open item status.
    const { openItem } = this.props
    const { isOpen } = this.state
    if (openItem && !isOpen) {
      this.setState({ isOpen: true })
      disableBodyScroll(this.photoRef)
    } else if (prevProps.openItem && !openItem) {
      this.setState({ isOpen: false })
      setTimeout(() => {
        clearAllBodyScrollLocks()
      }, 100)
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks()
  }

  licenseChanged = () => {
    this.forceUpdate()
  }

  render() {
    const {
      result,
      scrollPosition,
      openItem,
      getModalPos,
      searchChanges,
      layoutOptions,
      updateSingleItem,
      photoUploadCompleteCallback,
    } = this.props
    const elementsStatus = config.get("elements_status")
    let style = {},
      innerStyle = {
        backgroundImage: `url( ${result.imageThumb.src} )`,
      }
    if (layoutOptions.display === "square") {
      // style.width = result.imageThumb.gridHeight
      // style.height = result.imageThumb.gridHeight
    } else {
      style.width = `${result.calculatedMasonryWidth}%`
      innerStyle.paddingBottom = `${result.aspectRatioHeight}%`
    }
    return (
      <div
        className={`${layoutOptions.display === "square" ? styles.wrapSquare : styles.wrapFluid} ${
          result.photoImported ? styles.imported : ""
        }`}
        ref={(photo) => (this.photoRef = photo)}
        style={style}>
        {openItem ? (
          <div className={styles.open} style={getModalPos}>
            <div className={styles.openTitle}>
              <Link
                className={styles.returnToIndex}
                to="/photos"
                onClick={(e) => {
                  e.preventDefault()
                  window.history.back()
                  return false
                }}>
                Back to Photos
              </Link>
            </div>
            <div className={styles.openContent}>
              <div className={styles.openPhoto}>
                <div
                  className={styles.imagePlaceHolder}
                  style={{
                    backgroundImage: `url( ${result.imageThumb.sr
