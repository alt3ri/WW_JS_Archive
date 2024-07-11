"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleEntranceButton = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  BattleVisibleChildView_1 = require("./BattleVisibleChildView");
class BattleEntranceButton extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.jYe = void 0),
      (this.l4e = void 0),
      (this.FunctionType = void 0),
      (this.HideInGamepad = void 0),
      (this.HideByRoleConfig = void 0),
      (this.WYe = void 0),
      (this.KYe = () => {
        this.jYe && this.jYe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.KYe]]);
  }
  Initialize(t) {
    var e;
    super.Initialize(),
      t &&
        ((this.HideInGamepad = t.HideInGamepad),
        (this.HideByRoleConfig = t.HideByRoleConfig),
        (e = t.RedDotName) &&
          ((this.l4e = e),
          RedDotController_1.RedDotController.BindRedDot(e, this.GetItem(1))),
        this.InitChildType(t.ChildType),
        (e = t.FunctionType)) &&
        ((this.FunctionType = e),
        this.SetFunctionOpen(
          e,
          ModelManager_1.ModelManager.FunctionModel.IsOpen(this.FunctionType),
        ));
  }
  Reset() {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.l4e),
      (this.l4e = void 0)),
      (this.jYe = void 0),
      super.Reset();
  }
  SetFunctionOpen(t, e) {
    t === this.FunctionType &&
      (this.SetVisible(1, e), this.SetOtherHide(this.WYe?.() ?? !1));
  }
  SetGetOtherHideCallCall(t) {
    this.WYe = t;
  }
  SetGamepadHide(t) {
    this.HideInGamepad && this.SetVisible(2, !t);
  }
  SetOtherHide(t) {
    this.SetVisible(4, !t);
  }
  SetGmHide(t) {
    this.SetVisible(3, !t);
  }
  BindOnClicked(t) {
    this.jYe = t;
  }
}
exports.BattleEntranceButton = BattleEntranceButton;
//# sourceMappingURL=BattleEntranceButton.js.map
