"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiSetPanelData = void 0);
class BattleUiSetPanelData {
  constructor(t, e) {
    (this.dgt = new Map()), (this.IsOnlyPanelEdit = !1), (this.PanelIndex = t);
    for (const s of e) {
      var a = s.PanelItemIndex;
      if (-1 === a)
        return (
          (this.IsOnlyPanelEdit = !0), this.dgt.clear(), void this.dgt.set(a, s)
        );
      this.dgt.set(a, s);
    }
  }
  GetPanelItemData(t) {
    return this.dgt.get(t);
  }
  GetPanelItemDataMap() {
    return this.dgt;
  }
}
exports.BattleUiSetPanelData = BattleUiSetPanelData;
//# sourceMappingURL=BattleUiSetPanelData.js.map
