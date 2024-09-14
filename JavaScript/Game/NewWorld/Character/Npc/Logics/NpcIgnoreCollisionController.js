"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcIgnoreCollisionController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
  WAIT_IGNORE_ACTOR_TIMEOUT = 3e4;
class NpcIgnoreCollisionController {
  constructor(t) {
    (this.G$a = void 0), (this.k$a = new Array()), (this.G$a = t);
  }
  Dispose() {
    for (const t of this.k$a) t.ExecuteRestore();
    this.k$a.length = 0;
  }
  AddTask(t) {
    if (t?.length)
      for (const i of t) {
        var e = new NpcIgnoreCollisionTask(this.G$a, i);
        this.k$a.push(e);
      }
  }
  RunTask() {
    for (const t of this.k$a) t.ExecuteIgnore();
  }
}
exports.NpcIgnoreCollisionController = NpcIgnoreCollisionController;
class NpcIgnoreCollisionTask {
  constructor(t, e) {
    (this.NpcEntity = void 0),
      (this.PbDataIdToIgnore = 0),
      (this.EntityType = void 0),
      (this.WaitEntityTaskHandle = void 0),
      (this.Phase = 0),
      (this.N$a = (t) => {
        (this.WaitEntityTaskHandle = void 0),
          t &&
          (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
            this.PbDataIdToIgnore,
          ))?.Valid
            ? this.F$a(t.Entity)
            : (this.Phase = 3);
      }),
      (this.V$a = () => {
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.PbDataIdToIgnore,
        ).Entity;
        EventSystem_1.EventSystem.RemoveWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.V$a,
        ),
          this.H$a(t, !0);
      }),
      (this.NpcEntity = t),
      (this.PbDataIdToIgnore = e);
  }
  ExecuteIgnore() {
    0 !== this.Phase ||
      this.WaitEntityTaskHandle ||
      ((this.Phase = 1),
      (this.WaitEntityTaskHandle =
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
          this.PbDataIdToIgnore,
          this.N$a,
          WAIT_IGNORE_ACTOR_TIMEOUT,
          !1,
          !0,
        )));
  }
  ExecuteRestore() {
    var t;
    2 !== this.Phase
      ? 1 === this.Phase && this.Cancel()
      : (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.PbDataIdToIgnore,
        ))?.Valid && this.j$a(t.Entity);
  }
  Cancel() {
    var t;
    this.WaitEntityTaskHandle
      ? this.WaitEntityTaskHandle.Cancel()
      : (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.PbDataIdToIgnore,
        )?.Entity)?.Valid &&
        t.GetComponent(0).GetEntityType() ===
          Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
        EventSystem_1.EventSystem.HasWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.V$a,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.V$a,
        );
  }
  $ne() {
    this.Phase = 2;
  }
  F$a(t) {
    var e = t.GetComponent(0);
    e && e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem
      ? this.W$a(t)
      : (this.Phase = 3);
  }
  W$a(t) {
    t.GetComponent(187)?.GetIsSceneInteractionLoadCompleted()
      ? this.H$a(t, !0)
      : EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.V$a,
        );
  }
  j$a(t) {
    var e = t.GetComponent(0);
    e &&
      e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
      this.Q$a(t);
  }
  Q$a(t) {
    t.GetComponent(187)?.GetIsSceneInteractionLoadCompleted() &&
      this.H$a(t, !1);
  }
  H$a(t, e) {
    var i,
      t = t.GetComponent(187),
      s = this.NpcEntity?.GetComponent(2);
    t && s && (i = t.GetInteractCollisionActor())?.IsValid()
      ? (s.Actor.IgnoreActorWhenMoving(i, e, !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            51,
            "忽视场景物体碰撞",
            ["NpcPbDataId", s.CreatureData.GetPbDataId()],
            ["SceneItemPbDataId", t.CreatureData.GetPbDataId()],
            ["Ignore", e],
          ),
        this.$ne())
      : (this.Phase = 3);
  }
}
//# sourceMappingURL=NpcIgnoreCollisionController.js.map
