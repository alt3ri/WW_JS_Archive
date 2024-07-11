"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadItemBase = void 0);
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GamepadItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.pPi = new Map()), (this.vPi = new Map());
  }
  AddKeySprite(e, s) {
    this.pPi.set(e, s);
  }
  SetKeysEnable(e) {
    for (var [s, t] of this.vPi) e.includes(s) || t.SetUIActive(!1);
    for (const i of e) this.SetKeySpriteVisible(i, !0);
  }
  SetAllKeyDisable() {
    for (const e of this.vPi.values()) e.SetUIActive(!1);
  }
  SetKeySpriteVisible(e, s) {
    var t = this.pPi.get(e);
    t && (t.SetUIActive(s), s ? this.vPi.set(e, t) : this.vPi.delete(e));
  }
  OnBeforeDestroy() {
    this.pPi.clear(), this.vPi.clear();
  }
}
exports.GamepadItemBase = GamepadItemBase;
//# sourceMappingURL=GamepadItemBase.js.map
