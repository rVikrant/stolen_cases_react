// import required dependencies
import { observable, computed, autorun, action } from 'mobx';


// create store
class CasesStore {
    @observable cases:[] = [];
    @observable last:number = 10;
    @observable initial:number = 0;
    @observable currentPageCases:[] = [];

    constructor() {
        autorun(() => console.log(this.cases.length, "total number case right now"));
    }

    @computed get totalCasesCount() {
        return this.cases.length;
    }

    @action
    updateCases(cases: []): void {
        this.cases = cases;
    }

    @action
    updatePageCases(cases: []): void {
        this.currentPageCases = cases;
    }

}

export default CasesStore;