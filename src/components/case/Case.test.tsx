// import required dependencies
import * as React from 'react';
import {default as ReactDOM, render, unmountComponentAtNode} from "react-dom";
import { mount} from 'enzyme';

// local dependencies
import Case from "./Case";
import CasesStore from "../../stores/casesStore";

let container:any = null;

// create store object
const appState = new CasesStore();

appState.updateCaseToshow({
    "id": 116966,
    "title": "Stolen 2020 Salsa Journeyman Apex 1 650b(pink)",
    "description": "Bike was in a sprinter van. the van lock was jimmied and bikes were stolen",
    "address": "San Antonio, TX, 78215",
    "occurred_at": 1588874400,
    "updated_at": 1588879596,
    "url": "https://bikewise.org/api/v1/incidents/116966",
    "source": {
        "name": "BikeIndex.org",
        "html_url": "https://bikeindex.org/bikes/729336",
        "api_url": "https://bikeindex.org/api/v1/bikes/729336"
    },
    "media": {
        "image_url": "https://files.bikeindex.org/uploads/Pu/243632/large_IMG_1199-preview.JPG",
        "image_url_thumb": "https://files.bikeindex.org/uploads/Pu/243632/small_IMG_1199-preview.JPG"
    },
    "location_type": null,
    "location_description": null,
    "type": "Theft",
    "type_properties": null
});

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

it('render case details', async() => {
    render(<Case store={appState}/>, container);

    // check header
    expect(container.querySelector("span").textContent).toBe(' Stolen bikes ');
    expect(container.querySelector("p").textContent).toBe(" Police Department of Berlin  Stolen bikes ");

    // check data in case
    expect(container.querySelector('h1').textContent).toBe("Stolen 2020 Salsa Journeyman Apex 1 650b(pink)");
});
