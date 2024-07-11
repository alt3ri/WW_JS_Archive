"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiSetPanelData = void 0);
class BattleUiSetPanelData {
  constructor(t, e) {
    (this.iCt = new Map()), (this.IsOnlyPanelEdit = !1), (this.PanelIndex = t);
    for (const s of e) {
      var a = s.PanelItemIndex;
      if (-1 === a)
        return (
          (this.IsOnlyPanelEdit = !0), this.iCt.clear(), void this.iCt.set(a, s)
        );
      this.iCt.set(a, s);
    }
  }
  GetPanelItemData(t) {
    return this.iCt.get(t);
  }
  GetPanelItemDataMap() {
    return this.iCt;
  }
}
exports.BattleUiSetPanelData = BattleUiSetPanelData;
//# sourceMappingURL=BattleUiSetPanelData.js.map
