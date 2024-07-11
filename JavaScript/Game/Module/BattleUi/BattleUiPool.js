"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiPool = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiPrefabLoadModule_1 = require("../../Ui/UiPrefabLoadModule");
const LguiUtil_1 = require("../Util/LguiUtil");
const headStateConfigList = [
  { ResourceId: "UiItem_LittleMonsterState_Prefab", PreloadCount: 6 },
  { ResourceId: "UiItem_MingsutiState_Prefab", PreloadCount: 1 },
  { ResourceId: "UiItem_GuardianState_Prefab", PreloadCount: 1 },
  { ResourceId: "UiItem_EliteMonsterState_Prefab", PreloadCount: 4 },
  { ResourceId: "UiItem_DestructionState_Prefab", PreloadCount: 1 },
];
const bossHeadStateConfig = {
  ResourceId: "UiItem_BossState_Prefab",
  PreloadCount: 0,
};
const damageViewConfig = {
  ResourceId: "UiItem_DamageView_Prefab",
  PreloadCount: 21,
};
const buffItemConfig = {
  ResourceId: "UiItem_BuffItem_Prefab",
  PreloadCount: 5,
};
const environmentItemConfig = {
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
    (this.wQe = new Map()),
      (this.BQe = new Map()),
      (this.bQe = new UiPrefabLoadModule_1.UiPrefabLoadModule()),
      (this.tZ = !1),
      (this.qQe = void 0),
      (this.GQe = void 0),
      (this.NQe = void 0),
      (this.OQe = void 0);
  }
  async Init() {
    if (!this.tZ) {
      if (!this.kQe()) return !1;
      await this.FQe(), (this.tZ = !0);
    }
    return !0;
  }
  kQe() {
    let t = UiLayer_1.UiLayer.WorldSpaceUiRootItem;
    if (!t?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "WorldSpaceUiRootItem为空"),
        !1
      );
    this.qQe = t;
    t = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool);
    if (!t?.IsValid())
      return (
        Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 18, "PoolRoot为空"),
        !1
      );
    this.GQe = t;
    t = UiLayer_1.UiLayer.UiRootItem;
    return t?.IsValid()
      ? ((this.NQe = t),
        (this.OQe = UiLayer_1.UiLayer.GetBattleViewUnit(0)),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "UiRootItem为空"),
        !1);
  }
  async FQe() {
    const t = [];
    for (const e of headStateConfigList) t.push(this.VQe(e, this.qQe));
    return (
      t.push(this.VQe(bossHeadStateConfig, this.GQe)),
      t.push(this.VQe(damageViewConfig, this.OQe)),
      t.push(this.VQe(buffItemConfig, this.NQe)),
      t.push(this.VQe(environmentItemConfig, this.NQe)),
      await Promise.all(t),
      !0
    );
  }
  async VQe(e, i) {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      e.ResourceId,
    );
    const r = await this.bQe.LoadPrefabAsync(t, i);
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
    var t = new BattleUiPoolElement();
    const o = ((t.ExistMulti = e.PreloadCount > 0), new Array());
    o.push(r);
    for (let t = 0; t < e.PreloadCount; t++) {
      const a = LguiUtil_1.LguiUtil.DuplicateActor(r, i);
      o.push(a);
    }
    return (t.ActorList = o), (t.Actor = r), this.wQe.set(e.ResourceId, t), !0;
  }
  GetActor(t, e, i) {
    let r;
    const o = this.wQe.get(t);
    if (o && !(o.ActorList.length <= 0))
      return o.ExistMulti
        ? o.ActorList.length > 1
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
    const r = this.wQe.get(t);
    return r
      ? (e.RootComponent.SetUIActive(!1),
        i && e.K2_AttachRootComponentTo(this.GQe),
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
    return this.GetActor(t, this.qQe, !1);
  }
  RecycleHeadStateView(t, e, i = !1) {
    return !this.tZ || this.RecycleActor(t, e, i);
  }
  GetDamageView() {
    return this.GetActor(damageViewConfig.ResourceId, this.OQe, !1);
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
    let i;
    let r = void 0;
    let o = this.wQe.get(t);
    return o
      ? this.HQe(o, e)
      : (r = await this.bQe.LoadPrefabAsync(t, this.GQe))?.IsValid()
        ? ((o = this.wQe.get(t))
            ? ActorSystem_1.ActorSystem.Put(r)
            : ((o = new BattleUiPoolElement()),
              this.wQe.set(t, o),
              (i = new Array()).push(r),
              (o.ActorList = i),
              (o.Actor = r),
              this.wQe.set(t, o)),
          this.HQe(o, e))
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 18, "加载Actor失败", ["", t])
          );
  }
  HQe(t, e) {
    let i;
    return t.ActorList.length > 1
      ? ((i = t.ActorList.pop()).K2_AttachRootComponentTo(e), i)
      : LguiUtil_1.LguiUtil.DuplicateActor(t.Actor, e);
  }
  RecycleActorByPath(t, e, i = !1) {
    return (
      this.tZ &&
        ((t = this.wQe.get(t))
          ? (t.ActorList.push(e),
            e.RootComponent.SetUIActive(!1),
            i && e.K2_AttachRootComponentTo(this.GQe))
          : ActorSystem_1.ActorSystem.Put(e)),
      !0
    );
  }
  async LoadSingleActorByPath(t, e) {
    let i = this.BQe.get(t);
    return i
      ? (i.K2_AttachRootComponentTo(e), i)
      : (i = await this.bQe.LoadPrefabAsync(t, e))?.IsValid()
        ? (this.BQe.set(t, i), i)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 18, "加载Actor失败", ["", t])
          );
  }
  RecycleSingleActor(t, e = !1) {
    return (
      this.tZ &&
        (t.RootComponent.SetUIActive(!1), e) &&
        t.K2_AttachRootComponentTo(this.GQe),
      !0
    );
  }
  async PreloadSingleActorByPath(t, e) {
    t = await this.LoadSingleActorByPath(t, e);
    return t && this.RecycleSingleActor(t), !0;
  }
  Clear() {
    this.bQe.Clear();
    for (const t of this.wQe.values()) t.Clear();
    this.wQe.clear();
    for (const e of this.BQe.values()) ActorSystem_1.ActorSystem.Put(e);
    this.BQe.clear(),
      (this.tZ = !1),
      (this.qQe = void 0),
      (this.GQe = void 0),
      (this.NQe = void 0);
  }
}
exports.BattleUiPool = BattleUiPool;
// # sourceMappingURL=BattleUiPool.js.map
