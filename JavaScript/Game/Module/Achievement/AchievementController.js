"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class AchievementController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      AchievementController.obe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleViewActiveSequenceFinish,
        this.rbe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      AchievementController.obe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleViewActiveSequenceFinish,
        this.rbe,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(13954, AchievementController.nbe),
      Net_1.Net.Register(9354, AchievementController.sbe),
      Net_1.Net.Register(9889, AchievementController.abe);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(13954),
      Net_1.Net.UnRegister(9354),
      Net_1.Net.UnRegister(9889);
  }
  static OpenAchievementMainView() {
    UiManager_1.UiManager.OpenView("AchievementMainView");
  }
  static OpenAchievementDetailView(e, t, r = -1) {
    (t =
      ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(t)),
      (e = ModelManager_1.ModelManager.AchievementModel.GetCategory(e));
    (ModelManager_1.ModelManager.AchievementModel.CurrentSelectCategory = e),
      (ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup = t),
      (ModelManager_1.ModelManager.AchievementModel.AchievementSearchState =
        !1),
      (ModelManager_1.ModelManager.AchievementModel.CurrentSelectAchievementId =
        r),
      (ModelManager_1.ModelManager.AchievementModel.CurrentSearchText = ""),
      UiManager_1.UiManager.OpenView("AchievementDetailView");
  }
  static RequestGetAchievementReward(e, t) {
    var r = new Protocol_1.Aki.Protocol.o$n();
    (r.J4n = t),
      (r.E6n = e),
      Net_1.Net.Call(4368, r, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            21429,
          );
      });
  }
  static RequestAchievementFinish(e) {
    var t = new Protocol_1.Aki.Protocol.l$n();
    (t.J4n = e),
      Net_1.Net.Call(23255, t, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            22144,
          );
      });
  }
  static hbe(e) {
    var t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
        e.J4n,
      ).GetFinishState(),
      r =
        (ModelManager_1.ModelManager.AchievementModel.OnAchievementProgressNotify(
          e,
        ),
        ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
          e.J4n,
        ).GetFinishState());
    t !== r &&
      2 !== r &&
      0 !== r &&
      ((t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
        e.J4n,
      )),
      ModelManager_1.ModelManager.AchievementModel?.IsHideAchievementGroup(
        t.GetGroupId(),
      ) ||
        (ModelManager_1.ModelManager.AchievementModel.CurrentFinishAchievementArray.push(
          e.J4n,
        ),
        this.lbe()));
  }
  static lbe() {
    if (
      !UiManager_1.UiManager.IsViewOpen("AchievementCompleteTipsView") &&
      UiManager_1.UiManager.IsViewShow("BattleView")
    )
      for (
        var e =
          ModelManager_1.ModelManager.AchievementModel
            .CurrentFinishAchievementArray;
        0 < e.length;

      ) {
        var t = e.shift(),
          t =
            ModelManager_1.ModelManager.AchievementModel.GetAchievementData(t);
        UiManager_1.UiManager.OpenView("AchievementCompleteTipsView", t);
      }
  }
}
(exports.AchievementController = AchievementController),
  ((_a = AchievementController).obe = async () => {
    var e = new Protocol_1.Aki.Protocol.i$n(),
      e = await Net_1.Net.CallAsync(15942, e);
    ModelManager_1.ModelManager.AchievementModel.PhraseBaseData(e);
  }),
  (AchievementController.nbe = (e) => {
    AchievementController.hbe(e.ovs);
  }),
  (AchievementController.rbe = () => {
    _a.lbe();
  }),
  (AchievementController.abe = (t) => {
    var r = t.evs.length;
    for (let e = 0; e < r; e++) AchievementController.hbe(t.evs[e]);
  }),
  (AchievementController.sbe = (e) => {
    ModelManager_1.ModelManager.AchievementModel.OnAchievementGroupProgressNotify(
      e,
    );
  });
//# sourceMappingURL=AchievementController.js.map
