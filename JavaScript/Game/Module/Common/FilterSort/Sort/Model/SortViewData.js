"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SortResultData = exports.SortViewData = void 0);
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class SortViewData {
  constructor(t, e) {
    (this.ConfigId = t), (this.ConfirmFunction = e);
  }
}
exports.SortViewData = SortViewData;
class SortResultData {
  constructor() {
    (this.Mne = 0), (this.gUt = void 0), (this.fUt = void 0), (this.pUt = !1);
  }
  SetConfigId(t) {
    this.Mne = t;
  }
  SetSelectBaseSort(t) {
    this.gUt = t;
  }
  SetSelectAttributeSort(t) {
    this.fUt = t;
  }
  GetSelectBaseSort() {
    return this.gUt;
  }
  GetSelectAttributeSort() {
    return this.fUt;
  }
  SetIsAscending(t) {
    this.pUt = t;
  }
  GetIsAscending() {
    return this.pUt;
  }
  GetAllSelectRuleSet() {
    var t = new Set(),
      e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    for (const r of e.FrontSortList) t.add(r);
    if ((t.add(this.gUt[0]), this.fUt))
      for (const s of this.fUt.keys()) t.add(s);
    for (const i of e.LastSortList) t.add(i);
    return t;
  }
  ShowAllSortContent() {
    var t = new StringBuilder_1.StringBuilder();
    if ((t.Append(this.gUt[1]), t.Append(","), this.fUt))
      for (const e of this.fUt.values()) t.Append(e), t.Append(",");
    return t.RemoveLast(1), t.ToString();
  }
  ConvertToStorageData() {
    var t = { ConfigId: this.Mne, IsAscending: this.pUt },
      e = this.GetSelectBaseSort(),
      e = (e && (t.SelectBaseSort = e[0]), this.GetSelectAttributeSort());
    return e && ((e = Array.from(e.keys())), (t.SelectAttributeSort = e)), t;
  }
}
exports.SortResultData = SortResultData;
//# sourceMappingURL=SortViewData.js.map
