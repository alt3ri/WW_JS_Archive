"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  FilterLogic_1 = require("../Logic/FilterLogic");
class FilterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.nDt = new Map()),
      (this.sDt = new FilterLogic_1.FilterLogic());
  }
  SetFilterResultData(e, t) {
    this.nDt.set(e, t);
  }
  DeleteFilterResultData(e) {
    this.nDt.delete(e);
  }
  GetFilterResultData(e) {
    return this.nDt.get(e);
  }
  ClearData(e) {
    this.nDt.get(e)?.ClearSelectRuleData();
  }
  GetFilterList(e, t, r, i) {
    return this.sDt.GetFilterList(e, t, r, i);
  }
  GetFilterItemDataList(e, t) {
    return this.sDt.GetFilterItemDataList(e, t);
  }
  UpdateFilterData(e, t) {
    this.GetFilterResultData(e).SetRuleData(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFilterDataUpdate,
        e,
      );
  }
}
exports.FilterModel = FilterModel;
//# sourceMappingURL=FilterModel.js.map
