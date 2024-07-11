"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class CalabashController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ActiveBattleView,
      CalabashController.Oft,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ActiveBattleView,
      CalabashController.Oft,
    );
  }
  static OpenCalabashUpgradeSuccessView(e) {
    UiManager_1.UiManager.OpenView("CalabashUpgradeSuccessView", e);
  }
  static kft() {
    UiManager_1.UiManager.IsViewShow("CalabashUnlockItemView") ||
      !UiManager_1.UiManager.IsViewShow("BattleView") ||
      ModelManager_1.ModelManager.SundryModel.IsBlockTips ||
      UiManager_1.UiManager.OpenView(
        "CalabashUnlockItemView",
        ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift(),
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16868, this.Fft),
      Net_1.Net.Register(26092, this.Vft),
      Net_1.Net.Register(3523, this.Hft),
      Net_1.Net.Register(5491, this.jft);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16868),
      Net_1.Net.UnRegister(26092),
      Net_1.Net.UnRegister(3523),
      Net_1.Net.UnRegister(5491);
  }
  static RequestCalabashLevelReward(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 11, "请求领取幻象等级奖励");
    var a = Protocol_1.Aki.Protocol.Lzn.create();
    (a.P6n = e),
      Net_1.Net.Call(16236, a, (e) => {
        e &&
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            24518,
          );
      });
  }
  static RequestPhantomRefiningRequest(e) {
    const a = [];
    e.forEach((e) => {
      a.push(e.IncId);
    });
    e = Protocol_1.Aki.Protocol.Pls.create();
    (e.v8n = a),
      Net_1.Net.Call(4267, e, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                28498,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnVisionRecoveryResult,
                e,
              ));
      });
  }
  static JumpToCalabashCollectTabView(e) {
    this.JumpToCalabashRootView("CalabashCollectTabView", e);
  }
  static JumpToCalabashRootView(e, a) {
    e = { TabViewName: e, Param: a };
    UiManager_1.UiManager.OpenView("CalabashRootView", e);
  }
}
(exports.CalabashController = CalabashController),
  ((_a = CalabashController).Oft = () => {
    0 !==
      ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length &&
      CalabashController.kft();
  }),
  (CalabashController.Fft = (e) => {
    var a;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 11, "服务端推送吸收器信息"),
      ModelManager_1.ModelManager.CalabashModel.CalabashInstance &&
        ((a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp()),
        ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel() !==
          e.CLs.P6n) &&
        ((a = {
          AddExp: !1,
          PreLevel:
            ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
          PreExp: a,
          CurLevel: e.CLs.P6n,
          CurExp: a,
        }),
        _a.OpenCalabashUpgradeSuccessView(a)),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceBaseInfo(
        e.CLs,
      ),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(
        e.gLs,
      ),
      ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
  }),
  (CalabashController.Vft = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 11, "服务端推送吸收器经验变化信息");
    var a = e.vLs,
      o = e.fLs,
      r = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
      t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      r = { AddExp: !0, PreLevel: t, PreExp: r, CurLevel: a, CurExp: o };
    ModelManager_1.ModelManager.CalabashModel.SetCurrentExp(o),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashLevel(a),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(
        e.gLs,
      ),
      ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData(),
      _a.OpenCalabashUpgradeSuccessView(r),
      t < a &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshCalabash,
        );
  }),
  (CalabashController.Hft = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 11, "服务端更新的葫芦经验图谱信息"),
      ModelManager_1.ModelManager.CalabashModel.SetUnlockCalabashDevelopReward(
        e.pLs,
      ),
      ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
  }),
  (CalabashController.jft = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 11, "服务端更新的葫芦已获得奖励等级列表数据"),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashLevelsReward(e.MLs);
  });
//# sourceMappingURL=CalabashController.js.map
