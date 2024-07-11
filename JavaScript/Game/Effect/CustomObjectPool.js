"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectActorPool = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const Queue_1 = require("../../Core/Container/Queue");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const DEFAULT_CAPACITY = 4;
class CustomObjectPool {
  constructor(t = DEFAULT_CAPACITY, e = 0) {
    (this.o7 = t),
      (this.wCe = e),
      (this.BCe = void 0),
      (this.bCe = new Queue_1.Queue(this.o7));
  }
  OnSpawn(t, e) {}
  OnDeSpawn(t) {}
  OnClear() {}
  Spawn(...t) {
    let e = void 0;
    let i = !1;
    for (; this.bCe.Size; ) {
      if (((e = this.bCe.Pop()), this.OnObjectIsValid(e))) {
        i = !0;
        break;
      }
      e = void 0;
    }
    return (
      this.OnObjectIsValid(e) || ((e = this.OnCreateObject(...t)), (i = !1)),
      this.OnSpawn(i, e, ...t),
      this.wCe &&
        (this.BCe &&
          (TimerSystem_1.TimerSystem.Remove(this.BCe), (this.BCe = void 0)),
        (this.BCe = TimerSystem_1.TimerSystem.Delay(() => {
          const t = this.bCe.Size;
          const e = Math.floor(t / 2);
          if (((this.BCe = void 0), !(t <= this.o7)))
            for (let i = Math.max(e, this.o7); this.bCe.Size >= i; ) {
              const s = this.bCe.Pop();
              this.OnDestroyObject(s);
            }
        }, this.wCe))),
      e
    );
  }
  DeSpawn(t) {
    return this.OnObjectIsValid(t)
      ? (this.OnDeSpawn(t), this.bCe.Push(t), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 3, "poolObject无效，回池失败"),
        !1);
  }
  Clear() {
    for (; this.bCe.Size; ) {
      const t = this.bCe.Pop();
      this.OnDestroyObject(t);
    }
    this.BCe &&
      (TimerSystem_1.TimerSystem.Remove(this.BCe), (this.BCe = void 0)),
      this.OnClear();
  }
}
class EffectActorPool extends CustomObjectPool {
  OnCreateObject(...t) {
    let e = t[0];
    let i = void 0;
    e.IsA(UE.Actor.StaticClass()) && (i = e);
    e = t[1];
    return ActorSystem_1.ActorSystem.Get(
      UE.TsEffectActor_C.StaticClass(),
      e,
      i,
    );
  }
  OnSpawn(t, e, ...i) {
    e?.SetActorHiddenInGame(!1),
      e?.K2_DetachFromActor(1, 1, 1),
      t && ((t = i[1]), e?.K2_SetActorTransform(t, !1, void 0, !0));
  }
  OnDeSpawn(t) {
    if (!this.qCe?.IsValid()) {
      if (
        ((this.qCe = ActorSystem_1.ActorSystem.Get(
          UE.TsEffectActor_C.StaticClass(),
          new UE.Transform(),
        )),
        void 0 === this.qCe)
      )
        return;
      const e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
      (e !== 3 && e !== 2) || (this.qCe.ActorLabel = "EffectActorPool");
    }
    t.K2_AttachToActor(this.qCe, void 0, 2, 2, 2, !1);
  }
  OnObjectIsValid(t) {
    return t?.IsValid() ?? !1;
  }
  OnDestroyObject(t) {
    t.K2_DestroyActor();
  }
  OnClear() {
    this.qCe?.IsValid() && (this.qCe.K2_DestroyActor(), (this.qCe = void 0));
  }
}
exports.EffectActorPool = EffectActorPool;
// # sourceMappingURL=CustomObjectPool.js.map
