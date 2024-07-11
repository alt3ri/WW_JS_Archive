"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadItemBase = void 0);
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GamepadItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.pAi = new Map()), (this.vAi = new Map());
  }
  AddKeySprite(e, s) {
    this.pAi.set(e, s);
  }
  SetKeysEnable(e) {
    for (var [s, t] of this.vAi) e.includes(s) || t.SetUIActive(!1);
    for (const i of e) this.SetKeySpriteVisible(i, !0);
  }
  SetAllKeyDisable() {
    for (const e of this.vAi.values()) e.SetUIActive(!1);
  }
  SetKeySpriteVisible(e, s) {
    var t = this.pAi.get(e);
    t && (t.SetUIActive(s), s ? this.vAi.set(e, t) : this.vAi.delete(e));
  }
  OnBeforeDestroy() {
    this.pAi.clear(), this.vAi.clear();
  }
}
exports.GamepadItemBase = GamepadItemBase;
//# sourceMappingURL=GamepadItemBase.js.map
