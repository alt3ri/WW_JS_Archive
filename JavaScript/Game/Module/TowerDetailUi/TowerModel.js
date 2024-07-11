"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerModel =
    exports.LOCK_COLOR =
    exports.NORMOL_COLOR =
    exports.FINISH_COLOR =
    exports.FLOOR_STAR =
      void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiManager_1 = require("../../Ui/UiManager");
const EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController");
const TowerData_1 = require("./TowerData");
(exports.FLOOR_STAR = 3),
  (exports.FINISH_COLOR = "#FFD12F"),
  (exports.NORMOL_COLOR = "#ECE5D8"),
  (exports.LOCK_COLOR = "#ADADAD");
class TowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.TowerBeginTime = void 0),
      (this.TowerEndTime = void 0),
      (this.CurrentSeason = -1),
      (this.DataSeason = 0),
      (this.CurrentSelectDifficulties = -1),
      (this.CurrentTowerId = -1),
      (this.CurrentTowerFormation = void 0),
      (this.NeedChangeFormation = !1),
      (this.CurrentNotConfirmedFloor = void 0),
      (this.NeedOpenConfirmViewTowerId = -1),
      (this.NeedOpenConfirmView = !1),
      (this.CurrentSelectFloor = -1),
      (this.RoleDifficultyFormationMap = new Map()),
      (this.RecommendFormation = void 0),
      (this.CurrentTowerLock = !1),
      (this.DefaultFloor = -1),
      (this.KTo = 0),
      (this.TowerGuideDelayTime = 0),
      (this.TowerSettlementDelayTime = 0),
      (this.QTo = new Map()),
      (this.XTo = void 0),
      (this.$To = -1),
      (this.YTo = new Map()),
      (this.JTo = new Map()),
      (this.zTo = void 0),
      (this.NeedOpenReviveView = !1);
  }
  OnInit() {
    return (
      (this.KTo =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "TowerRoleTotalCost",
        )),
      (this.TowerGuideDelayTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "TowerGuideDelayTime",
        )),
      (this.TowerSettlementDelayTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "TowerSettleDelayTime",
        )),
      this.Nqt(),
      !0
    );
  }
  OnLeaveLevel() {
    return (this.CurrentSelectFloor = -1), (this.CurrentTowerId = -1), !0;
  }
  Nqt() {
    this.ZTo(TowerData_1.LOW_RISK_DIFFICULTY, void 0),
      this.ZTo(TowerData_1.HIGH_RISK_DIFFICULTY, void 0),
      this.ZTo(TowerData_1.VARIATION_RISK_DIFFICULTY, void 0);
  }
  RefreshTowerInfo(t) {
    (this.TowerBeginTime = t.HCs),
      (this.TowerEndTime = t.jCs),
      (this.CurrentSeason = t.Yxs),
      (this.DataSeason = t.Jxs),
      this.RefreshTowerInfoByDifficulty(t.zxs);
  }
  RefreshTowerInfoByFloor(t) {
    for (const e of t) this.eLo(e);
  }
  RefreshTowerInfoByDifficulty(t) {
    for (const e of t)
      this.ZTo(e.yVn, e.b5n), this.tLo(e.Zxs), this.JTo.set(e.yVn, e.ebs);
  }
  DeleteVariationTowerInfo() {
    for (const [t, e] of this.QTo)
      e.Difficulties === TowerData_1.VARIATION_RISK_DIFFICULTY &&
        this.QTo.delete(t);
    this.ZTo(TowerData_1.VARIATION_RISK_DIFFICULTY, void 0),
      this.JTo.set(TowerData_1.VARIATION_RISK_DIFFICULTY, 0);
    for (const [, r] of this.RoleDifficultyFormationMap)
      r.set(TowerData_1.VARIATION_RISK_DIFFICULTY, 0);
  }
  GetFloorStars(t) {
    return this.QTo.get(t)?.Star;
  }
  GetFloorStarsIndex(t) {
    return this.QTo.get(t)?.StarIndex;
  }
  GetAreaStars(t, e, r = !1) {
    let i = 0;
    if (r)
      for (const [, o] of this.XTo)
        o.Difficulties === t && o.Area === e && (i += o.Star);
    else
      for (const [, s] of this.QTo)
        s.Difficulties === t && s.Area === e && (i += s.Star);
    return i;
  }
  GetDifficultyMaxStars(t, e = !1) {
    let r = void 0;
    return (r = e ? this.zTo?.get(t) : this.JTo.get(t)) ?? 0;
  }
  GetDifficultyStars(t) {
    let e = 0;
    for (const [, r] of this.QTo) r.Difficulties === t && (e += r.Star);
    return e;
  }
  GetAreaAllStars(t, e) {
    return (
      exports.FLOOR_STAR *
      ConfigManager_1.ConfigManager.TowerClimbConfig.GetAreaFloorNumber(
        this.CurrentSeason,
        t,
        e,
      )
    );
  }
  GetDifficultyAllStars(t, e = !1) {
    return (
      exports.FLOOR_STAR *
      ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyFloorNumber(
        e ? this.$To : this.CurrentSeason,
        t,
      )
    );
  }
  GetDifficultyReward(t) {
    t = this.YTo.get(t);
    if (t) return t;
  }
  GetHaveChallengeFloor(t) {
    return !!this.QTo.get(t);
  }
  GetHaveChallengeFloorAndFormation(t) {
    t = this.QTo.get(t);
    return !(!t || !t.Formation || t.Formation.length === 0);
  }
  GetFloorData(t) {
    return this.QTo.get(t);
  }
  ZTo(t, e) {
    const r = this.GetDifficultyReward(t);
    if (r) for (const n of r) n.IsReceived = e?.includes(n.Index);
    else {
      const i =
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyReward(t);
      const o = i.length;
      const s = [];
      for (let t = 0; t < o; t++) {
        var a = i[t];
        var a = new TowerData_1.TowerReward(a.Item1, a.Item2, t);
        (a.IsReceived = e?.includes(t)), s.push(a);
      }
      this.YTo.set(t, s);
    }
  }
  tLo(t) {
    for (const e of t) for (const r of e.ibs) this.eLo(r);
  }
  eLo(t) {
    let e = this.QTo.get(t.EVn);
    if (e) {
      (e.Star = t.UDs), (e.StarIndex = t.rbs);
      for (const r of e.Formation)
        this.ReduceRoleFormationCost(r.l3n, e.Difficulties, e.Cost);
      e.Formation = t.SVn;
    } else
      (e = new TowerData_1.TowerFloorInfo(t.EVn, t.UDs, t.SVn, t.rbs)),
        this.QTo.set(t.EVn, e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnTowerRecordUpdate,
          t.EVn,
          e.Difficulties,
        );
    for (const i of e.Formation) this.iLo(i.l3n, e.Difficulties, e.Cost);
  }
  iLo(t, e, r) {
    let i = this.RoleDifficultyFormationMap.get(t);
    let o;
    i
      ? (o = i.get(e))
        ? ((o += r), i.set(e, o))
        : i.set(e, r)
      : (i = new Map()).set(e, r),
      this.RoleDifficultyFormationMap.set(t, i);
  }
  ReduceRoleFormationCost(t, e, r) {
    let i;
    var t = this.RoleDifficultyFormationMap.get(t);
    t && (i = t.get(e)) && t.set(e, (i -= r));
  }
  GetDifficultyProgress(t) {
    t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllFloor(
      this.CurrentSeason,
      t,
    );
    let e = 0;
    for (const r of t) void 0 !== this.QTo.get(r) && e++;
    return [e, t.length];
  }
  GetDifficultyIsClear(t) {
    for (const e of ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllFloor(
      this.CurrentSeason,
      t,
    ))
      if (!this.QTo.get(e)) return !1;
    return !0;
  }
  GetMaxDifficulty() {
    return this.GetDifficultyIsClear(TowerData_1.LOW_RISK_DIFFICULTY)
      ? this.GetDifficultyIsClear(TowerData_1.HIGH_RISK_DIFFICULTY)
        ? TowerData_1.VARIATION_RISK_DIFFICULTY
        : TowerData_1.HIGH_RISK_DIFFICULTY
      : TowerData_1.LOW_RISK_DIFFICULTY;
  }
  GetDifficultyAllAreaFirstFloor(t, e = !1) {
    return ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllAreaFirstFloor(
      e ? this.$To : this.CurrentSeason,
      t,
    );
  }
  GetDifficultyAreaAllFloor(t, e) {
    return ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAreaAllFloor(
      this.CurrentSeason,
      t,
      e,
    );
  }
  GetFloorIsUnlock(t) {
    return (
      !!this.GetHaveChallengeFloor(t) ||
      !(t =
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetLastFloorInArea(t)) ||
      this.GetHaveChallengeFloor(t)
    );
  }
  GetRoleRemainCost(t, e) {
    var t = this.RoleDifficultyFormationMap.get(t);
    return (t = t && t.get(e)) ? this.KTo - t : this.KTo;
  }
  GetFloorIncludeRole(t, e) {
    e = this.QTo.get(e);
    if (e) for (const r of e.Formation) if (r.l3n === t) return !0;
    return !1;
  }
  OpenTowerFormationView(t) {
    this.CurrentSelectFloor = t;
    t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(t);
    EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
      t.InstanceId,
    );
  }
  IsOpenFloorFormation() {
    return this.CurrentSelectFloor !== -1;
  }
  GetCurrentFloorName() {
    var t =
      ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
        "TowerAreaFloor",
      );
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    const e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
      this.CurrentTowerId,
    );
    const r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.AreaName);
    return t.replace("{0}", r).replace("{1}", "" + e.Floor);
  }
  GetFloorFormation(t) {
    const e = [];
    var t = this.QTo.get(t);
    if (t && t.Formation) for (const r of t.Formation) e.push(r.l3n);
    return e;
  }
  SaveNeedOpenConfirmView() {
    (this.NeedOpenConfirmViewTowerId = this.CurrentTowerId),
      (this.NeedOpenConfirmView = !0);
  }
  ClearNotConfirmedData() {
    (this.NeedOpenConfirmViewTowerId = -1),
      (this.NeedOpenConfirmView = !1),
      (this.CurrentNotConfirmedFloor = void 0);
  }
  OpenReviewView() {
    this.NeedOpenReviveView &&
      ((this.NeedOpenReviveView = !1),
      this.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY, !0) >
        0 && UiManager_1.UiManager.OpenView("TowerReviewView"),
      (this.DataSeason = this.CurrentSeason));
  }
  SaveHandleData() {
    (this.XTo = new Map(this.QTo)),
      (this.zTo = new Map(this.JTo)),
      (this.$To = this.CurrentSeason);
  }
  ClearHandleData() {
    this.XTo?.clear(),
      (this.XTo = void 0),
      this.zTo?.clear(),
      (this.zTo = void 0),
      (this.$To = -1);
  }
  CheckInTower() {
    return this.CurrentTowerId !== -1;
  }
  GetSeasonCountDownData() {
    let t =
      MathUtils_1.MathUtils.LongToNumber(this.TowerEndTime) -
      TimeUtil_1.TimeUtil.GetServerTime();
    const e =
      (t = t <= 1 ? 1 : t) >= CommonDefine_1.SECOND_PER_DAY
        ? 3
        : t >= CommonDefine_1.SECOND_PER_HOUR
          ? 2
          : 1;
    const r =
      t >= CommonDefine_1.SECOND_PER_DAY
        ? 2
        : t >= CommonDefine_1.SECOND_PER_HOUR
          ? 1
          : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e, r);
  }
  CanGetReward() {
    const t = this.GetDifficultyReward(this.CurrentSelectDifficulties);
    if (t) {
      const e = this.GetDifficultyMaxStars(this.CurrentSelectDifficulties);
      for (const r of t) if (e >= r.Target && !r.IsReceived) return !0;
    }
    return !1;
  }
  CanGetRewardByDifficulties(t) {
    const e = this.GetDifficultyReward(t);
    if (e) {
      const r = this.GetDifficultyMaxStars(t);
      for (const i of e) if (r >= i.Target && !i.IsReceived) return !0;
    }
    return !1;
  }
  CanGetRewardAllDifficulties() {
    for (
      let t = TowerData_1.LOW_RISK_DIFFICULTY;
      t <= TowerData_1.VARIATION_RISK_DIFFICULTY;
      t++
    ) {
      const e = this.GetDifficultyReward(t);
      const r = this.GetDifficultyMaxStars(t);
      if (e) for (const i of e) if (r >= i.Target && !i.IsReceived) return !0;
    }
    return !1;
  }
  IsRoleCostEnough(t) {
    return (
      !!this.GetFloorIncludeRole(t, this.CurrentSelectFloor) ||
      ((t = this.GetRoleRemainCost(t, this.CurrentSelectDifficulties)),
      ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
        this.CurrentSelectFloor,
      )?.Cost <= t)
    );
  }
  GetIsInOnceTower() {
    const t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
      this.CurrentTowerId,
    );
    return (
      t.Difficulty === TowerData_1.LOW_RISK_DIFFICULTY ||
      t.Difficulty === TowerData_1.HIGH_RISK_DIFFICULTY
    );
  }
  GetDifficultyRewardProgress(t) {
    t = this.GetDifficultyReward(t);
    let e = 0;
    for (const r of t) r.IsReceived && e++;
    return e / t.length;
  }
}
exports.TowerModel = TowerModel;
// # sourceMappingURL=TowerModel.js.map
