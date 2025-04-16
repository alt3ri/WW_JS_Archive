"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventClaimDungeonReward = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClaimDungeonReward extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var o,
      l = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    const n =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
        l,
      );
    if (n && !(n <= 0))
      if (
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(
          l,
        )
      ) {
        const a = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(n);
        a
          ? (((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64)).ShowPowerItem =
              !0),
            o.SetTextArgs(n.toString()),
            o.FunctionMap.set(2, () => {
              var e;
              a
                ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(
                    1,
                  )
                : ((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                    "ReceiveLevelPlayPowerNotEnough",
                  )),
                  ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(
                    e,
                  ),
                  ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView(
                    2,
                    n,
                  ));
            }),
            (l =
              ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(l)
                  .CustomTypes,
              )) &&
              0 < l.LeftUpCount &&
              (o.Tip = l.GetFullTip()),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              o,
            ))
          : ((l = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "ReceiveLevelPlayPowerNotEnough",
            )),
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(
              l,
            ),
            ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView(
              2,
              n,
            ));
      } else
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
          "InstanceDungeonRewardTimeNotEnough",
        );
  }
}
exports.LevelEventClaimDungeonReward = LevelEventClaimDungeonReward;
//# sourceMappingURL=LevelEventClaimDungeonReward.js.map
