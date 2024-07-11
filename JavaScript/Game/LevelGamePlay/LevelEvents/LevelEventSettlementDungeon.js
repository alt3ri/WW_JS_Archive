"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSettlementDungeon = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../Module/InstanceDungeon/InstanceDungeonController");
const PowerController_1 = require("../../Module/Power/PowerController");
const ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSettlementDungeon extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess !==
      1
    )
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InstanceDungeon", 5, "副本结算行为触发时，副本未成功"),
        this.FinishExecute(!0);
    else if (
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake
    )
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "HaveReceiveRewrad",
      ),
        this.FinishExecute(!0);
    else if (
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()
    )
      this.FinishExecute(!0);
    else {
      let r =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      if (
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(
          r,
        )
      )
        if (
          ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
            r,
          )
        ) {
          var n =
            !!ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(
              r,
            );
          let l =
            ModelManager_1.ModelManager.InstanceDungeonModel
              .CurrentInstanceIsFinish;
          if (n && !l) this.FinishExecute(!0);
          else {
            var n =
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
                r,
              );
            if (n === 0) this.FinishExecute(!0);
            else {
              const i = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(n);
              i
                ? (((l = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    64,
                  )).ShowPowerItem = !0),
                  l.SetTextArgs(n.toString()),
                  l.FunctionMap.set(1, () => {}),
                  l.FunctionMap.set(2, () => {
                    let e;
                    i
                      ? InstanceDungeonController_1.InstanceDungeonController.GetInstExchangeRewardRequest()
                      : ((e =
                          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                            "ReceiveLevelPlayPowerNotEnough",
                          )),
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                          e,
                        ),
                        PowerController_1.PowerController.OpenPowerView());
                  }),
                  (n =
                    ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
                      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                        r,
                      ).CustomTypes,
                    )) &&
                    n.LeftUpCount > 0 &&
                    (l.Tip = n.GetFullTip()),
                  this.FinishExecute(!0),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    l,
                  ))
                : ((r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                    "ReceiveLevelPlayPowerNotEnough",
                  )),
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                    r,
                  ),
                  PowerController_1.PowerController.OpenPowerView(),
                  this.FinishExecute(!0));
            }
          }
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "InstanceDungeonRewardTimeNotEnough",
          ),
            this.FinishExecute(!0);
      else
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "InstanceDungeonRewardTimeNotEnough",
        ),
          this.FinishExecute(!0);
    }
  }
}
exports.LevelEventSettlementDungeon = LevelEventSettlementDungeon;
// # sourceMappingURL=LevelEventSettlementDungeon.js.map
