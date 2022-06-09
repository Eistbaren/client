import './App.css';

import Theme from './utils/Theme';
import Routing from './utils/Routing';

import './css/index.css';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
function App() {
  return (
    <Theme>
      <Routing />
    </Theme>
  );
}

export default App;
