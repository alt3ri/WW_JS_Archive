"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController"),
  RoleController_1 = require("../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  DreamLinkData_1 = require("./DreamLinkData"),
  DreamLinkDefine_1 = require("./DreamLinkDefine"),
  DreamLinkActivitySubView_1 = require("./View/DreamLinkActivitySubView");
class DreamLinkController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this._Ol = (e) =>
        !ModelManager_1.ModelManager.GameModeModel?.IsMulti ||
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "DreamLink_MultiModeNotSupport",
        ),
        !1)),
      (this.DSe = (e, r) => {
        var t = DreamLinkController.GetCurrentActivityData();
        t &&
          t.LocalConfig.PreShowGuideQuest.includes(e) &&
          t.RefreshActivityRedDotState();
      }),
      (this.OEl = (e) => {
        UiManager_1.UiManager.OpenView("DreamLinkWhiteCatSettleView", e);
      }),
      (this.ZZa = (e) => {
        var r = DreamLinkController.GetCurrentActivityData();
        r &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Activity", 37, "[DreamLink] Update"),
          r.UpdateData(e));
      }),
      (this.ecl = (e) => {
        var r = DreamLinkController.GetCurrentActivityData();
        r &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Activity", 37, "[DreamLink] LimitTimeUpdate"),
          r.RefreshAllLimitTimeReward(e.hM_),
          r.RefreshLimitRewardPerformance());
      }),
      (this.V0l = (e) => {
        var r, t;
        DreamLinkController.GetCurrentActivityData() &&
          ((r = {
            ButtonTextId: "ConfirmBox_45_ButtonText_1",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
          }),
          (t = {
            TitleTextId: "WorldRun_Settlement",
            Record: TimeUtil_1.TimeUtil.GetTimeString(Math.max(e.Y2s, 0)),
            IsNewRecord: e.Yxs,
          }),
          ControllerHolder_1.ControllerHolder.ItemRewardController.OpenExploreRewardView(
            DreamLinkDefine_1.WORLD_RUN_ENDING_ID,
            e.Mws,
            void 0,
            t,
            void 0,
            [r],
          ));
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiView_DreamLandActivity";
  }
  OnCreateSubPageComponent(e) {
    return new DreamLinkActivitySubView_1.DreamLinkActivitySubView();
  }
  OnCreateActivityData(e) {
    return new DreamLinkData_1.DreamLinkData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static GetCurrentActivityData() {
    var e =
      ModelManager_1.ModelManager.ActivityModel?.GetCurrentActivitiesByType(
        Protocol_1.Aki.Protocol.uks.Proto_RogueWhiteCat,
      );
    let r = void 0;
    return (
      e?.forEach((e) => {
        r = e;
      }),
      r
    );
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "DreamLinkDungeonView",
        this._Ol,
        "DreamLinkDungeonView.Check",
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "DreamLinkWhiteCatView",
        this._Ol,
        "DreamLinkWhiteCatView.Check",
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "DreamLinkDungeonView",
        this._Ol,
      ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "DreamLinkWhiteCatView",
        this._Ol,
      );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21667, this.ZZa),
      Net_1.Net.Register(28419, this.ecl),
      Net_1.Net.Register(26374, this.V0l),
      Net_1.Net.Register(16558, this.OEl);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21667),
      Net_1.Net.UnRegister(28419),
      Net_1.Net.UnRegister(26374),
      Net_1.Net.UnRegister(16558);
  }
  GetActivityMapMarkState(e) {
    var r = DreamLinkController.GetCurrentActivityData();
    return !!r && r.IsDreamLinkRunMarkShow(e);
  }
  static RoguelikeSetDungeonProgressRequest(r) {
    var e = new Protocol_1.Aki.Protocol.yg_();
    (e.e5n = r),
      (e.w6n = DreamLinkController.GetCurrentActivityData().Id),
      Net_1.Net.Call(25840, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              25840,
            )
          : (DreamLinkController.GetCurrentActivityData().DungeonProgressRecord =
              r);
      });
  }
  static RoguelikeRoleInstStartRequest(e) {
    var r, t;
    RoleController_1.RoleController.IsInRoleTrial()
      ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleDungeonsLimit",
        )
      : ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
        ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "PhantomFormationEnterInstanceTip",
          )
        : (r = DreamLinkController.GetCurrentActivityData()) &&
          (((t = new Protocol_1.Aki.Protocol.xf_()).c5n = e),
          (t.w6n = r.Id),
          Net_1.Net.Call(24696, t, (e) => {
            e
              ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
                ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  24696,
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "DreamLink",
                  34,
                  "RoleInstStartRequest response is undefined",
                );
          }));
  }
  static RunTaskRewardRequest(r) {
    const t = DreamLinkController.GetCurrentActivityData();
    var e;
    t &&
      (((e = new Protocol_1.Aki.Protocol.uC_()).c5n = r),
      (e.w6n = t.Id),
      Net_1.Net.Call(29540, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                29540,
              )
            : (t.SetRunTaskDone(r), t.RefreshRewardPerformance()));
      }));
  }
  static EnergyRewardRequest(r) {
    const t = DreamLinkController.GetCurrentActivityData();
    var e;
    t &&
      (((e = new Protocol_1.Aki.Protocol.Xf_()).c5n = r),
      (e.w6n = t.Id),
      Net_1.Net.Call(21879, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                21879,
              )
            : (t.RefreshEnergyRewardData(r, 2), t.RefreshRewardPerformance()));
      }));
  }
  static LimitTimeRewardRequest(r) {
    const t = DreamLinkController.GetCurrentActivityData();
    var e;
    t &&
      (((e = new Protocol_1.Aki.Protocol.cg_()).c5n = r),
      Net_1.Net.Call(22996, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                22996,
              )
            : (t.RefreshLimitTimeRewardData(r, 2),
              t.RefreshLimitRewardPerformance()));
      }));
  }
  static BossRewardRequest(r) {
    const t = DreamLinkController.GetCurrentActivityData();
    var e;
    t &&
      (((e = new Protocol_1.Aki.Protocol._C_()).c5n = r),
      (e.w6n = t.Id),
      Net_1.Net.Call(25528, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                25528,
              )
            : (t.RefreshBossRewardData(r, 2), t.RefreshRewardPerformance()));
      }));
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipDreamLinkView");
  }
}
exports.DreamLinkController = DreamLinkController;
//# sourceMappingURL=DreamLinkController.js.map
