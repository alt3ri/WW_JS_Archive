"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiPool = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiPrefabLoadModule_1 = require("../../Ui/UiPrefabLoadModule"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  headStateConfigList = [
    { ResourceId: "UiItem_LittleMonsterState_Prefab", PreloadCount: 6 },
    { ResourceId: "UiItem_MingsutiState_Prefab", PreloadCount: 1 },
    { ResourceId: "UiItem_GuardianState_Prefab", PreloadCount: 1 },
    { ResourceId: "UiItem_EliteMonsterState_Prefab", PreloadCount: 4 },
    { ResourceId: "UiItem_DestructionState_Prefab", PreloadCount: 1 },
  ],
  bossHeadStateConfig = {
    ResourceId: "UiItem_BossState_Prefab",
    PreloadCount: 0,
  },
  damageViewConfig = {
    ResourceId: "UiItem_DamageView_Prefab",
    PreloadCount: 21,
  },
  buffItemConfig = { ResourceId: "UiItem_BuffItem_Prefab", PreloadCount: 5 },
  environmentItemConfig = {
    ResourceId: "UiItem_BuffEnvironmentItem_Prefab",
    PreloadCount: 5,
  };
class BattleUiPoolElement {
  constructor() {
    (this.ActorList = void 0), (this.ExistMulti = !0), (this.Actor = void 0);
  }
  Clear() {
    for (const t of this.ActorList) ActorSystem_1.ActorSystem.Put(t);
    (this.ActorList.length = 0), (this.Actor = void 0);
  }
}
class BattleUiPool {
  constructor() {
    (this.WXe = new Map()),
      (this.KXe = new Map()),
      (this.QXe = new UiPrefabLoadModule_1.UiPrefabLoadModule()),
      (this.tZ = !1),
      (this.XXe = void 0),
      (this.$Xe = void 0),
      (this.YXe = void 0),
      (this.JXe = void 0);
  }
  async Init() {
    if (!this.tZ) {
      if (!this.zXe()) return !1;
      await this.ZXe(), (this.tZ = !0);
    }
    return !0;
  }
  zXe() {
    var t = UiLayer_1.UiLayer.WorldSpaceUiRootItem;
    if (!t?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "WorldSpaceUiRootItem为空"),
        !1
      );
    this.XXe = t;
    t = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool);
    if (!t?.IsValid())
      return (
        Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 18, "PoolRoot为空"),
        !1
      );
    this.$Xe = t;
    t = UiLayer_1.UiLayer.UiRootItem;
    return t?.IsValid()
      ? ((this.YXe = t),
        (this.JXe = UiLayer_1.UiLayer.GetBattleViewUnit(0)),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "UiRootItem为空"),
        !1);
  }
  async ZXe() {
    var t = [];
    for (const e of headStateConfigList) t.push(this.e$e(e, this.XXe));
    return (
      t.push(this.e$e(bossHeadStateConfig, this.$Xe)),
      t.push(this.e$e(damageViewConfig, this.JXe)),
      t.push(this.e$e(buffItemConfig, this.YXe)),
      t.push(this.e$e(environmentItemConfig, this.YXe)),
      await Promise.all(t),
      !0
    );
  }
  async e$e(e, i) {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        e.ResourceId,
      ),
      o = await this.QXe.LoadPrefabAsync(t, i);
    if (!o?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "预加载Actor失败", [
            "resourceId",
            e.ResourceId,
          ]),
        !1
      );
    o.RootComponent.SetUIActive(!1);
    var t = new BattleUiPoolElement(),
      r = ((t.ExistMulti = 0 < e.PreloadCount), new Array());
    r.push(o);
    for (let t = 0; t < e.PreloadCount; t++) {
      var a = LguiUtil_1.LguiUtil.DuplicateActor(o, i);
      r.push(a);
    }
    return (t.ActorList = r), (t.Actor = o), this.WXe.set(e.ResourceId, t), !0;
  }
  GetActor(t, e, i) {
    var o,
      r = this.WXe.get(t);
    if (r && !(r.ActorList.length <= 0))
      return r.ExistMulti
        ? 1 < r.ActorList.length
          ? ((o = r.ActorList.pop()), i && o.K2_AttachRootComponentTo(e), o)
          : LguiUtil_1.LguiUtil.DuplicateActor(r.ActorList[0], e)
        : (o = r.ActorList.pop())
          ? (i && o.K2_AttachRootComponentTo(e), o)
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 18, "BattleUiPool重复获取单一预制体", [
                "resourceId",
                t,
              ])
            );
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "BattleUiPool没有缓存该预制体", [
        "resourceId",
        t,
      ]);
  }
  RecycleActor(t, e, i = !1) {
    var o = this.WXe.get(t);
    return o
      ? (e.RootComponent.SetUIActive(!1),
        i && e.K2_AttachRootComponentTo(this.$Xe),
        !o.ExistMulti && 0 !== o.ActorList.length
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                18,
                "BattleUiPool重复Recycle单一预制体",
                ["resourceId", t],
              ),
            !1)
          : (o.ActorList.push(e), !0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "BattleUiPool没有缓存该预制体", [
            "resourceId",
            t,
          ]),
        !1);
  }
  GetSrcActor(t) {
    var e = this.WXe.get(t);
    if (e?.Actor) return e.Actor;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "BattleUiPool没有缓存该预制体", [
        "resourceId",
        t,
      ]);
  }
  GetHeadStateView(t) {
    return this.GetActor(t, this.XXe, !1);
  }
  RecycleHeadStateView(t, e, i = !1) {
    return !this.tZ || this.RecycleActor(t, e, i);
  }
  GetDamageView() {
    return this.GetActor(damageViewConfig.ResourceId, this.JXe, !1);
  }
  RecycleDamageView(t) {
    return this.tZ
      ? this.RecycleActor(damageViewConfig.ResourceId, t)
      : (ActorSystem_1.ActorSystem.Put(t), !0);
  }
  GetBuffItem(t) {
    return this.GetActor(buffItemConfig.ResourceId, t, !0);
  }
  RecycleBuffItem(t) {
    return this.tZ
      ? this.RecycleActor(buffItemConfig.ResourceId, t, !0)
      : (ActorSystem_1.ActorSystem.Put(t), !0);
  }
  GetEnvironmentItem(t) {
    return this.GetActor(environmentItemConfig.ResourceId, t, !0);
  }
  RecycleEnvironmentItem(t) {
    return this.tZ
      ? this.RecycleActor(environmentItemConfig.ResourceId, t, !0)
      : (ActorSystem_1.ActorSystem.Put(t), !0);
  }
  async LoadActor(t, e) {
    var i,
      o = void 0;
    let r = this.WXe.get(t);
    return r
      ? this.t$e(r, e)
      : (o = await this.QXe.LoadPrefabAsync(t, this.$Xe))?.IsValid()
        ? ((r = this.WXe.get(t))
            ? ActorSystem_1.ActorSystem.Put(o)
            : ((r = new BattleUiPoolElement()),
              this.WXe.set(t, r),
              (i = new Array()).push(o),
              (r.ActorList = i),
              (r.Actor = o),
              this.WXe.set(t, r)),
          this.t$e(r, e))
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 18, "加载Actor失败", ["", t])
          );
  }
  t$e(t, e) {
    var i;
    return 1 < t.ActorList.length
      ? ((i = t.ActorList.pop()).K2_AttachRootComponentTo(e), i)
      : LguiUtil_1.LguiUtil.DuplicateActor(t.Actor, e);
  }
  RecycleActorByPath(t, e, i = !1) {
    return (
      this.tZ &&
        ((t = this.WXe.get(t))
          ? (t.ActorList.push(e),
            e.RootComponent.SetUIActive(!1),
            i && e.K2_AttachRootComponentTo(this.$Xe))
          : ActorSystem_1.ActorSystem.Put(e)),
      !0
    );
  }
  async LoadSingleActorByPath(t, e) {
    let i = this.KXe.get(t);
    return i
      ? (i.K2_AttachRootComponentTo(e), i)
      : (i = await this.QXe.LoadPrefabAsync(t, e))?.IsValid()
        ? (this.KXe.set(t, i), i)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 18, "加载Actor失败", ["", t])
          );
  }
  RecycleSingleActor(t, e = !1) {
    return (
      this.tZ &&
        (t.RootComponent.SetUIActive(!1), e) &&
        t.K2_AttachRootComponentTo(this.$Xe),
      !0
    );
  }
  async PreloadSingleActorByPath(t, e) {
    t = await this.LoadSingleActorByPath(t, e);
    return t && this.RecycleSingleActor(t), !0;
  }
  Clear() {
    this.QXe.Clear();
    for (const t of this.WXe.values()) t.Clear();
    this.WXe.clear();
    for (const e of this.KXe.values()) ActorSystem_1.ActorSystem.Put(e);
    this.KXe.clear(),
      (this.tZ = !1),
      (this.XXe = void 0),
      (this.$Xe = void 0),
      (this.YXe = void 0);
  }
}
exports.BattleUiPool = BattleUiPool;
//# sourceMappingURL=BattleUiPool.js.map
