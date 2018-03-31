export const LOGGING_METHODS = ['log', 'info', 'warn', 'error']

// Initialize suppressors array for all logging methods.
export const suppressors = {}

export const originalMethods = {}

// Register supressors for each of console logging methods.
LOGGING_METHODS.forEach(method => {
  suppressors[method] = []
  originalMethods[method] = console[method]

  /**
   * Console logging method override.
   */
  console[method] = (...args) => {
    const text = args[0] && args[0].toString && args[0].toString()

    if (!suppressors[method].some(suppressor => new RegExp(suppressor).test(text))) {
      originalMethods[method](...args)
    }
  }

  /**
   * Registers a suppressors for a given method.
   */
  console[method].suppress = (...newSuppressors) => {
    suppressors[method] = suppressors[method].concat(...newSuppressors)
  }

  /**
   * Cleans all suppressors for a given method.
   */
  console[method].cleanSuppressors = (...cleaningSuppressors) => {
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
  console[method].cleanSuppressor = suppressor => {
    suppressors[method] = suppressors[method].filter(
      registered => registered.toString() !== suppressor.toString()
    )
  }
})

/**
 * Registers a suppressors for all methods.
 */
console.suppress = (...newSuppressors) => LOGGING_METHODS.forEach(method => {
  console[method].suppress(...newSuppressors)
})

/**
 * Cleans all suppressors for all methods.
 */
console.cleanSuppressors = (...cleaningSuppressors) => LOGGING_METHODS.forEach(method => {
  console[method].cleanSuppressors(...cleaningSuppressors)
})

/**
 * Cleans a single specified suppressor for all methods.
 */
console.cleanSuppressor = suppressor => LOGGING_METHODS.forEach(method => {
  console[method].cleanSuppressor(suppressor)
})

export default console
