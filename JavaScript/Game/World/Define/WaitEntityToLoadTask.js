"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityToLoadTask = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Pool_1 = require("../../../Core/Container/Pool"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  EntityToLoadFilterChain_1 = require("../../Utils/Filter/EntityToLoad/EntityToLoadFilterChain"),
  EntityHandleCallbackPair_1 = require("./EntityHandleCallbackPair");
class WaitEntityToLoadTask {
  constructor(t, e) {
    (this.nya = () => 0),
      (this.UHa = () => {}),
      (this.sja = new Map()),
      (this.qkc = EntityToLoadFilterChain_1.EntityToLoadFilterChain.Create()),
      (this.QEa = 0),
      (this.zr_ = 0),
      (this.WJl = void 0),
      (this.Jr_ = 0),
      (this.Gkc = (t) => {
        this.qkc.AddFilter(t), this.DelayInvoke();
      }),
      (this.Fkc = (t) => {
        this.qkc.RemoveFilter(t), this.DelayInvoke();
      }),
      (this.DelayInvoke = () => {
        !this.WJl &&
          0 < this.qkc.QueuedHeap.Size &&
          (this.WJl = TimerSystem_1.TimerSystem.Next(() => {
            (this.WJl = void 0), this.oya();
          }));
      }),
      (this.nya = t),
      (this.UHa = e);
  }
  OnInit() {
    this.Vr(), (this.QEa = 0);
  }
  OnClear() {
    this.sya(),
      this.sja.clear(),
      this.WJl &&
        (TimerSystem_1.TimerSystem.Remove(this.WJl), (this.WJl = void 0)),
      this.qkc.Cleanup();
  }
  Vr() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EntityToLoadFilterCreated,
      this.Gkc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EntityToLoadFilterDestroyed,
        this.Fkc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EntityToLoadParamUpdated,
        this.DelayInvoke,
      );
  }
  sya() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EntityToLoadFilterCreated,
      this.Gkc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EntityToLoadFilterDestroyed,
        this.Fkc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EntityToLoadParamUpdated,
        this.DelayInvoke,
      );
  }
  static aya(t, e, i, r) {
    let o = this.hya.Get();
    return (
      ((o = o || WaitEntityToLoadTask.hya.Create()).Handle = t),
      (o.CreatureDataId = i),
      (o.PbDataId = r),
      (o.Priority = t.Priority),
      (o.AngleRatio = 0),
      (o.Order = 0),
      o.AddCallback(e),
      o.Version++,
      o
    );
  }
  aja(t) {
    let e = this.sja.get(t);
    return (e = e || this.qkc.QueuedEntitiesLookup.get(t));
  }
  static fJa(t) {
    var e = t.Entity.GetComponent(0);
    return !(
      (PreloadDefine_1.PreloadSetting.UseNewPreload &&
        e.GetPreloadFinished()) ||
      (((e = e.GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Custom ||
        e === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity) &&
        (e === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity &&
          (t.Priority = 105),
        1))
    );
  }
  QueueToInvoke(t, e, i, r) {
    let o = this.aja(t);
    o
      ? o.AddCallback(e)
      : ((o = WaitEntityToLoadTask.aya(t, e, i, r)),
        WaitEntityToLoadTask.fJa(t)
          ? (this.qkc.AddPair(o), this.DelayInvoke())
          : (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Preload",
                60,
                "预加载实体:不需要预加载，直接唤醒",
                ["EntityId", t.Id],
                ["CreatureDataId", o.CreatureDataId],
                ["PbDataId", o.PbDataId],
                ["Priority", o.Priority],
                ["Order", o.Order],
                ["Version", o.Version],
              ),
            this.pJa(o)));
  }
  Flush() {
    for (
      this.WJl &&
      (TimerSystem_1.TimerSystem.Remove(this.WJl), (this.WJl = void 0));
      !this.qkc.QueuedHeap.Empty;

    )
      this.AHa();
  }
  RemoveEntity(t) {
    var e = this.aja(t);
    e &&
      (this.qkc.RemovePair(e),
      this.hja(e, 4),
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Preload",
        60,
        "预加载实体:移除加载队列",
        ["RemoveType", "Outside"],
        ["EntityId", t.Id],
        ["CreatureDataId", e.CreatureDataId],
        ["PbDataId", e.PbDataId],
        ["AngleRatio", e.AngleRatio],
        ["Priority", e.Priority],
        ["Order", e.Order],
        ["Version", e.Version],
        ["Remain", this.qkc.QueuedHeap.Size],
      );
  }
  hja(t, e) {
    ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Preload",
        60,
        "预加载实体:执行加载回调",
        ["EntityId", t.Handle.Id],
        ["CreatureDataId", t.CreatureDataId],
        ["PbDataId", t.PbDataId],
        ["Priority", t.Priority],
        ["Order", t.Order],
        ["Version", t.Version],
        ["Result", e],
      ),
      this.sja.delete(t.Handle),
      t.InvokeCallbacks(e),
      t.ClearCallbacks(),
      WaitEntityToLoadTask.hya.Put(t);
  }
  lja(e, t, i) {
    const r = i ?? e.Version;
    this.sja.has(e.Handle) &&
      r === e.Version &&
      (3 === t || (2 === t && Info_1.Info.IsBuildShipping)
        ? this.UHa(e.Handle, (t) => {
            this.sja.has(e.Handle) && r === e.Version && this.hja(e, t);
          })
        : this.hja(e, t));
  }
  pJa(t) {
    this.sja.set(t.Handle, t), this.lja(t, 3);
  }
  lya(e) {
    let i = !1,
      r = void 0,
      o = !1;
    const s = () => {
      var t;
      r && (r.Valid() && TimerSystem_1.TimerSystem.Remove(r), (r = void 0)),
        !i &&
          o &&
          ((t = ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(
            e.CreatureDataId,
          )),
          Log_1.Log.CheckError()) &&
          Log_1.Log.Error(
            "Preload",
            60,
            "预加载实体:加载超时",
            ["EntityId", e.Handle.Id],
            ["CreatureDataId", e.CreatureDataId],
            ["PbDataId", e.PbDataId],
            ["Priority", e.Priority],
            ["Order", e.Order],
            ["Version", e.Version],
            ["Remain", this.qkc.QueuedHeap.Size],
            ["InLoading", this.QEa],
            ["HasAssetElement", t ? "Yes" : "No"],
            ["LoadState", t ? t.LoadState : "None"],
            ["CollectMinorAssets", t ? t.CollectMinorAsset : "None"],
          ),
        i !== o && (this.QEa--, this.oya());
    };
    const a = e.Version;
    var t = (t) => {
        (i = !0), this.lja(e, t, a), s();
      },
      n = (this.QEa++, this.sja.set(e.Handle, e), this.nya(e.Handle, t));
    1 !== n
      ? t(n)
      : (r = TimerSystem_1.TimerSystem.Delay(() => {
          (o = !0), s();
        }, ResourceSystem_1.ASYNC_LOAD_TIMEOUT_MS));
  }
  _ya() {
    return (
      0 < this.qkc.QueuedHeap.Size &&
      this.QEa < this.qkc.EntityToLoadParam.MaxLoadingCount &&
      this.zr_ >= this.qkc.EntityToLoadParam.LoadingInterval
    );
  }
  AHa() {
    var t = this.qkc.PopTopPair();
    t
      ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Preload",
            60,
            "预加载实体:移除加载队列",
            ["RemoveType", "InvokeTop"],
            ["EntityId", t.Handle.Id],
            ["CreatureDataId", t.CreatureDataId],
            ["PbDataId", t.PbDataId],
            ["AngleRatio", t.AngleRatio],
            ["Priority", t.Priority],
            ["Order", t.Order],
            ["Version", t.Version],
            ["Remain", this.qkc.QueuedHeap.Size],
          ),
        this.lya(t))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Preload",
          72,
          "预加载实体:调用InvokeTop之前需要确保优先队列不为空",
        );
  }
  eo_() {
    var t = Time_1.Time.Frame;
    t > this.Jr_ && ((this.zr_ += t - this.Jr_), (this.Jr_ = t));
  }
  to_() {
    (0 === this.qkc.QueuedHeap.Size ||
      this.QEa >= this.qkc.EntityToLoadParam.MaxLoadingCount ||
      this.zr_ >= this.qkc.EntityToLoadParam.LoadingInterval) &&
      (this.zr_ = 0);
  }
  oya() {
    for (this.eo_(); this._ya(); ) this.uya(), this.AHa();
    this.to_(),
      0 < this.qkc.QueuedHeap.Size &&
        this.QEa < this.qkc.EntityToLoadParam.MaxLoadingCount &&
        this.DelayInvoke();
  }
  uya() {
    this.qkc.QueuedHeap.Size >
      this.qkc.EntityToLoadParam.MaxLoadingCount - this.QEa &&
      this.qkc.UpdatePriority(this.io_());
  }
  io_() {
    return WaitEntityToLoadTask.GetPlayerVelocityOverride
      ? WaitEntityToLoadTask.GetPlayerVelocityOverride()
      : Vector_1.Vector.ZeroVectorProxy;
  }
}
((exports.WaitEntityToLoadTask =
  WaitEntityToLoadTask).GetPlayerVelocityOverride = void 0),
  (WaitEntityToLoadTask.hya = new Pool_1.Pool(
    200,
    () => new EntityHandleCallbackPair_1.EntityHandleCallbackPair(),
  ));
//# sourceMappingURL=WaitEntityToLoadTask.js.map
