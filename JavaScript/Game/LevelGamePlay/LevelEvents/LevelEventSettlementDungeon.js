"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSettlementDungeon = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
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
      var r,
        n,
        l = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      const a =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
          l,
        );
      a
        ? ModelManager_1.ModelManager.InstanceDungeonModel
            .InstanceRewardHaveTake
          ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
              "HaveReceiveRewrad",
            ),
            this.FinishExecute(!0))
          : ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()
            ? this.FinishExecute(!0)
            : ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(
                  l,
                ) &&
                ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
                  l,
                )
              ? ((n =
                  !!ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(
                    l,
                  )),
                (r =
                  ModelManager_1.ModelManager.InstanceDungeonModel
                    .CurrentInstanceIsFinish),
                n && !r
                  ? this.FinishExecute(!0)
                  : ((n =
                      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                        l,
                      )),
                    !(l =
                      (r =
                        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
                          n.CustomTypes,
                        )) && 0 < r.LeftUpCount) &&
                    ModelManager_1.ModelManager.FunctionModel.IsOpen(10071) &&
                    CommonParamById_1.configCommonParamById
                      .GetIntArrayConfig("MultiExchangeInstType")
                      ?.includes(n.InstSubType)
                      ? ((n = {
                          SinglePowerCost: a,
                          RewardCallBack: (e) => {
                            ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(
                              e,
                            );
                          },
                        }),
                        UiManager_1.UiManager.OpenView(
                          "PowerMagnificationRewardPopView",
                          n,
                        ),
                        this.FinishExecute(!0))
                      : (((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                          64,
                        )).ShowPowerItem = !0),
                        (n.CanExecuteCloseFunc = (e) =>
                          2 !== e ||
                          ModelManager_1.ModelManager.PowerModel.IsPowerEnough(
                            a,
                          )),
                        n.SetTextArgs(a.toString()),
                        n.FunctionMap.set(2, () => {
                          var e;
                          ModelManager_1.ModelManager.PowerModel.IsPowerEnough(
                            a,
                          )
                            ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.GetInstExchangeRewardRequest(
                                1,
                              )
                            : ((e =
                                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                                  "ReceiveLevelPlayPowerNotEnough",
                                )),
                              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(
                                e,
                              ),
                              ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView(
                                2,
                                ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(
                                  a,
                                ),
                              ));
                        }),
                        l && (n.Tip = r.GetFullTip()),
                        this.FinishExecute(!0),
                        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                          n,
                        ))))
              : (this.OpenInstanceRewardTimesNotEnoughConfirmBox(),
                this.FinishExecute(!0))
        : this.FinishExecute(!0);
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
