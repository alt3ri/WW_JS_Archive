"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HiddenBossWindow = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  WorldMapController_1 = require("../WorldMap/WorldMapController");
class HiddenBossWindow extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.nt_ = () => {
        const e = this.OpenParam;
        var i =
            ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetHiddenBossWindowConfig(
              e.UiId,
            ),
          r = i.MarkId,
          o = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(r);
        if (void 0 === o)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelPlayReport",
              63,
              "[讨伐报告]隐藏boss解锁弹窗找不到对应的标记配置",
              ["弹窗Id", e.UiId],
              ["标记Id", i.MarkId],
            );
        else {
          this.CloseMe();
          const e = { MarkId: r, MarkType: o.ObjectType };
          WorldMapController_1.WorldMapController.OpenView(2, !1, e);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.nt_]]);
  }
  OnStart() {
    var e = this.OpenParam,
      e =
        ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetHiddenBossWindowConfig(
          e.UiId,
        ),
      i = (this.djl(e.BossName), this.GetTexture(2));
    this.SetTextureByPath(e.IconRefPath, i);
  }
  djl(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, i);
  }
  OnAfterShow() {
    TimerSystem_1.TimerSystem.Next(() => {
      this.CloseMe();
    });
  }
}
exports.HiddenBossWindow = HiddenBossWindow;
//# sourceMappingURL=HiddenBossWindow.js.map
