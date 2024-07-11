"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityToLoadTask = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
  Pool_1 = require("../../../Core/Container/Pool"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PlayerVelocityController_1 = require("../Controller/PlayerVelocityController");
class EntityHandleCallbackPair {
  constructor() {
    (this.Handle = void 0),
      (this.Callback = void 0),
      (this.CreatureDataId = 0),
      (this.PbDataId = 0),
      (this.AngleRatio = 0),
      (this.Priority = 0);
  }
}
const NORMAL_MAX_LOADING_ENTITY_COUNT = 4,
  HIGH_SPEED_MAX_LOADING_ENTITY_COUNT = 1,
  DELAY_CHECK_HIGH_SPEED = 200,
  HIGH_SPEED_IGNORED_ANGLE_RATIO = 0.3,
  ENABLE_SUSPEND_LOADING_FOR_HIGH_SPEED_MODE = !1;
class WaitEntityToLoadTask {
  constructor(t) {
    (this.Yva = () => !1),
      (this.Pva = new PriorityQueue_1.PriorityQueue((t, i) => {
        var e = this.wva(t.AngleRatio);
        return e === this.wva(i.AngleRatio)
          ? t.Priority - i.Priority
          : e
            ? 1
            : -1;
      })),
      (this.Bva = new Map()),
      (this.bva = []),
      (this.qva = NORMAL_MAX_LOADING_ENTITY_COUNT),
      (this.Gva = 0),
      (this.Ova = void 0),
      (this.Nva = !1),
      (this.kva = !1),
      (this.Fva = Vector_1.Vector.Create()),
      (this.Vva = Vector_1.Vector.Create()),
      (this.Hva = Vector_1.Vector.Create()),
      (this.jva = Vector_1.Vector.Create()),
      (this.Wva = Vector_1.Vector.Create()),
      (this.Qva = void 0),
      (this.Kva = void 0),
      (this.$va = (t) => {
        for (this.Rva(t); 0 === this.Xva(); );
      }),
      (this.Yva = t);
  }
  OnInit() {
    this.Vr(),
      (this.qva = NORMAL_MAX_LOADING_ENTITY_COUNT),
      (this.Gva = 0),
      (this.Nva =
        PlayerVelocityController_1.PlayerVelocityController.IsHighSpeedMode()),
      (this.kva = !1);
  }
  OnClear() {
    this.Jva(),
      this.Pva.Clear(),
      this.Bva.clear(),
      (this.bva.length = 0),
      this.Ova &&
        (TimerSystem_1.TimerSystem.Remove(this.Ova), (this.Ova = void 0));
  }
  Vr() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHighSpeedModeChanged,
      this.$va,
    );
  }
  Jva() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHighSpeedModeChanged,
      this.$va,
    );
  }
  static zva(t, i, e, s) {
    let r = this.Zva.Get();
    return (
      ((r = r || WaitEntityToLoadTask.Zva.Create()).Handle = t),
      (r.Callback = i),
      (r.CreatureDataId = e),
      (r.PbDataId = s),
      (r.Priority = t.Priority),
      r
    );
  }
  QueueToInvoke(t, i, e, s) {
    this.Gva < this.qva
      ? this.eMa(t, i, !0)
      : ((t = WaitEntityToLoadTask.zva(t, i, e, s)),
        this.Pva.Push(t),
        this.Bva.set(t.Handle, t),
        this.bva.push(t.Handle));
  }
  RemoveEntity(t) {
    var i = this.Bva.get(t);
    i &&
      (this.Pva.Remove(i), this.Bva.delete(t), WaitEntityToLoadTask.Zva.Put(i));
  }
  eMa(t, e, i) {
    this.Gva++,
      this.Yva(
        t,
        (t, i) => {
          try {
            e?.(t, i);
          } finally {
            this.Gva--, this.Xva();
          }
        },
        !i,
      ) || (this.Gva--, this.Xva());
  }
  Rva(t) {
    (this.kva = this.Nva !== t),
      this.kva &&
        ((this.Nva = t),
        (this.qva = t
          ? HIGH_SPEED_MAX_LOADING_ENTITY_COUNT
          : NORMAL_MAX_LOADING_ENTITY_COUNT));
  }
  wva(t) {
    return (
      !(!ENABLE_SUSPEND_LOADING_FOR_HIGH_SPEED_MODE || !this.Nva) &&
      t > HIGH_SPEED_IGNORED_ANGLE_RATIO
    );
  }
  tMa() {
    return 0 < this.Pva.Size && this.Gva < this.qva;
  }
  Xva() {
    if (!this.tMa()) return 1;
    this.iMa();
    var t = this.Pva.Top;
    return this.wva(t.AngleRatio)
      ? (this.Ova ||
          (this.Ova = TimerSystem_1.TimerSystem.Forever(() => {
            let t = 1;
            for (;;) if (0 !== (t = this.Xva())) break;
            1 === t &&
              (TimerSystem_1.TimerSystem.Remove(this.Ova), (this.Ova = void 0));
          }, DELAY_CHECK_HIGH_SPEED)),
        2)
      : (this.Pva.Pop(),
        this.Bva.delete(t.Handle),
        WaitEntityToLoadTask.Zva.Put(t),
        this.eMa(t.Handle, t.Callback),
        0);
  }
  iMa() {
    this.Pva.Size > this.qva - this.Gva
      ? (this.rMa() || this.kva) && ((this.kva = !1), this.Pva.Heapify())
      : (this.bva.length = 0);
  }
  rMa() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        3,
      );
    if (!t) return !1;
    let i = !1;
    return (
      Vector_1.Vector.PointsAreSame(this.Fva, t.ActorLocationProxy) &&
      Vector_1.Vector.PointsAreSame(this.Vva, t.ActorForwardProxy)
        ? 0 < this.bva.length &&
          (this.bva.forEach((t) => {
            t = this.Bva.get(t);
            t && this.oMa(t);
          }),
          (this.bva.length = 0),
          (i = !0))
        : (this.Fva.DeepCopy(t.ActorLocationProxy),
          this.Vva.DeepCopy(t.ActorForwardProxy),
          this.Vva.AdditionEqual(
            PlayerVelocityController_1.PlayerVelocityController.GetAvgVelocity(),
          ).GetSafeNormal(this.Hva),
          (this.bva.length = 0),
          this.Bva.forEach((t, i) => {
            this.oMa(t);
          }),
          (i = !0)),
      i
    );
  }
  oMa(t) {
    var i = t.Handle.Entity.GetComponent(0).GetLocation(),
      i =
        (this.jva.DeepCopy(i), Vector_1.Vector.DistSquared(this.jva, this.Fva)),
      e =
        (this.Fva.Subtraction(this.jva, this.Wva),
        this.Wva.Normalize()
          ? Vector_1.Vector.DotProduct(this.Wva, this.Hva)
          : -1),
      e = 0.5 * e + 0.5;
    (t.AngleRatio = e), (t.Priority = i * e);
  }
}
(exports.WaitEntityToLoadTask = WaitEntityToLoadTask).Zva = new Pool_1.Pool(
  200,
  () => new EntityHandleCallbackPair(),
);
//# sourceMappingURL=WaitEntityToLoadTask.js.map
