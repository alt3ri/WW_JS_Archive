"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSettlementDungeon = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../Module/InstanceDungeon/InstanceDungeonController"),
  PowerController_1 = require("../../Module/Power/PowerController"),
  ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSettlementDungeon extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (
      1 !==
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess
    )
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InstanceDungeon", 5, "副本结算行为触发时，副本未成功"),
        this.FinishExecute(!0);
    else {
      var r =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      const t =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
          r,
        );
      if (t)
        if (
          ModelManager_1.ModelManager.InstanceDungeonModel
            .InstanceRewardHaveTake
        )
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "HaveReceiveRewrad",
          ),
            this.FinishExecute(!0);
        else if (
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()
        )
          this.FinishExecute(!0);
        else if (
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
                ),
              l =
                ModelManager_1.ModelManager.InstanceDungeonModel
                  .CurrentInstanceIsFinish;
            if (n && !l) this.FinishExecute(!0);
            else {
              const i = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(t);
              i
                ? (((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    64,
                  )).ShowPowerItem = !0),
                  n.SetTextArgs(t.toString()),
                  n.FunctionMap.set(1, () => {}),
                  n.FunctionMap.set(2, () => {
                    var e;
                    i
                      ? InstanceDungeonController_1.InstanceDungeonController.GetInstExchangeRewardRequest()
                      : ((e =
                          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                            "ReceiveLevelPlayPowerNotEnough",
                          )),
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                          e,
                        ),
                        PowerController_1.PowerController.OpenPowerView(
                          2,
                          ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(
                            t,
                          ),
                        ));
                  }),
                  (l =
                    ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
                      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                        r,
                      ).CustomTypes,
                    )) &&
                    0 < l.LeftUpCount &&
                    (n.Tip = l.GetFullTip()),
                  this.FinishExecute(!0),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    n,
                  ))
                : ((r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                    "ReceiveLevelPlayPowerNotEnough",
                  )),
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                    r,
                  ),
                  PowerController_1.PowerController.OpenPowerView(
                    2,
                    ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(
                      t,
                    ),
                  ),
                  this.FinishExecute(!0));
            }
          } else
            this.OpenInstanceRewardTimesNotEnoughConfirmBox(),
              this.FinishExecute(!0);
        else
          this.OpenInstanceRewardTimesNotEnoughConfirmBox(),
            this.FinishExecute(!0);
      else this.FinishExecute(!0);
    }
  }
  OpenInstanceRewardTimesNotEnoughConfirmBox() {
    const e = ModelManager_1.ModelManager.GameModeModel?.IsMulti;
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e ? 218 : 217);
    (o.IsEscViewTriggerCallBack = !1),
      o.FunctionMap.set(1, () => {
        e ||
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }),
      o.FunctionMap.set(2, () => {
        e
          ? ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon()
          : ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      );
  }
}
exports.LevelEventSettlementDungeon = LevelEventSettlementDungeon;
//# sourceMappingURL=LevelEventSettlementDungeon.js.map
