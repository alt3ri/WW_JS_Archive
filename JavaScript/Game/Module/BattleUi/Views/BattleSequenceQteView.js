"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSequenceQteView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class BattleSequenceQteView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.Htt = () => {});
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
      (this.BtnBindInfo = [[0, this.Htt]]);
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence.PlaySequencePurely("Huxi");
  }
}
exports.BattleSequenceQteView = BattleSequenceQteView;
//# sourceMappingURL=BattleSequenceQteView.js.map
