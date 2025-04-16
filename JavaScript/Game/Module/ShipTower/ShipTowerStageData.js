"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerStageData = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ShipTowerDefine_1 = require("./ShipTowerDefine"),
  ShipTowerTeamData_1 = require("./ShipTowerTeamData");
class ShipTowerStageData {
  constructor() {
    (this.Id = 0),
      (this.OrderIndex = 1),
      (this.StageType = 0),
      (this.Season = 0),
      (this.IsEndLess = !1),
      (this.InstIds = []),
      (this.PreLevel = []),
      (this.TitleKey = ""),
      (this.DescKey = ""),
      (this.TargetScoreList = []),
      (this.ScoreStageList = []),
      (this.CurrentScore = 0),
      (this.PassScore = 0),
      (this.PassReward = 0),
      (this.cs_ = []),
      (this.TeamDataList = []),
      (this.ProtoIsUnLocked = !1),
      (this.NewChallengeScore = 0),
      (this.IsHaveProtoData = !1),
      (this.LastIsPass = !1),
      (this.LastScore = 0),
      (this.IsNeedSureScore = !1),
      (this.BelongToSeason = 0),
      (this.ProtoIsPassed = !1),
      (this.TeamRecommendList = []);
  }
  Init(e) {
    (this.Id = e.Id),
      (this.Season = e.Season),
      (this.IsEndLess = e.EndLess),
      (this.InstIds = e.InstIds),
      (this.PreLevel = e.PreLevel),
      (this.PassScore = e.PassScore),
      (this.PassReward = e.LevelPassReward),
      (this.TitleKey = e.Title),
      (this.DescKey = e.Desc),
      (this.TargetScoreList = e.TargetScore),
      (this.ScoreStageList = e.ScoreStage),
      (this.BelongToSeason = e.Season),
      this.us_();
  }
  us_() {
    this.IsEndLess
      ? (this.StageType = 2)
      : 0 === this.Season
        ? (this.StageType = 0)
        : (this.StageType = 1),
      this.InstIds.forEach((e, t) => {
        var s = new ShipTowerTeamData_1.ShipTowerTeamData();
        s.Init(e, t, this.Id), this.TeamDataList.push(s);
      });
  }
  IsUnLocked() {
    return this.IsHaveProtoData
      ? this.ProtoIsUnLocked
      : 0 === this.PreLevel.length ||
          this.PreLevel.every((e) =>
            ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(
              e,
            ).IsPassed(),
          );
  }
  IsPassed() {
    return this.IsHaveProtoData ? this.ProtoIsPassed : this.CurrentIsPassed();
  }
  CurrentIsPassed() {
    return this.CurrentScore >= this.PassScore;
  }
  CanReset() {
    return this.IsTeamSetRoleFinish();
  }
  IsNewRecord(e) {
    return (e ?? this.CurrentScore) > this.LastScore;
  }
  IsNotChallenge() {
    return !this.IsTeamSetBuffFinish() || !this.IsTeamSetRoleFinish();
  }
  SetOrderIndex(e) {
    this.OrderIndex = e;
  }
  IsCurrent() {
    return this.IsUnLocked() && !this.IsPassed();
  }
  OpenViewStageDesc() {
    var e;
    this.IsUnLocked()
      ? ModelManager_1.ModelManager.ShipTowerModel.OpenViewDesc({
          StageId: this.Id,
        })
      : ((e = ShipTowerDefine_1.shipTowerTextKey.StageNotUnLock),
        (e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e)),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e));
  }
  OpenViewPassBuffShow() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewPassBuffShow({
      StageData: this,
    });
  }
  OpenViewTeamRecommend() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewTeamRecommend({
      StageData: this,
    });
  }
  OpenViewMonsterDesc(e) {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMonsterDesc({
      StageData: this,
      InstId: e,
    });
  }
  GetTargetScoreInfoList() {
    var e = [],
      t = this.ZH_(),
      t = (t && e.push(t), this.e9_());
    return e.push(t), e;
  }
  ZH_() {
    var e, t;
    if (!this.IsEndLess)
      return (
        (e = ShipTowerDefine_1.shipTowerTextKey.PassTarget),
        (t = ShipTowerDefine_1.shipTowerTextKey.ScoreTarget),
        {
          Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
            e,
            e,
          ),
          TargetList: [
            {
              Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
                t,
                t,
              ),
              ScoreTarget: this.PassScore,
              IsFinish: this.CurrentIsPassed(),
            },
          ],
        }
      );
  }
  e9_() {
    const s = ShipTowerDefine_1.shipTowerTextKey.ScoreTarget;
    var e = ShipTowerDefine_1.shipTowerTextKey.ChallengeTarget;
    const i = [];
    e = {
      Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
      TargetList: i,
    };
    return (
      this.TargetScoreList.forEach((e, t) => {
        t = ModelManager_1.ModelManager.ShipTowerModel.GetStageGradeResId(
          this.ScoreStageList[t],
        );
        i.push({
          Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
            s,
            s,
          ),
          ScoreTarget: e,
          IsFinish: this.CurrentScore >= e,
          ScoreGradeRes: t,
        });
      }),
      e
    );
  }
  GetStageGradeResIdByScore(e) {
    return ModelManager_1.ModelManager.ShipTowerModel.GetStageGradeResIdByScore(
      e,
      this.TargetScoreList,
      this.ScoreStageList,
    );
  }
  GetPassUnlockBuffList() {
    return (
      0 < this.PassReward &&
        0 === this.cs_.length &&
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          this.PassReward,
        )?.DropPreview.forEach((e, t) => {
          this.cs_.push([{ ItemId: t, IncId: 0 }, 0]);
        }),
      this.cs_
    );
  }
  UpdateOtherTeamRoleToModel(t) {
    ModelManager_1.ModelManager.ShipTowerModel.ClearOtherTeamRoleData(),
      this.TeamDataList.forEach((e) => {
        e.Index !== t &&
          (e.UpdateOtherTeamRoleToShipTowerModel(),
          e.UpdateRoleIndexInAllTeam());
      });
  }
  UpdateAllTeamRoleToModel() {
    ModelManager_1.ModelManager.ShipTowerModel.ClearAllTeamRoleData(),
      this.TeamDataList.forEach((e) => {
        e.UpdateAllTeamRoleToShipTowerModel();
      });
  }
  UpdateOtherTeamRoleRepeat(t, s) {
    const i = this.TeamDataList[t];
    let r = !1;
    return (
      this.TeamDataList.forEach((e) => {
        e.Index !== t &&
          ((r = e.UpdateOtherTeamRoleRepeat(i) || r), e.RemoveRoleIdEdit(s));
      }),
      this.UpdateOtherTeamRoleToModel(t),
      r
    );
  }
  StartChallenge() {
    return this.IsTeamSetRoleFinishEdit()
      ? this.IsTeamSetBuffFinishEdit()
        ? (ModelManager_1.ModelManager.ShipTowerModel.StartChallenge(this), !0)
        : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            ShipTowerDefine_1.shipTowerTextKey.BuffNotFull,
          ),
          !1)
      : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          ShipTowerDefine_1.shipTowerTextKey.TeamNotFull,
        ),
        !1);
  }
  IsTeamSetRoleFinish() {
    return this.TeamDataList.every((e) => e.IsSetRoleFinish());
  }
  IsTeamSetRoleFinishEdit() {
    return this.TeamDataList.every((e) => e.IsSetRoleFinishEdit());
  }
  IsTeamSetBuffFinish() {
    return this.TeamDataList.every((e) => e.IsSetBuffFinish());
  }
  IsTeamSetBuffFinishEdit() {
    return this.TeamDataList.every((e) => e.IsSetBuffFinishEdit());
  }
  GetAllTeamBuffIdList() {
    return this.TeamDataList.map((e) => e.BuffDataEdit?.Id ?? 0);
  }
  GetChallengeInstId() {
    return this.InstIds[0];
  }
  Cs_() {
    (this.CurrentScore = 0),
      this.TeamDataList.forEach((e) => {
        this.CurrentScore += e.CurrentScore;
      });
  }
  pD_() {
    this.Cs_(), this.SaveLastData();
  }
  ProtoUpdateData(e) {
    this.ProtoUpdateDataBase(e), this.pD_();
  }
  ProtoUpdateDataBase(e) {
    (this.IsHaveProtoData = !0),
      (this.ProtoIsUnLocked = e.MT_),
      (this.ProtoIsPassed = e.nA_);
    const s = this.TeamDataList[0],
      i = this.TeamDataList[1];
    e.UL_?.RL_.forEach((e, t) => {
      s.ProtoSetRole(e, t);
    }),
      s.ProtoSetBuff(e.UL_?.AL_),
      s.UpdateCurrentScore(e.PL_),
      e.DL_?.RL_.forEach((e, t) => {
        i.ProtoSetRole(e, t);
      }),
      i.ProtoSetBuff(e.DL_?.AL_),
      i.UpdateCurrentScore(e.xL_);
  }
  ProtoNotifyUpdateData(e) {
    this.SaveLastData(),
      this.ProtoUpdateDataBase(e),
      this.Cs_(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShipTowerStageUpdate,
        this.Id,
      );
  }
  SaveLastData() {
    (this.LastIsPass = this.IsPassed()),
      (this.LastScore = this.CurrentScore),
      (this.IsNeedSureScore = 0 < this.CurrentScore);
  }
  CheckPass(e = 0) {
    return e >= this.PassScore;
  }
  SureResultFromInstance() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMain({
      StageId: this.Id,
      IsOpenStageDesc: !0,
      IsOpenCover: !0,
      IsFromInstanceDungeon: !0,
    });
  }
  GotoDescFromInstance() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMain({
      StageId: this.Id,
      IsOpenStageDesc: !0,
      IsFromInstanceDungeon: !0,
    });
  }
  GotoNextDescFromInstance(e) {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMain({
      StageId: e.Id,
      IsOpenStageDesc: !0,
      IsFromInstanceDungeon: !0,
      ApplyTeamEditStageId: this.Id,
    });
  }
  async SureResetStage() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerResetRequest(
      this.Id,
    );
  }
  ResetStage() {
    this.TeamDataList.forEach((e) => {
      e.ResetStage();
    }),
      this.pD_();
  }
  async SureCoverChallenge() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerSaveRecordRequest(
      this.Id,
    );
  }
  CoverChallenge() {
    this.TeamDataList.forEach((e) => {
      e.CoverChallenge();
    }),
      this.pD_();
  }
  UpdateNewChallengeScore() {
    (this.NewChallengeScore = 0),
      this.TeamDataList.forEach((e) => {
        this.NewChallengeScore += e.NewChallengeScore;
      });
  }
  UpdateToEdit() {
    this.TeamDataList.forEach((e) => {
      e.UpdateToEdit();
    });
  }
  CopyTeamRoleToEdit(e) {
    const s = ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(e);
    this.TeamDataList.forEach((e, t) => {
      e.CopyTeamRoleToEdit(s.TeamDataList[t]);
    });
  }
  ProtoTeamEditFromResult(e) {
    var t = this.TeamDataList[0],
      s = this.TeamDataList[1],
      i =
        (t.ProtoTeamEditFromResult(e.sA_),
        s.ProtoTeamEditFromResult(e.aA_),
        e.GL_ + e.FL_),
      e = e.NL_ + e.VL_;
    t.ProtoSetNewChallengeScore(i),
      s.ProtoSetNewChallengeScore(e),
      this.UpdateNewChallengeScore();
  }
  async RequestTeamRecommendList() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerRecommendRequest(
      this.Id,
    );
  }
  ProtoUpdateTeamRecommendList(e) {
    (this.TeamRecommendList.length = 0),
      e.Nac.forEach((e, t) => {
        const s = [],
          i = [];
        e.Gac?.RL_.forEach((e) => {
          s.push({ Id: e, Count: 0 });
        }),
          e.Fac?.RL_.forEach((e) => {
            i.push({ Id: e, Count: 0 });
          });
        t = {
          UseRate: e.PGs / 100,
          Name: "" + (t + 1),
          RoleIdList1: s,
          RoleIdList2: i,
          Buff1: e.Gac?.AL_ ?? 0,
          Buff2: e.Fac?.AL_ ?? 0,
          StageData: this,
        };
        this.TeamRecommendList.push(t);
      });
  }
  UseTeamRecommend(e) {
    var t = this.TeamDataList[0],
      s = this.TeamDataList[1];
    return (
      t.CopyIdsToEdit(e.RoleIdList1.map((e) => e.Id)),
      s.CopyIdsToEdit(e.RoleIdList2.map((e) => e.Id)),
      t.CopyBuffIdToEdit(e.Buff1, this.Id),
      s.CopyBuffIdToEdit(e.Buff2, this.Id),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShipTowerTeamRecommendApplyFinish,
        this.Id,
      ),
      !0
    );
  }
  IsCanApplyTeamRecommend(e) {
    return (
      !!ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(
        e.Buff1,
      )?.IsCanUse(this.Id) ||
      !!ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(
        e.Buff2,
      )?.IsCanUse(this.Id) ||
      !!e.RoleIdList1.some((e) =>
        ModelManager_1.ModelManager.ShipTowerModel.IsCanUseRole(e.Id),
      ) ||
      e.RoleIdList2.some((e) =>
        ModelManager_1.ModelManager.ShipTowerModel.IsCanUseRole(e.Id),
      )
    );
  }
  UpdateMainRoleToEdit() {
    this.TeamDataList.forEach((e) => {
      e.UpdateMainRoleToEdit();
    });
  }
  IsOldSeasonData() {
    return (
      !(!this.IsTeamSetRoleFinish() || this.IsTeamSetBuffFinish()) ||
      this.TeamDataList.some(
        (e) =>
          !!e.BuffData &&
          ModelManager_1.ModelManager.ShipTowerModel?.IsOldSeason(
            e.BuffData.Season,
          ),
      )
    );
  }
}
exports.ShipTowerStageData = ShipTowerStageData;
//# sourceMappingURL=ShipTowerStageData.js.map
