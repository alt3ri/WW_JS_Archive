"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiActorPool = exports.UiPoolActor = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Time_1 = require("../../Core/Common/Time"),
  Queue_1 = require("../../Core/Container/Queue"),
  CommonDefine_1 = require("../../Core/Define/CommonDefine"),
  ConfigManager_1 = require("../../Game/Manager/ConfigManager"),
  UiLayerType_1 = require("./Define/UiLayerType"),
  LguiResourceManager_1 = require("./LguiResourceManager"),
  UiLayer_1 = require("./UiLayer"),
  CACHE_TIME_SECOND = 30,
  CACHE_TIME = CACHE_TIME_SECOND * CommonDefine_1.MILLIONSECOND_PER_SECOND,
  TICK_GARBAGE_MAXCOUNT = 1,
  DEFAULT_CAPACITY = 15,
  prepareConfigList = [
    { ResourceId: "UiItem_NPCIcon_Prefab", CacheCount: () => 30 },
    { ResourceId: "UiItem_Mark_Prefab", CacheCount: () => 2 },
    { ResourceId: "UiItem_MarkMapName_Prefab", CacheCount: () => 2 },
    { ResourceId: "UiItem_MarkArea_Prefab", CacheCount: () => 2 },
    { ResourceId: "UiItem_ProbeArea", CacheCount: () => 2 },
    { ResourceId: "UiItem_MarkChoose_Prefab", CacheCount: () => 2 },
    { ResourceId: "UiItem_MarkOut_Prefab", CacheCount: () => 2 },
    { ResourceId: "UiItem_MarkTrackNia_Prefab", CacheCount: () => 2 },
    { ResourceId: "UiItem_Map_Prefab", CacheCount: () => 0 },
    { ResourceId: "UiItem_MiniMap_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiItem_WorldMapMark_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiView_InteractionHint_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiView_Roulette_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiItem_SuoDing", CacheCount: () => 1 },
    { ResourceId: "UiItem_PartState_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiView_AcquireIntro_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiItem_ItemListA", CacheCount: () => 3 },
    { ResourceId: "UiItem_ItemListB", CacheCount: () => 4 },
    { ResourceId: "UiView_BlackScreen_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiView_BlackFadeScreen_Prefab", CacheCount: () => 1 },
  ];
