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
    Net_1.Net.Register(16681, AchievementController.nbe),
      Net_1.Net.Register(23222, AchievementController.sbe),
      Net_1.Net.Register(15112, AchievementController.abe);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16681),
      Net_1.Net.UnRegister(23222),
      Net_1.Net.UnRegister(15112);
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
    (r.s5n = t),
      (r.x6n = e),
      Net_1.Net.Call(20809, r, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            24256,
          );
      });
  }
  static RequestAchievementFinish(e) {
    var t = new Protocol_1.Aki.Protocol.l$n();
    (t.s5n = e),
      Net_1.Net.Call(29877, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            28247,
          );
      });
  }
  static hbe(e) {
    var t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
        e.s5n,
      ).GetFinishState(),
      r =
        (ModelManager_1.ModelManager.AchievementModel.OnAchievementProgressNotify(
          e,
        ),
        ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
          e.s5n,
        ).GetFinishState());
    t !== r &&
      2 !== r &&
      0 !== r &&
      ((t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
        e.s5n,
      )),
      ModelManager_1.ModelManager.AchievementModel?.IsHideAchievementGroup(
        t.GetGroupId(),
      ) ||
        (ModelManager_1.ModelManager.AchievementModel.CurrentFinishAchievementArray.push(
          e.s5n,
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
      e = await Net_1.Net.CallAsync(29079, e);
    ModelManager_1.ModelManager.AchievementModel.PhraseBaseData(e);
  }),
  (AchievementController.nbe = (e) => {
    AchievementController.hbe(e.uvs);
  }),
  (AchievementController.rbe = () => {
    _a.lbe();
  }),
  (AchievementController.abe = (t) => {
    var r = t.avs.length;
    for (let e = 0; e < r; e++) AchievementController.hbe(t.avs[e]);
  }),
  (AchievementController.sbe = (e) => {
    ModelManager_1.ModelManager.AchievementModel.OnAchievementGroupProgressNotify(
      e,
    );
  });
//# sourceMappingURL=AchievementController.js.map
