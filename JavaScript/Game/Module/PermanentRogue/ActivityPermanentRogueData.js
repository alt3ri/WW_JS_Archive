"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPermanentRogueData = void 0);
const RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  RogueResCollectionRuleById_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionRuleById"),
  RogueResEndAwardById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndAwardById"),
  RogueResEndById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndById"),
  RogueResTalentTreeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTalentTreeById"),
  RogueResTaskById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskById"),
  RogueResTaskThemeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskThemeById"),
  RogueResThemeAll_1 = require("../../../Core/Define/ConfigQuery/RogueResThemeAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityData_1 = require("../Activity/ActivityData"),
  HelpController_1 = require("../Help/HelpController"),
  ActivityPermanentRogueController_1 = require("./ActivityPermanentRogueController"),
  RogueTaskData_1 = require("./ItemData/RogueTaskData"),
  ALL_SEASON_ID = 0,
  taskStateToRewardState = new Map([
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning, 0],
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish, 1],
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken, 2],
  ]);
class ActivityPermanentRogueData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.o5c = new Map()),
      (this.n5c = new Map()),
      (this.s5c = new Map()),
      (this.a5c = new Map()),
      (this.h5c = new Map()),
      (this.l5c = new Map()),
      (this.TaskEndTime = 0),
      (this._5c = new Map()),
      (this.Tn1 = new Map()),
      (this.ku1 = new Map()),
      (this.Ou1 = new Map()),
      (this.qu1 = new Map()),
      (this.c5c = 0);
  }
  GetExDataRedPointShowState() {
    var e = this.GetNewSeasonId(),
      t = ModelManager_1.ModelManager.ActivityPermanentRogueModel;
    return (
      !!t.CheckShopRedDot(e) ||
      !!t.CheckSkillTreeRedDot(e) ||
      !!(
        t.CheckAllTaskRedDot() ||
        t.CheckIllustratedRedDot() ||
        t.CheckEndingAwardRedDot(e) ||
        t.CheckDungeonRedDot(e)
      )
    );
  }
  OnSetFirstOpenFalse() {
    var e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId(),
      e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(
          e,
        );
    e && HelpController_1.HelpController.OpenHelpById(e);
  }
  CheckAllRedDot() {
    return this.GetExDataRedPointShowState();
  }
  IsIllustratedReward() {
    for (const e of this.n5c)
      if (e[1] === Protocol_1.Aki.Protocol.zps.CMs) return !0;
    return !1;
  }
  IsTaskReward() {
    for (const e of this.l5c)
      if (e[1].Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
        return !0;
    return !1;
  }
  PhraseEx(e) {
    var t = e.vsc;
    if (t) {
      for (const e of t.XUc) this.o5c.set(e.UHn, e);
      this.d5c(t), this.m5c(t), this.bn1(t.XUc), this.InitShopItem(t.XUc);
    }
  }
  GetSeasonDataById(e) {
    return this.o5c.get(e);
  }
  GetNewSeasonId() {
    let e = -1;
    for (const t of this.o5c) t[0] > e && (e = t[0]);
    return e;
  }
  GetCycleRemainTime() {
    var e = this.GetNewSeasonId(),
      e = this.GetSeasonDataById(e);
    return MathUtils_1.MathUtils.LongToNumber(e.dps);
  }
  d5c(e) {
    0 === this.s5c.size && this.f5c();
    for (const o of Object.keys(e.YUc.wsc)) {
      var t = Number(o),
        t =
          (this.n5c.set(t, e.YUc.wsc[o]),
          RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
            t,
          ));
      0 === t.Type
        ? this.g5c(Number(o))
        : 1 === t.Type
          ? this.C5c(Number(o))
          : this.p5c(Number(o));
    }
  }
  f5c() {
    var e = RogueResThemeAll_1.configRogueResThemeAll.GetConfigList();
    if (
      (this.s5c.set(ALL_SEASON_ID, new Set()),
      this.a5c.set(ALL_SEASON_ID, new Set()),
      this.h5c.set(ALL_SEASON_ID, new Set()),
      e)
    )
      for (const t of e)
        this.s5c.set(t.Id, new Set()),
          this.a5c.set(t.Id, new Set()),
          this.h5c.set(t.Id, new Set());
  }
  g5c(e) {
    this.s5c.get(ALL_SEASON_ID).add(e);
    var t =
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          e,
        ),
      o =
        RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(
          t.RuleId,
        ),
      r = !o || 2 === o.Type;
    for (const i of this.s5c) {
      var s = i[0];
      r
        ? (o && o.Seasons.includes(s)) || this.s5c.get(s).add(e)
        : o && o.Seasons.includes(s) && this.s5c.get(s).add(e);
    }
  }
  C5c(e) {
    this.a5c.get(ALL_SEASON_ID).add(e);
    var t =
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          e,
        ),
      o =
        RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(
          t.RuleId,
        ),
      r = !o || 2 === o.Type;
    for (const i of this.a5c) {
      var s = i[0];
      r
        ? (o && o.Seasons.includes(s)) || this.a5c.get(s).add(e)
        : o && o.Seasons.includes(s) && this.a5c.get(s).add(e);
    }
  }
  p5c(e) {
    this.h5c.get(ALL_SEASON_ID).add(e);
    var t =
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          e,
        ),
      o =
        RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(
          t.RuleId,
        ),
      r = !o || 2 === o.Type;
    for (const i of this.h5c) {
      var s = i[0];
      r
        ? (o && o.Seasons.includes(s)) || this.h5c.get(s).add(e)
        : o && o.Seasons.includes(s) && this.h5c.get(s).add(e);
    }
  }
  UpdateIllustrateState(e) {
    for (const o of Object.keys(e.wsc)) {
      var t = Number(o),
        t =
          (this.n5c.set(t, e.wsc[o]),
          RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
            t,
          ));
      0 === t.Type
        ? this.g5c(Number(o))
        : 1 === t.Type
          ? this.C5c(Number(o))
          : this.p5c(Number(o));
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
    );
  }
  GetTokenIndexSet(e) {
    return this.s5c.get(e) ?? new Set();
  }
  GetTokenInSeason(e) {
    var t = [];
    for (const o of this.s5c) o[1].has(e) && t.push(o[0]);
    return t;
  }
  GetNormalIndexSet(e) {
    return this.a5c.get(e) ?? new Set();
  }
  GetEventNormalInSeason(e) {
    var t = [];
    for (const o of this.a5c) o[1].has(e) && t.push(o[0]);
    return t;
  }
  GetMapIndexSet(e) {
    return this.h5c.get(e) ?? new Set();
  }
  GetEventMapInSeason(e) {
    var t = [];
    for (const o of this.h5c) o[1].has(e) && t.push(o[0]);
    return t;
  }
  GetCollectItemState(e) {
    return this.n5c.get(e) ? this.n5c.get(e) : Protocol_1.Aki.Protocol.zps.Z6n;
  }
  GetAllIllustratedState() {
    return this.n5c;
  }
  SetIllustratedRewardGot(e) {
    for (const t of e) this.n5c.set(t, Protocol_1.Aki.Protocol.zps.ovs);
  }
  m5c(e) {
    e = e.YUc.dnc;
    if (e.GFc && 0 !== e.GFc.FFc) {
      this.c5c = e.GFc.FFc;
      var t = RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(
        this.c5c,
      );
      if (t) {
        (this.TaskEndTime = e.GFc.dps), this._5c.clear(), this.l5c.clear();
        for (const r of t.TabNames) this._5c.set(r[0], []);
        for (const s of e.GFc.bsc) {
          var o = new RogueTaskData_1.RogueTaskData(s.s5n),
            o =
              ((o.Current = s.lMs),
              (o.Target = s.j6n),
              (o.Status = s.H6n),
              this.l5c.set(s.s5n, o),
              RogueResTaskById_1.configRogueResTaskById.GetConfig(s.s5n));
          this._5c.get(o.Type).push(s.s5n);
        }
      }
    }
  }
  GetTaskListByType(e) {
    return this._5c.get(e) ?? [];
  }
  GetTaskById(e) {
    return this.l5c.get(e);
  }
  GetTaskThemeId() {
    return this.c5c;
  }
  SetTaskRewardGot(e) {
    this.l5c.get(e) &&
      (this.l5c.get(e).Status =
        Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken);
  }
  UpdateTaskNotify(e) {
    if (e.GFc) {
      for (const o of e.GFc.bsc) {
        var t = new RogueTaskData_1.RogueTaskData(o.s5n),
          t =
            ((t.Current = o.lMs),
            (t.Target = o.j6n),
            (t.Status = o.H6n),
            this.l5c.set(o.s5n, t),
            RogueResTaskById_1.configRogueResTaskById.GetConfig(o.s5n).Type);
        this._5c.get(t).includes(o.s5n) || this._5c.get(t).push(o.s5n);
      }
      0 !== e.GFc.FFc && (this.c5c = e.GFc.FFc);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
    );
  }
  bn1(e) {
    for (const t of e) {
      this.Tn1.get(t.UHn) || this.Tn1.set(t.UHn, new Set());
      for (const o of t.Msc) this.Tn1.get(t.UHn)?.add(o);
      this.ku1.get(t.UHn) || this.ku1.set(t.UHn, []);
      for (const r of t.Esc)
        this.ku1.get(t.UHn).includes(r.s5n) ||
          (this.ku1.get(t.UHn)?.push(r.s5n), this.Gu1(r));
    }
  }
  GetEndingReachedById(e, t) {
    return this.Tn1.get(e)?.has(t) ?? !1;
  }
  UpdateEndingAward(e) {
    var t = this.Ou1.get(e);
    (t.RewardState = 2), this.Ou1.set(e, t);
  }
  UpdateEndingNotify(e) {
    var t = new Set();
    for (const s of e.Msc) {
      var o = RogueResEndById_1.configRogueResEndById.GetConfig(s);
      this.Tn1.get(o.SeasonId) || this.Tn1.set(o.SeasonId, new Set()),
        this.Tn1.get(o.SeasonId)?.add(s);
    }
    for (const i of e.Esc) {
      var r = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(
        i.s5n,
      );
      t.add(r.SeasonId),
        this.ku1.get(r.SeasonId) || this.ku1.set(r.SeasonId, []),
        this.ku1.get(r.SeasonId).includes(i.s5n) &&
          this.ku1.get(r.SeasonId)?.push(i.s5n),
        this.Gu1(i);
    }
    for (const n of t)
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
        n,
      );
  }
  Gu1(e) {
    let t = this.Ou1.get(e.s5n);
    if (t)
      (t.NameTextArgs = [e.lMs + "/" + e.j6n]),
        (t.RewardState = taskStateToRewardState.get(e.H6n));
    else {
      const o = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(
        e.s5n,
      );
      t = {
        Id: e.s5n,
        NameText: "",
        NameTextId: o.Desc,
        NameTextArgs: [e.lMs + "/" + e.j6n],
        RewardList: this.GetPreviewReward(o.Award),
        RewardState: taskStateToRewardState.get(e.H6n),
        ClickFunction: () => {
          ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResEndingReward(
            o.SeasonId,
            e.s5n,
          );
        },
      };
    }
    this.Ou1.set(e.s5n, t);
  }
  GetEndingAwardList(e) {
    e = this.ku1.get(e);
    if (!e) return [];
    var t = [];
    for (const o of e) t.push(this.Ou1.get(o));
    return t;
  }
  InitShopItem(e) {
    for (const t of e) this.UpdateTotalShopItem(t.UHn, t.Jc1);
  }
  UpdateTotalShopItem(e, t) {
    this.qu1.set(e, t);
  }
  GetTotalShopItem(e) {
    return this.qu1.get(e) ?? 0;
  }
  UpgradeSkill(e, t) {
    var o = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(e);
    this.GetSeasonDataById(o.SeasonId).Mqs[e] = t;
  }
}
exports.ActivityPermanentRogueData = ActivityPermanentRogueData;
//# sourceMappingURL=ActivityPermanentRogueData.js.map
