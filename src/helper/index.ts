import GeneralHelper from "./general";

import PaginateHelper from "./pagination";

class Helper {

    public GeneralHelper: GeneralHelper;
    public PaginateHelper: PaginateHelper;
    constructor(){
        this.GeneralHelper = new GeneralHelper();
        this.PaginateHelper = new PaginateHelper();
    }
}

export default new Helper();