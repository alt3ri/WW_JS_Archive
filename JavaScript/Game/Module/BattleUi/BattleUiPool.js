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
      r = await this.QXe.LoadPrefabAsync(t, i);
    if (!r?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "预加载Actor失败", [
            "resourceId",
            e.ResourceId,
          ]),
        !1
      );
    r.RootComponent.SetUIActive(!1);
    var t = new BattleUiPoolElement(),
      o = ((t.ExistMulti = 0 < e.PreloadCount), new Array());
    o.push(r);
    for (let t = 0; t < e.PreloadCount; t++) {
      var a = LguiUtil_1.LguiUtil.DuplicateActor(r, i);
      o.push(a);
    }
    return (t.ActorList = o), (t.Actor = r), this.WXe.set(e.ResourceId, t), !0;
  }
  GetActor(t, e, i) {
    var r,
      o = this.WXe.get(t);
    if (o && !(o.ActorList.length <= 0))
      return o.ExistMulti
        ? 1 < o.ActorList.length
          ? ((r = o.ActorList.pop()), i && r.K2_AttachRootComponentTo(e), r)
          : LguiUtil_1.LguiUtil.DuplicateActor(o.ActorList[0], e)
        : ((r = o.ActorList[0]), i && r.K2_AttachRootComponentTo(e), r);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "BattleUiPool没有缓存该预制体", [
        "resourceId",
        t,
      ]);
  }
  RecycleActor(t, e, i = !1) {
    var r = this.WXe.get(t);
    return r
      ? (e.RootComponent.SetUIActive(!1),
        i && e.K2_AttachRootComponentTo(this.$Xe),
        r.ExistMulti && r.ActorList.push(e),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "BattleUiPool没有缓存该预制体", [
            "resourceId",
            t,
          ]),
        !1);
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
      r = void 0;
    let o = this.WXe.get(t);
    return o
      ? this.t$e(o, e)
      : (r = await this.QXe.LoadPrefabAsync(t, this.$Xe))?.IsValid()
        ? ((o = this.WXe.get(t))
            ? ActorSystem_1.ActorSystem.Put(r)
            : ((o = new BattleUiPoolElement()),
              this.WXe.set(t, o),
              (i = new Array()).push(r),
              (o.ActorList = i),
              (o.Actor = r),
              this.WXe.set(t, o)),
          this.t$e(o, e))
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
