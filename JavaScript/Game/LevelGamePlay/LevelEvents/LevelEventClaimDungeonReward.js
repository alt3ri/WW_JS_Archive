"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventClaimDungeonReward = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../Module/InstanceDungeon/InstanceDungeonController"),
  PowerController_1 = require("../../Module/Power/PowerController"),
  ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClaimDungeonReward extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var o,
      n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    const l =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
        n,
      );
    if (l && !(l <= 0))
      if (
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(
          n,
        )
      ) {
        const a = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(l);
        a
          ? (((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64)).ShowPowerItem =
              !0),
            o.SetTextArgs(l.toString()),
            o.FunctionMap.set(2, () => {
              var e;
              a
                ? InstanceDungeonController_1.InstanceDungeonController.GetInstExchangeRewardRequest()
                : ((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                    "ReceiveLevelPlayPowerNotEnough",
                  )),
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                    e,
                  ),
                  PowerController_1.PowerController.OpenPowerView(2, l));
            }),
            (n =
              ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n)
                  .CustomTypes,
              )) &&
              0 < n.LeftUpCount &&
              (o.Tip = n.GetFullTip()),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              o,
            ))
          : ((n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "ReceiveLevelPlayPowerNotEnough",
            )),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(n),
            PowerController_1.PowerController.OpenPowerView(2, l));
      } else
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "InstanceDungeonRewardTimeNotEnough",
        );
  }
}
exports.LevelEventClaimDungeonReward = LevelEventClaimDungeonReward;
//# sourceMappingURL=LevelEventClaimDungeonReward.js.map
