// import required dependencies
import { observable, computed, autorun, action } from 'mobx';


// create store
class CasesStore {
    @observable cases:any = [];
    @observable last:number = 10;
    @observable initial:number = 0;
    @observable search:string = '';
    @observable currentCase:{} = {};
    @observable currentPageCases:[] = [];

    constructor() {
        autorun(() => console.log(this.cases.length, "total number case right now"));
    }

    @computed get totalCasesCount() {
        return this.cases.length;
    }

    @action
    updateCases(cases: [{ address: string; description: string; source: { api_url: string; html_url: string; name: string }; media: { image_url: string; image_url_thumb: string }; title: string; location_description: null; type: string; type_properties: null; url: string; location_type: null; occurred_at: number; updated_at: number; id: number }]): void {
        this.cases = cases;
    }

    @action
    updateQuery(query: string): void {
        this.search = query;
    }

    @action
    updatePageCases(cases: any): void {
        this.currentPageCases = cases;
    }

    @action
    updateCaseToshow(cases: {}): void {
        this.currentCase = cases;
    }

}

export default CasesStore;