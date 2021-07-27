const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

function showSuccess(username) {
  const formControl = username.parentElement
  formControl.className = 'form-control success'
}

function isEmailValid(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(email.value.trim())) {
    showSuccess(email)
  } else {
    showError(email, 'Email is not good')
  }
}

function requiredFields(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim()) {
      showSuccess(input)
    } else {
      // empty field
      showError(input, `${toUpper(input)} is required`)
    }
  })
}

function toUpper(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${toUpper(input)} must have at least ${min} letters`)
  } else if (input.value.length > max) {
    showError(input, `${toUpper(input)} must have less then ${max} letters`)
  } else {
    showSuccess(input)
  }
}

const passwMatch = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, 'Password do not match')
  }
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault()
  requiredFields([username, email, password, password2])
  checkLength(password, 5, 15)
  checkLength(username, 2, 8)
  isEmailValid(email)
  passwMatch(password, password2)
})
