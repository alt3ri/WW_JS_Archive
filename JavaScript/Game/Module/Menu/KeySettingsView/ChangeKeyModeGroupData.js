"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeKeyModeGroupData = void 0);
const ChangeKeyModeRowData_1 = require("./ChangeKeyModeRowData");
class ChangeKeyModeGroupData {
  constructor(e) {
    (this.GroupName = void 0),
      (this.DefaultKeyModeRowIndex = 0),
      (this.jzs = []),
      (this.GroupName = e.GroupName),
      (this.DefaultKeyModeRowIndex = e.DefaultKeyModeRowIndex);
    let t = 0;
    for (const a of e.ChangeKeyModeRowList) {
      var o = new ChangeKeyModeRowData_1.ChangeKeyModeRowData(t, a);
      this.jzs.push(o), t++;
    }
  }
  GetChangeKeyModeRowDataList() {
    return this.jzs;
  }
}
exports.ChangeKeyModeGroupData = ChangeKeyModeGroupData;
//# sourceMappingURL=ChangeKeyModeGroupData.js.map