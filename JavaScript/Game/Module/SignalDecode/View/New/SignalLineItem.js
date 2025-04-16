"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalLineItem = void 0);
const UE = require("ue"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  SignalItemBase_1 = require("./SignalItemBase");
class SignalLineItem extends SignalItemBase_1.SignalItemBase {
  constructor() {
    super(...arguments), (this.DEo = void 0), (this.REo = void 0);
  }
  Init(t, i) {
    this.SetRootActor(t.GetOwner(), !0),
      (this.Width = this.RootItem.Width),
      this.RootItem.SetAnchorOffsetX(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
    ];
  }
  OnStart() {
    (this.DEo = this.GetSprite(0)), (this.REo = this.GetSprite(1));
  }
  AddWidth(t) {
    (this.Width += t), this.RootItem.SetWidth(this.Width);
  }
  OnReset() {
    this.DEo.SetUIActive(!0),
      this.REo.SetFillAmount(0),
      this.REo.SetUIActive(!0);
  }
  InitByGameplayType(t) {
    super.InitByGameplayType(t);
    let i =
      2 === t ? "SP_SignalNoteSolidLineGreen" : "SP_SignalNoteSolidLineYellow";
    3 === t && (i = "SP_SignalNoteSolidLineOrange");
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(t, this.REo, !1), this.Reset();
  }
  OnUpdate() {
    var t, i;
    return (
      !!super.OnUpdate() &&
      ((i = -this.DecisionShowSize / 2),
      (t = this.REo.GetFillAmount()),
      this.CurrentRelativeX < i
        ? 0 !== t && this.REo.SetFillAmount(0)
        : t !== (i = this.GetProgress()) && this.REo.SetFillAmount(i),
      !0)
    );
  }
  GetProgress() {
    var t = -this.DecisionShowSize / 2,
      t = this.CurrentRelativeX - t;
    return MathCommon_1.MathCommon.Clamp(t / this.RootItem.Width, 0, 1);
  }
}
exports.SignalLineItem = SignalLineItem;
//# sourceMappingURL=SignalLineItem.js.map
