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
    { ResourceId: "UiView_BlackScreen_Prefab", CacheCount: () => 1 },
    { ResourceId: "UiView_BlackFadeScreen_Prefab", CacheCount: () => 1 },
  ];
class UiPoolActor {
  constructor(e) {
    (this.OCe = void 0), (this.Xdr = ""), (this.$dr = 0), (this.Xdr = e);
  }
  get Actor() {
    return this.OCe;
  }
  set Actor(e) {
    this.OCe = e;
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
  set EndTime(e) {
    this.$dr = e;
  }
  Clear() {
    this.IsValid &&
      (ActorSystem_1.ActorSystem.Put(this.OCe), (this.OCe = void 0));
  }
}
exports.UiPoolActor = UiPoolActor;
class UiActorFactory {
  constructor(e, o) {
    (this.Xdr = ""),
      (this.Ydr = void 0),
      (this.Jdr = 0),
      (this.IsKeepWhileCleaning = !1),
      (this.mp = new Queue_1.Queue(DEFAULT_CAPACITY)),
      (this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId),
      (this.Xdr = e),
      (this.Ydr = o) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pool",
            11,
            "[UiActorFactory:constructor]初始化缓存池有问题,缓存池挂载根节点为空",
          ));
  }
  a7() {
    var e = new UiPoolActor(this.Xdr);
    return (e.EndTime = Time_1.Time.Now + CACHE_TIME), e;
  }
  h7(e) {
    e.Clear();
  }
  async PreloadActor(e) {
    this.Jdr = e();
    var o = e() - this.mp.Size;
    if (!(o <= 0))
      if (this.Ydr) {
        var t = [];
        for (let e = 0; e < o; e++) t.push(this.GetAsync(this.Xdr, this.Ydr));
        (await Promise.all(t)).forEach((e) => {
          this.mp.Push(e);
        }),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Pool",
              17,
              "预加载UiPoolActor对象",
              ["预加载数量", o],
              ["资源路径", this.Xdr],
            );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pool",
            11,
            "[UiActorFactory:PreloadActor]初始化缓存池有问题,缓存池挂载根节点为空",
          );
  }
  Release(e, o) {
    return e
      ? (this.mp.Push(e),
        e.IsValid
          ? (e.UiItem?.SetUIParent(this.Ydr),
            (e.EndTime = Time_1.Time.Now + CACHE_TIME))
          : (e.EndTime = Time_1.Time.Now),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Pool",
            17,
            "回收UiPoolActor对象",
            ["目前未使用数量", this.mp.Size],
            ["资源路径", e.Path],
          ),
        !0)
      : (o &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Pool", 17, "回收UiPoolActor对象不存在"),
        this.CancelGetAsync(),
        !1);
  }
  GarbageCollect(o) {
    if (this.mp.Size <= this.Jdr) return o;
    let t = 0;
    for (let e = 0; e < o && !this.mp.Empty; ++e) {
      var r = this.mp.Front;
      if (r.EndTime > Time_1.Time.Now) break;
      this.mp.Pop(),
        this.h7(r),
        t++,
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Pool",
            17,
            "缓存池中UiPoolActor未使用对象执行GC",
            ["目前未使用数量", this.mp.Size],
            ["资源路径", this.Xdr],
          );
    }
    return o - t;
  }
  Clear() {
    for (; !this.mp.Empty; ) {
      var e = this.mp.Pop();
      this.h7(e);
    }
    this.mp.Clear(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Pool", 17, "清除操作", ["资源路径", this.Xdr]);
  }
  async Zdr() {
    if (this.Ydr) {
      const o = new CustomPromise_1.CustomPromise();
      return (
        (this.zdr = LguiResourceManager_1.LguiResourceManager.LoadPrefab(
          this.Xdr,
          this.Ydr,
          (e) => {
            (this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId),
              o.SetResult(e);
          },
        )),
        o.Promise
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Pool",
        11,
        "[UiActorFactory:TemplateActor]初始化缓存池有问题,缓存池挂载根节点为空",
      );
  }
  async GetAsync(e, o) {
    var t = this.mp.Empty ? this.a7() : this.mp.Pop(),
      r = (t.IsValid || (t.Actor = await this.Zdr()), t.UiItem);
    if (r)
      return (
        o && r?.SetUIParent(o),
        r?.SetUIActive(!0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Pool", 17, "获取UiPoolActor对象", ["资源路径", e]),
        t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Pool", 17, "获取UiPoolActor对象失败, 未成功加载Actor", [
        "资源路径",
        e,
      ]);
  }
  CancelGetAsync() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zdr),
      (this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId);
  }
}
class UiActorPool {
  static eCr(e) {
    let o = UiActorPool.tCr.get(e);
    return (
      o ||
        ((o = new UiActorFactory(e, UiActorPool.iCr)),
        UiActorPool.tCr.set(e, o)),
      o
    );
  }
  static oCr(e) {
    return UiActorPool.tCr.get(e);
  }
  static async Init() {
    this.IsOpenPool &&
      ((UiActorPool.iCr = UiLayer_1.UiLayer.GetLayerRootUiItem(
        UiLayerType_1.ELayerType.Pool,
      )),
      await UiActorPool.e$e());
  }
  static async e$e() {
    var e = [];
    for (const t of prepareConfigList) {
      var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          t.ResourceId,
        ),
        o = UiActorPool.eCr(o);
      e.push(o.PreloadActor(t.CacheCount));
    }
    await Promise.all(e);
  }
  static Tick(e) {
    let o = TICK_GARBAGE_MAXCOUNT;
    for (const t of UiActorPool.tCr.values())
      if ((o = t.GarbageCollect(o)) <= 0) break;
  }
  static ClearPool() {
    for (var [e, o] of UiActorPool.tCr)
      o.IsKeepWhileCleaning || (o.Clear(), UiActorPool.tCr.delete(e));
  }
  static SetKeepWhileCleaning(e, o) {
    this.IsOpenPool && (e = UiActorPool.eCr(e)) && (e.IsKeepWhileCleaning = o);
  }
  static async GetAsync(e, o) {
    return this.IsOpenPool
      ? UiActorPool.eCr(e).GetAsync(e, o)
      : UiActorPool.rCr(e, o);
  }
  static async rCr(t, e) {
    const r = new CustomPromise_1.CustomPromise();
    return (
      LguiResourceManager_1.LguiResourceManager.LoadPrefab(t, e, (e) => {
        var o = new UiPoolActor(t);
        (o.EndTime = Time_1.Time.Now + CACHE_TIME),
          (o.Actor = e),
          r.SetResult(o);
      }),
      r.Promise
    );
  }
  static RecycleAsync(e, o, t = !0) {
    o = UiActorPool.oCr(o);
    o
      ? o.Release(e, t)
      : e?.Actor &&
        (e.Clear(), Log_1.Log.CheckWarn()) &&
        Log_1.Log.Warn(
          "Pool",
          11,
          "[UiActorPool:RecycleAsync]工厂不存在,直接销毁对象",
          ["路径", e.Path],
        );
  }
}
((exports.UiActorPool = UiActorPool).tCr = new Map()),
  (UiActorPool.xW = void 0),
  (UiActorPool.iCr = void 0),
  (UiActorPool.IsOpenPool = !0);
//# sourceMappingURL=UiActorPool.js.map
