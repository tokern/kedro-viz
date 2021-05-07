import React from 'react';
import ReactDOM from 'react-dom';
import 'what-input';
import App from './components/app';
import getPipelineData from './utils/data-source';
import './styles/index.css';

const KedroViz = () => (
  <>
    <App data={getPipelineData()} />
  </>
);

ReactDOM.render(<KedroViz />, document.getElementById('root'));
