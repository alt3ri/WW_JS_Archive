"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeliverSlotData = void 0);
class DeliverSlotData {
  constructor() {
    (this.sgi = []),
      (this.agi = new Set()),
      (this.hgi = 0),
      (this.HandInType = "ItemIds"),
      (this.lgi = 0),
      (this.HPt = 0);
  }
  Initialize(t, e, s) {
    (this.sgi = t),
      (this.agi = new Set(t)),
      (this.hgi = e),
      (this.HandInType = s),
      (this.lgi = 0),
      (this.HPt = 0);
  }
  SetItem(t, e) {
    return !!this.CanSet(t) && ((this.lgi = t), (this.HPt = e), !0);
  }
  ClearItem() {
    (this.lgi = 0), (this.HPt = 0);
  }
  CanSet(t) {
    return !((0 < this.lgi && this.lgi !== t) || !this.agi.has(t));
  }
  IsEnough() {
    return this.HPt >= this.hgi;
  }
  HasItem() {
    return 0 < this.lgi;
  }
  GetItemRangeSet() {
    return this.agi;
  }
  GetItemRangeList() {
    return this.sgi;
  }
  GetNeedCount() {
    return this.hgi;
  }
  GetCurrentItemConfigId() {
    return this.lgi;
  }
  GetCurrentCount() {
    return this.HPt;
  }
  SetCurrentCount(t) {
    this.HPt = t;
  }
}
exports.DeliverSlotData = DeliverSlotData;
//# sourceMappingURL=DeliverSlotData.js.map
