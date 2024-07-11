"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalLineItem = void 0);
const UE = require("ue");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SignalItemBase_1 = require("./SignalItemBase");
class SignalLineItem extends SignalItemBase_1.SignalItemBase {
  constructor() {
    super(...arguments), (this.AMo = void 0), (this.PMo = void 0);
  }
  Init(e) {
    this.SetRootActor(e.GetOwner(), !0), (this.Width = this.RootItem.Width);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
    ];
  }
  OnStart() {
    (this.AMo = this.GetSprite(0)), (this.PMo = this.GetSprite(1));
  }
  OnReset() {
    this.AMo.SetUIActive(!0),
      this.PMo.SetFillAmount(0),
      this.PMo.SetUIActive(!0);
  }
  InitByGameplayType(e) {
    super.InitByGameplayType(e);
    let t =
      e === 2 ? "SP_SignalNoteSolidLineGreen" : "SP_SignalNoteSolidLineYellow";
    e === 3 && (t = "SP_SignalNoteSolidLineOrange");
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(e, this.PMo, !1), this.Reset();
  }
  OnUpdate() {
    super.OnUpdate();
    let e = -this.DecisionShowSize / 2;
    this.CurrentRelativeX < e
      ? this.PMo.SetFillAmount(0)
      : ((e = this.GetProgress()), this.PMo.SetFillAmount(e));
  }
  GetProgress() {
    var e = -this.DecisionShowSize / 2;
    var e = this.CurrentRelativeX - e;
    return MathCommon_1.MathCommon.Clamp(e / this.RootItem.Width, 0, 1);
  }
}
exports.SignalLineItem = SignalLineItem;
// # sourceMappingURL=SignalLineItem.js.map
