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
    Net_1.Net.Register(29992, this.Fft),
      Net_1.Net.Register(24130, this.Vft),
      Net_1.Net.Register(16716, this.Hft),
      Net_1.Net.Register(18319, this.jft);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29992),
      Net_1.Net.UnRegister(24130),
      Net_1.Net.UnRegister(16716),
      Net_1.Net.UnRegister(18319);
  }
  static RequestCalabashLevelReward(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 10, "请求领取幻象等级奖励");
    var a = Protocol_1.Aki.Protocol.xzn.create();
    (a.F6n = e),
      Net_1.Net.Call(23037, a, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            15190,
          );
      });
  }
  static RequestPhantomRefiningRequest(e) {
    const a = [];
    e.forEach((e) => {
      a.push(e.IncId);
    });
    e = Protocol_1.Aki.Protocol.Gls.create();
    (e.A8n = a),
      Net_1.Net.Call(16048, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                22362,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnVisionRecoveryResult,
                e,
              ));
      });
  }
  static RequestBatchRefiningRequest(e) {
    const a = [];
    e.forEach((e) => {
      a.push(e.IncId);
    });
    e = Protocol_1.Aki.Protocol.$m_.create();
    (e.A8n = a),
      Net_1.Net.Call(20589, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15037,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnVisionRecoveryBatchResult,
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
  static RequestPhantomPolishRequest(e, a) {
    var o = Protocol_1.Aki.Protocol.Jrc.create();
    (o.b9n = e),
      (o.zrc = a),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Calabash",
          75,
          "RequestPhantomPolishRequest",
          ["id", e],
          ["propItemId", a],
        ),
      Net_1.Net.Call(23213, o, (e) => {
        e &&
          e.xPs &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                21216,
              )
            : (ModelManager_1.ModelManager.InventoryModel.UpdatePhantomItemData(
                e.xPs,
              ),
              ModelManager_1.ModelManager.PhantomBattleModel.UpdatePhantomBattleData(
                e.xPs,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnVisionRefineResult,
                e,
              )));
      });
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
      Log_1.Log.Info("Calabash", 10, "服务端推送吸收器信息"),
      ModelManager_1.ModelManager.CalabashModel.CalabashInstance &&
        ((a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp()),
        ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel() !==
          e.ELs.F6n) &&
        ((a = {
          AddExp: !1,
          PreLevel:
            ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
          PreExp: a,
          CurLevel: e.ELs.F6n,
          CurExp: a,
        }),
        _a.OpenCalabashUpgradeSuccessView(a)),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceBaseInfo(
        e.ELs,
      ),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(
        e.yLs,
      ),
      ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
  }),
  (CalabashController.Vft = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 10, "服务端推送吸收器经验变化信息");
    var a = e.TLs,
      o = e.ILs,
      t = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
      r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      t = { AddExp: !0, PreLevel: r, PreExp: t, CurLevel: a, CurExp: o };
    ModelManager_1.ModelManager.CalabashModel.SetCurrentExp(o),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashLevel(a),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(
        e.yLs,
      ),
      ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData(),
      _a.OpenCalabashUpgradeSuccessView(t),
      r < a &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshCalabash,
        );
  }),
  (CalabashController.Hft = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 10, "服务端更新的葫芦经验图谱信息"),
      ModelManager_1.ModelManager.CalabashModel.SetUnlockCalabashDevelopReward(
        e.LLs,
      ),
      ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
  }),
  (CalabashController.jft = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Calabash", 10, "服务端更新的葫芦已获得奖励等级列表数据"),
      ModelManager_1.ModelManager.CalabashModel.SetCalabashLevelsReward(e.RLs);
  });
//# sourceMappingURL=CalabashController.js.map
