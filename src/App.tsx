import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import ImNew from './pages/ImNew'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/im-new" element={<ImNew />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}

export default App
