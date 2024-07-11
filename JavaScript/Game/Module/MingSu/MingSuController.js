"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const MingSuDefine_1 = require("./MingSuDefine");
const MingSuModel_1 = require("./MingSuModel");
class MingSuController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MingSuTi", 8, "MingSuControllerInit!!!"),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
      this.LBi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
        this.Vwn,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
      this.LBi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
        this.Vwn,
      );
  }
  static OpenView(e, o) {
    let n;
    const r =
      ConfigManager_1.ConfigManager.CollectItemConfig.GetDragonPoolConfigById(
        e,
      );
    return (
      !!r &&
      ((n = ModelManager_1.ModelManager.MingSuModel).SetCurrentDragonPoolId(e),
      n.SetCollectItemConfigId(r.CoreId),
      MingSuController.SendOpenDragonPoolRequest(e, () => {
        switch (e) {
          case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
            UiManager_1.UiManager.OpenView("MingSuView", void 0, o);
            break;
          case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
            UiManager_1.UiManager.OpenView("CollectItemView", void 0, o);
        }
      }),
      !0)
    );
  }
  static SendOpenDragonPoolRequest(e, r) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("MingSuTi", 8, "打开龙池!!!");
    const o = new Protocol_1.Aki.Protocol._os();
    (o.z6n = e),
      Net_1.Net.Call(22706, Protocol_1.Aki.Protocol._os.create(o), (e) => {
        let o, n;
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ((o = e.z6n),
              (n = e.Tfs),
              ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(
                o,
                n,
              ),
              r && r())
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                6272,
              ));
      });
  }
  static SendHandInMingSuRequest(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("MingSuTi", 8, "HandInMingSuRequest", ["dragonPoolId", t]);
    const e = new Protocol_1.Aki.Protocol.sos();
    (e.z6n = t),
      (e.N4n =
        ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId),
      Net_1.Net.Call(25090, Protocol_1.Aki.Protocol.sos.create(e), (e) => {
        let o, n, r;
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "MingSuTi",
              8,
              "[CollectionItemDisplay]HandInMingSuResponse",
              ["dragonPoolId", t],
              ["提交数量", e.yfs],
              ["提交后的等级", e.r3n],
              ["提交后的状态", e.Efs],
            ),
          e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ((r =
                ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(
                  e.z6n,
                )) &&
                ((o = e.r3n),
                (n = r.GetDragonPoolLevel()),
                (r = r.GetDragonPoolMaxLevel()),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "MingSuTi",
                    8,
                    "[CollectionItemDisplay]广播等级提升事件",
                    ["dragonPoolId", t],
                    ["currentLevel", n],
                    ["newLevel", o],
                    ["maxLevel", r],
                  ),
                r <= o
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "MingSuTi",
                        8,
                        "[CollectionItemDisplay]当提交物品等级升至满级时",
                        ["dragonPoolId", t],
                      ),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.OnSubmitItemLevelMax,
                    ))
                  : n < o
                    ? (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "MingSuTi",
                          8,
                          "[CollectionItemDisplay]当提交物品等级提升时",
                          ["dragonPoolId", t],
                        ),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.OnSubmitItemLevelUp,
                      ))
                    : (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "MingSuTi",
                          8,
                          "[CollectionItemDisplay]当提交物品成功时",
                          ["dragonPoolId", t],
                        ),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.OnSubmitItemSuccess,
                      ))),
              ModelManager_1.ModelManager.MingSuModel.DoUpdateDragonPoolInfoMap(
                e,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateDragonPoolView,
              ))
            : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                29217,
              ),
              ItemRewardController_1.ItemRewardController.Close()));
      });
  }
}
((exports.MingSuController = MingSuController).Model =
  MingSuModel_1.MingSuModel),
  (MingSuController.LBi = () => {
    switch (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MingSuTi",
          8,
          "[CollectionItemDisplay]当提交物品等级提升时,开始打开结算界面",
          [
            "CurrentDragonPoolId",
            ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId(),
          ],
        ),
      ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId())
    ) {
      case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
        ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
          2006,
          !0,
        );
        break;
      case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
        ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
          2007,
          !0,
        );
    }
  }),
  (MingSuController.Vwn = () => {
    switch (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MingSuTi",
          8,
          "[CollectionItemDisplay]当提交物品等级升至满级时,开始打开结算界面",
          [
            "CurrentDragonPoolId",
            ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId(),
          ],
        ),
      ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId())
    ) {
      case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
        ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
          2006,
          !0,
        );
        break;
      case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
        ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
          2007,
          !0,
        );
    }
  });
// # sourceMappingURL=MingSuController.js.map
