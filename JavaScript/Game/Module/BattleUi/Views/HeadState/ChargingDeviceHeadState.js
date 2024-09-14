"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChargingDeviceHeadState = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  HeadStateViewBase_1 = require("./HeadStateViewBase");
class ChargingDeviceHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments),
      (this.Wlt = 0),
      (this.SPe = void 0),
      (this.w2a = !1),
      (this.OnProgressControlDataChange = (e) => {
        "ChargingDevice" === e.ProgressCtrlType &&
          this.x_t(e.CurrentValue / e.MaxValue);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UITexture],
    ];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  GetResourceId() {
    return "UiItem_HpClean";
  }
  ActiveBattleHeadState(e) {
    super.ActiveBattleHeadState(e);
    var t = this.GetTexture(1),
      i = this.GetText(0),
      s = t.GetStretchLeft(),
      a = t.GetParentAsUIItem().GetWidth(),
      a =
        ((this.Wlt = a - 2 * s),
        t.SetUIActive(!0),
        i.SetUIActive(!0),
        e.GetProgressControlData());
    "ChargingDevice" === a.ProgressCtrlType &&
      this.x_t(a.CurrentValue / a.MaxValue);
  }
  BindCallback() {
    super.BindCallback(),
      this.HeadStateData.BindOnProgressControlDataChange(
        this.OnProgressControlDataChange,
      );
  }
  x_t(e) {
    this.GetTexture(1).SetFillAmount(e);
    var t = MathUtils_1.MathUtils.Clamp(e, 0, 1) * this.Wlt - this.Wlt / 2,
      t =
        (this.GetTexture(2).SetUIRelativeLocation(new UE.Vector(t, 0, 0)),
        Math.round(MathUtils_1.MathUtils.RangeClamp(e, 0, 1, 0, 100)));
    this.GetText(0).SetText(t + "%"),
      1 <= e &&
        !this.w2a &&
        (this.SPe?.PlayLevelSequenceByName("Full"), (this.w2a = !0));
  }
}
exports.ChargingDeviceHeadState = ChargingDeviceHeadState;
//# sourceMappingURL=ChargingDeviceHeadState.js.map
