"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  MingSuDefine_1 = require("./MingSuDefine"),
  MingSuModel_1 = require("./MingSuModel");
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
      this.Lbi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
        this.RGn,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
      this.Lbi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
        this.RGn,
      );
  }
  static OpenView(e, o) {
    var n,
      r =
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
    var o = new Protocol_1.Aki.Protocol.hhs();
    (o.x7n = e),
      Net_1.Net.Call(6023, Protocol_1.Aki.Protocol.hhs.create(o), (e) => {
        var o, n;
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((o = e.x7n),
              (n = e.VSs),
              ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(
                o,
                n,
              ),
              r && r())
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                9566,
              ));
      });
  }
  static SendHandInMingSuRequest(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("MingSuTi", 8, "HandInMingSuRequest", ["dragonPoolId", t]);
    var e = new Protocol_1.Aki.Protocol.ohs();
    (e.x7n = t),
      (e.vVn =
        ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId),
      Net_1.Net.Call(8020, Protocol_1.Aki.Protocol.ohs.create(e), (e) => {
        var o, n, r;
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "MingSuTi",
              8,
              "[CollectionItemDisplay]HandInMingSuResponse",
              ["dragonPoolId", t],
              ["提交数量", e.NSs],
              ["提交后的等级", e.P6n],
              ["提交后的状态", e.kSs],
            ),
          e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((r =
                ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(
                  e.x7n,
                )) &&
                ((o = e.P6n),
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
                e.O4n,
                14790,
              ),
              ItemRewardController_1.ItemRewardController.Close()));
      });
  }
}
((exports.MingSuController = MingSuController).Model =
  MingSuModel_1.MingSuModel),
  (MingSuController.Lbi = () => {
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
  (MingSuController.RGn = () => {
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
//# sourceMappingURL=MingSuController.js.map
