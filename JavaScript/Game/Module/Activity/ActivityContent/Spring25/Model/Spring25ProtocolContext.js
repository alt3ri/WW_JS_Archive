"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25ProtocolContext = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ActivityData_1 = require("../../../ActivityData");
var Proto_ActivityTaskState = Protocol_1.Aki.Protocol.I$s;
class Spring25ProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor(t) {
    super(),
      (this.i5l = void 0),
      (this.IsSkinRewarded = !1),
      (this.CanInvite = !1),
      (this.QGl = new Map()),
      (this.KGl = new Set()),
      (this.i5l = t);
  }
  Dispose() {
    (this.CanInvite = !1), this.QGl.clear(), this.KGl.clear();
  }
  PhraseEx(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Spring25", 64, "解析春节活动数据", ["ActivityData", t]);
    t = t.QS_;
    t &&
      (this.ZVa(t),
      UiManager_1.UiManager.IsViewShow("Spring25DialogueView") ||
        UiManager_1.UiManager.IsViewShow("Spring25EnvelopeView") ||
        this.i5l.ResetCurrentSignId(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.Spring25ActivityParseDone,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      ));
  }
  GetExDataRedPointShowState() {
    return this.i5l.HasRedDot;
  }
  get SignCountRemain() {
    return this.CanInvite ? 1 : 0;
  }
  get FinishTaskCount() {
    let t = 0;
    for (var [, e] of this.QGl)
      e.H6n > Proto_ActivityTaskState.Proto_ActivityTaskRunning && ++t;
    return t;
  }
  get InvitedCount() {
    return this.KGl.size;
  }
  get TaskCache() {
    return this.QGl;
  }
  get InvitedRoleSet() {
    return this.KGl;
  }
  get HasAnyReward() {
    for (var [, t] of this.QGl)
      if (t.H6n === Proto_ActivityTaskState.Proto_ActivityTaskFinish) return !0;
    return this.i5l.IsAllInvited && !this.IsSkinRewarded;
  }
  get IsInviteAvailable() {
    return this.CanInvite;
  }
  GetTaskCurrentByTaskId(t) {
    return this.QGl.get(t)?.lMs ?? 0;
  }
  GetTaskTargetByTaskId(t) {
    return this.QGl.get(t)?.j6n ?? 0;
  }
  GetTaskStateByTaskId(t) {
    return (
      this.QGl.get(t)?.H6n ?? Proto_ActivityTaskState.Proto_ActivityTaskRunning
    );
  }
  GetTaskRewardPreviewByTaskId(t) {
    var e = [],
      t = this.QGl.get(t);
    if (void 0 !== t) {
      var i = t.IE_;
      for (const s of Object.keys(i)) {
        var r = [{ IncId: 0, ItemId: Number.parseInt(s) }, i[s]];
        e.push(r);
      }
    }
    return e;
  }
  IsRoleInvitedById(t) {
    return this.KGl.has(t);
  }
  ZVa(t) {
    (this.CanInvite = t.wM_), this.QGl.clear();
    for (const e of t.LM_) this.QGl.set(e.s5n, e);
    this.KGl.clear();
    for (const i of t.RM_) this.KGl.add(i);
    (this.IsSkinRewarded = t.AM_),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Spring25",
          64,
          "解析春节活动数据的结果",
          ["TaskCacheInternal", this.QGl],
          ["InvitedRoleSetInternal", this.KGl],
          ["IsSkinRewarded", this.IsSkinRewarded],
          ["CanInvite", this.CanInvite],
        );
  }
  SyncTaskStateByTaskId(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Spring25", 64, "同步邀请角色奖励", ["rewarded id", t]);
    t = this.TaskCache.get(t);
    void 0 !== t &&
      (t.lMs++, (t.H6n = Proto_ActivityTaskState.Proto_ActivityTaskTaken));
  }
  SyncSkinReward() {
    this.IsSkinRewarded = !0;
  }
}
exports.Spring25ProtocolContext = Spring25ProtocolContext;
//# sourceMappingURL=Spring25ProtocolContext.js.map
