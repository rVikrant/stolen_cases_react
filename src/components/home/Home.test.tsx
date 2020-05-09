// import required dependencies
import * as React from 'react';
import {default as ReactDOM, render, unmountComponentAtNode} from "react-dom";
import {shallow, mount} from 'enzyme';

// local dependencies
import Home from "./Home";
import CasesStore from "../../stores/casesStore";

let container:any = null;

// create store object
const appState = new CasesStore();

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('render home page', async() => {
    render(<Home store={appState}/>, container);
});

it('render with header', async () => {
    // await act(async () => render(<Home store={appState}/>, container));

    render(<Home store={appState}/>, container);

    expect(container.querySelector("span").textContent).toBe(' Stolen bikes ');
    expect(container.querySelector("p").textContent).toBe(" Police Department of Berlin  Stolen bikes ");
});

it('render with data', async () => {
    let home = mount(<Home store={appState} />);

    let obj = home.instance();

    obj.componentDidMount = jest.fn();

    obj.componentDidMount();

    expect(obj.componentDidMount).toHaveBeenCalled();
});