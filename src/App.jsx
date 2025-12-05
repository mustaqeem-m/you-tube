import Head from './components/head';
import Body from '@/components/Body';
import { Provider } from 'react-redux';
import store from '@/utils/appStore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WatchPage from '@/components/WatchPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Head />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/watch" element={<WatchPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