class UiPoolActor {
  constructor(o) {
    (this.OCe = void 0), (this.Xdr = ""), (this.$dr = 0), (this.Xdr = o);
  }
  get Actor() {
    return this.OCe;
  }
  set Actor(o) {
    this.OCe = o;
  }
  get IsValid() {
    return this.OCe?.IsValid() ?? !1;
  }
  get UiItem() {
    return this.OCe?.RootComponent;
  }
  get Path() {
    return this.Xdr;
  }
  get EndTime() {
    return this.$dr;
  }
  set EndTime(o) {
    this.$dr = o;
  }
  Clear() {
    this.IsValid &&
      (ActorSystem_1.ActorSystem.Put("UiPoolActor.Clear", this.OCe),
      (this.OCe = void 0));
  }
}
exports.UiPoolActor = UiPoolActor;
class UiActorFactory {
  constructor(o, e) {
    (this.Xdr = ""),
      (this.Ydr = void 0),
      (this.Jdr = 0),
      (this.IsKeepWhileCleaning = !1),
      (this.mp = new Queue_1.Queue(DEFAULT_CAPACITY)),
      (this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId),
      (this.Xdr = o),
      (this.Ydr = e),
      (this.Jdr = UiActorPool.PrepareConfigMap.get(o)?.() ?? 0),
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pool",
            10,
            "[UiActorFactory:constructor]初始化缓存池有问题,缓存池挂载根节点为空",
          ));
  }
  a7() {
    var o = new UiPoolActor(this.Xdr);
    return (o.EndTime = Time_1.Time.Now + CACHE_TIME), o;
  }
  h7(o) {
    o.Clear();
  }
  async PreloadActor(o) {
    this.Jdr = o();
    var e = o() - this.mp.Size;
    if (!(e <= 0))
      if (this.Ydr) {
        var t = [];
        for (let o = 0; o < e; o++) t.push(this.GetAsync(this.Xdr, this.Ydr));
        (await Promise.all(t)).forEach((o) => {
          this.mp.Push(o);
        }),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Pool",
              16,
              "预加载UiPoolActor对象",
              ["预加载数量", e],
              ["资源路径", this.Xdr],
            );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pool",
            10,
            "[UiActorFactory:PreloadActor]初始化缓存池有问题,缓存池挂载根节点为空",
          );
  }
  Release(o) {
    return o
      ? (this.mp.Push(o),
        o.IsValid
          ? (o.UiItem?.SetUIParent(this.Ydr),
            (o.EndTime = Time_1.Time.Now + CACHE_TIME))
          : (o.EndTime = Time_1.Time.Now),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Pool",
            16,
            "回收UiPoolActor对象",
            ["目前未使用数量", this.mp.Size],
            ["资源路径", o.Path],
          ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Pool", 16, "回收UiPoolActor对象不存在"),
        this.CancelGetAsync(),
        !1);
  }
  GarbageCollect(e) {
    if (this.mp.Size <= this.Jdr) return e;
    let t = 0;
    for (let o = 0; o < e && !this.mp.Empty; ++o) {
      var r = this.mp.Front;
      if (r.EndTime > Time_1.Time.Now) break;
      this.mp.Pop(),
        this.h7(r),
        t++,
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Pool",
            16,
            "缓存池中UiPoolActor未使用对象执行GC",
            ["目前未使用数量", this.mp.Size],
            ["资源路径", this.Xdr],
          );
    }
    return e - t;
  }
  Clear() {
    for (; !this.mp.Empty; ) {
      var o = this.mp.Pop();
      this.h7(o);
    }
    this.mp.Clear(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Pool", 16, "清除操作", ["资源路径", this.Xdr]);
  }
  async Zdr() {
    if (this.Ydr) {
      const e = new CustomPromise_1.CustomPromise();
      return (
        (this.zdr = LguiResourceManager_1.LguiResourceManager.LoadPrefab(
          this.Xdr,
          this.Ydr,
          (o) => {
            (this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId),
              e.SetResult(o);
          },
        )),
        e.Promise
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Pool",
        10,
        "[UiActorFactory:TemplateActor]初始化缓存池有问题,缓存池挂载根节点为空",
      );
  }
  async GetAsync(o, e) {
    var t = this.mp.Empty ? this.a7() : this.mp.Pop(),
      r = (t.IsValid || (t.Actor = await this.Zdr()), t.UiItem);
    if (r)
      return (
        e && r?.SetUIParent(e),
        r?.SetUIActive(!0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Pool", 16, "获取UiPoolActor对象", ["资源路径", o]),
        t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Pool", 16, "获取UiPoolActor对象失败, 未成功加载Actor", [
        "资源路径",
        o,
      ]);
  }
  CancelGetAsync() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zdr),
      (this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId);
  }
}
class UiActorPool {
  static eCr(o) {
    let e = UiActorPool.tCr.get(o);
    return (
      e ||
        ((e = new UiActorFactory(o, UiActorPool.iCr)),
        UiActorPool.tCr.set(o, e)),
      e
    );
  }
  static oCr(o) {
    return UiActorPool.tCr.get(o);
  }
  static async Init() {
    this.IsOpenPool &&
      ((UiActorPool.iCr = UiLayer_1.UiLayer.GetLayerRootUiItem(
        UiLayerType_1.ELayerType.Pool,
      )),
      await UiActorPool.e$e());
  }
  static async e$e() {
    UiActorPool.PrepareConfigMap.clear();
    var o = [];
    for (const r of prepareConfigList) {
      var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          r.ResourceId,
        ),
        t = UiActorPool.eCr(e);
      o.push(t.PreloadActor(r.CacheCount)),
        UiActorPool.PrepareConfigMap.set(e, r.CacheCount);
    }
    await Promise.all(o);
  }
  static Tick(o) {
    UiActorPool.xW.Start();
    let e = TICK_GARBAGE_MAXCOUNT;
    for (const t of UiActorPool.tCr.values())
      if ((e = t.GarbageCollect(e)) <= 0) break;
    UiActorPool.xW.Stop();
  }
  static ClearPool() {
    for (var [o, e] of UiActorPool.tCr)
      e.IsKeepWhileCleaning || (e.Clear(), UiActorPool.tCr.delete(o));
  }
  static SetKeepWhileCleaning(o, e) {
    this.IsOpenPool && (o = UiActorPool.eCr(o)) && (o.IsKeepWhileCleaning = e);
  }
  static async GetAsync(o, e) {
    return this.IsOpenPool
      ? UiActorPool.eCr(o).GetAsync(o, e)
      : UiActorPool.rCr(o, e);
  }
  static async rCr(t, o) {
    const r = new CustomPromise_1.CustomPromise();
    return (
      LguiResourceManager_1.LguiResourceManager.LoadPrefab(t, o, (o) => {
        var e = new UiPoolActor(t);
        (e.EndTime = Time_1.Time.Now + CACHE_TIME),
          (e.Actor = o),
          r.SetResult(e);
      }),
      r.Promise
    );
  }
  static RecycleAsync(o, e) {
    e = UiActorPool.oCr(e);
    e ? e.Release(o) : o?.Actor && o.Clear();
  }
}
((exports.UiActorPool = UiActorPool).tCr = new Map()),
  (UiActorPool.xW = Stats_1.Stat.Create("UiActorPool.Tick")),
  (UiActorPool.iCr = void 0),
  (UiActorPool.PrepareConfigMap = new Map()),
  (UiActorPool.IsOpenPool = !0);
//# sourceMappingURL=UiActorPool.js.map
