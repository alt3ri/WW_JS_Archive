"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketCellData = void 0);
class ScratchTicketCellData {
  constructor(t) {
    (this.Index = 0), (this.Dol = void 0), (this.Index = t);
  }
  SetRewardItem(t) {
    this.Dol = [{ ItemId: t.L8n, IncId: 0 }, t.D8n];
  }
  IsLock() {
    return void 0 === this.Dol;
  }
  GetItemData() {
    return this.Dol;
  }
}
exports.ScratchTicketCellData = ScratchTicketCellData;
//# sourceMappingURL=ScratchTicketCellData.js.map
