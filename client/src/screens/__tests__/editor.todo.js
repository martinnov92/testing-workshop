import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../editor.todo'
import * as utilsMock from '../../utils/api'

// mock funkce pro volání API ve formuláři
jest.mock('../../utils/api', () => {
  // napodobení funkce api.posts.create(post).then(())....
  return {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
})

const flushPromises = () => {
  // vytvořím funkci, která vrací promise, který se vyhodnotí v nextTick (po 0 sec.)
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  // 1. vytvoření elementu, do kterého vložím React component
  const container = document.createElement('div')
  const fakeUser = {
    id: 'Martínek',
  }
  // fake verze React Router's history
  const fakeHistory = {
    push: jest.fn(),
  }
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container)

  // 2. získání formuláře
  const form = container.querySelector('form')
  const {title, content, tags} = form.elements

  // 3. nastavení hodnot formuláře
  title.value = 'Hello'
  content.value = 'Jak se vede?'
  tags.value = 'twix,      my, likes'

  // 4. dispatchu Submit eventu na formuláři
  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  // test spadne, protože se jedná o async operaci
  // přidám await flushPromises a zbytek testu doběhne v dalším nextTick
  await flushPromises()

  // spuštění testu
  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  expect(utilsMock.posts.create).toHaveBeenCalledTimes(1)
  expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['twix', 'my', 'likes'],
    date: expect.any(String),
  })
})

// TODO later...
test('snapshot', () => {})
