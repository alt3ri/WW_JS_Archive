"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcWaitEntityTaskController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
  WAIT_IGNORE_ACTOR_TIMEOUT = 3e4;
class NpcWaitEntityTaskController {
  constructor(t) {
    (this.vJa = void 0),
      (this.hLl = new Array()),
      (this.STe = new Map()),
      (this.gU = !1),
      (this.vJa = t);
  }
  AU() {
    this.STe.set(0, NpcIgnoreCollisionTask);
  }
  Dispose() {
    for (const t of this.hLl) t.Stop();
    this.hLl.length = 0;
  }
  AddTask(t, e) {
    if (t?.length) {
      this.gU || ((this.gU = !0), this.AU());
      var i = this.STe.get(e);
      for (const o of t) {
        var s = new i(this.vJa, o);
        this.hLl.push(s);
      }
    }
  }
  RunTask() {
    for (const t of this.hLl) t.Start();
  }
}
exports.NpcWaitEntityTaskController = NpcWaitEntityTaskController;
class NpcWaitEntityTask {
  constructor(t, e) {
    (this.NpcEntity = void 0),
      (this.PbDataIdToWait = 0),
      (this.EntityType = void 0),
      (this.WaitEntityTaskHandle = void 0),
      (this.Phase = 0),
      (this.OnEntityAdd = (t) => {
        (this.WaitEntityTaskHandle = void 0),
          t &&
          (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
            this.PbDataIdToWait,
          ))?.Valid
            ? this.TryExecute(t.Entity)
            : (this.Phase = 3);
      }),
      (this.OnSceneItemLoadComplete = () => {
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.PbDataIdToWait,
        ).Entity;
        EventSystem_1.EventSystem.RemoveWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.OnSceneItemLoadComplete,
        ),
          this.Execute(t);
      }),
      (this.NpcEntity = t),
      (this.PbDataIdToWait = e);
  }
  Start() {
    0 !== this.Phase ||
      this.WaitEntityTaskHandle ||
      ((this.Phase = 1),
      (this.WaitEntityTaskHandle =
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
          "NpcWaitEntityTask.Start",
          this.PbDataIdToWait,
          this.OnEntityAdd,
          WAIT_IGNORE_ACTOR_TIMEOUT,
          !1,
          !0,
        )));
  }
  Stop() {
    var t;
    2 !== this.Phase
      ? 1 === this.Phase && this.Cancel()
      : (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.PbDataIdToWait,
        ))?.Valid && this.TryReset(t.Entity);
  }
  Cancel() {
    var t;
    this.WaitEntityTaskHandle
      ? this.WaitEntityTaskHandle.Cancel()
      : (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.PbDataIdToWait,
        )?.Entity)?.Valid &&
        t.GetComponent(0).GetEntityType() ===
          Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
        EventSystem_1.EventSystem.HasWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.OnSceneItemLoadComplete,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.OnSceneItemLoadComplete,
        );
  }
  Finish() {
    this.Phase = 2;
  }
  TryExecute(t) {
    var e = t.GetComponent(0);
    if (e)
      switch (e.GetEntityType()) {
        case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          this.TryExecuteWithSceneItemActor(t);
          break;
        case Protocol_1.Aki.Protocol.kks.HI_:
          this.Execute(t);
          break;
        default:
          this.Phase = 3;
      }
    else this.Phase = 3;
  }
  TryExecuteWithSceneItemActor(t) {
    t.GetComponent(200)?.GetIsSceneInteractionLoadCompleted()
      ? this.Execute(t)
      : EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.OnSceneItemLoadComplete,
        );
  }
  TryReset(t) {
    t.GetComponent(0) && this.Reset(t);
  }
  Reset(t) {
    t.GetComponent(200)?.GetIsSceneInteractionLoadCompleted();
  }
  Execute(t) {
    this.Finish();
  }
}
class NpcIgnoreCollisionTask extends NpcWaitEntityTask {
  Reset(t) {
    t.GetComponent(200)?.GetIsSceneInteractionLoadCompleted() &&
      this.IJa(t, !1);
  }
  Execute(t) {
    this.IJa(t, !0), this.Finish();
  }
  IJa(t, e) {
    var i,
      t = t.GetComponent(200),
      s = this.NpcEntity?.GetComponent(2);
    t && s && (i = t.GetInteractCollisionActor())?.IsValid()
      ? (s.Actor.IgnoreActorWhenMoving(i, e, !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            50,
            "忽视场景物体碰撞",
            ["NpcPbDataId", s.CreatureData.GetPbDataId()],
            ["SceneItemPbDataId", t.CreatureData.GetPbDataId()],
            ["Ignore", e],
          ))
      : (this.Phase = 3);
  }
}
//# sourceMappingURL=NpcWaitEntityTaskController.js.map
