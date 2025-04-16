"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemBossRushBuff = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BossRushController_1 = require("../../../Module/Activity/ActivityContent/BossRush/BossRushController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemBossRushBuff extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    var e = e.BoardId,
      o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
      s = BossRushController_1.BossRushController.GetBossRushSelectedBuffId(o);
    return 0 === s
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 27, "找不到当前BOSSRUSH 选择的buff", [
            "currentInstanceLevelId",
            o,
          ]),
        !1)
      : (o =
            ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffDescByClassLevel(
              s,
              e,
            ))
        ? ControllerHolder_1.ControllerHolder.SoundAreaPlayTipsController.OpenSoundAreaPlayTips(
            o.SoundAreaInfoConfigId,
          )
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Activity",
              27,
              "找不到当前BOSSRUSH 选择的buff的配置",
              ["buffId", s],
              ["classLevel", e],
            ),
          !1);
  }
  GetViewName(e) {
    return "SoundAreaPlayTips";
  }
}
exports.OpenSystemBossRushBuff = OpenSystemBossRushBuff;
//# sourceMappingURL=OpenSystemBossRushBuff.js.map
