"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterResultData = exports.FilterViewData = void 0);
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
class FilterViewData {
  constructor(t, e) {
    (this.ConfigId = t), (this.ConfirmFunction = e);
  }
}
exports.FilterViewData = FilterViewData;
class FilterResultData {
  constructor() {
    (this.ConfigId = 0), (this.aDt = new Map());
  }
  SetConfigId(t) {
    this.ConfigId = t;
  }
  AddSingleRuleData(t, e, r) {
    let s = this.aDt.get(t);
    (s = s || new Map()).set(e, r), this.aDt.set(t, s);
  }
  SetSelectRuleData(t, e) {
    this.aDt.set(t, e);
  }
  SetRuleData(t) {
    this.aDt = t;
  }
  GetSelectRuleDataById(t) {
    return this.aDt.get(t);
  }
  GetSelectRuleData() {
    return this.aDt;
  }
  ClearSelectRuleData() {
    this.aDt.clear();
  }
  ShowAllFilterContent() {
    var t = new StringBuilder_1.StringBuilder();
    for (const e of this.aDt.values())
      for (const r of e.values()) t.Append(r), t.Append(",");
    return t.RemoveLast(1), t.ToString();
  }
}
exports.FilterResultData = FilterResultData;
//# sourceMappingURL=FilterViewData.js.map
