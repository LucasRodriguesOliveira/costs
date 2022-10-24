import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from './components/Container';
import { Footer } from './components/Footer';

import { Navbar } from './components/Navbar';
import { Routes } from './routes';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes />
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
