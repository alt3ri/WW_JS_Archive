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
      (this.x$e = void 0),
      (this.QFe = void 0),
      (this.FunctionType = void 0),
      (this.HideInGamepad = void 0),
      (this.HideByRoleConfig = void 0),
      (this.w$e = void 0),
      (this.B$e = () => {
        this.x$e && this.x$e();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.B$e]]);
  }
  Initialize(t) {
    var e;
    super.Initialize(),
      t &&
        ((this.HideInGamepad = t.HideInGamepad),
        (this.HideByRoleConfig = t.HideByRoleConfig),
        (e = t.RedDotName) &&
          ((this.QFe = e),
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
    this.QFe &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.QFe),
      (this.QFe = void 0)),
      (this.x$e = void 0),
      super.Reset();
  }
  SetFunctionOpen(t, e) {
    t === this.FunctionType &&
      (this.SetVisible(1, e), this.SetOtherHide(this.w$e?.() ?? !1));
  }
  SetGetOtherHideCallCall(t) {
    this.w$e = t;
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
    this.x$e = t;
  }
}
exports.BattleEntranceButton = BattleEntranceButton;
//# sourceMappingURL=BattleEntranceButton.js.map
