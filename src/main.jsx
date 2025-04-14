import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';

const DOMroot = document.getElementById('root');
const reactRoot = createRoot(DOMroot);
reactRoot.render(<App />);
