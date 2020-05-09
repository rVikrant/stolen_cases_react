// import required dependencies
import {Provider} from "mobx-react";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import CasesStore from "./stores/casesStore";

// create store object
const appState = new CasesStore();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={appState}><App/></Provider>, div);
});

/*
 // import dependency
 import CasesStore from "./stores/casesStore";

 const store:CasesStore = new CasesStore();

 @inject('store')
 // @observer
 test('renders learn react link', () => {
   const { getByText } = render(<App />);
   const linkElement = getByText(/learn react/i);
   expect(linkElement).toBeInTheDocument();
 });
 describe("Staff Component testing", () => {
   test("should be rendered without crashing", () => {
     const div = document.createElement("div");
     ReactDOM.render(
         <Provider store = {store}>
         <MemoryRouter initialEntries={["/staff"]}>
           <App />} />
         </MemoryRouter>
         </Provider>,
         div
     );
     ReactDOM.unmountComponentAtNode(div);
   });
 });
*/

