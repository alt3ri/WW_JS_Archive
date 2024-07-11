"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuardianHeadState = void 0);
const UE = require("ue"),
  HeadStateViewBase_1 = require("./HeadStateViewBase");
class GuardianHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments), (this.pnt = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  ActiveBattleHeadState(e) {
    super.ActiveBattleHeadState(e), this.RefreshHp(), this.Hlt();
  }
  OnStart() {
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
  }
  GetResourceId() {
    return "UiItem_GuardianState_Prefab";
  }
  OnHealthChanged(e) {
    this.RefreshHp(!0);
  }
  RefreshHp(e = !1) {
    var [t, i] = this.GetHpAndMaxHp(),
      t = t / i;
    this.Cst(t), e ? this.PlayBarAnimation(t) : this.StopBarLerpAnimation();
  }
  Cst(e) {
    this.GetSprite(0).SetFillAmount(e);
  }
  OnBeginBarAnimation(e) {
    this.ast(e);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation(), this.GetSprite(1).SetUIActive(!1);
  }
  OnLerpBarBufferPercent(e) {
    this.ast(e);
  }
  ast(e) {
    var t = this.GetSprite(1),
      t =
        (t.SetFillAmount(e),
        t.IsUIActiveSelf() || t.SetUIActive(!0),
        this.GetSprite(2));
    t.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2),
      t.SetStretchRight(this.pnt * (1 - e) - 2);
  }
  Hlt() {
    var e = this.GetHpColor();
    e && ((e = UE.Color.FromHex(e)), this.GetSprite(0).SetColor(e));
  }
}
exports.GuardianHeadState = GuardianHeadState;
//# sourceMappingURL=GuardianHeadState.js.map
