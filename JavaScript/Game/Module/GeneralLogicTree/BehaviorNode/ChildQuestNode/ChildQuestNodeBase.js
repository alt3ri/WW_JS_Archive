"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChildQuestNodeBase = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  BehaviorNodeBase_1 = require("../BehaviorNodeBase");
class ChildQuestNodeBase extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor(t) {
    super(t),
      (this.ChildQuestType = IQuest_1.EChildQuest.CheckEntityState),
      (this.CustomTrackIconId = 0),
      (this.ChildQuestStatus = void 0),
      (this.OnAfterSubmit = (t) => {}),
      (this.NodeType = "ChildQuest");
  }
  get CanGiveUp() {
    return (
      this.ChildQuestStatus === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress
    );
  }
  get IsFinished() {
    return (
      this.ChildQuestStatus ===
        Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished ||
      this.ChildQuestStatus ===
        Protocol_1.Aki.Protocol.FNs.Proto_CQNS_FinishAction
    );
  }
  Init(t, e, i, s, h) {
    "ChildQuest" === s.Type &&
      (super.Init(t, e, i, s, h),
      (this.ChildQuestStatus =
        Protocol_1.Aki.Protocol.FNs.Proto_CQNS_NotActive),
      (this.CustomTrackIconId = s.CustomIcon ?? 0),
      i.nEs) &&
      (this.UpdateChildQuestStatus(i.nEs.H6n, e),
      this.UpdateProgress(i.nEs.nvs));
  }
  UpdateChildQuestStatus(t, e) {
    var i = this.ChildQuestStatus;
    if (((this.ChildQuestStatus = t), i !== this.ChildQuestStatus)) {
      switch (t) {
        case Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress:
          this.il(e);
          break;
        case Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished:
          this.$ne();
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.Context,
        i,
        this.ChildQuestStatus,
      ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Blackboard,
          EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
          this.Context,
          i,
          this.ChildQuestStatus,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange,
          this.Context,
          i,
          this.ChildQuestStatus,
        );
    }
  }
  OnNodeActive() {
    this.AddTag(0, this.NodeId.toString());
  }
  il(t) {
    this.AddEventsOnChildQuestStart(), this.OnStart(t);
  }
  $ne() {
    this.wXt(!0);
  }
  OnNodeDeActive(t) {
    this.RemoveTag(0, this.NodeId.toString()),
      t ||
        (this.wXt(!1),
        (this.ChildQuestStatus =
          Protocol_1.Aki.Protocol.FNs.Proto_CQNS_NotActive));
  }
  wXt(t) {
    this.RemoveEventsOnChildQuestEnd(), this.OnEnd(t);
  }
  OnCreate(t) {
    return (
      (this.ChildQuestType = t.Condition.Type),
      t.HideTip && this.AddTag(3),
      t.HideUiExceptTaskList && (this.AddTag(2), this.AddTag(3)),
      t.HideUi && (this.AddTag(2), this.AddTag(3), this.AddTag(4)),
      t.ShowNavigation &&
        (this.AddTag(5), (this.NavigationStyle = t.NavigationStyle ?? 0)),
      t.AlwaysShowNavigation && this.AddTag(6),
      (this.TrackTarget = t.TrackTarget),
      (this.TrackTextConfig = t.TidTip),
      (this.MultiTrackText = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        this.TrackTextConfig,
      )),
      (this.ShowTipBeforeEnterActions = t.ShowTipBeforeEnterActions ?? !1),
      !0
    );
  }
  OnStart(t) {}
  OnEnd(t) {}
  AddEventsOnChildQuestStart() {}
  RemoveEventsOnChildQuestEnd() {}
  SubmitNode(t = void 0) {
    this.Blackboard.ContainTag(7) ||
      this.Blackboard.IsSuspend() ||
      (this.OnBeforeSubmit(),
      ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestSubmitNode(
        this.Context,
        this.OnAfterSubmit,
        t,
      ));
  }
  OnBeforeSubmit() {}
  GetCorrelativeEntities() {
    return this.CorrelativeEntities;
  }
}
exports.ChildQuestNodeBase = ChildQuestNodeBase;
//# sourceMappingURL=ChildQuestNodeBase.js.map
