"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerModel = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  ActivityShipTowerController_1 = require("../Activity/ActivityContent/ShipTower/ActivityShipTowerController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  EditFormationData_1 = require("../EditFormation/EditFormationData"),
  EditFormationDefine_1 = require("../EditFormation/EditFormationDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ShipTowerBuffData_1 = require("./ShipTowerBuffData"),
  ShipTowerDefine_1 = require("./ShipTowerDefine"),
  ShipTowerStageData_1 = require("./ShipTowerStageData");
class ShipTowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Z7_ = !1),
      (this.Zn_ = []),
      (this.es_ = new Map()),
      (this.DebugParallaxSub = !1),
      (this.ts_ = []),
      (this.is_ = new Map()),
      (this.rs_ = new Map()),
      (this.os_ = []),
      (this.ns_ = new Map()),
      (this.xG_ = new Map()),
      (this.cA_ = 0),
      (this.UG_ = 0),
      (this.DG_ = !1),
      (this.BG_ = !1),
      (this.uA_ = []),
      (this.dA_ = new Set()),
      (this.mA_ = 0),
      (this.RecordList = []),
      (this.rq_ = 0),
      (this.oq_ = 0),
      (this.ChallengeStageData = void 0),
      (this.ChallengeBuffIdList = []),
      (this.ReviewList = []),
      (this.ReviewProgressList = []),
      (this.kG_ = []),
      (this.ShowBuffIdList = []),
      (this.qV_ = void 0),
      (this.QH_ = void 0),
      (this.KH_ = void 0),
      (this.CurSelectBuffData = void 0),
      (this.PlayerGetBuffSet = new Set()),
      (this.IsShowLeftTeamPanel = !1),
      (this.IsOpenedSeasonUpdate = !1),
      (this.AddNormalStackChildView = (e, t) => {
        e && UiModel_1.UiModel.NormalStack.Peek()?.AddChildViewById(t);
      }),
      (this.CheckCanOpen = () => {
        var e, t;
        return ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
          ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "ErrorCode_600064_Text",
            ),
            !1)
          : ((e = this.IsOpen()) ||
              ((t =
                ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(
                  10081,
                )?.OpenConditionId) &&
                (t =
                  ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
                    t,
                  ))?.HintText &&
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                  t.HintText,
                )),
            e);
      }),
      (this.XH_ = () => {
        this.LeaveBattle() || this.CloseMainView();
      }),
      (this.LeaveBattle = () =>
        !!this.CheckInBattleShipTower() &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ),
        (ModelManager_1.ModelManager.TowerModel.CurrentTowerId = -1),
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon(),
        !0));
  }
  get CurSeason() {
    return this.cA_;
  }
  get CurSeasonEndTime() {
    return this.UG_;
  }
  get CurIsHaveRecord() {
    return this.DG_;
  }
  get TowerStageDataList() {
    return this.Zn_;
  }
  get TowerStageDataMap() {
    return this.es_;
  }
  get GetRewardTotalNum() {
    return this.oq_;
  }
  OnInit() {
    return (
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "ShipTowerView",
        this.CheckCanOpen,
        "ShipTowerModel.CheckCanOpen",
      ),
      !0
    );
  }
  OnClear() {
    return (
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "ShipTowerView",
        this.CheckCanOpen,
      ),
      (this.Zn_.length = 0),
      this.es_.clear(),
      (this.ts_.length = 0),
      this.is_.clear(),
      !0
    );
  }
  OnLeaveLevel() {
    return !0;
  }
  InitData() {
    this.Z7_ || ((this.Z7_ = !0), this.l5_(), this.fA_(), this.UW_());
  }
  UW_() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerGetBuffSet,
    );
    e &&
      Array.from(e).forEach((e) => {
        this.PlayerGetBuffSet.add(e);
      });
  }
  AddPlayerGetBuff(e) {
    this.PlayerGetBuffSet.add(e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerGetBuffSet,
        this.PlayerGetBuffSet,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShipTowerBuffNewUpdate,
      );
  }
  l5_() {
    this._5_(ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON);
  }
  _5_(e) {
    ConfigManager_1.ConfigManager.ShipTowerConfig.GetBuffCfgBySeason(
      e,
    )?.forEach((e) => {
      this.c5_(e);
    }),
      this.u5_();
  }
  CheckOldSeasonBuffQualityList() {
    this.ts_.forEach((e) => {
      var t;
      e.BuffList.some((e) => this.d5_(e)) &&
        ((t = e.BuffList.filter((e) => !this.d5_(e))),
        e.BuffList.unshift(...t),
        e.BuffList.splice(t.length),
        0 === e.BuffList.length) &&
        this.is_.delete(e.Quality);
    });
  }
  d5_(e) {
    return this.IsOldSeason(e.Season);
  }
  IsOldSeason(e) {
    return (
      e !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON && e !== this.CurSeason
    );
  }
  c5_(e) {
    var t;
    this.rs_.has(e.Id) ||
      ((t = new ShipTowerBuffData_1.ShipTowerBuffData()).Init(e),
      this.rs_.set(e.Id, t),
      this.is_.has(t.Quality)
        ? this.is_.get(t.Quality).BuffList.push(t)
        : ((e = {
            Quality: t.Quality,
            Title: t.GetQualityTitle(),
            BuffList: [t],
          }),
          this.is_.set(t.Quality, e)));
  }
  u5_() {
    (this.ts_.length = 0),
      this.ts_.push(...Array.from(this.is_.values())),
      this.ts_.sort((e, t) => t.Quality - e.Quality);
  }
  async CheckInitProto() {
    this.qG_() &&
      (await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerInfoRequest());
  }
  qG_() {
    return !(
      !this.IsOpen() ||
      (this.TowerStageDataList[0]?.IsHaveProtoData && !this.TimeIsOver())
    );
  }
  fA_() {
    (this.uA_.length = 0),
      this.uA_.push(
        this.CreateAreaDataById(ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON),
      );
  }
  CreateDefaultStageDataList() {
    this.TowerStageDataList.length ||
      [0, 1].forEach((e) => {
        ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgBySeason(
          e,
        )?.forEach((e) => {
          this.ss_(e);
        });
      });
  }
  as_(e) {
    var t = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e);
    if (t) return this.ss_(t);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("ShipTower", 69, "CreateStageDataById", ["id", e]);
  }
  ss_(e) {
    if (this.es_.has(e.Id)) {
      const t = this.es_.get(e.Id);
      return this.Zn_.includes(t) || this.Zn_.push(t), t;
    }
    const t = new ShipTowerStageData_1.ShipTowerStageData();
    return (
      t.Init(e),
      t.SetOrderIndex(this.Zn_.length + 1),
      this.Zn_.push(t),
      this.es_.set(e.Id, t),
      t
    );
  }
  GetStageDataById(e) {
    return this.es_.get(e);
  }
  GetBuffQualityList(e = !1) {
    return e && this.hs_(), this.ts_;
  }
  hs_() {
    this.ts_.forEach((e) => {
      e.BuffList.sort((e, t) => e.Id - t.Id);
    });
  }
  GetBuffDataByBuffId(e) {
    return this.rs_.get(e);
  }
  SelectDefaultBuff(t) {
    for (const i of this.GetBuffQualityList(!0)) {
      var e = i.BuffList.find((e) => e.IsCanUse(t));
      if (e) return void e.SetSelected(!0);
    }
    this.GetBuffQualityList()[0]?.BuffList[0]?.SetSelected(!0);
  }
  GetRecommendLevelByInstId(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
      e,
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
    );
  }
  GetTeamTabList() {
    return (
      this.os_.length ||
        (this.os_.push({
          TabType: 0,
          Title: ShipTowerDefine_1.shipTowerTextKey.RoleList,
        }),
        this.os_.push({
          TabType: 1,
          Title: ShipTowerDefine_1.shipTowerTextKey.UseTeam,
        })),
      this.os_
    );
  }
  IsOtherTeamRoleData(e) {
    return this.ns_.has(e);
  }
  GetOtherTeamRoleData(e) {
    return this.ns_.get(e);
  }
  AddOtherTeamRoleData(e) {
    this.ns_.set(e.RoleIdEdit, e);
  }
  GetAllTeamRoleData(e) {
    return this.xG_.get(e);
  }
  AddAllTeamRoleData(e) {
    this.xG_.set(e.RoleIdEdit, e);
  }
  ClearAllTeamRoleData() {
    this.xG_.clear();
  }
  ClearOtherTeamRoleData() {
    this.ns_.clear();
  }
  GetNextChallengeStageData(t) {
    return (
      this.Zn_.find((e) => !e.IsPassed() && e.IsUnLocked() && e !== t) ??
      this.Zn_[this.Zn_.length - 1]
    );
  }
  OpenViewMain(e) {
    UiManager_1.UiManager.OpenView("ShipTowerView", e);
  }
  OpenViewDesc(e, i) {
    UiManager_1.UiManager.OpenView("ShipTowerDescView", e, (e, t) => {
      this.AddNormalStackChildView(e, t), i?.(e, t);
    });
  }
  OpenViewBuff(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerBuffView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewCover(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerCoverView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewReset(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerResetView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewReward(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerRewardView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewPassBuffShow(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerPassBuffShowView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewTeamRecommend(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerTeamRecommendView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewMonsterDesc(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerMonsterDescView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewRecord(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerRecordView",
      e,
      this.AddNormalStackChildView,
    );
  }
  OpenViewReview(e) {
    UiManager_1.UiManager.OpenView(
      "ShipTowerReviewView",
      e,
      this.AddNormalStackChildView,
    );
  }
  ls_(e, t, i = !0) {
    return (
      !e ||
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "ShipTower",
            69,
            "CheckErrorCode",
            ["ErrorCode", e.Q4n],
            ["MsgId", t],
          ),
        i &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            t,
          ),
        !0))
    );
  }
  UpdateSeasonNotify(e) {
    this.JH_();
  }
  UpdateResultNotify(e) {
    var t,
      i,
      r,
      s,
      a = this.GetStageDataById(e.ELl);
    a
      ? this.CheckIsNeedShowConfirmSeasonUpdate() ||
        (a.ProtoTeamEditFromResult(e),
        (t = a.NewChallengeScore),
        (i = a.IsNewRecord(t)),
        (s = ShipTowerDefine_1.shipTowerTextKey.MonsterScore),
        (r = ShipTowerDefine_1.shipTowerTextKey.TimeScore),
        (s = [
          {
            TotalTitle: a.TeamDataList[0].AreaName,
            TitleA: s,
            TitleB: r,
            ScoreA: e.GL_,
            ScoreB: e.FL_,
          },
          {
            TotalTitle: a.TeamDataList[1].AreaName,
            TitleA: s,
            TitleB: r,
            ScoreA: e.NL_,
            ScoreB: e.VL_,
          },
        ]),
        UiManager_1.UiManager.OpenView("ShipTowerFightFinishView", {
          TotalScore: t,
          GradeResId: this.GetStageGradeResIdByStageId(a.Id, t),
          IsNewRecord: i,
          ButtonList: this.OV_(a, t),
          AreaList: s,
        }))
      : this.LeaveBattle();
  }
  OV_(e, t) {
    var i,
      r = [
        {
          ButtonTextId: ShipTowerDefine_1.shipTowerTextKey.Leave,
          DescriptionTextId: void 0,
          IsTimeDownCloseView: !0,
          IsClickedCloseView: !0,
          OnClickedCallback: this.OpenViewMain.bind(this, {
            StageId: e.Id,
            IsFromInstanceDungeon: !0,
          }),
        },
        {
          ButtonTextId: ShipTowerDefine_1.shipTowerTextKey.ConfirmResult,
          DescriptionTextId: void 0,
          IsTimeDownCloseView: !0,
          IsClickedCloseView: !0,
          OnClickedCallback: void 0,
        },
      ];
    return (
      e.IsNeedSureScore
        ? ((r[0] = void 0),
          (r[1].OnClickedCallback = e.SureResultFromInstance.bind(e)))
        : (e.IsEndLess
            ? ((r[1].ButtonTextId = ShipTowerDefine_1.shipTowerTextKey.Retry),
              (r[1].OnClickedCallback = e.GotoDescFromInstance.bind(e)))
            : e.CheckPass(t)
              ? ((t = this.GetNextChallengeStageData(e)),
                (i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
                  t.TitleKey,
                )),
                (r[1].ButtonTextId =
                  ShipTowerDefine_1.shipTowerTextKey.Continue),
                (r[1].DescriptionTextId =
                  ShipTowerDefine_1.shipTowerTextKey.GoOnTower),
                (r[1].DescriptionArgs = [i, t.OrderIndex]),
                (r[1].OnClickedCallback = e.GotoNextDescFromInstance.bind(
                  e,
                  t,
                )))
              : ((r[1].ButtonTextId = ShipTowerDefine_1.shipTowerTextKey.Retry),
                (r[1].DescriptionTextId =
                  ShipTowerDefine_1.shipTowerTextKey.NotFinished),
                (r[1].OnClickedCallback = e.GotoDescFromInstance.bind(e))),
          e.SaveLastData()),
      r
    );
  }
  UpdateLevelPlayNotify(e) {
    e.BL_.forEach((e) => {
      var t = this.GetStageDataById(e.s5n);
      t?.ProtoNotifyUpdateData(e),
        t?.IsEndLess &&
          !this.IsOldSeason(t.BelongToSeason) &&
          t.IsTeamSetRoleFinish() &&
          ((this.DG_ = !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ShipTowerEndlessRecordUpdate,
          ));
    }),
      this.CA_();
  }
  SlashAndTowerInfoResponse(e) {
    this.ls_(e, 15105, !1) ||
      ((this.Zn_.length = 0),
      e?.BL_.forEach((e) => {
        this.as_(e.s5n);
      }),
      (this.cA_ = this.Zn_[this.Zn_.length - 1]?.BelongToSeason ?? 1),
      (this.UG_ = MathUtils_1.MathUtils.LongToNumber(e.dG_)),
      (this.DG_ = !!e.fG_),
      (this.BG_ = !!e.mG_),
      this.CheckOldSeasonBuffQualityList(),
      this._5_(this.CurSeason),
      e?.BL_.forEach((e) => {
        this.GetStageDataById(e.s5n)?.ProtoUpdateData(e);
      }),
      this.dA_.clear(),
      e?.kL_.forEach((e) => {
        this.dA_.add(e);
      }),
      this.iyc(e?.qac ?? []),
      this.ClearAreaList(),
      this.GetAreaList());
  }
  SlashAndTowerScoreRewardResponse(e) {
    this.ls_(e, 29266) ||
      (e.cOl.forEach((e) => {
        this.dA_.add(e);
      }),
      this.CA_(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShipTowerRewardReceive,
        this.mA_,
      ));
  }
  EndLessHistoryResponse(e) {
    this.ls_(e, 27153) ||
      ((this.RecordList.length = 0),
      this.nq_(ShipTowerDefine_1.shipTowerTextKey.CurrentRecord, e.qL_),
      this.nq_(ShipTowerDefine_1.shipTowerTextKey.HistoryRecord, e.OL_));
  }
  nq_(e, t) {
    if (t && 0 !== t?.s5n) {
      var i = ShipTowerDefine_1.shipTowerTextKey.ReachDate,
        r = MathUtils_1.MathUtils.LongToNumber(t.uG_);
      const s = {
        Id: 0,
        Name: e,
        Desc: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i),
        TimeContent: TimeUtil_1.TimeUtil.DateFormat4String(r),
        RecordList: [],
      };
      e = (e, t) => {
        if (t) {
          var i = t.TL_?.RL_ ?? [];
          const r = t.cG_ ?? [];
          e = {
            Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
              e,
              e,
            ),
            Score: t.tBs,
            Wave: t.bL_,
            TeamList: i.map((e, t) => ({ Id: e, Count: r[t] ?? 0 })),
            BuffId: t.TL_?.AL_ ?? 0,
          };
          s.RecordList.push(e);
        }
      };
      e(ShipTowerDefine_1.shipTowerTextKey.TeamName1, t.LL_),
        e(ShipTowerDefine_1.shipTowerTextKey.TeamName2, t.wL_),
        this.RecordList.push(s);
    }
  }
  SlashAndTowerSaveRecordResponse(e, t) {
    this.ls_(t, 21330) ||
      (this.GetStageDataById(e)?.CoverChallenge(),
      this.CA_(),
      this.SetChallengeStageDataNull(),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
        ShipTowerDefine_1.shipTowerTextKey.CoverChallenge,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShipTowerSureCoverChallenge,
        e,
      ));
  }
  SlashAndTowerResetResponse(e, t) {
    this.ls_(t, 18922) ||
      (this.GetStageDataById(e)?.ResetStage(),
      this.CA_(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShipTowerSureResetStage,
        e,
      ),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
        ShipTowerDefine_1.shipTowerTextKey.ResetStage,
      ));
  }
  SlashAndTowerRecommendResponse(e, t) {
    this.ls_(t, 19612) ||
      this.GetStageDataById(e)?.ProtoUpdateTeamRecommendList(t);
  }
  SlashAndTowerReviewResponse(e) {
    this.ls_(e, 29228) ||
      ((this.ReviewList.length = 0),
      e?.CG_.forEach((e) => {
        var t = e.gG_,
          e = e.SMs;
        this.ReviewList.push({
          Title: this.GetStageNameById(t),
          Score: e,
          Grade: this.GetStageGradeResIdByStageId(t, e),
          StageId: t,
        });
      }),
      (this.ReviewProgressList.length = 0),
      this.ReviewProgressList.push(e.jac),
      this.ReviewProgressList.push(e.Vac));
  }
  GetPlayerTeamList() {
    var t = [];
    for (let e = 1; e < EditFormationDefine_1.MAX_FORMATION_ID; e++) {
      var i =
        ModelManager_1.ModelManager.EditFormationModel.GetFormationData(e);
      t.push(i || new EditFormationData_1.EditFormationData(e));
    }
    return t;
  }
  UpdateToEdit() {
    this.Zn_.forEach((e) => {
      e.UpdateToEdit();
    });
  }
  GetAreaList() {
    var e;
    return (
      2 <= this.uA_.length ||
        ((e = Math.max(this.CurSeason, 1)),
        this.uA_.push(this.CreateAreaDataById(e)),
        this.uA_.push(this.CreateAreaDataById(e, !0)),
        this.CA_()),
      this.uA_
    );
  }
  CreateAreaDataById(e, t = !1) {
    var i = this.GetRewardListByAreaId(e, t);
    let r = ShipTowerDefine_1.shipTowerTextKey.AreaNameShallow;
    return (
      e !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON &&
        (r = t
          ? ShipTowerDefine_1.shipTowerTextKey.AreaNameDead
          : ShipTowerDefine_1.shipTowerTextKey.AreaNameDeep),
      {
        Id: e,
        Index: this.uA_.length,
        Name: r,
        Desc: "",
        RewardList: i,
        IsEndless: t,
        MaxScore: i[i.length - 1]?.TotalScore ?? 0,
      }
    );
  }
  GetRewardListByAreaId(e, t = !1) {
    const r = [];
    return (
      ConfigManager_1.ConfigManager.ShipTowerConfig.GetChallengeRewardCfgBySeason(
        e,
      )?.forEach((e) => {
        if (t === e.EndLessReward) {
          const i = [];
          ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
            e.RewardId,
          )?.DropPreview.forEach((e, t) => {
            i.push([{ ItemId: t, IncId: 0 }, e]);
          }),
            r.push({
              Id: e.Id,
              TitleKey: e.Desc,
              TotalScore: e.SumScore,
              RewardList: i,
              IsReceive: !1,
              IsProgress: !1,
              IsCompleted: !1,
            });
        }
      }),
      r
    );
  }
  ClearAreaList() {
    for (let e = this.uA_.length - 1; 0 <= e; e--)
      this.uA_[e].Id !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON &&
        this.uA_.splice(e, 1);
  }
  CA_() {
    (this.rq_ = 0),
      (this.oq_ = 0),
      this.uA_.forEach((e) => {
        const s = e.Id,
          a = e.IsEndless,
          i = this.TowerStageDataList.reduce((e, t) => {
            var i = t.BelongToSeason === s,
              r = t.IsEndLess === a;
            return e + (i && r ? t.CurrentScore : 0);
          }, 0);
        e.Desc = `<color=#fee488ff>${i}</color>/` + e.MaxScore;
        let r = !0,
          o = !1;
        e.RewardList.forEach((e) => {
          var t = this.dA_.has(e.Id);
          (e.IsReceive = !t && i >= e.TotalScore),
            (e.IsProgress = !t && i < e.TotalScore),
            (e.IsCompleted = t),
            e.IsCompleted || (r = !1),
            e.IsReceive && ((o = !0), this.rq_++),
            this.oq_++;
        }),
          (e.IsFinish = r),
          (e.IsRedPoint = o),
          e.RewardList?.sort((e, t) =>
            e.IsReceive !== t.IsReceive
              ? e.IsReceive
                ? -1
                : 1
              : e.IsProgress !== t.IsProgress
                ? e.IsProgress
                  ? -1
                  : 1
                : e.Id - t.Id,
          );
      }),
      this.uA_.sort((e, t) =>
        e.IsFinish !== t.IsFinish ? (e.IsFinish ? 1 : -1) : e.Index - t.Index,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateShipTowerReward,
      ),
      ActivityShipTowerController_1.ActivityShipTowerController.RefreshActivityRedDot();
  }
  async ReceiveAward(e, t) {
    (this.mA_ = e),
      await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerScoreRewardRequest(
        e,
        t,
      );
  }
  GetRewardProgressText(e = !0) {
    let t = 0,
      i = 0;
    const r = this.IsPassZeroSeason();
    return (
      this.uA_
        .filter((e) => {
          e = e.Id === ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON;
          return r ? !e : e;
        })
        .forEach((e) => {
          (t += e.RewardList.filter((e) => e.IsCompleted).length),
            (i += e.RewardList.length);
        }),
      e ? `<color=#fadf85>${t}</color>/` + i : t + "/" + i
    );
  }
  GetRemainTime() {
    return this.CurSeasonEndTime <= 0
      ? 0
      : this.CurSeasonEndTime - TimeUtil_1.TimeUtil.GetServerTime();
  }
  TimeIsOver() {
    return this.GetRemainTime() <= 0;
  }
  GetRewardCountDownDesc() {
    var e = ShipTowerDefine_1.shipTowerTextKey.RewardCountDownDesc,
      t = this.GetRemainTime(),
      t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t);
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
      e,
      t.CountDownText,
    );
  }
  IsCanReceiveAward() {
    return 0 < this.rq_;
  }
  IsEndlessRecordOpen() {
    return this.CurIsHaveRecord;
  }
  IsCanUseRole(e) {
    return !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
  }
  async RequestRecord() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.EndLessHistoryRequest();
  }
  IsOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10081);
  }
  CheckInBattleShipTower() {
    var e;
    return !(
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      !(e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) ||
      27 !== e.InstSubType
    );
  }
  StartChallenge(e) {
    var t = (this.ChallengeStageData = e).TeamDataList.map(
      (e) => e.BuffDataEdit?.Id ?? 0,
    );
    this.iyc(t),
      ControllerHolder_1.ControllerHolder.ShipTowerController.RequestChallenge(
        e,
      );
  }
  iyc(e) {
    (this.ChallengeBuffIdList.length = 0), this.ChallengeBuffIdList.push(...e);
  }
  AgainChallenge() {
    var e;
    this.CheckIsNeedShowConfirmSeasonUpdate() ||
      (this.sq_() &&
        !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() &&
        ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
        (e = this.ChallengeStageData?.TeamDataList[1].InstId === e),
        ControllerHolder_1.ControllerHolder.ShipTowerController.RequestChallenge(
          this.ChallengeStageData,
          e,
          !0,
        )));
  }
  OpenViewMainFromFight() {
    var e;
    this.sq_() &&
      ((e = this.ChallengeStageData.Id),
      this.OpenViewMain({ StageId: e, IsFromInstanceDungeon: !0 }));
  }
  sq_() {
    if (!this.ChallengeStageData) {
      const t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var e = this.Zn_.find((e) => e.InstIds.includes(t));
      if (!e) return !1;
      this.ChallengeStageData = e;
    }
    return !0;
  }
  ClearChallengeStageData() {
    this.ChallengeStageData &&
      (this.ChallengeStageData.UpdateToEdit(),
      this.SetChallengeStageDataNull());
  }
  SetChallengeStageDataNull() {
    this.ChallengeStageData = void 0;
  }
  async CheckIsNeedShowSeasonReview() {
    if (!this.QH_ || this.QH_.IsFulfilled()) {
      if ((this.TimeIsOver() && (await this.CheckInitProto()), !this.BG_))
        return !1;
      await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerReviewRequest(),
        (this.QH_ = new CustomPromise_1.CustomPromise()),
        this.OpenViewReview({ SeasonId: this.CurSeason, Promise: this.QH_ }),
        (this.BG_ = !1),
        this.btc();
    }
    return await this.QH_.Promise, !0;
  }
  btc() {
    var e = this.Zn_.filter((e) => e.IsOldSeasonData());
    e.length &&
      (e.forEach((e) => {
        e.ResetStage(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ShipTowerStageUpdate,
            e.Id,
          );
      }),
      this.CA_());
  }
  GetStageGradeResId(e) {
    e = ShipTowerDefine_1.shipTowerScoreGradeMap[e];
    return (e || ShipTowerDefine_1.shipTowerScoreGradeMap.D).ResId;
  }
  GetStageGradeResIdByStageId(e, t) {
    var i = this.GetStageDataById(e);
    return i
      ? i.GetStageGradeResIdByScore(t)
      : (i = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e))
        ? this.GetStageGradeResIdByScore(t, i.TargetScore, i.ScoreStage)
        : void 0;
  }
  GetStageGradeResIdByScore(t, i, r) {
    for (let e = i.length - 1; 0 <= e; e--)
      if (t >= i[e]) return this.GetStageGradeResId(r[e]);
  }
  GetStageNameById(e) {
    var t = this.GetStageDataById(e);
    let i = void 0;
    t && (i = t.TitleKey);
    t = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e);
    return (i = t ? t.Title : i)
      ? ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i)
      : "";
  }
  GetInTheBattleBuffInfo() {
    var e = this.sq_() ? this.ChallengeStageData : this.Zn_[0];
    const t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var e = e?.TeamDataList.findIndex((e) => e.InstId === t) ?? 0,
      e = this.ChallengeBuffIdList[e],
      e =
        ConfigManager_1.ConfigManager.ShipTowerConfig?.GetBuffCfgById(e)
          ?.ItemId ?? this.rs_.values().next().value.ItemId,
      i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e),
      r = i.Name,
      s = i.ObtainedShowDescription;
    return {
      TitleKey: r,
      SubTitleKey: "GhostShipItemQuality_Text" + i.QualityId,
      ItemInfo: { ItemConfigId: e, Data: void 0, Type: 4 },
      DescInfoList: [{ DescKey: s, DescUseChangeColor: !0 }],
      DescTitleKey: ShipTowerDefine_1.shipTowerTextKey.BattleBuffSkillTitle,
    };
  }
  AddShowBuffId(e, t = !0) {
    this.kG_.push(e),
      t &&
        (this.ShowBuffIdList.push(e),
        UiManager_1.UiManager.IsViewOpen("ShipTowerShowBuffView") ||
          UiManager_1.UiManager.OpenView("ShipTowerShowBuffView"));
  }
  async CheckShowGetBuff() {
    if (!this.KH_ || this.KH_.IsFulfilled()) {
      if (this.kG_.length <= 0) return !1;
      (this.KH_ = new CustomPromise_1.CustomPromise()),
        UiManager_1.UiManager.OpenView("ShipTowerGetBuffView", {
          ItemDataList: this.YH_(),
          Promise: this.KH_,
        }),
        (this.kG_.length = 0);
    }
    return await this.KH_.Promise, !0;
  }
  ClearGetBuffIdList() {
    this.kG_.length = 0;
  }
  YH_() {
    const i = [],
      r = new Map();
    return (
      this.kG_.forEach((e) => {
        var t,
          e = this.GetBuffDataByBuffId(e);
        e &&
          (r.has(e.ItemId)
            ? r.get(e.ItemId)[1]++
            : ((t = [{ ItemId: e.ItemId, IncId: 0 }, 0]),
              i.push(t),
              r.set(e.ItemId, t)));
      }),
      i
    );
  }
  async OpenWelcomeView() {
    (this.qV_ && !this.qV_.IsFulfilled()) ||
      ((this.qV_ = new CustomPromise_1.CustomPromise()),
      UiManager_1.UiManager.OpenView("ShipTowerWelcomeView", {
        Promise: this.qV_,
      })),
      await this.qV_.Promise;
  }
  CloseWelcomeView() {
    UiManager_1.UiManager.CloseView("ShipTowerWelcomeView");
  }
  CloseMainView() {
    UiManager_1.UiManager.CloseView("ShipTowerView");
  }
  GetSeasonCountDownData() {
    let e = this.GetRemainTime();
    var t =
        (e = e <= 1 ? 1 : e) >= CommonDefine_1.SECOND_PER_DAY
          ? 3
          : e >= CommonDefine_1.SECOND_PER_HOUR
            ? 2
            : 1,
      i =
        e >= CommonDefine_1.SECOND_PER_DAY
          ? 2
          : e >= CommonDefine_1.SECOND_PER_HOUR
            ? 1
            : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t, i);
  }
  GetStageAreaName(e) {
    const t =
        void 0 === e
          ? this.GetCurrentStage()
          : (this.GetStageDataById(e) ?? this.Zn_[0]),
      i = this.Zn_.findIndex((e) => e.Id === t?.Id);
    e = ConfigManager_1.ConfigManager.ShipTowerConfig.GetAllShowStageCfg().find(
      (e) => e.OutIndex >= i,
    );
    return e
      ? ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
          e.Name,
          e.Name,
        )
      : "";
  }
  GetCurrentStageSeasonName() {
    if (
      this.GetCurrentStage()?.BelongToSeason ===
        ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON ||
      !this.IsOpen()
    ) {
      const e = ShipTowerDefine_1.shipTowerTextKey.OneTimeSeasonName;
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    }
    const e = ShipTowerDefine_1.shipTowerTextKey.RefreshSeasonName;
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
  }
  GetCurrentStageSeasonName2() {
    if (
      this.GetCurrentStage()?.BelongToSeason ===
      ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON
    ) {
      const e = ShipTowerDefine_1.shipTowerTextKey.AreaNameShallow;
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    }
    const e = ShipTowerDefine_1.shipTowerTextKey.AreaNameRefresh;
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
  }
  GetCurrentStage() {
    for (let e = this.Zn_.length - 1; 0 <= e; e--) {
      var t = this.Zn_[e];
      if (t.IsUnLocked()) return t;
    }
    return this.Zn_[0];
  }
  IsPassZeroSeason() {
    return (
      !!this.IsOpen() &&
      this.GetCurrentStage()?.BelongToSeason !==
        ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON
    );
  }
  GetEndlessStageData() {
    return this.Zn_.find((e) => e.IsEndLess) ?? this.Zn_[0];
  }
  CheckIsNeedShowConfirmSeasonUpdate(e) {
    return !!this.zH_() && (this.JH_(e), !0);
  }
  zH_() {
    return !!this.BG_ || !!this.TimeIsOver();
  }
  JH_(e) {
    var t, i;
    this.IsOpenedSeasonUpdate ||
      ((this.IsOpenedSeasonUpdate = !0),
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(256)).FunctionMap.set(
        1,
        (i = () => {
          (e ?? this.XH_)?.(), (this.IsOpenedSeasonUpdate = !1);
        }),
      ),
      t.FunctionMap.set(2, i),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      ));
  }
  OpenConfirmBackWorld() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(254);
    e.FunctionMap.set(2, this.LeaveBattle),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  IsExistFirstGetBuff() {
    return this.ts_.some((e) => e.BuffList.some((e) => e.IsFirstGet()));
  }
}
exports.ShipTowerModel = ShipTowerModel;
//# sourceMappingURL=ShipTowerModel.js.map
