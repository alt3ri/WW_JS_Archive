"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsController = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  RacingBetsSeasonData_1 = require("./Data/RacingBetsSeasonData"),
  RacingBetsActivityView_1 = require("./View/RacingBetsActivityView");
class RacingBetsController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_RaceHorseGuide";
  }
  OnCreateSubPageComponent(e) {
    return new RacingBetsActivityView_1.RacingBetsActivityView();
  }
  OnCreateActivityData(e) {
    var t = new RacingBetsSeasonData_1.RacingBetsSeasonData();
    return (
      ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsSeasonData(t), t
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnInit() {
    return !(RacingBetsController.ae1 = !1);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsDataRefresh,
      RacingBetsController.he1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityOpen,
        RacingBetsController.K01,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        RacingBetsController.p5a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        RacingBetsController.le1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        RacingBetsController.zs1,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsDataRefresh,
      RacingBetsController.he1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityOpen,
        RacingBetsController.K01,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        RacingBetsController.p5a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        RacingBetsController.le1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        RacingBetsController.zs1,
      );
  }
  OnClear() {
    return (
      (RacingBetsController.ae1 = !1),
      RacingBetsController.X01 &&
        (TimerSystem_1.RealTimeTimerSystem.Remove(RacingBetsController.X01),
        (RacingBetsController.X01 = void 0)),
      !0
    );
  }
  static TryRegisterNextDangoOddsUpdateRequest(e) {
    var e = e.GetCurLegMatchData();
    !e ||
      (e =
        e.NextOddsRateRefreshTime - TimeUtil_1.TimeUtil.GetServerTimeStamp()) <
        0 ||
      (this.X01 &&
        (TimerSystem_1.RealTimeTimerSystem.Remove(this.X01),
        (this.X01 = void 0)),
      (this.X01 = TimerSystem_1.RealTimeTimerSystem.Delay(
        this.RacingBetsUpdateOddsRequest,
        e,
        void 0,
        void 0,
        !1,
      )));
  }
  static TryOpenRacingBetsLegMatchResultView() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetLegMatchResultData();
    return (
      !!e &&
      (1 === e.A6c
        ? UiManager_1.UiManager.OpenView("RacingBetsSuccessTip", e)
        : UiManager_1.UiManager.OpenView("RacingBetsFailTip", e),
      ModelManager_1.ModelManager.RacingBetsModel.SetLegMatchResultData(void 0),
      !0)
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(17574, RacingBetsController.pvc),
      Net_1.Net.Register(24296, RacingBetsController.vvc),
      Net_1.Net.Register(24748, RacingBetsController.ce1),
      Net_1.Net.Register(23358, RacingBetsController.tE1);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17574),
      Net_1.Net.UnRegister(24296),
      Net_1.Net.UnRegister(24748),
      Net_1.Net.UnRegister(23358);
  }
  static RacingBetsGearRequest(e, t, r, n, o) {
    var a = Protocol_1.Aki.Protocol.Az_.create();
    (a.w6n = e),
      (a.mJ_ = t.Id),
      (a.Kz_ = r),
      (a.gJ_ = n),
      (a._J_ = o),
      (a.zZ_ = t.OddsVersion),
      Net_1.Net.Call(27105, a, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15102,
              )
            : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Dango_BetPage_BetSuccess",
              ),
              ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(
                e.jRs,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate,
                r,
                !0,
              )));
      });
  }
  static RacingBetsGearRefundRequest(e, t, r) {
    var n = Protocol_1.Aki.Protocol.Vwc.create();
    (n.w6n = e),
      (n.mJ_ = t.Id),
      (n.Kz_ = r),
      Net_1.Net.Call(15141, n, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15102,
              )
            : (ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(
                e.jRs,
              ),
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Dango_BetPage_CancelSuccess",
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate,
                r,
                !1,
              )));
      });
  }
  static RacingBetsRankRequest(e) {
    var t = Protocol_1.Aki.Protocol.wz_.create();
    (t.w6n = e),
      Net_1.Net.Call(16992, t, (e) => {
        e &&
          (e.Q4n ===
          Protocol_1.Aki.Protocol.Q4n
            .Proto_RacingBetsBulletNotFundOpenRankCurTime
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Dango_RankPage_EmptyInfo",
              )
            : e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  24450,
                )
              : (ModelManager_1.ModelManager.RacingBetsModel.RacingBetsRankRefresh(
                  e,
                ),
                UiManager_1.UiManager.OpenView("RacingBetsRankView")));
      });
  }
  static RacingBetsTaskRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.Bz_.create();
    (t.gps = e),
      Net_1.Net.Call(19239, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            23332,
          );
      });
  }
  static RacingBetMatchActionRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.ss1.create();
    (r.w6n = e),
      (r.mJ_ = t),
      Net_1.Net.Call(24578, r, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                20975,
              )
            : ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchStart(
                t,
                e,
              ));
      });
  }
  static async RacingBetsMatchRoundActionRequestAsync(e, t, r) {
    var n = Protocol_1.Aki.Protocol.hs1.create(),
      e =
        ((n.w6n = e),
        (n.mJ_ = t),
        (n.wUc = r),
        await Net_1.Net.CallAsync(26931, n));
    return (
      !!e &&
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            16178,
          ),
          !1)
        : (ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchRoundRefresh(
            t,
            e.BJ_,
            !0,
          ),
          !0))
    );
  }
  static RacingBetsMatchInfoRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.eh1.create();
    (r.w6n = e),
      (r.mJ_ = t),
      Net_1.Net.Call(29667, r, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                23520,
              )
            : ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchPreview(
                t,
                e,
              ));
      });
  }
  static RacingBetsBulletScreenRequest(t) {
    var e = Protocol_1.Aki.Protocol.Vz_.create(),
      r = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    (e.w6n = r.Id),
      (e.mJ_ = ModelManager_1.ModelManager.RacingBetsModel.DungeonMatchId),
      (e.kJ_ = t),
      (e.mTs =
        ModelManager_1.ModelManager.RacingBetsModel.GetCommandActionIndex()),
      Net_1.Net.Call(24487, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                16885,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRacingBetsPushBulletScreen,
                [t],
                !0,
              ));
      });
  }
}
(exports.RacingBetsController = RacingBetsController),
  ((_a = RacingBetsController).ae1 = !1),
  (RacingBetsController.X01 = void 0),
  (RacingBetsController.p5a = () => {
    var e;
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) &&
      31 === e.InstSubType &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.NGX.DLSS.Enable 0",
      );
  }),
  (RacingBetsController.le1 = () => {
    var e;
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
    ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
    (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) &&
    31 === e.InstSubType
      ? (UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName("DiceBp"),
          1,
        )?.SetActorHiddenInGame(!0),
        RacingBetsController.ae1 ||
          (UiManager_1.UiManager.OpenView("RacingBetsDangoFrameTipView"),
          (RacingBetsController.ae1 = !0)))
      : RacingBetsController.ae1 &&
        (UiManager_1.UiManager.CloseView("RacingBetsDangoFrameTipView"),
        (RacingBetsController.ae1 = !1));
  }),
  (RacingBetsController.zs1 = () => {
    ModelManager_1.ModelManager.RacingBetsModel.CheckInRacingBetsDungeon() &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.NGX.DLSS.Enable 1",
      );
  }),
  (RacingBetsController.he1 = (e) => {
    _a.TryRegisterNextDangoOddsUpdateRequest(e), _a.K01();
  }),
  (RacingBetsController.K01 = () => {
    var e =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    e &&
      e.GetActivityTipNeedShowState() &&
      (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        29,
      ),
      e.CacheActivityTipShowState());
  }),
  (RacingBetsController.RacingBetsUpdateOddsRequest = () => {
    var e = Protocol_1.Aki.Protocol.KZ_.create();
    const t =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    var r = t.GetCurLegMatchData();
    (e.w6n = t.Id),
      (e.mJ_ = r.Id),
      Net_1.Net.Call(15220, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                16778,
              )
            : (ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsOddsUpdate(
                e,
              ),
              _a.TryRegisterNextDangoOddsUpdateRequest(t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate,
              )));
      });
  }),
  (RacingBetsController.pvc = (e) => {
    ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(e.jRs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate,
      );
  }),
  (RacingBetsController.vvc = (e) => {
    ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsTaskNotify(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRacingBetsRewardRefresh,
      );
  }),
  (RacingBetsController.ce1 = (e) => {
    ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsMatchResultNotify(
      e,
    );
  }),
  (RacingBetsController.tE1 = (e) => {
    ModelManager_1.ModelManager.RacingBetsModel.RefreshLegMatchResult(e.j7n),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRacingBetsLegMatchEnd,
        e.j7n.mJ_,
      );
  });
//# sourceMappingURL=RacingBetsController.js.map
