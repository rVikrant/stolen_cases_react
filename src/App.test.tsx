
 import React from 'react';
 import ReactDom from "react-dom";
 import { MemoryRouter } from "react-router-dom";
 import {Provider, inject, observer} from "mobx-react";
 import { render } from '@testing-library/react';
 import App from './App';
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

