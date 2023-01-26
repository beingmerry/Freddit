import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { RouterProvider } from 'react-router-dom'

import router from '../router'

test('renders freddit icon', () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
  const iconElement = screen.queryAllByAltText(/icon/i)[0]
  expect(iconElement).toBeInTheDocument()
})
