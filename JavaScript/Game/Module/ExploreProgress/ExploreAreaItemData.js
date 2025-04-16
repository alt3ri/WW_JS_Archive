"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaItemData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  MapDefine_1 = require("../Map/MapDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class ExploreAreaItemData {
  constructor() {
    (this.AreaId = 0),
      (this.ExploreType = 0),
      (this.ExploreProgressId = 0),
      (this.ConfigId = 0),
      (this.VVt = 0),
      (this.HPt = 0),
      (this.JXt = 0),
      (this.KHs = void 0),
      (this.QHs = 0),
      (this.$Hs = void 0),
      (this.XHs = void 0),
      (this.YHs = !1),
      (this.JHs = 0),
      (this.Icon = void 0),
      (this.DescBg = void 0),
      (this.SortIndex = 0),
      (this.LockDescId = void 0),
      (this.DescId = void 0),
      (this.SubTypes = []),
      (this.UnlockConditionId = void 0),
      (this.SpecialPlayPointIndexMap = new Map()),
      (this.IsRecommend = !1),
      (this.Jjl = !1),
      (this.IsShowTrackBtn = !1),
      (this.IsNewRecommendPlay = !1),
      (this.SequenceData = void 0),
      (this.FlagSequenceData = !1),
      (this.PlayProgressDataList = []),
      (this.PlayPointTotalCount = 0),
      (this.PlayPointCompletedCount = 0),
      (this.PlayPointToBeCompletedCount = 0),
      (this.PlayPointLockedCount = 0),
      (this.PlayIdMap = new Map()),
      (this.e6_ = void 0),
      (this.SpecialPlayerDesc = ""),
      (this.gQl = !1);
  }
  get IsShowProgressBar() {
    return this.Jjl && 0 < this.PlayPointTotalCount && !this.IsCompleted();
  }
  get IsFinishedPlayPoint() {
    return this.PlayPointCompletedCount >= this.PlayPointTotalCount;
  }
  get IsShowRecommendPlayPoint() {
    return this.IsRecommend && !this.IsFinishedPlayPoint && this.IsUnlocked();
  }
  Initialize(t) {
    (this.AreaId = t.Area),
      (this.ExploreType = t.ExploreType),
      (this.QHs = t.PhantomSkillId),
      (this.$Hs = t.UnlockTextId),
      (this.XHs = t.LockTextId),
      (this.UnlockConditionId = t.UnlockCondition),
      (this.SpecialPlayPointIndexMap = t.SpecialPlayerMap),
      (this.IsRecommend = t.IsRecommend),
      (this.Jjl = t.IsShowProgress),
      (this.SubTypes = Array.from(t.SubTypeScore.keys())),
      (this.SpecialPlayerDesc = t.SpecialPlayerDesc),
      (this.ConfigId = t.Id),
      (this.IsShowTrackBtn = t.IsShowTrack),
      (this.YHs = !1),
      0 !== this.QHs &&
        (this.YHs =
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            this.QHs,
          ));
    t =
      ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreTypeByType(
        this.ExploreType,
      );
    (this.KHs = t.Name),
      (this.JHs = t.CountMode),
      (this.Icon = t.Icon),
      (this.DescBg = t.DescBg),
      (this.SortIndex = t.SortIndex),
      (this.LockDescId = t.LockDescId),
      (this.DescId = t.DescId);
  }
  Refresh(t) {
    (this.VVt = t.BPs),
      (this.ExploreProgressId = t.qPs),
      (this.HPt = t.EDs),
      (this.JXt = t.dvs),
      (this.gQl = t.MT_),
      this.SOl();
  }
  GetProgress() {
    return this.VVt;
  }
  GetCurrentCount() {
    return this.HPt;
  }
  GetTotalCount() {
    return this.JXt;
  }
  GetNameId() {
    return this.KHs;
  }
  GetPlayDetailTitle() {
    var t = "PrefabTextItem_1918495092_Text",
      e = this.GetNameId(),
      t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t),
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    return StringUtils_1.StringUtils.Format(t, e);
  }
  IsPercent() {
    return 0 === this.JHs;
  }
  IsCompleted() {
    return (
      100 <= this.VVt || (0 < this.HPt && 0 < this.JXt && this.HPt >= this.JXt)
    );
  }
  HasPhantomSkill() {
    return 0 !== this.QHs;
  }
  GetUnlockTextId() {
    return this.$Hs;
  }
  GetLockTextId() {
    return this.XHs;
  }
  GetIsPhantomSkillUnlock() {
    return this.YHs;
  }
  GetPhantomSkillHelpId() {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
      this.QHs,
    );
    if (t) return t.HelpId;
  }
  IsUnlocked() {
    return this.gQl;
  }
  GetLockDetailId() {
    var t;
    return this.UnlockConditionId &&
      (t =
        ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
          this.UnlockConditionId,
        ))
      ? t.HintText
      : "";
  }
  SOl() {
    if (!(0 < this.PlayProgressDataList.length) && this.Jjl) {
      (this.PlayPointCompletedCount = this.HPt),
        (this.PlayPointToBeCompletedCount = 0),
        (this.PlayPointLockedCount = this.JXt - this.HPt),
        (this.PlayPointTotalCount = this.JXt);
      for (let t = 0; t < this.JXt; t++)
        this.PlayProgressDataList.push({
          ExploreType: this.ExploreType,
          PlayPointType: 0,
          PlayPointState: t < this.HPt ? 2 : 0,
        });
    }
  }
  IsSubType(t) {
    return this.SubTypes.includes(t);
  }
  AddPlayPointData(t) {
    this.PlayIdMap.set(t.PlayId, t),
      this.PlayPointTotalCount++,
      2 === t.PlayState
        ? this.PlayPointCompletedCount++
        : 1 === t.PlayState
          ? this.PlayPointToBeCompletedCount++
          : this.PlayPointLockedCount++,
      this.PlayProgressDataList.push({
        ExploreType: this.ExploreType,
        PlayPointType: 0,
        PlayPointState: t.PlayState,
        PlayPointId: t.PlayId,
        EntityId: t.EntityId,
        IsClear: t.IsClear,
        ClearInfo: t.ClearInfo,
      });
  }
  ClearPlayPointData() {
    this.PlayIdMap.clear(),
      (this.PlayPointTotalCount = 0),
      (this.PlayPointCompletedCount = 0),
      (this.PlayPointToBeCompletedCount = 0),
      (this.PlayPointLockedCount = 0),
      (this.PlayProgressDataList.length = 0);
  }
  PlayPointDataAddFinish() {
    0 !== this.PlayProgressDataList.length &&
      (this.PlayProgressDataList.sort(
        (t, e) => e.PlayPointState - t.PlayPointState,
      ),
      this.SpecialPlayPointIndexMap.forEach((t, e) => {
        e = this.PlayProgressDataList[e];
        e && (e.PlayPointType = t);
      }));
  }
  HasSpecialPlayPoint() {
    return this.PlayProgressDataList.some((t) => 1 === t.PlayPointType);
  }
  TrackPlayPoint() {
    if (!this.MOl()) {
      if (this.IsFinishedPlayPoint)
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("ExploreProgress", 69, "探索项已完成，不追踪"),
          !1
        );
      var t = this.yOl(),
        e = this.EOl(t);
      if (0 === e.length) return !1;
      e = 0 === t ? this.eKl(e) : this.IOl(e);
      if (!e) return !1;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ExploreProgress",
          69,
          "导航去附近标记",
          ["MarkId", e.MarkId],
          ["MarkType", e.ObjectType],
          [
            "MarkName",
            ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
              e.MarkTitle,
            ),
          ],
          ["FindState", t],
        ),
        1 === t
          ? (ModelManager_1.ModelManager.MapModel.CreateTempMapMark(e.MarkId),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapNavigate,
              { MarkId: e.MarkId, MarkType: e.ObjectType, Focal: !0 },
            ))
          : 0 === t && this.t6_(e);
    }
    return !0;
  }
  t6_(t) {
    this.e6_?.IsClear
      ? this.i6_()
      : ((t = {
          MarkId: t.MarkId,
          MarkType: t.ObjectType,
          Tips: "NoPlayPoint_Text",
          GamePlayId: t.RelativeId,
          ExploreTypeName: this.GetNameId(),
        }),
        (ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo =
          t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.NavigateMarkAndShowRange,
          t,
        ));
  }
  i6_() {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(255);
    t.FunctionMap.set(2, () => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ExploreProgress", 69, "", [
          "FindPlayIdInfo",
          this.e6_,
        ]);
      var t,
        e = this.e6_?.ClearInfo;
      e &&
        ((t = (e = e.split("_"))[0].toLowerCase()),
        (e = e[1]),
        "q" === t ? this.r6_(e) : "l" === t && this.o6_(e));
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  r6_(t) {
    var t = Number(t),
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t),
      i = e?.GetFirstNoHideTrackActiveChildQuestNode()?.NodeId ?? 0,
      r = e?.GetDefaultMark(i) ?? 0;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ExploreProgress",
        69,
        "清场-找到任务标记",
        ["QuestId", t],
        ["QuestInfo", e],
        ["NodeId", i],
        ["QuestMarkId", r],
        ["IsSuspend", e?.IsSuspend()],
      ),
      r &&
        !e?.IsSuspend() &&
        (ModelManager_1.ModelManager.MapModel.CreateTempMapMark(r),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapNavigate,
          { MarkId: r, MarkType: 12, Focal: !0 },
        ),
        this.n6_(r, 12));
  }
  o6_(t) {
    var t = Number(t),
      e = this.GetMapMarkByPlayId(t);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ExploreProgress",
        69,
        "清场-找到玩法点标记",
        ["PlayId", t],
        ["MapMark-Id", e?.MarkId],
        ["MapMark-Type", e?.ObjectType],
      ),
      e &&
        (ModelManager_1.ModelManager.MapModel.CreateTempMapMark(e.MarkId),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapNavigate,
          { MarkId: e.MarkId, MarkType: e.ObjectType, Focal: !0 },
        ),
        this.n6_(e.MarkId, e.ObjectType));
  }
  n6_(t, e) {
    var i = ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo;
    i?.MarkId === t &&
      i?.MarkType === e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HideNavigateMarkRange,
      );
  }
  MOl() {
    return !(
      0 < this.PlayIdMap.size ||
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        `Track ExploreType: ${this.ExploreType}, AreaId: ` + this.AreaId,
      ),
      0)
    );
  }
  yOl() {
    let t = 0;
    return (t = 0 < this.PlayPointToBeCompletedCount ? 1 : t);
  }
  EOl(e) {
    const i = [];
    return (
      this.PlayIdMap.forEach((t) => {
        t.PlayState === e && i.push(t);
      }),
      0 === i.length &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ExploreProgress",
          69,
          "没有找到玩法状态对应的玩法点列表",
          ["FindState", e],
          ["PlayIdMap", this.PlayIdMap],
        ),
      i
    );
  }
  IOl(t) {
    let s = void 0,
      o = void 0,
      a = Number.MAX_VALUE;
    const n = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ExploreProgress", 69, "玩家位置(未缩小)", [
          "MyPos",
          n,
        ]),
      n.DivisionEqual(1e3),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ExploreProgress",
          69,
          "玩家位置(已缩小)",
          ["MyPos", n],
          ["Scale", 1e3],
        ),
      t.forEach((t) => {
        var e,
          i,
          r = this.Czl(t);
        r &&
          ((e = r.EntityConfigId),
          (i = r.MapId),
          (e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
            e,
            i,
          )),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("ExploreProgress", 69, "标记位置(未缩小)", [
              "MarkPos",
              e,
            ]),
          e.DivisionEqual(1e3 * MapDefine_1.UNIT),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("ExploreProgress", 69, "标记位置(已缩小)", [
              "MarkPos",
              e,
            ]),
          (i = Vector_1.Vector.DistSquared(n, e)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ExploreProgress",
              69,
              "计算标记与玩家的距离",
              ["标记id", r.MarkId],
              ["标记的位置", e],
              ["距离的平方", i],
              ["Info", t],
            ),
          i < a) &&
          ((a = i), (s = r), (o = t));
      }),
      s)
    )
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ExploreProgress",
            69,
            "找到附近的标记",
            ["MarkId", s.MarkId],
            ["NearInfo", o],
          ),
        (this.e6_ = o),
        s
      );
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("ExploreProgress", 69, "没有找到附近的标记", [
        "InfoList",
        t,
      ]);
  }
  eKl(t) {
    let i = void 0,
      r = void 0;
    if (
      (t.forEach((t) => {
        var e = this.Czl(t);
        e && (!i || e.MarkId < i.MarkId) && ((i = e), (r = t));
      }),
      i)
    )
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ExploreProgress",
            69,
            "找到标记id最小的玩法点",
            ["MarkId", i.MarkId],
            ["Info", r],
          ),
        (this.e6_ = r),
        i
      );
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("ExploreProgress", 69, "没有找到标记id最小的玩法点", [
        "InfoList",
        t,
      ]);
  }
  Czl(t) {
    return this.GetMapMarkByPlayId(t.PlayId);
  }
  GetMapMarkByPlayId(t) {
    var e = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
      this.AreaId,
    );
    return ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByRelativeId(
      t,
      e.GetSceneId(),
    );
  }
  GetPlayPointStateList() {
    return this.PlayProgressDataList.map((t) => t.PlayPointState);
  }
  LogInfo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Map",
        69,
        "ExploreAreaItemData",
        ["ExploreType", this.ExploreType],
        [
          "ExploreItemName",
          ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey(
            this.GetNameId(),
          ),
        ],
        ["ConfigId", this.ConfigId],
        ["ExploreProgressId", this.ExploreProgressId],
      );
  }
  FinishNewRecommendPlay() {
    this.IsNewRecommendPlay = !1;
  }
  SetSequenceData(t) {
    this.SequenceData = t;
  }
  SetFlagSequenceData(t) {
    this.FlagSequenceData = t;
  }
  GetFlagSequenceDataAndClean() {
    var t = this.FlagSequenceData;
    return (this.FlagSequenceData = !1), t;
  }
  GetPlayProgressDataIgnoreHiddenList() {
    return this.PlayProgressDataList.map((t) => ({
      ...t,
      IgnoreHiddenType: !0,
    }));
  }
}
exports.ExploreAreaItemData = ExploreAreaItemData;
//# sourceMappingURL=ExploreAreaItemData.js.map
