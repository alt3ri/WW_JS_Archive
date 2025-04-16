"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyBoardData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  DangoMonopolyGridData_1 = require("./DangoMonopolyGridData");
class DangoMonopolyBoardData {
  constructor(t, i) {
    (this.Id = 0),
      (this.GroupId = 0),
      (this.Index = 0),
      (this.IsRewarded = !1),
      (this.RewardItemId = 0),
      (this.RewardItemCount = 0),
      (this.FinishTitle = ""),
      (this.FinishDesc = ""),
      (this.GridList = []),
      (this.GridMap = new Map()),
      (this.ActivityData = void 0),
      (this.UnlockTime = 0),
      (this.RecordRollDiceTimes = 0),
      (this.RecordTriggerBuffMap = new Map()),
      (this.OwnedBuffIdList = []),
      (this.Id = t),
      (this.Index = i);
  }
  static Create(t, i) {
    i = new DangoMonopolyBoardData(t.BoardId, i);
    return i.AU(t), i;
  }
  AU(t) {
    (this.RewardItemId = t.ItemId),
      (this.RewardItemCount = t.ItemNum),
      (this.GroupId = t.BoardGroupId),
      (this.FinishTitle = t.FinishTitle),
      (this.FinishDesc = t.FinishDesc),
      ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetGridList(
        t.GridGroupId,
      ).forEach((t, i) => {
        i = DangoMonopolyGridData_1.DangoMonopolyGridData.Create(t, i, this);
        this.GridList.push(i), this.GridMap.set(t.GridId, i);
      });
  }
  SetActivityData(t) {
    this.ActivityData = t;
  }
  SetRewarded(t) {
    this.IsRewarded = t;
  }
  IsFinish() {
    var t = this.ActivityData?.CurrentBoardData;
    if (t?.IsGreaterIndex(this.Index)) return !0;
    if (
      t?.IsEqualIndex(this.Index) &&
      !this.GetCurrentGridData()?.IsLessIndex(this.GridList.length - 1)
    )
      return !0;
    return !1;
  }
  IsRunning() {
    return !!this.ActivityData?.CurrentBoardData?.IsEqualIndex(this.Index);
  }
  GetCurrentGridData() {
    if (this.IsRunning()) return this.ActivityData?.RunningGridData;
  }
  IsGreaterIndex(t) {
    return this.Index > t;
  }
  IsEqualIndex(t) {
    return this.Index === t;
  }
  IsLessIndex(t) {
    return this.Index < t;
  }
  IsCanReceiveReward() {
    return !this.IsRewarded && !!this.IsFinish();
  }
  GetDangoBuffShowList() {
    const s = [],
      o = this.GetFinishGridNum();
    return (
      this.GridList.forEach((t) => {
        var i,
          r,
          e = t.GetDangoData();
        e &&
          ((i = e.Id),
          (r = t.GetAddPropertyConfig()),
          s.push({
            DangoId: i,
            PropertyId: r?.Id ?? 0,
            GridId: t.Id,
            IsActive: o >= t.GetPosition(),
            DangoIcon: e.Icon,
            DangoName: e.NameKey,
            PropertyDesc: r?.Desc ?? "not property, gridId: " + t.Id,
            PropertyTitle: r?.Title ?? "not property, gridId: " + t.Id,
          }));
      }),
      s
    );
  }
  GetAllGridRewardItemList() {
    const i = [];
    return (
      this.GridList.forEach((t) => {
        t.IsExistItem() &&
          i.push({
            Id: t.ItemId,
            Num: t.ItemCount,
            IsDouble: t.IsActiveDouble(),
            UniqueId: 0,
          });
      }),
      this.ActivityData?.GetItemShowList(i) ?? []
    );
  }
  GetPosition() {
    return this.Index + 1;
  }
  GetFinishGridNum() {
    var t;
    return this.IsFinish()
      ? this.GridList.length
      : (t = this.GetCurrentGridData())
        ? t.GetPosition()
        : 0;
  }
  InitStartMoveDango(t) {
    if (!this.IsRunning()) return 0;
    var i = this.GetCurrentGridData();
    if (!i) {
      const s = this.GridList[t] ?? this.GridList[this.GridList.length - 1];
      return this.ActivityData?.UpdateTargetGrid(s?.Id), s.GetPosition();
    }
    var i = i.Index,
      r = Math.min(i + t, this.GridList.length - 1),
      e = r - i;
    const s = this.GridList[r];
    return (
      this.ActivityData?.UpdateTargetGrid(s?.Id),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "DangoMonopoly",
          69,
          "InitStartMoveDango=>初始化移动",
          ["骰子最终结果(包含特性之后)", t],
          ["实际移动步数", e],
          ["起点Index", i],
          ["目标格子Id", s.Id],
          ["目标格子Index", r],
          ["目标格子位置", s.GetPosition()],
        ),
      e
    );
  }
  MoveDangoOneStep() {
    var t, i;
    return (
      !!this.IsRunning() &&
      ((i = this.ActivityData?.RunningGridData?.Id ?? 0),
      (t = this.ActivityData?.TargetGridData?.Id ?? 0),
      (i = Math.min(i + 1, t)),
      this.ActivityData?.UpdateRunningGrid(i),
      !0)
    );
  }
  IsMoveToTarget() {
    return (
      (this.ActivityData?.RunningGridData?.Id ?? 0) ===
      (this.ActivityData?.TargetGridData?.Id ?? 0)
    );
  }
  GetEndGridId() {
    return this.GridList[this.GridList.length - 1]?.Id ?? 0;
  }
  GetStartGridId() {
    return this.GridList[0]?.Id ?? 0;
  }
  GetFirstDoubleGrid() {
    return this.GridList.find((t) => t.PropertyIsDouble());
  }
  IsLock() {
    return 0 < this.GetUnlockRemainTime();
  }
  GetUnlockRemainTime() {
    return this.UnlockTime <= 0
      ? 0
      : Math.max(0, this.UnlockTime - TimeUtil_1.TimeUtil.GetServerTime());
  }
  UpdateUnlockTime(t) {
    t = MathUtils_1.MathUtils.LongToNumber(t ?? 0);
    this.UnlockTime = t;
  }
  UpdateRollDiceTimes(t) {
    this.RecordRollDiceTimes = t ?? 0;
  }
  AddRollDiceTimes() {
    this.RecordRollDiceTimes++;
  }
  UpdateRecordTriggerBuff(t, i) {
    this.RecordTriggerBuffMap.set(t, i);
  }
  AddRecordTriggerBuff(t) {
    var i;
    t <= 0 ||
      ((i = this.RecordTriggerBuffMap.get(t) ?? 0),
      this.RecordTriggerBuffMap.set(t, i + 1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "DangoMonopoly",
          69,
          "添加触发的特性记录",
          ["棋盘id", this.Id],
          ["特性id", t],
          ["次数", i + 1],
        ));
  }
  ClearRecordTriggerBuff() {
    this.RecordTriggerBuffMap.clear(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, "清理触发的特性记录", [
          "棋盘id",
          this.Id,
        ]);
  }
  GetRecordTriggerBuffTotalTimes() {
    let r = 0;
    return (
      this.RecordTriggerBuffMap.forEach((t, i) => {
        this.ActivityData?.BuffIsImplicit(i) || (r += t);
      }),
      r
    );
  }
  UpdateOwnedBuffIdList(t) {
    this.OwnedBuffIdList.push(t);
  }
  ClearOwnedBuffIdList() {
    this.OwnedBuffIdList.length = 0;
  }
  GetGridListDango() {
    return this.GridList.filter((t) => t.IsExistDango());
  }
  GetDangoIdByBuffId(i) {
    return (
      this.GetGridListDango().find((t) => t.AddPropertyId === i)?.DangoId ??
      this.ActivityData?.Dango?.Id ??
      0
    );
  }
}
exports.DangoMonopolyBoardData = DangoMonopolyBoardData;
//# sourceMappingURL=DangoMonopolyBoardData.js.map
