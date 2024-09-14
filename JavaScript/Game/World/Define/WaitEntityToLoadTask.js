"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityToLoadTask = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Pool_1 = require("../../../Core/Container/Pool"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  PlayerVelocityController_1 = require("../Controller/PlayerVelocityController");
class EntityHandleCallbackPair {
  constructor() {
    (this.Handle = void 0),
      (this.Dto = []),
      (this.CreatureDataId = 0),
      (this.PbDataId = 0),
      (this.AngleRatio = 0),
      (this.Priority = 0),
      (this.Order = 0),
      (this.Version = 0);
  }
  AddCallback(t) {
    t && this.Dto.push(t);
  }
  ClearCallbacks() {
    this.Dto.length = 0;
  }
  InvokeCallbacks(i) {
    this.Dto.forEach((t) => {
      t(i);
    });
  }
}
const NORMAL_MAX_LOADING_ENTITY_COUNT = 4,
  HIGH_SPEED_MAX_LOADING_ENTITY_COUNT = 1,
  DELAY_CHECK_HIGH_SPEED = 200,
  HIGH_SPEED_IGNORED_ANGLE_RATIO = 0.3,
  ENABLE_SUSPEND_LOADING_FOR_HIGH_SPEED_MODE = !1;
class WaitEntityToLoadTask {
  constructor(t, i) {
    (this.rya = () => 0),
      (this.qVa = () => {}),
      (this.kEa = new PriorityQueue_1.PriorityQueue((t, i) => {
        var e = this.NEa(t.AngleRatio);
        return e === this.NEa(i.AngleRatio)
          ? t.Priority === i.Priority
            ? t.Order - i.Order
            : t.Priority - i.Priority
          : e
            ? 1
            : -1;
      })),
      (this.FEa = new Map()),
      (this.s9a = new Map()),
      (this.VEa = []),
      (this.HEa = NORMAL_MAX_LOADING_ENTITY_COUNT),
      (this.jEa = 0),
      (this.WEa = void 0),
      (this.QEa = !1),
      (this.KEa = !1),
      (this.OVa = 0),
      (this.$Ea = Vector_1.Vector.Create()),
      (this.XEa = Vector_1.Vector.Create()),
      (this.YEa = Vector_1.Vector.Create()),
      (this.JEa = Vector_1.Vector.Create()),
      (this.zEa = Vector_1.Vector.Create()),
      (this.ZEa = Stats_1.Stat.Create("WaitEntityToLoadTask.Sort")),
      (this.eya = Stats_1.Stat.Create("WaitEntityToLoadTask.UpdatePriority")),
      (this.tya = (t) => {
        for (this.bEa(t); 0 === this.iya(); );
      }),
      (this.rya = t),
      (this.qVa = i);
  }
  OnInit() {
    this.Vr(),
      (this.HEa = NORMAL_MAX_LOADING_ENTITY_COUNT),
      (this.jEa = 0),
      (this.QEa =
        PlayerVelocityController_1.PlayerVelocityController.IsHighSpeedMode()),
      (this.KEa = !1);
  }
  OnClear() {
    this.oya(),
      this.kEa.Clear(),
      this.FEa.clear(),
      this.s9a.clear(),
      (this.VEa.length = 0),
      this.WEa &&
        (TimerSystem_1.TimerSystem.Remove(this.WEa), (this.WEa = void 0));
  }
  Vr() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHighSpeedModeChanged,
      this.tya,
    );
  }
  oya() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHighSpeedModeChanged,
      this.tya,
    );
  }
  static nya(t, i, e, r) {
    let s = this.sya.Get();
    return (
      ((s = s || WaitEntityToLoadTask.sya.Create()).Handle = t),
      (s.CreatureDataId = e),
      (s.PbDataId = r),
      (s.Priority = t.Priority),
      (s.AngleRatio = 0),
      (s.Order = 0),
      s.AddCallback(i),
      s.Version++,
      s
    );
  }
  GVa(t) {
    0 === this.kEa.Size && (this.OVa = 0), (t.Order = this.OVa++);
  }
  a9a(t) {
    let i = this.s9a.get(t);
    return (i = i || this.FEa.get(t));
  }
  static w$a(t) {
    var i = t.Entity.GetComponent(0);
    return !(
      (PreloadDefine_1.PreloadSetting.UseNewPreload &&
        i.GetPreloadFinished()) ||
      (((i = i.GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Custom ||
        i === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity) &&
        (i === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity &&
          (t.Priority = 105),
        1))
    );
  }
  QueueToInvoke(t, i, e, r) {
    let s = this.a9a(t);
    s
      ? s.AddCallback(i)
      : ((s = WaitEntityToLoadTask.nya(t, i, e, r)),
        WaitEntityToLoadTask.w$a(t)
          ? this.jEa < this.HEa
            ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Preload",
                  61,
                  "预加载实体:直接加载",
                  ["EntityId", t.Id],
                  ["CreatureDataId", s.CreatureDataId],
                  ["PbDataId", s.PbDataId],
                  ["Priority", s.Priority],
                  ["Order", s.Order],
                  ["Version", s.Version],
                ),
              this.aya(s))
            : (this.GVa(s),
              this.kEa.Push(s),
              this.FEa.set(s.Handle, s),
              this.VEa.push(s.Handle),
              ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Preload",
                  61,
                  "预加载实体:进入加载队列",
                  ["EntityId", t.Id],
                  ["CreatureDataId", s.CreatureDataId],
                  ["PbDataId", s.PbDataId],
                  ["Priority", s.Priority],
                  ["Order", s.Order],
                  ["Version", s.Version],
                  ["Remain", this.kEa.Size],
                ))
          : (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Preload",
                61,
                "预加载实体:不需要预加载，直接唤醒",
                ["EntityId", t.Id],
                ["CreatureDataId", s.CreatureDataId],
                ["PbDataId", s.PbDataId],
                ["Priority", s.Priority],
                ["Order", s.Order],
                ["Version", s.Version],
              ),
            this.B$a(s)));
  }
  Flush() {
    for (; !this.kEa.Empty; ) this.wVa();
  }
  RemoveEntity(t) {
    var i = this.a9a(t);
    i &&
      (this.FEa.delete(t) && this.kEa.Remove(i),
      this.h9a(i, 4),
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Preload",
        61,
        "预加载实体:移除加载队列",
        ["RemoveType", "Outside"],
        ["EntityId", t.Id],
        ["CreatureDataId", i.CreatureDataId],
        ["PbDataId", i.PbDataId],
        ["AngleRatio", i.AngleRatio],
        ["Priority", i.Priority],
        ["Order", i.Order],
        ["Version", i.Version],
        ["Remain", this.kEa.Size],
      );
  }
  h9a(t, i) {
    ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Preload",
        61,
        "预加载实体:执行加载回调",
        ["EntityId", t.Handle.Id],
        ["CreatureDataId", t.CreatureDataId],
        ["PbDataId", t.PbDataId],
        ["Priority", t.Priority],
        ["Order", t.Order],
        ["Version", t.Version],
        ["Result", i],
      ),
      this.s9a.delete(t.Handle),
      t.InvokeCallbacks(i),
      t.ClearCallbacks(),
      WaitEntityToLoadTask.sya.Put(t);
  }
  l9a(i, t, e) {
    const r = e ?? i.Version;
    this.s9a.has(i.Handle) &&
      r === i.Version &&
      (3 === t
        ? this.qVa(i.Handle, (t) => {
            this.s9a.has(i.Handle) && r === i.Version && this.h9a(i, t);
          })
        : this.h9a(i, t));
  }
  B$a(t) {
    this.s9a.set(t.Handle, t), this.l9a(t, 3);
  }
  aya(i) {
    const e = i.Version;
    var t = (t) => {
        this.jEa--, this.l9a(i, t, e), this.iya();
      },
      r = (this.jEa++, this.s9a.set(i.Handle, i), this.rya(i.Handle, t));
    1 !== r && t(r);
  }
  bEa(t) {
    (this.KEa = this.QEa !== t),
      this.KEa &&
        ((this.QEa = t),
        (this.HEa = t
          ? HIGH_SPEED_MAX_LOADING_ENTITY_COUNT
          : NORMAL_MAX_LOADING_ENTITY_COUNT));
  }
  NEa(t) {
    return (
      !(!ENABLE_SUSPEND_LOADING_FOR_HIGH_SPEED_MODE || !this.QEa) &&
      t > HIGH_SPEED_IGNORED_ANGLE_RATIO
    );
  }
  hya() {
    return 0 < this.kEa.Size && this.jEa < this.HEa;
  }
  wVa() {
    var t = this.kEa.Pop();
    this.FEa.delete(t.Handle),
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          61,
          "预加载实体:移除加载队列",
          ["RemoveType", "InvokeTop"],
          ["EntityId", t.Handle.Id],
          ["CreatureDataId", t.CreatureDataId],
          ["PbDataId", t.PbDataId],
          ["AngleRatio", t.AngleRatio],
          ["Priority", t.Priority],
          ["Order", t.Order],
          ["Version", t.Version],
          ["Remain", this.kEa.Size],
        ),
      this.aya(t);
  }
  iya() {
    if (!this.hya()) return 1;
    this.lya();
    var t = this.kEa.Top;
    return this.NEa(t.AngleRatio)
      ? (this.WEa ||
          (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Preload",
              61,
              "预加载实体:实体加载延迟检测(开始)",
              ["EntityId", t.Handle.Id],
              ["CreatureDataId", t.CreatureDataId],
              ["PbDataId", t.PbDataId],
              ["AngleRatio", t.AngleRatio],
              ["Priority", t.Priority],
              ["Order", t.Order],
              ["Version", t.Version],
              ["InLoading", this.jEa],
              ["Remain", this.kEa.Size],
            ),
          (this.WEa = TimerSystem_1.TimerSystem.Forever(() => {
            let t = 1;
            for (;;) if (0 !== (t = this.iya())) break;
            1 === t &&
              (TimerSystem_1.TimerSystem.Remove(this.WEa),
              (this.WEa = void 0),
              ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Preload",
                61,
                "预加载实体:实体加载延迟检测(结束)",
                ["InLoading", this.jEa],
                ["Remain", this.kEa.Size],
              );
          }, DELAY_CHECK_HIGH_SPEED))),
        2)
      : (this.wVa(), 0);
  }
  lya() {
    this.kEa.Size > this.HEa - this.jEa
      ? (this.ZEa.Start(),
        (this._ya() || this.KEa) && ((this.KEa = !1), this.kEa.Heapify()),
        this.ZEa.Stop())
      : (this.VEa.length = 0);
  }
  _ya() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        3,
      );
    if (!t) return !1;
    this.eya.Start();
    let i = !1;
    return (
      Vector_1.Vector.PointsAreSame(this.$Ea, t.ActorLocationProxy) &&
      Vector_1.Vector.PointsAreSame(this.XEa, t.ActorForwardProxy)
        ? 0 < this.VEa.length &&
          (this.VEa.forEach((t) => {
            t = this.FEa.get(t);
            t && this.uya(t);
          }),
          (this.VEa.length = 0),
          (i = !0))
        : (this.$Ea.DeepCopy(t.ActorLocationProxy),
          this.XEa.DeepCopy(t.ActorForwardProxy),
          this.XEa.AdditionEqual(
            PlayerVelocityController_1.PlayerVelocityController.GetAvgVelocity(),
          ).GetSafeNormal(this.YEa),
          (this.VEa.length = 0),
          this.FEa.forEach((t, i) => {
            this.uya(t);
          }),
          (i = !0)),
      this.eya.Stop(),
      i
    );
  }
  uya(t) {
    var i = t.Handle.Entity.GetComponent(0).GetLocation(),
      i =
        (this.JEa.DeepCopy(i), Vector_1.Vector.DistSquared(this.JEa, this.$Ea)),
      e =
        (this.$Ea.Subtraction(this.JEa, this.zEa),
        this.zEa.Normalize()
          ? Vector_1.Vector.DotProduct(this.zEa, this.YEa)
          : -1),
      e = 0.5 * e + 0.5;
    (t.AngleRatio = e), (t.Priority = i * e);
  }
}
(exports.WaitEntityToLoadTask = WaitEntityToLoadTask).sya = new Pool_1.Pool(
  200,
  () => new EntityHandleCallbackPair(),
);
//# sourceMappingURL=WaitEntityToLoadTask.js.map
