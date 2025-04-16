"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NetworkDetectionTips = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../Ui/Base/UiSequencePlayer"),
  LguiUtil_1 = require("../Util/LguiUtil");
class NetworkDetectionTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Uic = void 0), (this.$pt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
    ];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  OnAfterShow() {
    this.$pt?.PlaySequence("Loop");
  }
  SetTextureIconActive(e) {
    this.GetTexture(1)?.SetUIActive(e);
  }
  SetTipsText(e) {
    this.GetText(0)?.SetText(e);
  }
  SetTipsLocalText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
  OnAfterHide() {
    this.Dic();
  }
  ShowTip(e) {
    this.SetTipsLocalText(e),
      this.Show(),
      this.Dic(),
      (this.Uic = TimerSystem_1.TimerSystem.Delay(() => {
        this.Hide();
      }, +TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  Dic() {
    this.Uic &&
      TimerSystem_1.TimerSystem.Has(this.Uic) &&
      TimerSystem_1.TimerSystem.Remove(this.Uic);
  }
}
exports.NetworkDetectionTips = NetworkDetectionTips;
//# sourceMappingURL=NetworkDetectionTips.js.map
