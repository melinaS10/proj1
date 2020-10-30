class InvalidArgumentException {
  constructor (argument, value, message) {
    this.name = 'InvalidArgumentException'
    this.argument = argument
    this.value = value
    
    if (typeof message !== 'undefined') {
      this.message = message
    } else {
      this.message = `Invalid argument ${argument} with value: ${value}.`;
    }
  }
  
  getArgument () {
    return this.argument
  }
  
  getValue () {
    return this.value
  }
    
  getMessage () {
    return this.message
  }
}

class DadJokeApi {
  constructor () {
    this.apiUrl = 'https://icanhazdadjoke.com'
    this.id = null
    this.count = null
    this.cache = {}
  }
  
  /**
   * Retrieves the count of jokes from the API and calls the given
   * callback with the count as first parameter. If the API call
   * wasn't successfull the count is NULL.
   */
  getCount (callback) {
    if (!(callback instanceof Function)) {
      throw new InvalidArgumentException('callback', callback, 'The parameter "callback" has to be a function!')
    }
    
    if (this.count !== null) {
      callback(this.count)
      return
    }
    
    $.getJSON(
      `${this.apiUrl}/search`,
      {
        'limit': 1
      }
    )
      // HTTP Status == 200
      .done((data) => {
        if (data.status === 200 && data.hasOwnProperty('total_jokes')) {
          this.count = data.total_jokes
          callback(this.count)
        } else {
          callback(null)
        }
      })
      // HTTP Status != 200
      .fail((data) => {
        callback(null)
      })
  }

  /**
   * Retrieves a joke by it's ID.
   */
  getJokeById (id, callback) {
    if (!(callback instanceof Function)) {
      throw new InvalidArgumentException('callback', callback, 'The parameter "callback" has to be a function!')
    }
    
    if (this.cache.hasOwnProperty(id)) {
      callback(this.cache[id])
      return
    }
    
    $.getJSON(
      `${this.apiUrl}/j/${id}`
    )
      // HTTP Status == 200
      .done((data) => {
        if (data.status === 200 && data.hasOwnProperty('joke')) {
          this.cache[id] = data
          callback(this.cache[id])
        } else {
          callback(null)
        }
      })
      // HTTP Status != 200
      .fail((data) => {
        callback(null)
      })
  }
  
  getOneByOne(page, callback) {
    $.getJSON(
      `${this.apiUrl}/search`,
      {
        'limit': 1,
        'page': page
      }
    )
      // HTTP Status == 200
      .done((data) => {
        if (data.status === 200 && data.hasOwnProperty('results')) {
          let previous = null
          let next = null;
            
          if (data.previous_page !== page) {
            previous = data.previous_page;
          }
          
          if (data.next_page !== page) {
            next = data.next_page;
          }
          
          callback({
            'joke': data.results[0].joke,            
            'id': data.results[0].id,
            'current': page,
            'previous': previous,
            'next': next,
            'total': data.total_pages
          })
        } else {
          callback(null)
        }
      })
      // HTTP Status != 200
      .fail((data) => {
        callback(null)
      })
  }
}

class DadJokeForm {
  constructor() {
    this.elements = {
      'form': $('#joke-form'),
      'jokeNumber': $('#joke-number'),
      'controls': {
        'prev': $('#joke-control-prev'),
        'random': $('#joke-control-random'),
        'next': $('#joke-control-next')
      },
      'text': $('#joke-text'),
      'errorText': $('#error-text'),
      'loading': $('#joke-loading')
    }
    
    this.DadJokes = new DadJokeApi()
    this.page = 1;
    this.totalPages = null
    this.prev = null
    this.next = null
  }
  
  init() {
    this.registerEvents();

    this.DadJokes.getOneByOne(this.page, (data) => {
        console.log(data)

        if (data === null) {
          this.showError('We could not load a Joke from the API. Please try again later.')
        } else {
          this.next = data.next
          this.prev = data.previous
          this.totalPages = data.total
          this.showJoke(data)
        }   
    })
  }
  
  registerEvents() {
    this.elements.form.submit((e) => {
      e.preventDefault()
      const jokeId = this.elements.jokeNumber.val().trim();
      
      this.DadJokes.getJokeById(jokeId, (data) => {        
        if (data === null) {
          this.showError('Unknown Joke ID')
        } else {
          this.showJoke(data)
        }
      })
    })
    
    this.elements.controls.prev.click((e) => {
      e.preventDefault()
        
      if (this.prev !== null && this.next !== null) {
          this.loadPage(this.prev)
      }
    })

    this.elements.controls.next.click((e) => {
      e.preventDefault()

      if (this.next !== null) {
        this.elements.controls.prev.removeAttr( 'disabled' )
        this.loadPage(this.next);
      }
    })
    
    this.elements.controls.random.click((e) => {
      e.preventDefault()
      this.elements.controls.next.removeAttr( 'disabled' )
      this.elements.controls.prev.removeAttr( 'disabled' )
      this.loadRandom()
    })
  }
  
  loadPage(page, callback) {
    this.DadJokes.getOneByOne(page, (data) => {
      if (data === null) {
        this.showError('We could not load a Joke from the API. Please try again later.')
      } else {
        this.next = data.next
        this.prev = data.previous
        this.showJoke(data)
        
        this.changeDisabledState(
          this.elements.controls.prev,
          (this.prev === null)
        )
        
        this.changeDisabledState(
          this.elements.controls.next,
          (this.next === null)
        )
      }   
    })  
  }
  
  loadRandom() {
    const page = this.getRandomIntInclusive(1, this.totalPages)
    this.loadPage(page)
  }
  
  showJoke(data) {
    this.elements.text.html(data.joke + '<br/>' + 'joke ID : ' + data.id)
    this.elements.loading.addClass('hidden')
    this.elements.text.removeClass('hidden')
    this.elements.errorText.addClass('hidden')
  }
  
  showError(message) {
    this.elements.text.addClass('hidden')
    this.elements.loading.addClass('hidden')
    
    this.elements.errorText.html(message)
    this.elements.errorText.removeClass('hidden')
  }
  
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const jokeForm = new DadJokeForm();
jokeForm.init();