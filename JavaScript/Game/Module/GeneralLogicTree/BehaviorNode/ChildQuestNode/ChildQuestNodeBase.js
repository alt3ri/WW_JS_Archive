"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChildQuestNodeBase = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController"),
  BehaviorNodeBase_1 = require("../BehaviorNodeBase");
class ChildQuestNodeBase extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor(t) {
    super(t),
      (this.ChildQuestType = IQuest_1.EChildQuest.CheckEntityState),
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
  Init(t, e, i, s, r) {
    "ChildQuest" === s.Type &&
      (super.Init(t, e, i, s, r),
      (this.ChildQuestStatus =
        Protocol_1.Aki.Protocol.FNs.Proto_CQNS_NotActive),
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
        );
    }
  }
  OnNodeActive() {
    this.ContainTag(2) || this.AddTag(0);
  }
  il(t) {
    this.AddEventsOnChildQuestStart(), this.OnStart(t);
  }
  $ne() {
    this.wXt(!0);
  }
  OnNodeDeActive(t) {
    this.RemoveTag(0),
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
      t.HideUi && (this.AddTag(2), this.AddTag(3)),
      t.ShowNavigation && this.AddTag(4),
      t.AlwaysShowNavigation && this.AddTag(5),
      (this.TrackTarget = t.TrackTarget),
      (this.TrackTextConfig = t.TidTip),
      (this.MultiTrackText = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        this.TrackTextConfig,
      )),
      !0
    );
  }
  OnStart(t) {}
  OnEnd(t) {}
  AddEventsOnChildQuestStart() {}
  RemoveEventsOnChildQuestEnd() {}
  SubmitNode(t = void 0) {
    this.Blackboard.ContainTag(6) ||
      this.Blackboard.IsSuspend() ||
      (this.OnBeforeSubmit(),
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestSubmitNode(
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
