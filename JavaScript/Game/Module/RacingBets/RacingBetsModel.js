"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsModel = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  CreatureController_1 = require("../../World/Controller/CreatureController"),
  UiSceneDangoActorManager_1 = require("../UiComponent/UiSceneDangoActorManager"),
  DangoDungeonCommandFactory_1 = require("./Command/DangoDungeonCommandFactory"),
  DangoDungeonCommandQueue_1 = require("./Command/DangoDungeonCommandQueue"),
  RacingBetsDungeonDangoInfo_1 = require("./Data/RacingBetsDungeonDangoInfo"),
  RacingBetsDefine_1 = require("./RacingBetsDefine");
class RacingBetsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.yvc = void 0),
      (this.ue1 = void 0),
      (this.UseGmState = !1),
      (this.SBc = new Map()),
      (this.MBc = []),
      (this.fBc = new DangoDungeonCommandQueue_1.DangoDungeonCommandQueue()),
      (this.z2c = void 0),
      (this.DungeonMatchId = 0),
      (this.IsReplayDungeon = !1),
      (this.OnDangoDungeonEnd = (e) => {
        UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(
          !0,
        ),
          this.qm1(),
          UiManager_1.UiManager.CloseView("RacingBetsGamePlayView", () => {
            this.U_1();
          });
      }),
      (this.n8c = []),
      (this.SE1 = void 0),
      (this.pu1 = void 0),
      (this.nT1 = !1);
  }
  OnClear() {
    return this.Su1(), !0;
  }
  OnPlayerInfoUpdate(e) {
    this.yvc
      ? this.yvc.RefreshPlayerData(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          58,
          "OnPlayerInfoUpdate SeasonData is not undefined",
        );
  }
  OnRacingBetsTaskNotify(e) {
    this.yvc && this.yvc.RefreshRewardData(e.CJ_);
  }
  OnRacingBetsMatchResultNotify(e) {
    var t;
    this.yvc &&
      (this.ue1 = e) &&
      ((t = e.mJ_), (t = this.yvc.GetLegMatchData(t))) &&
      t.RefreshLegMatchResultNotify(e);
  }
  OnRacingBetsOddsUpdate(e) {
    var t;
    this.yvc && (t = this.yvc.GetLegMatchData(e.mJ_)) && t.RefreshDangoOdds(e);
  }
  RefreshLegMatchResult(e) {
    var t;
    this.yvc &&
      (t = this.yvc.GetLegMatchData(e.mJ_)) &&
      (t.RefreshLegMatchResult(e),
      0 < e.GM1 && t.ParentGroupMatchData.RefreshGroupMatchResult(e),
      this.CheckMatchRedDot());
  }
  GetRacingBetsSeasonData() {
    return this.yvc;
  }
  SetRacingBetsSeasonData(e) {
    void 0 !== this.yvc
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          58,
          "SetRacingBetsSeasonData SeasonData is not undefined",
        )
      : (this.yvc = e);
  }
  GetRacingBetsLegMatchData(e) {
    if (this.yvc) return this.yvc.GetLegMatchData(e);
  }
  GetLegMatchResultData() {
    return this.ue1;
  }
  SetLegMatchResultData(e) {
    this.ue1 = e;
  }
  GetRacingBetsGroupMatchData(e) {
    if (this.yvc) return this.yvc.GetGroupMatchData(e);
  }
  GetRacingBetsGearList() {
    if (this.yvc)
      return ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBettingGearList(
        this.yvc.Id,
      );
  }
  GetRacingBetsBulletScreen(e) {
    if (!this.yvc) return [];
    var t = [];
    for (const a of ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsBulletScreenList(
      this.yvc.Id,
    ))
      a.Type !== e ||
        (0 !== a.DangoId && !this.GetDungeonDangoInfo(a.DangoId)) ||
        t.push(a);
    return t;
  }
  IsFinalLegMatch(e) {
    return !!this.yvc && this.yvc.IsFinalLegMatch(e);
  }
  RacingBetsMatchStart(t, a) {
    (this.DungeonMatchId = t),
      (this.IsReplayDungeon = a.Cf1),
      this.EBc(a.zz_),
      this.Gm1(t),
      this.fBc.Init(),
      this.fBc.BindCommandQueueEndCallBack(this.OnDangoDungeonEnd),
      this.IBc(this.MBc),
      this.TBc();
    for (let e = 0; e < a.BJ_.length; e++) {
      var n = a.BJ_[e];
      this.RacingBetsMatchRoundRefresh(t, n, e === a.BJ_.length - 1);
    }
    this.fBc.Execute();
  }
  EBc(e) {
    (this.MBc = []), this.SBc.clear();
    for (const a of e) {
      var t = new RacingBetsDungeonDangoInfo_1.RacingBetsDungeonDangoInfo(a);
      this.SBc.set(t.DangoId, t), this.MBc.push(t);
    }
    this.MBc.sort((e, t) =>
      e.CurPoint !== t.CurPoint ? t.CurPoint - e.CurPoint : t.High - e.High,
    );
    for (let e = 0; e < this.MBc.length; e++) this.MBc[e].Rank = e + 1;
  }
  RacingBetsMatchRoundRefresh(e, t, a) {
    var n;
    this.RacingBetsMatchRoundActionRefresh(t),
      t.bUc
        ? (this.RefreshLegMatchResult(t.j7n),
          (n = this.yvc.GetLegMatchData(e)),
          this.qg1(n))
        : a && this.B_1(this.yvc.Id, e, t.AJ_ + 1);
  }
  RacingBetsMatchPreview(e, t) {
    (this.DungeonMatchId = e),
      this.EBc(t.zz_),
      this.Gm1(e),
      this.fBc.Init(),
      this.IBc(this.MBc),
      this.k_1(),
      this.fBc.Execute();
  }
  RacingBetsMatchRoundActionRefresh(t) {
    for (const a of t.fs1) {
      let e = void 0;
      switch (a.n3s) {
        case Protocol_1.Aki.Protocol.gs1.Proto_MatchStart:
          e = this.bBc();
          break;
        case Protocol_1.Aki.Protocol.gs1.us1:
          e = this.Js1();
          break;
        case Protocol_1.Aki.Protocol.gs1.DangoRoundStart:
          e = this.Zs1(a.ds1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.gs1.Proto_MatchRoundDice:
          e = this.wBc(t.AJ_, a._s1._s1);
          break;
        case Protocol_1.Aki.Protocol.gs1.Proto_DangoMove:
          e = this.ABc(a.TJ_);
          break;
        case Protocol_1.Aki.Protocol.gs1.Proto_DangoSkill:
          e = this.PBc(a.LJ_);
          break;
        case Protocol_1.Aki.Protocol.gs1.Proto_DangoChangeHigh:
          e = this.xBc(a.wJ_);
          break;
        case Protocol_1.Aki.Protocol.gs1.ms1:
          e = this.lo1(a.ms1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.gs1.MC1:
          e = this.XC1(a.MC1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.gs1.Kp1:
          e = this.Tv1(a.Kp1.Kz_);
      }
      (e.ActionIndex = a.mTs), e.PushBulletScreenTimes(a.bFc);
    }
  }
  RefreshBetsDangoRankInfo(t) {
    let a = !1;
    for (let e = 0; e < t.length; e++) {
      var n = t[e],
        n = this.SBc.get(n);
      n &&
        (n.Rank !== e + 1 && (a = !0), (n.LastRank = n.Rank), (n.Rank = e + 1));
    }
    return a && this.MBc.sort((e, t) => e.Rank - t.Rank), a;
  }
  IBc(e) {
    var t =
        ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetMapPointList(
          this.yvc.Id,
        ),
      e =
        DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsInitDungeonCommand(
          e,
          t,
        );
    return this.fBc.AddCommand(e), e;
  }
  TBc() {
    var e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsGameplayView();
    return this.fBc.AddCommand(e), e;
  }
  k_1() {
    var e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsGamePlayPreviewView();
    return this.fBc.AddCommand(e), e;
  }
  bBc() {
    var e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDungeonBeginCommand();
    return this.fBc.AddCommand(e), e;
  }
  Js1() {
    var e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsRoundStartCommand();
    return this.fBc.AddCommand(e), e;
  }
  Zs1(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoRoundStartCommand(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  wBc(e, t) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDiceCommand(
        e,
        t,
      );
    return this.fBc.AddCommand(e), e;
  }
  PBc(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsSkillCommand(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  ABc(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoMoveCommand(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  xBc(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoChangeHighCommand(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  lo1(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsChangeDangoCameraBlendCommand(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  B_1(e, t, a) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsNextRoundRequestCommand(
        e,
        t,
        a,
      );
    return this.fBc.AddCommand(e), e;
  }
  qg1(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsDungeonResultView(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  XC1(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoDestinationCommand(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  Tv1(e) {
    e =
      DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoRankChangeCommand(
        e,
      );
    return this.fBc.AddCommand(e), e;
  }
  CloseDangoGamePlayPreviewView() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsGamePlayPreviewView", !0),
      UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(
        !0,
      ),
      this.qm1(),
      UiManager_1.UiManager.CloseView("RacingBetsGamePlayPreviewView", () => {
        this.U_1(),
          UiLayer_1.UiLayer.SetShowMaskLayer(
            "RacingBetsGamePlayPreviewView",
            !1,
          );
      });
  }
  U_1() {
    ModelManager_1.ModelManager.ChessModel.ClearAll();
    for (const t of this.MBc) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.EntityId);
      e &&
        CreatureController_1.CreatureController.SetEntityEnable(
          e.Entity,
          !1,
          "RacingBetsModel inactive dango",
        );
    }
  }
  RacingBetsAbortDungeon() {
    this.fBc?.Abort();
  }
  Gm1(e) {
    e = this.yvc.GetLegMatchData(e);
    3 === e.GroupMatchType
      ? AudioSystem_1.AudioSystem.SetState(
          RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP,
          "race_finals",
        )
      : 1 === e.Type
        ? AudioSystem_1.AudioSystem.SetState(
            RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP,
            "race_groupstage",
          )
        : AudioSystem_1.AudioSystem.SetState(
            RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP,
            "race_matchpoint",
          );
  }
  qm1() {
    4 === this.yvc.GetCurLegMatchData().GetLegMatchState()
      ? AudioSystem_1.AudioSystem.SetState(
          RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP,
          "race_finals",
        )
      : AudioSystem_1.AudioSystem.SetState(
          RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP,
          "none",
        );
  }
  GetDungeonDangoList() {
    return this.MBc;
  }
  GetDungeonDangoInfo(e) {
    return this.SBc.get(e);
  }
  GetDungeonDangoEntityId(e) {
    var t = this.SBc.get(e);
    return t
      ? t.EntityId
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RacingBets", 58, "团子副本无团子数据", [
            "dangoId",
            e,
          ]),
        0);
  }
  IsDungeonBettingDango(e) {
    var t = this.GetRacingBetsLegMatchData(this.DungeonMatchId);
    return !!t && t.BetDangoId === e;
  }
  GetCommandActionIndex() {
    return this.fBc.CurCommandActionIndex;
  }
  async LoadDiceMaterialParameterCollection() {
    if (!this.z2c) {
      const t = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(
        RacingBetsDefine_1.MPC_DICE_DATE_PATH,
        UE.MaterialParameterCollection,
        (e) => {
          (this.z2c = e), t.SetResult(void 0);
        },
        102,
      ),
        await t.Promise;
    }
    return this.z2c;
  }
  CheckInRacingBetsDungeon() {
    return (
      31 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        )?.InstSubType &&
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
    );
  }
  GetIsFromActivityOpenDungeon() {
    var e = this.nT1;
    return (this.nT1 = !1), e;
  }
  SetIsFromActivityOpenDungeon() {
    this.nT1 = !0;
  }
  GetRankData() {
    return this.n8c;
  }
  GetSelfRank() {
    return this.SE1;
  }
  RacingBetsRankRefresh(e) {
    this.n8c = [];
    var t = e.H6n,
      a =
        ((this.SE1 = { RankStatus: t, RankNum: 0 }),
        t === Protocol_1.Aki.Protocol.P6c.Proto_Top50 &&
          (this.SE1.RankNum = e.b6c),
        ModelManager_1.ModelManager.PlayerInfoModel?.GetId());
    for (const o of e.jRs) {
      var n = {
        PlayerId: o.W5n,
        PlayerHeadPhoto: o.lJ_,
        RankNum: o.cJ_,
        Name: o.H8n,
        HitNum: o.aJ_,
        CashNum: o._J_,
      };
      t === Protocol_1.Aki.Protocol.P6c.cJ_ &&
        n.PlayerId === a &&
        (this.SE1.RankNum = n.RankNum),
        this.n8c.push(n);
    }
  }
  GetRacingBetsHistoryData() {
    if (this.yvc) {
      var e = [];
      for (const t of this.yvc.GetReverseLegMatchList())
        0 !== t.BetDangoId && e.push(t);
      return e;
    }
  }
  SetViewRedDotState(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(e);
    t ? (t.HasViewed = !0) : (t = this.CreateDefaultRedDotState()),
      LocalStorage_1.LocalStorage.SetPlayer(e, t);
  }
  CreateDefaultRedDotState() {
    return { HasViewed: !0, LastViewedData: 0 };
  }
  vu1(e) {
    this.pu1 = TimerSystem_1.RealTimeTimerSystem.EmitOnTime(
      () => {
        this.CheckRankRedDot();
      },
      e * TimeUtil_1.TimeUtil.InverseMillisecond + TimerSystem_1.MIN_TIME,
    );
  }
  Su1() {
    this.pu1 &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.pu1), (this.pu1 = void 0));
  }
  CheckRankRedDot() {
    var e, t, a, n, o;
    this.yvc &&
      (this.Su1(),
      (e =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord,
        ) ??
        ModelManager_1.ModelManager.RacingBetsModel.CreateDefaultRedDotState()),
      (t = (a = this.yvc.GetCurLegMatchRankOpenTime())[0]),
      (a = a[1]),
      (n = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      (o = e.HasViewed),
      e.LastViewedData < t
        ? n < t
          ? this.vu1(t - n + 1)
          : ((e.HasViewed = !1),
            (e.LastViewedData = t),
            LocalStorage_1.LocalStorage.SetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey
                .RacingBetsRankViewRecord,
              e,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRacingBetsRedDotUpdate,
            ),
            0 !== a && n < a && this.vu1(a - n + 1))
        : o && 0 !== a && n < a && this.vu1(a - n + 1));
  }
  CheckMatchRedDot() {
    if (this.yvc) {
      var t =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord,
        ) ??
        ModelManager_1.ModelManager.RacingBetsModel.CreateDefaultRedDotState();
      let e = 0;
      var a,
        n = this.yvc.GetCurLegMatchData();
      n && ((a = n.Id), (e = n.IsLegMatchFinished() ? a : Math.max(0, a - 1))),
        (!t.HasViewed || e > t.LastViewedData) &&
          ((t.HasViewed = !1),
          (t.LastViewedData = e),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsMatchViewRecord,
            t,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRacingBetsRedDotUpdate,
          ));
    }
  }
  GetRacingBetsBulletScreenAlpha() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .RacingBetsBulletScreenAlphaRecord,
      ) ?? RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MAX_ALPHA
    );
  }
  SetRacingBetsBulletScreenAlpha(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .RacingBetsBulletScreenAlphaRecord,
      e,
    );
  }
  GetRacingBetsBulletScreenShowType() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .RacingBetsBulletScreenShowTypeRecord,
      ) ?? 2
    );
  }
  SetRacingBetsBulletScreenShowType(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .RacingBetsBulletScreenShowTypeRecord,
      e,
    );
  }
}
exports.RacingBetsModel = RacingBetsModel;
//# sourceMappingURL=RacingBetsModel.js.map
