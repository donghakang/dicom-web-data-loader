import dicomParser from 'dicom-parser'
import cornerstone from 'cornerstone-core'
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import cornerstoneMath from 'cornerstone-math'
import cornerstoneTools from 'cornerstone-tools'
import Hammer from 'hammerjs'

const MAX_CONCURRENCY = 6

export default function initCornerstone() {
  // setConfiguration
  window.cornerstone = cornerstone
  window.cornerstoneWADOImageLoader = cornerstoneWADOImageLoader

  cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser

  // initCornerstone
  window.cornerstoneTools = cornerstoneTools

  cornerstoneTools.external.cornerstone = cornerstone
  cornerstoneTools.external.Hammer = Hammer
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath
  cornerstoneTools.init()

  // Image Loader
  const config = {
    maxWebWorkers: Math.max(
      Math.min(navigator.hardwareConcurrency - 1, MAX_CONCURRENCY),
      1
    ),
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false,
      },
    },
  }

  cornerstoneWADOImageLoader.webWorkerManager.initialize(config)
}
