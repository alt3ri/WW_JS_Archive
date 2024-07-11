"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeliverData = void 0);
const DeliverSlotData_1 = require("./DeliverSlotData");
class DeliverData {
  constructor(t, i, s, e) {
    (this.Context = void 0),
      (this.nCi = []),
      (this.NpcName = ""),
      (this.TitleTextId = void 0),
      (this.DescriptionTextId = void 0),
      (this.Context = e),
      (this.NpcName = t),
      (this.TitleTextId = i),
      (this.DescriptionTextId = s);
  }
  Clear() {
    (this.Context = void 0),
      (this.nCi.length = 0),
      (this.NpcName = ""),
      (this.DescriptionTextId = "");
  }
  AddSlotData(t, i, s) {
    var e;
    if (t && !(t.length <= 0))
      return (
        (e = new DeliverSlotData_1.DeliverSlotData()).Initialize(t, i, s),
        this.nCi.push(e),
        e
      );
  }
  GetSlotDataList() {
    return this.nCi;
  }
  IsSlotEnough(t) {
    for (const i of this.nCi)
      if (i.HasItem() && i.GetCurrentItemConfigId() === t && i.IsEnough())
        return !0;
    return !1;
  }
}
exports.DeliverData = DeliverData;
//# sourceMappingURL=DeliverData.js.map
