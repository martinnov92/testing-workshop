import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // 1. Arrange
  // create a jest.fn() for your submit handler
  const handleSubmit = jest.fn()
  // render the Login component to a div
  // TIP: const div = document.createElement('div')
  const container = document.createElement('div')
  ReactDOM.render(<Login onSubmit={handleSubmit} />, container)

  // create a fake object to hold the form field values (username and password)
  // get the field nodes
  const form = container.querySelector('form')
  const {username, password} = form.elements

  username.value = 'chucknorris'
  password.value = 'I do not need a password'

  // 2. Act
  // submit the form:
  form.dispatchEvent(new window.Event('submit'))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    username: username.value,
    password: password.value,
  })

  // 3. Assert
  // ensure your submit handler was called properly
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-1&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
