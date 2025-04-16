"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPermanentRogueModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  RogueResEndAll_1 = require("../../../Core/Define/ConfigQuery/RogueResEndAll"),
  RogueResEndAwardById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndAwardById"),
  RogueResEndById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndById"),
  RogueResTalentTreeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTalentTreeById"),
  RogueResTaskThemeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskThemeById"),
  RogueResThemeAll_1 = require("../../../Core/Define/ConfigQuery/RogueResThemeAll"),
  RogueResThemeById_1 = require("../../../Core/Define/ConfigQuery/RogueResThemeById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityPermanentRogueController_1 = require("./ActivityPermanentRogueController"),
  ALL_SEASON_ID = 0;
class ActivityPermanentRogueModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.SelectSkillId = 0),
      (this.u5c = new Map()),
      (this.SM1 = new Map()),
      (this.Rn1 = new Map()),
      (this.jl1 = new Map()),
      (this.Ln1 = 0),
      (this.iI1 = new Map()),
      (this.SortTaskData = (e, t) =>
        e.Status === t.Status
          ? e.Id - t.Id
          : this.rI1(e.Status) - this.rI1(t.Status));
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  GetActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityPermanentRogueController_1.ActivityPermanentRogueController
        .ActivityId,
    );
  }
  GetNewSeasonId() {
    return this.GetActivityData().GetNewSeasonId();
  }
  InitCurrency(e) {
    this.u5c.clear();
    for (const o of Object.keys(e)) {
      var t = Number(o),
        r = e[o];
      this.u5c.set(t, e[o]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerCurrencyChange,
          t,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RogueBattle",
            37,
            "[MapRogue] 常驻肉鸽货币初始化",
            ["ItemId", t],
            ["ItemId", r],
          );
    }
    this.SM1.clear();
    for (const n of RogueResThemeAll_1.configRogueResThemeAll.GetConfigList())
      this.SM1.set(n.SkillItem, n.Id);
  }
  UpdateCurrency(e, t) {
    for (const a of Object.keys(e)) {
      var r = Number(a),
        o = e[a],
        n = this.u5c.get(r);
      this.SM1.has(r) &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PermanentRogueSkillCurrencyRedDotUpdate,
          this.SM1.get(r),
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
          this.SM1.get(r),
        )),
        void 0 !== n ? this.u5c.set(r, n + o) : this.u5c.set(r, o),
        t &&
          ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowCurrencyChangeEventType.includes(
            t,
          ) &&
          ModelManager_1.ModelManager.MapRogueModel.GameInfo?.PushGetItemData(
            r,
            o,
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerCurrencyChange,
          r,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RogueBattle",
            37,
            "[MapRogue] 常驻肉鸽货币变更",
            ["ItemId", r],
            ["ItemId", n ?? 0 + o],
          );
    }
  }
  GetCurrency(e) {
    return this.u5c.get(e) ?? 0;
  }
  GetSeasonHelpId(e) {
    e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    if (e) return e.HelpId;
  }
  GetMapNoteShowState() {
    var e =
      ActivityPermanentRogueController_1.ActivityPermanentRogueController.GetCurrentActivityData();
    return !(
      !e ||
      !e.IsUnLock() ||
      !e.GetPreGuideQuestFinishState() ||
      ((e = this.GetNewSeasonId()),
      (e = this.GetLatestDungeon(e)),
      ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(e))
    );
  }
  GetCurrentSelectedInst(e) {
    return this.iI1.get(e) ?? 0;
  }
  SetCurrentSelectedInst(e) {
    var t =
      RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e);
    t && this.iI1.set(t.SeasonId, e);
  }
  GetTokenCount(e) {
    var t = this.GetActivityData(),
      r = [0, 0],
      o = t.GetAllIllustratedState(),
      t = t.GetTokenIndexSet(e);
    r[1] = t.size;
    for (const n of t)
      r[0] += o.get(n) !== Protocol_1.Aki.Protocol.zps.Z6n ? 1 : 0;
    return r;
  }
  GetEventCount(e, t) {
    var r = this.GetActivityData(),
      o = [0, 0],
      n = r.GetAllIllustratedState(),
      t = t ? r.GetNormalIndexSet(e) : r.GetMapIndexSet(e);
    o[1] = t.size;
    for (const a of t)
      o[0] += n.get(a) !== Protocol_1.Aki.Protocol.zps.Z6n ? 1 : 0;
    return o;
  }
  GetTypeIllustratedCountInfo() {
    var e = new Map();
    for (const r of this.GetActivityData().GetAllIllustratedState()) {
      var t =
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          r[0],
        );
      t
        ? ((t = t.Type),
          e.get(t) || e.set(t, [0, 0]),
          e.get(t)[1]++,
          (e.get(t)[0] += r[1] === Protocol_1.Aki.Protocol.zps.Z6n ? 0 : 1))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 77, "未找到肉鸽图鉴配置", [
            "collectId",
            r[0],
          ]);
    }
    return e;
  }
  GetTokenTipsData(e) {
    var t;
    return this.jl1.get(e)
      ? this.jl1.get(e)
      : (((t = new Protocol_1.Aki.Protocol.Shc()).wac =
          new Protocol_1.Aki.Protocol.wac()),
        (t.wac.dws = !1),
        (t.wac.v9n = e),
        this.jl1.set(e, t),
        t);
  }
  CheckIllustratedRedDot() {
    return this.GetActivityData().IsIllustratedReward();
  }
  GetTokenIndexSet(e) {
    var t = this.GetActivityData();
    return e ? t.GetTokenIndexSet(e.Id) : t.GetTokenIndexSet(ALL_SEASON_ID);
  }
  GetNormalIndexSet(e) {
    var t = this.GetActivityData();
    return e ? t.GetNormalIndexSet(e.Id) : t.GetNormalIndexSet(ALL_SEASON_ID);
  }
  GetMapIndexSet(e) {
    var t = this.GetActivityData();
    return e ? t.GetMapIndexSet(e.Id) : t.GetMapIndexSet(ALL_SEASON_ID);
  }
  GetCollectItemState(e) {
    return this.GetActivityData().GetCollectItemState(e);
  }
  GetHaveTokenAward(e) {
    var t = this.GetActivityData(),
      e = t.GetTokenIndexSet(e),
      r = t.GetAllIllustratedState();
    for (const o of e)
      if (r.get(o) === Protocol_1.Aki.Protocol.zps.CMs) return !0;
    return !1;
  }
  GetHaveNormalAward(e) {
    var t = this.GetActivityData(),
      e = t.GetNormalIndexSet(e),
      r = t.GetAllIllustratedState();
    for (const o of e)
      if (r.get(o) === Protocol_1.Aki.Protocol.zps.CMs) return !0;
    return !1;
  }
  GetHaveMapAward(e) {
    var t = this.GetActivityData(),
      e = t.GetMapIndexSet(e),
      r = t.GetAllIllustratedState();
    for (const o of e)
      if (r.get(o) === Protocol_1.Aki.Protocol.zps.CMs) return !0;
    return !1;
  }
  GetTaskEndTime() {
    return this.GetActivityData().TaskEndTime;
  }
  GetTaskCount() {
    var e = [0, 0],
      t = this.GetActivityData();
    for (const o of RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(
      t.GetTaskThemeId(),
    ).TabNames) {
      var r = t.GetTaskListByType(o[0]);
      e[1] += r.length;
      for (const n of r)
        e[0] +=
          t.GetTaskById(n).Status ===
          Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning
            ? 0
            : 1;
    }
    return e;
  }
  GetTaskProgressByType(e) {
    let t = 0;
    e = this.GetTaskListById(e);
    if (0 === e.length) return 0;
    var r = this.GetActivityData();
    for (const n of e) {
      var o = r.GetTaskById(n).Status;
      t += o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning ? 0 : 1;
    }
    return (t / e.length) * 100;
  }
  GetTaskListById(e) {
    return this.GetActivityData().GetTaskListByType(e);
  }
  GetTaskById(e) {
    return this.GetActivityData().GetTaskById(e);
  }
  GetTaskDataListById(e) {
    var t = this.GetTaskListById(e),
      r = [];
    for (const e of t) {
      var o = this.GetTaskById(e);
      r.push(o);
    }
    return r;
  }
  CheckAllTaskRedDot() {
    return (
      this.GetCacheTaskOpen() <= TimeUtil_1.TimeUtil.GetServerTime() ||
      this.GetActivityData().IsTaskReward()
    );
  }
  CheckTaskRedDot(e) {
    for (const t of this.GetTaskListById(e))
      if (
        this.GetTaskById(t).Status ===
        Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish
      )
        return !0;
    return !1;
  }
  rI1(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 0;
      default:
        return 1;
    }
  }
  GetTaskRoleList() {
    var e = this.GetActivityData().GetTaskThemeId();
    return (
      RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(e)
        ?.RoleImage ?? []
    );
  }
  GetCacheTaskOpen() {
    var e =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTaskOpen,
      ) ?? void 0;
    return e || -1;
  }
  SetCacheTaskOpen() {
    var e = MathUtils_1.MathUtils.LongToNumber(this.GetTaskEndTime());
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTaskOpen,
      e,
    );
  }
  GetCacheDungeonNewest(e) {
    return (
      (
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonNewest,
        ) ?? void 0
      )?.get(e) ?? void 0
    );
  }
  SetCacheDungeonNewest(e) {
    var t =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonNewest,
        ) ?? new Map(),
      r = this.GetLatestDungeon(e);
    t.set(e, r),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonNewest,
        t,
      );
  }
  CheckDungeonRedDot(e) {
    var t = this.GetCacheDungeonNewest(e);
    return !t || t !== this.GetLatestDungeon(e);
  }
  GetLatestDungeon(e) {
    e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    for (const t of e.Insts)
      if (!ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(t))
        return t;
    return e.Insts[e.Insts.length - 1];
  }
  GetInstDungeonState(e) {
    var t = this.GetInstDungeonEndingReachedCount(e),
      r = this.Rn1.get(e)?.size ?? 0;
    return 0 === r
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RogueBattle", 77, "副本未配置结局数据！", [
            "instId",
            e,
          ]),
        0)
      : t === r
        ? 2
        : ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
              e,
            )
          ? 1
          : 0;
  }
  GetInstDungeonEndingTotalCount(e) {
    return this.Rn1.get(e).size;
  }
  GetInstDungeonEndingReachedCount(e) {
    if (!this.Rn1.get(e))
      for (const a of RogueResEndAll_1.configRogueResEndAll.GetConfigList()) {
        var t = a.InstId;
        this.Rn1.get(t) || this.Rn1.set(t, new Set()),
          this.Rn1.get(t)?.add(a.Id);
      }
    let r = 0;
    var o = this.GetActivityData(),
      n =
        RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
          e,
        ).SeasonId;
    if (!this.Rn1.get(e))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RogueBattle", 77, "未找到副本相关结局", [
            "InstId",
            e,
          ]),
        0
      );
    for (const i of this.Rn1.get(e)) r += o.GetEndingReachedById(n, i) ? 1 : 0;
    return r;
  }
  GetLatestDungeonIndex(e) {
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(e)?.Insts,
      e = this.GetLatestDungeon(e);
    return t.indexOf(e);
  }
  GetSkillTreeLevel(e) {
    var t = this.GetActivityData().GetSeasonDataById(e).Mqs;
    let r = 0;
    for (const o of Object.keys(t)) r += 0 < t[o] ? t[o] : 0;
    return r;
  }
  GetSkillDict(e) {
    return this.GetActivityData().GetSeasonDataById(e).Mqs;
  }
  GetSkillLevelById(e) {
    var t = this.GetActivityData(),
      r = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(e);
    return t.GetSeasonDataById(r.SeasonId).Mqs[e];
  }
  GetNextCanUnlockSkillId(e) {
    let t = 0;
    var r = this.GetActivityData().GetSeasonDataById(e).Mqs;
    for (const o of Object.keys(r)) {
      if (0 === r[o]) {
        t = Number(o);
        break;
      }
      0 === t && (t = Number(o));
    }
    return t;
  }
  GetCacheSkillTreeOpen(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResSkillTreeOpen,
      ) ?? void 0;
    return !!t && t.has(e);
  }
  SetCacheSkillTreeOpen(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResSkillTreeOpen,
      ) ?? new Set();
    t.add(e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResSkillTreeOpen,
        t,
      );
  }
  CheckSkillTreeRedDot(e) {
    if (!this.GetCacheSkillTreeOpen(e)) return !0;
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(e),
      r = this.GetCurrency(t.SkillItem),
      o = this.GetActivityData().GetSeasonDataById(e).Mqs;
    for (const a of Object.keys(o)) {
      var n = o[a];
      if (0 === n)
        if (
          RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(
            Number(a),
          ).Consule[n] <= r
        )
          return !0;
    }
    return !1;
  }
  UpdateSkillTreeUnlockState(e) {
    this.GetActivityData().UpgradeSkill(e, 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RogueResTalentLevelUp,
        e,
      );
  }
  GetShopCount(e) {
    var t = [this.GetTotalShopItem(e), 0],
      e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    return (t[1] = e?.PointItemMax ?? 0), t;
  }
  CheckShopRedDot(e) {
    if (!this.GetCacheShopOpen(e)) return !0;
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e),
      t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e.ShopId),
      r = this.GetCurrency(e.PointItem);
    for (const n of t) {
      var o = n.GetGoodsData();
      if (o.BoughtCount < o.BuyLimit && r > o.Price.Count) return !0;
    }
    return !1;
  }
  UpdateTotalShopItem(e, t) {
    this.GetActivityData().UpdateTotalShopItem(e, t);
  }
  GetTotalShopItem(e) {
    return this.GetActivityData().GetTotalShopItem(e);
  }
  GetCacheShopOpen(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopOpen,
      ) ?? void 0;
    return !!t && t.has(e);
  }
  SetCacheShopOpen(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopOpen,
      ) ?? new Set();
    t.add(e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopOpen,
        t,
      );
  }
  SetEndingAwardData(e) {
    this.GetActivityData().UpdateEndingAward(e);
  }
  GetEndingAwardViewData(e) {
    e = [...this.GetEndingAwardList(e)];
    const n = (e) => {
      switch (e) {
        case 2:
          return 2;
        case 1:
          return 0;
        default:
          return 1;
      }
    };
    return (
      e.sort((e, t) => {
        var r, o;
        return e.RewardState === t.RewardState
          ? ((r = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(
              e.Id,
            )),
            (o = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(
              t.Id,
            )),
            r.Index - o.Index)
          : n(e.RewardState) - n(t.RewardState);
      }),
      {
        DataPageList: [
          {
            DataList: e,
            TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Rogue_End_S1_Task_Title",
            ),
            TabTips: " ",
          },
        ],
        Source: "Collection",
      }
    );
  }
  GetEndingAwardList(e) {
    return this.GetActivityData().GetEndingAwardList(e);
  }
  GetEndingAwardCount(e) {
    var e = this.GetEndingAwardList(e),
      t = [0, e?.length ?? 0];
    if (e) for (const r of e) t[0] += 0 === r.RewardState ? 0 : 1;
    return t;
  }
  CheckEndingAwardRedDot(e) {
    e = this.GetEndingAwardList(e);
    if (e) for (const t of e) if (1 === t.RewardState) return !0;
    return !1;
  }
  GetEndingCount(e) {
    var t = this.GetActivityData(),
      r = [0, 0],
      o = this.GetEndingListBySeasonId(e);
    r[1] = o.length;
    for (const n of o) r[0] += t.GetEndingReachedById(e, n) ? 1 : 0;
    return r;
  }
  SetEndingMainSelectedIndex(e) {
    this.Ln1 = e;
  }
  GetEndingMainSelectedIndex() {
    return this.Ln1;
  }
  GetEndingListBySeasonId(e) {
    var t = [];
    for (const r of RogueResEndAll_1.configRogueResEndAll.GetConfigList())
      r.SeasonId === e && t.push(r.Id);
    return t;
  }
  GetEndingIsUnlock(e) {
    var t = RogueResEndById_1.configRogueResEndById.GetConfig(e).SeasonId;
    return this.GetActivityData().GetEndingReachedById(t, e);
  }
  GetCacheEndingOpen(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResEndingOpen,
      ) ?? void 0;
    return !!t && t.has(e);
  }
  SetCacheEndingOpen(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResEndingOpen,
      ) ?? new Set();
    t.add(e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResEndingOpen,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RogueResEndingRedDotUpdate,
      );
  }
  GetTrailRole(e, t) {
    e = this.GetActivityData().GetSeasonDataById(e);
    return 0 === t ? (e?.zUc ?? []) : (e?.JUc ?? []);
  }
  GetTrailRemainTime(e) {
    var e = this.GetActivityData().GetSeasonDataById(e),
      e = MathUtils_1.MathUtils.LongToNumber(e.dps),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "ActivityRemainingTime",
      );
    return ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, t);
  }
  GetTrailEndTime(e) {
    e = this.GetActivityData().GetSeasonDataById(e);
    return MathUtils_1.MathUtils.LongToNumber(e.dps);
  }
  GetCacheTrailOpen(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTrialOpen,
      ) ?? void 0;
    return t ? t.get(e) : -1;
  }
  SetCacheTrailOpen(e) {
    var t =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTrialOpen,
        ) ?? new Map(),
      r = this.GetActivityData().GetSeasonDataById(e),
      r = MathUtils_1.MathUtils.LongToNumber(r.dps);
    t.set(e, r),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTrialOpen,
        t,
      );
  }
  CheckTrialRedDot(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.GetCacheTrailOpen(e) <= t;
  }
}
exports.ActivityPermanentRogueModel = ActivityPermanentRogueModel;
//# sourceMappingURL=ActivityPermanentRogueModel.js.map
