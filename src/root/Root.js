import React from 'react'
import Routes from './Routes'

import 'moment/locale/ko'
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';

// export default class Root extends Component {
//   render() {
//     return (
//       <Router>
//         <Routes />
//       </Router>
//     )
//   }
// }

const Root = () => {
  return (
    <Router>
      <LastLocationProvider>
        <Routes />
      </LastLocationProvider>
    </Router>
  )
}

export default Root
