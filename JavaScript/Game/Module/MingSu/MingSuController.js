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
        this.NGn,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
      this.Lbi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
        this.NGn,
      );
  }
  static OpenView(e, o) {
    var n =
      ConfigManager_1.ConfigManager.CollectItemConfig.GetDragonPoolConfigById(
        e,
      );
    if (!n) return !1;
    const r = ModelManager_1.ModelManager.MingSuModel;
    return (
      r.SetCurrentDragonPoolId(e),
      r.SetCollectItemConfigId(n.CoreId),
      e === MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID
        ? MingSuController.SendOpenDarkCoastDeliveryRequest(e, () => {
            UiManager_1.UiManager.OpenView(
              "DarkCoastDeliveryMainView",
              r.GetDragonPoolInstanceById(e),
              o,
            );
          })
        : MingSuController.SendOpenDragonPoolRequest(e, () => {
            switch (e) {
              case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
                UiManager_1.UiManager.OpenView("MingSuView", void 0, o);
                break;
              case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
                UiManager_1.UiManager.OpenView("CollectItemView", void 0, o);
            }
          }),
      !0
    );
  }
  static SendOpenDragonPoolRequest(e, o) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("MingSuTi", 8, "打开龙池!!!");
    var n = new Protocol_1.Aki.Protocol.Chs();
    (n.k7n = e),
      Net_1.Net.Call(27701, Protocol_1.Aki.Protocol.Chs.create(n), (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(
                e.kih,
              ),
              o && o())
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                21983,
              ));
      });
  }
  static SendOpenDarkCoastDeliveryRequest(o, n) {
    var e = new Protocol_1.Aki.Protocol.Dth();
    (e.k7n = o),
      Net_1.Net.Call(25864, Protocol_1.Aki.Protocol.Dth.create(e), (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(
                e.kih,
              ),
              ModelManager_1.ModelManager.MingSuModel.RefreshDarkCoastGuardInfo(
                o,
                e.Gih,
                e.Nih,
              ),
              ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevelGains(
                o,
                e.Oih,
              ),
              n && n())
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                23120,
              ));
      });
  }
  static async SendDarkCoastDeliveryRequestAsync() {
    var e = new Protocol_1.Aki.Protocol.Dth(),
      e =
        ((e.k7n = MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID),
        await Net_1.Net.CallAsync(
          25864,
          Protocol_1.Aki.Protocol.Dth.create(e),
        ));
    e &&
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
      (ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(
        e.kih,
      ),
      ModelManager_1.ModelManager.MingSuModel.RefreshDarkCoastGuardInfo(
        MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID,
        e.Gih,
        e.Nih,
      ),
      ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevelGains(
        MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID,
        e.Oih,
      ));
  }
  static SendHandInMingSuRequest(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("MingSuTi", 8, "HandInMingSuRequest", ["dragonPoolId", t]);
    var e = new Protocol_1.Aki.Protocol.uhs();
    (e.k7n = t),
      (e.AVn =
        ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId),
      Net_1.Net.Call(26274, Protocol_1.Aki.Protocol.uhs.create(e), (e) => {
        var o, n, r;
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "MingSuTi",
              8,
              "[CollectionItemDisplay]HandInMingSuResponse",
              ["dragonPoolId", t],
              ["提交数量", e.KSs],
              ["提交后的等级", e.F6n],
              ["提交后的状态", e.WSs],
            ),
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ((r =
                ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(
                  e.k7n,
                )) &&
                ((o = e.F6n),
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
              ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolActiveStatus(
                e.k7n,
                e.WSs,
              ),
              ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevel(
                e.k7n,
                e.F6n,
              ),
              ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolHadCoreCount(
                e.k7n,
                e.KSs,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateDragonPoolView,
              ))
            : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                26733,
              ),
              ItemRewardController_1.ItemRewardController.Close()));
      });
  }
  static SendMingSuHandRewardRequest(n) {
    var e = new Protocol_1.Aki.Protocol.Ith();
    (e.k7n = n),
      (e.AVn =
        ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId),
      Net_1.Net.Call(26716, Protocol_1.Aki.Protocol.Ith.create(e), (e) => {
        var o;
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolLevelGains(
                n,
                e.Oih,
              ),
              (o =
                ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(
                  n,
                ).GetActivityRewardViewData()),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                o,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17068,
              ));
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
  (MingSuController.NGn = () => {
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
