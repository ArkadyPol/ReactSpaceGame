import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, RouteComponentProps } from '@reach/router';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import store from './redux/store';

const MainMenuWithPath: React.FC<RouteComponentProps> = () => <MainMenu />;
const GameWithPath: React.FC<RouteComponentProps> = () => <Game />;

const Root: React.FC = () => (
  <Provider store={store}>
    <Router>
      <MainMenuWithPath path="/" />
      <GameWithPath path="/game" />
    </Router>
  </Provider>
);

render(<Root />, document.getElementById('root'));
