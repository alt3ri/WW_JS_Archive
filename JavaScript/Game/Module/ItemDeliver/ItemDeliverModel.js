"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemDeliverModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ItemDeliverModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this._gi = void 0);
  }
  OnClear() {
    return !(this._gi = void 0);
  }
  SetItemDeliverData(e) {
    this._gi = e;
  }
  GetItemDeliverData() {
    return this._gi;
  }
}
exports.ItemDeliverModel = ItemDeliverModel;
//# sourceMappingURL=ItemDeliverModel.js.map
