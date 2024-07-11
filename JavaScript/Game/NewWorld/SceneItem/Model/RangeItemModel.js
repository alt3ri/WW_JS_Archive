"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeItemModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class RangeItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.ksr = void 0);
  }
  OnInit() {
    return (this.ksr = new Map()), !0;
  }
  AddBoxRange(e, o) {
    this.ksr.has(e) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "SceneGameplay",
        30,
        "[RangeItemModel] Box Range Id 重复",
        ["BoxRangeItem", o.GetName()],
      ),
      this.ksr.set(e, o);
  }
  RemoveBoxRange(e) {
    this.ksr.delete(e);
  }
  GetBoxRange(e) {
    return this.ksr.get(e);
  }
  OnClear() {
    return !(this.ksr = void 0);
  }
}
exports.RangeItemModel = RangeItemModel;
//# sourceMappingURL=RangeItemModel.js.map
