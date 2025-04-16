"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketTabItem = void 0);
const UE = require("ue"),
  UiViewSequence_1 = require("../../../../../../Ui/Base/UiViewSequence"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class ScratchTicketTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.rnl = void 0),
      (this.yQa = void 0),
      (this.UiLevelSequence = void 0),
      (this.onl = () => {
        this.yQa && this.yQa(this.rnl, this);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.onl]]);
  }
  OnBeforeCreateImplement() {
    (this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiLevelSequence),
      this.GetExtendToggle(0).CanExecuteChange.Bind(
        () => 0 === this.GetExtendToggle(0).GetToggleState(),
      );
  }
  Refresh(t, e, i) {
    (this.rnl = t),
      this.SetSpriteByPath(
        t.Config.TogRoundIcon,
        this.GetSprite(1),
        !1,
        void 0,
      );
    t = t.GetRoundState();
    this.GetItem(2).SetUIActive(0 === t), this.GetItem(3).SetUIActive(2 === t);
  }
  SetSelect(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(t, e);
  }
  SetClickToggleCallback(t) {
    this.yQa = t;
  }
}
exports.ScratchTicketTabItem = ScratchTicketTabItem;
//# sourceMappingURL=ScratchTicketTabItem.js.map
