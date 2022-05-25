import './App.css';

import Header from './components/Header';
import Theme from './utils/Theme';
import Routing from './utils/Routing';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
function App() {
  return (
    <Theme>
      <Header />
      <Routing />
    </Theme>
  );
}

export default App;
