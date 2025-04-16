"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPermanentRogueController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  ActivityPermanentRogueData_1 = require("./ActivityPermanentRogueData"),
  PermanentRogueSubView_1 = require("./View/PermanentRogueSubView");
class ActivityPermanentRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.CNe = void 0),
      (this.wGi = () => {
        var e;
        ActivityPermanentRogueController.rT1 &&
          ((ActivityPermanentRogueController.rT1 = !1),
          (e =
            RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
              ActivityPermanentRogueController.vrh,
            ))) &&
          ((e = e.SeasonId),
          UiManager_1.UiManager.OpenView("RogueSeasonEntranceView", e));
      }),
      (this.RequestEnterDungeon = (e) => {
        var t = new Protocol_1.Aki.Protocol.Dnc();
        (t.r6n = e),
          Net_1.Net.Call(28710, t, (e) => {
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27349,
              );
          });
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityRogue23Main";
  }
  async OnOpenSubView(e) {
    return await ActivityPermanentRogueController.OpenSeasonMainView();
  }
  OnCreateSubPageComponent(e) {
    return new PermanentRogueSubView_1.ActivitySubViewPermanentRogue();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityPermanentRogueController.ActivityId = e.s5n),
      (this.CNe =
        new ActivityPermanentRogueData_1.ActivityPermanentRogueData()),
      this.CNe
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(20093, ActivityPermanentRogueController.e5c),
      Net_1.Net.Register(23742, ActivityPermanentRogueController.t5c),
      Net_1.Net.Register(16087, ActivityPermanentRogueController.i5c),
      Net_1.Net.Register(20898, ActivityPermanentRogueController.In1),
      Net_1.Net.Register(19381, ActivityPermanentRogueController.r5c),
      Net_1.Net.Register(25897, ActivityPermanentRogueController.Bu1),
      Net_1.Net.Register(18079, ActivityPermanentRogueController.yM1);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20093),
      Net_1.Net.UnRegister(23742),
      Net_1.Net.UnRegister(16087),
      Net_1.Net.UnRegister(20898),
      Net_1.Net.UnRegister(19381),
      Net_1.Net.UnRegister(25897),
      Net_1.Net.UnRegister(18079);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCloseLoadingView,
      this.wGi,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCloseLoadingView,
      this.wGi,
    );
  }
  OnActivityFirstUnlock(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
      31,
    );
  }
  static SetReturnToWorld(e) {
    RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e) &&
      ((ActivityPermanentRogueController.vrh = e),
      (ActivityPermanentRogueController.rT1 = !0));
  }
  static GetCurrentActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityPermanentRogueController.ActivityId,
    );
    if (e) return e;
  }
  RequestIllustrationAward(a) {
    var e = new Protocol_1.Aki.Protocol.Cnc();
    (e.NFc = a),
      Net_1.Net.Call(16975, e, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            15729,
          );
        else {
          this.CNe.SetIllustratedRewardGot(a),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PermanentRogueRewardUpdate,
            );
          var t = new Set();
          let e = [];
          for (const n of a) {
            var o =
              RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
                n,
              );
            for (const r of (e =
              0 === o.Type
                ? this.CNe.GetTokenInSeason(n)
                : 1 === o.Type
                  ? this.CNe.GetEventNormalInSeason(n)
                  : this.CNe.GetEventMapInSeason(n)))
              t.add(r);
          }
          for (const i of e)
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
              i,
            );
        }
      });
  }
  static async RequestRogueResTalentSkillLevel(e) {
    var t = new Protocol_1.Aki.Protocol.nnc(),
      t = ((t.r5n = e), await Net_1.Net.CallAsync(26968, t));
    t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          t.Q4n,
          27494,
        )
      : (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpgradeSkill(
          e,
          t.F6n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RogueResTalentLevelUp,
          e,
        ));
  }
  static async RequestRogueResLastInstInfo() {
    var e = new Protocol_1.Aki.Protocol.Onc(),
      e = await Net_1.Net.CallAsync(20287, e);
    return (
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          20062,
        ),
      e
    );
  }
  static RequestRogueResEndingReward(t, o) {
    var e = new Protocol_1.Aki.Protocol.lnc();
    (e.UHn = t),
      (e.c5n = o),
      Net_1.Net.Call(29158, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              21534,
            )
          : (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetEndingAwardData(
              o,
            ),
            (e =
              ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardViewData(
                t,
              )),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
              e,
            ));
      });
  }
  static async OpenSeasonMainView() {
    var e =
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    return (
      !!UiManager_1.UiManager.IsViewOpen("RogueSeasonEntranceView") ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RogueBattle", 77, "肉鸽赛季界面数据:", [
          "seasonId:",
          e,
        ]),
      void 0 !==
        (await UiManager_1.UiManager.OpenViewAsync(
          "RogueSeasonEntranceView",
          e,
        )))
    );
  }
}
((exports.ActivityPermanentRogueController =
  ActivityPermanentRogueController).ActivityId = 0),
  (ActivityPermanentRogueController.vrh = 0),
  (ActivityPermanentRogueController.rT1 = !1),
  (ActivityPermanentRogueController.e5c = (e) => {
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateIllustrateState(
      e,
    );
  }),
  (ActivityPermanentRogueController.RequestTaskAward = (t) => {
    var e = new Protocol_1.Aki.Protocol.fnc();
    (e.v9n = t),
      Net_1.Net.Call(29766, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16050,
            )
          : (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().SetTaskRewardGot(
              t,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PermanentRogueRewardUpdate,
            ));
      });
  }),
  (ActivityPermanentRogueController.t5c = (e) => {
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateTaskNotify(
      e,
    );
  }),
  (ActivityPermanentRogueController.i5c = (e) => {
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.InitCurrency(e.V2s);
  }),
  (ActivityPermanentRogueController.r5c = (e) => {
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateCurrency(
      e.$2s,
      e.sps,
    );
  }),
  (ActivityPermanentRogueController.Bu1 = (e) => {
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateTotalShopItem(
      e.UHn,
      e.Jc1,
    );
  }),
  (ActivityPermanentRogueController.yM1 = (e) => {
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateSkillTreeUnlockState(
      e.r5n,
    );
  }),
  (ActivityPermanentRogueController.In1 = (e) => {
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateEndingNotify(
      e,
    );
  });
//# sourceMappingURL=ActivityPermanentRogueController.js.map
