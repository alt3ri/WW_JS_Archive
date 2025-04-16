"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityToLoadFilterChain = exports.EntityToLoadParam = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FilterChain_1 = require("../Core/FilterChain"),
  EntityToLoadFilter_1 = require("./EntityToLoadFilter");
class EntityToLoadParam {
  constructor(t, i, e, s, r) {
    (this.MaxLoadingCount = EntityToLoadFilter_1.MAX_LOADING_ENTITY_COUNT),
      (this.LoadingInterval = EntityToLoadFilter_1.LOADING_INTERVAL),
      (this.MaxLoadingDebugName = "MAX_LOADING_ENTITY_COUNT"),
      (this.LoadingIntervalDebugName = "LOADING_INTERVAL"),
      t
        ? ((this.MaxLoadingCount = t.MaxLoadingCount),
          (this.LoadingInterval = t.LoadingInterval),
          (this.MaxLoadingDebugName = t.MaxLoadingDebugName),
          (this.LoadingIntervalDebugName = t.LoadingIntervalDebugName))
        : ((this.MaxLoadingCount = i ?? this.MaxLoadingCount),
          (this.LoadingInterval = e ?? this.LoadingInterval),
          (this.MaxLoadingDebugName = s ?? this.MaxLoadingDebugName),
          (this.LoadingIntervalDebugName = r ?? this.LoadingIntervalDebugName));
  }
}
exports.EntityToLoadParam = EntityToLoadParam;
class EntityToLoadFilterChain extends FilterChain_1.FilterChain {
  constructor() {
    super(...arguments),
      (this.Rkc = new PriorityQueue_1.PriorityQueue((t, i) =>
        t.Priority === i.Priority ? t.Order - i.Order : t.Priority - i.Priority,
      )),
      (this.Akc = new Map()),
      (this.jEa = []),
      (this.YEa = Vector_1.Vector.Create()),
      (this.JEa = Vector_1.Vector.Create()),
      (this.zEa = Vector_1.Vector.Create()),
      (this.eya = Vector_1.Vector.Create()),
      (this.iya = Stats_1.Stat.Create("WaitEntityToLoadTask.UpdatePriority")),
      (this.Pkc = Stats_1.Stat.Create(
        "EntityToLoadFilterChain.RefreshEntityToLoadParamStat",
      )),
      (this.xHa = 0),
      (this.EntityToLoadParam = new EntityToLoadParam()),
      (this.xkc = (t) => {
        t.MaxLoadingCount < this.EntityToLoadParam.MaxLoadingCount &&
          ((this.EntityToLoadParam.MaxLoadingCount = t.MaxLoadingCount),
          (this.EntityToLoadParam.MaxLoadingDebugName = t.MaxLoadingDebugName),
          ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Preload",
            60,
            "预加载实体:更新最大加载数量",
            ["MaxLoadingCount", t.MaxLoadingCount],
            ["DebugName", t.MaxLoadingDebugName],
          ),
          t.LoadingInterval > this.EntityToLoadParam.LoadingInterval &&
            ((this.EntityToLoadParam.LoadingInterval = t.LoadingInterval),
            (this.EntityToLoadParam.LoadingIntervalDebugName =
              t.LoadingIntervalDebugName),
            ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Preload",
              60,
              "预加载实体:更新帧间隔",
              ["FrameInterval", t.LoadingInterval],
              ["DebugName", t.LoadingIntervalDebugName],
            );
      });
  }
  get QueuedHeap() {
    return this.Rkc;
  }
  get QueuedEntitiesLookup() {
    return this.Akc;
  }
  static Create() {
    var t = new EntityToLoadFilterChain();
    return t.Init(), t;
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EntityToLoadParamUpdated,
      this.xkc,
    );
  }
  OnCleanup() {
    this.Rkc.Clear(),
      (this.jEa.length = 0),
      this.Akc.clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EntityToLoadParamUpdated,
        this.xkc,
      );
  }
  Dkc() {
    this.Pkc.Start();
    for (const t of this.GetAllFilters()) this.xkc(t);
    this.Pkc.Stop();
  }
  PHa(t) {
    0 === this.Rkc.Size && (this.xHa = 0), (t.Order = this.xHa++);
  }
  mya(t) {
    var i = t.Handle.Entity.GetComponent(0).GetLocation(),
      i =
        (MathUtils_1.MathUtils.CommonTempVector.DeepCopy(i),
        Vector_1.Vector.DistSquared(
          MathUtils_1.MathUtils.CommonTempVector,
          this.YEa,
        )),
      e =
        (this.YEa.Subtraction(MathUtils_1.MathUtils.CommonTempVector, this.eya),
        this.eya.Normalize()
          ? Vector_1.Vector.DotProduct(this.eya, this.zEa)
          : -1),
      e = 0.5 * e + 0.5;
    (t.AngleRatio = e), (t.Priority = i * e);
  }
  OnPassedTargetModified(t, i) {
    this.Akc.has(t) &&
      ((t = this.Akc.get(t)), i ? this.Rkc.Push(t) : this.Rkc.Remove(t));
  }
  AddFilter(t) {
    super.AddFilter(t), this.xkc(t);
  }
  RemoveFilter(t) {
    return this.Dkc(), super.RemoveFilter(t);
  }
  AddPair(t) {
    this.PHa(t),
      this.Akc.set(t.Handle, t),
      this.jEa.push(t.Handle),
      this.AddTarget(t.Handle),
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          60,
          "预加载实体:进入加载队列",
          ["EntityId", t.Handle.Id],
          ["CreatureDataId", t.CreatureDataId],
          ["PbDataId", t.PbDataId],
          ["Priority", t.Priority],
          ["Order", t.Order],
          ["Version", t.Version],
          ["Remain", this.Rkc.Size],
        );
  }
  RemovePair(t) {
    this.Akc.delete(t.Handle) &&
      (this.Rkc.Remove(t), this.RemoveTarget(t.Handle));
  }
  PopTopPair() {
    var t;
    if (!this.Rkc.Empty)
      return (
        (t = this.Rkc.Pop()),
        this.Akc.delete(t.Handle) && this.RemoveTarget(t.Handle),
        t
      );
  }
  UpdatePriority(t) {
    var i =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        3,
      );
    if (i) {
      if (
        (this.iya.Start(),
        Vector_1.Vector.PointsAreSame(this.YEa, i.ActorLocationProxy) &&
          Vector_1.Vector.PointsAreSame(this.JEa, i.ActorForwardProxy))
      )
        0 < this.jEa.length &&
          (this.jEa.forEach((t) => {
            t = this.Akc.get(t);
            t && this.mya(t);
          }),
          (this.jEa.length = 0),
          this.Rkc.Heapify());
      else {
        this.YEa.DeepCopy(i.ActorLocationProxy),
          this.JEa.DeepCopy(i.ActorForwardProxy),
          this.JEa.AdditionEqual(t).GetSafeNormal(this.zEa),
          (this.jEa.length = 0);
        for (const e of this.Akc.values()) this.mya(e);
        this.Rkc.Heapify();
      }
      this.iya.Stop();
    }
  }
}
exports.EntityToLoadFilterChain = EntityToLoadFilterChain;
//# sourceMappingURL=EntityToLoadFilterChain.js.map
