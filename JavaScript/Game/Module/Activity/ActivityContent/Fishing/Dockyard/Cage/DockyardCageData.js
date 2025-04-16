"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardCageData = void 0);
const DockyardItemBlockOriginalData_1 = require("../Base/DockyardItemBlockOriginalData");
class DockyardCageData {
  constructor(t) {
    (this.Data = void 0), (this.dgt = new Map());
    for (const r of (this.Data = t).bMs) {
      var a = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(
        r,
      );
      this.dgt.set(a.IncId, a);
    }
  }
  GetData(t) {
    return this.dgt.get(t);
  }
  GetDataList() {
    return Array.from(this.dgt.values());
  }
}
exports.DockyardCageData = DockyardCageData;
//# sourceMappingURL=DockyardCageData.js.map
