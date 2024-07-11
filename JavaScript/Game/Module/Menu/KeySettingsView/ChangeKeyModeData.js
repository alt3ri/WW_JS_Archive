"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeKeyModeData = void 0);
const ChangeKeyModeGroupData_1 = require("./ChangeKeyModeGroupData");
class ChangeKeyModeData {
  constructor(e) {
    (this.TitleName = void 0),
      (this.DefaultGroupIndex = 0),
      (this.Hzs = []),
      (this.TitleName = e.TitleName),
      (this.DefaultGroupIndex = e.DefaultGroupIndex);
    for (const o of e.ChangeKeyModeGroupList) {
      var t = new ChangeKeyModeGroupData_1.ChangeKeyModeGroupData(o);
      this.Hzs.push(t);
    }
  }
  GetChangeKeyModeGroupDataList() {
    return this.Hzs;
  }
  GetMaxGroupIndex() {
    return this.GetChangeKeyModeGroupDataList().length - 1;
  }
}
exports.ChangeKeyModeData = ChangeKeyModeData;
//# sourceMappingURL=ChangeKeyModeData.js.map
