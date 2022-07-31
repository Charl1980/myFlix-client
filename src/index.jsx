import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView from './components/main-view/main-view';

//IMPORT STATEMENT TO INDICATE THAT YOU NEED TO BUNDLE `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//MAIN COMPONENT - WILL EVENTUALLY USE ALL THE OTHERS
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

//FINDS ROOT OF APP
const container = document.getElementsByClassName('app-container')[0];

//TELLS React TO RENDER APP IN THE ROOT DOM ELEMENT
ReactDOM.render(React.createElement(MyFlixApplication), container);

//<div className="my-flix">
//<div>Good morning</div>
//</div>