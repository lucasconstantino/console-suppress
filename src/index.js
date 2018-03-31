export const LOGGING_METHODS = ['log', 'info', 'warn', 'error']

// Initialize suppressors array for all logging methods.
export const suppressors = LOGGING_METHODS.reduce((suppressors, method) => ({
  ...suppressors,
  [method]: []
}), {})

// Create an extended version of console object.
const supressedConsole = { ...console }

// Register supressors for each of console logging methods.
LOGGING_METHODS.forEach(method => {
  /**
   * Console logging method override.
   */
  supressedConsole[method] = (...args) => {
    const text = args[0] && args[0].toString && args[0].toString()

    if (!suppressors[method].some(suppressor => new RegExp(suppressor).test(text))) {
      console[method](...args)
    }
  }

  /**
   * Registers a suppressors for a given method.
   */
  supressedConsole[method].suppress = (...newSuppressors) => {
    suppressors[method] = suppressors[method].concat(...newSuppressors)
  }

  /**
   * Cleans all suppressors for a given method.
   */
  supressedConsole[method].cleanSuppressors = (...cleaningSuppressors) => {
    if (cleaningSuppressors.length === 0) {
      suppressors[method] = [] // clear all shortcut
    }
    else {
      suppressors[method] = suppressors[method].filter(
        registered => !cleaningSuppressors.some(
          cleaningSuppressor => registered.toString() === cleaningSuppressor.toString()
        )
      )
    }
  }

  /**
   * Cleans a single specified suppressor for a given method.
   */
  supressedConsole[method].cleanSuppressor = suppressor => {
    suppressors[method] = suppressors[method].filter(
      registered => registered.toString() !== suppressor.toString()
    )
  }
})

/**
 * Registers a suppressors for all methods.
 */
supressedConsole.suppress = (...newSuppressors) => LOGGING_METHODS.forEach(method => {
  supressedConsole[method].suppress(...newSuppressors)
})

/**
 * Cleans all suppressors for all methods.
 */
supressedConsole.cleanSuppressors = (...cleaningSuppressors) => LOGGING_METHODS.forEach(method => {
  supressedConsole[method].cleanSuppressors(...cleaningSuppressors)
})

/**
 * Cleans a single specified suppressor for all methods.
 */
supressedConsole.cleanSuppressor = suppressor => LOGGING_METHODS.forEach(method => {
  supressedConsole[method].cleanSuppressor(suppressor)
})

export default supressedConsole
