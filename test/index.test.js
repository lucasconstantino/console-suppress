import chai from 'chai'
import spies from 'chai-spies'
import console, { suppressors, LOGGING_METHODS } from '../src'

chai.use(spies)

const expect = chai.expect

// Register spies.
LOGGING_METHODS.forEach(method => chai.spy.on(global.console, method))

describe('clean', () => {
  describe('cleanSuppressors', () => {
    LOGGING_METHODS.forEach(method => {
      it(`should clean all suppressors for '${method}'`, () => {
        expect(suppressors[method].length).to.equal(0)
        console[method].suppress('value')
        expect(suppressors[method].length).to.equal(1)
        console[method].cleanSuppressors()
        expect(suppressors[method].length).to.equal(0)
      })

      it(`should clean specified suppressors for '${method}'`, () => {
        expect(suppressors[method].length).to.equal(0)
        console[method].suppress('value')
        console[method].suppress('value-two')
        console[method].suppress('value-three')
        expect(suppressors[method].length).to.equal(3)
        console[method].cleanSuppressors('value', 'value-two')
        expect(suppressors[method].length).to.equal(1)
        console[method].cleanSuppressors('value-three')
        expect(suppressors[method].length).to.equal(0)
      })
    })
  })

  describe('cleanSuppressor', () => {
    LOGGING_METHODS.forEach(method => {
      it(`should clean matching suppressors for '${method}'`, () => {
        expect(suppressors[method].length).to.equal(0)
        console[method].suppress('value')
        console[method].suppress('value-two')
        expect(suppressors[method].length).to.equal(2)
        console[method].cleanSuppressor('value')
        expect(suppressors[method].length).to.equal(1)
        console[method].cleanSuppressor('value-two')
        expect(suppressors[method].length).to.equal(0)
      })
    })
  })

  describe('cleanSuppressors', () => {
    it('should clean all suppressors for any method', () => {
      LOGGING_METHODS.forEach(method => {
        expect(suppressors[method].length).to.equal(0)
        console[method].suppress('value')
        expect(suppressors[method].length).to.equal(1)
      })

      console.cleanSuppressors()

      LOGGING_METHODS.forEach(method => {
        expect(suppressors[method].length).to.equal(0)
      })
    })
  })

  describe('cleanSuppressor', () => {
    it('should clean matching suppressors for any method', () => {
      LOGGING_METHODS.forEach(method => {
        expect(suppressors[method].length).to.equal(0)
        console[method].suppress('value')
        console[method].suppress('value-two')
        expect(suppressors[method].length).to.equal(2)
      })

      console.cleanSuppressor('value')

      LOGGING_METHODS.forEach(method => {
        expect(suppressors[method].length).to.equal(1)
      })

      console.cleanSuppressor('value-two')

      LOGGING_METHODS.forEach(method => {
        expect(suppressors[method].length).to.equal(0)
      })
    })
  })
})

describe('suppress', () => {
  beforeEach(console.cleanSuppressors)

  describe('suppress regex', () => {
    LOGGING_METHODS.forEach(method => {
      it(`should suppress ${method} using regex`, () => {
        console[method].suppress(/testing message/)
        console[method]('testing message')

        expect(global.console[method]).not.to.have.been.called.with('testing message')
      })
    })

    it('should suppress all methods using regex', () => {
      console.suppress(/testing message/)

      LOGGING_METHODS.forEach(method => {
        console[method]('testing message')
        expect(global.console[method]).not.to.have.been.called.with('testing message')
      })
    })
  })

  describe('suppress strings', () => {
    LOGGING_METHODS.forEach(method => {
      it(`should suppress ${method} using string`, () => {
        console[method].suppress('testing message')
        console[method]('testing message')

        expect(global.console[method]).not.to.have.been.called.with('testing message')
      })
    })

    it('should suppress all methods using string', () => {
      console.suppress('testing message')

      LOGGING_METHODS.forEach(method => {
        console[method]('testing message')
        expect(global.console[method]).not.to.have.been.called.with('testing message')
      })
    })
  })

  describe('suppress multiple strings', () => {
    LOGGING_METHODS.forEach(method => {
      it(`should suppress multiple ${method} strings using array`, () => {
        console[method].suppress(['testing message', 'another message'])
        console[method]('testing message')
        console[method]('another message')

        expect(global.console[method]).not.to.have.been.called.with('testing message')
        expect(global.console[method]).not.to.have.been.called.with('another message')
      })

      it(`should suppress multiple ${method} strings using spread`, () => {
        console[method].suppress('testing message', 'another message')
        console[method]('testing message')
        console[method]('another message')

        expect(global.console[method]).not.to.have.been.called.with('testing message')
        expect(global.console[method]).not.to.have.been.called.with('another message')
      })
    })
  })

  describe('suppress multiple regexes', () => {
    LOGGING_METHODS.forEach(method => {
      it(`should suppress multiple ${method} regexes using array`, () => {
        console[method].suppress([/testing message/, /another message/])
        console[method]('testing message')
        console[method]('another message')

        expect(global.console[method]).not.to.have.been.called.with('testing message')
        expect(global.console[method]).not.to.have.been.called.with('another message')
      })

      it(`should suppress multiple ${method} regexes using spread`, () => {
        console[method].suppress(/testing message/, /another message/)
        console[method]('testing message')
        console[method]('another message')

        expect(global.console[method]).not.to.have.been.called.with('testing message')
        expect(global.console[method]).not.to.have.been.called.with('another message')
      })
    })
  })

  describe('suppress error objects', () => {
    const error = new Error('testing message')

    it('should suppress errors using string suppressors', () => {
      LOGGING_METHODS.forEach(method => {
        console[method].suppress(/testing message/)
        console[method](error)

        expect(global.console[method]).not.to.have.been.called.with(error)
      })
    })

    it('should suppress errors using string suppressors', () => {
      LOGGING_METHODS.forEach(method => {
        console[method].suppress('testing message')
        console[method](error)

        expect(global.console[method]).not.to.have.been.called.with(error)
      })
    })
  })
})
