"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoSkillTip = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager");
class RacingBetsDangoSkillTip extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  OnBeforeShow() {
    var e = this.OpenParam,
      e = DangoManager_1.DangoManager.GetDangoData(e[0]);
    this.SetTextureShowUntilLoaded(e.IconAttack, this.GetTexture(0)),
      this.GetText(1).SetText(e.GetDangoActiveSkillDesc());
  }
  OnAfterPlayStartSequence() {
    TimerSystem_1.TimerSystem.Next(() => {
      var e = this.OpenParam;
      this.CloseMe(), e[1].SetResult(void 0);
    });
  }
}
exports.RacingBetsDangoSkillTip = RacingBetsDangoSkillTip;
//# sourceMappingURL=RacingBetsDangoSkillTip.js.map
