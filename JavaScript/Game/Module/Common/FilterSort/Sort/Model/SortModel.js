"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SortModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  SortLogic_1 = require("../Logic/SortLogic");
class SortModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.dUt = new Map()),
      (this.CUt = new SortLogic_1.SortLogic());
  }
  SetSortResultData(t, e) {
    this.dUt.set(t, e);
  }
  DeleteSortResultData(t) {
    this.dUt.delete(t);
  }
  GetSortResultData(t) {
    return this.dUt.get(t);
  }
  SortDataList(t, e, o, ...r) {
    this.CUt.SortDataList(t, e, o, ...r);
  }
  SortDataByData(t, e, o, r) {
    this.CUt.SortDataByData(t, e, o, r);
  }
}
exports.SortModel = SortModel;
//# sourceMappingURL=SortModel.js.map
