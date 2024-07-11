"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadModel =
    exports.EntityAssetElement =
    exports.CommonAssetElement =
    exports.AssetElement =
    exports.preloadAssetTypeForName =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const PreCreateEffect_1 = require("../../Effect/PreCreateEffect");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
exports.preloadAssetTypeForName = new Map([
  [0, "Animation"],
  [5, "AnimationBlueprint"],
  [2, "Audio"],
  [1, "Effect"],
  [4, "Material"],
  [3, "Mesh"],
  [6, "Other"],
]);
class AssetElement {
  constructor() {
    (this.AssetForIndexMap = new Map()),
      (this.HasError = !1),
      (this.AssetPathSet = new Set()),
      (this.AnimationAssetSet = new Set()),
      (this.MajorAssets = new Set()),
      (this.EffectAssetSet = new Set()),
      (this.AudioAssetSet = new Set()),
      (this.MeshAssetSet = new Set()),
      (this.MaterialAssetSet = new Set()),
      (this.OtherAssetSet = new Set()),
      (this.AnimationBlueprintClassAssetSet = new Set());
  }
  CheckPath(t) {
    return (
      !(!t || t.length === 0) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "搜集资源失败，asset=undefined或asset.length=0。",
        ),
      !1)
    );
  }
  AddPath(t) {
    return !this.AssetPathSet.has(t) && (this.AssetPathSet.add(t), !0);
  }
  AddObject(t, e) {}
  AddMajorAsset(t) {
    this.CheckPath(t) && this.AddPath(t) && this.MajorAssets.add(t);
  }
  AddAnimationAsset(t) {
    this.CheckPath(t) && this.AddPath(t) && this.AnimationAssetSet.add(t);
  }
  AddEffectAsset(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.EffectAssetSet.add(t), !0)
    );
  }
  AddAudioAsset(t) {
    this.CheckPath(t) && this.AddPath(t) && this.AudioAssetSet.add(t);
  }
  AddMeshAsset(t) {
    this.CheckPath(t) && this.AddPath(t) && this.MeshAssetSet.add(t);
  }
  AddMaterialAsset(t) {
    this.CheckPath(t) && this.AddPath(t) && this.MaterialAssetSet.add(t);
  }
  AddOtherAsset(t) {
    this.CheckPath(t) && this.AddPath(t) && this.OtherAssetSet.add(t);
  }
  AddAnimationBlueprintClassAsset(t) {
    this.CheckPath(t) &&
      this.AddPath(t) &&
      this.AnimationBlueprintClassAssetSet.add(t);
  }
  NeedLoadCount() {
    const t = this.OtherAssetSet.size;
    const e = this.AnimationAssetSet.size;
    const s = this.AudioAssetSet.size;
    return (
      t +
      e +
      this.AudioAssetSet.size +
      this.EffectAssetSet.size +
      this.MeshAssetSet.size +
      s +
      this.AnimationBlueprintClassAssetSet.size
    );
  }
  Clear() {
    this.AssetForIndexMap.clear(),
      this.AssetPathSet.clear(),
      this.OtherAssetSet.clear(),
      this.MaterialAssetSet.clear(),
      this.MeshAssetSet.clear(),
      this.AnimationAssetSet.clear(),
      this.AudioAssetSet.clear(),
      this.EffectAssetSet.clear(),
      this.AnimationBlueprintClassAssetSet.clear();
  }
  GetLoadPriority() {
    return 100;
  }
  PrintDebugInfo() {}
}
class CommonAssetElement extends (exports.AssetElement = AssetElement) {
  AddObject(t, e) {
    this.AssetForIndexMap.set(
      t,
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.CommonAssets.Num(),
    ),
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddCommonAsset(
        e,
      );
  }
  PrintDebugInfo() {
    const e =
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.CommonAssets;
    let s = `
预加载的公共资源列表如下(数量:${e.Num()}):
`;
    let t;
    let i;
    const h = new Map();
    for ([t, i] of this.AssetForIndexMap) h.set(i, t);
    for (let t = 0; t < e.Num(); ++t) {
      const r = e.Get(t);
      const a = h.get(t);
      s += `    索引:${t}, Path:${a}, IsValid:${r?.IsValid()}, Name:${r?.IsValid() ? r.GetName() : void 0}
`;
    }
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 3, s);
  }

  Clear() {
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.ClearCommonAsset(),
      super.Clear();
  }
}
exports.CommonAssetElement = CommonAssetElement;
class EntityAssetElement extends AssetElement {
  constructor(t) {
    super(),
      (this.DMr = 100),
      (this.dsr = 0),
      (this.CreatureDataComponent = void 0),
      (this.Csr = !1),
      (this.$fo = void 0),
      (this.gsr = void 0),
      (this.RMr = void 0),
      (this.UMr = void 0),
      (this.AMr = void 0),
      (this.IsDestroy = !1),
      (this.$fo = t),
      (this.CreatureDataComponent = t.Entity.GetComponent(0)),
      (ModelManager_1.ModelManager.PreloadModel.LoadingNeedWaitEntitySet.has(
        t.Id,
      ) ||
        (this.CreatureDataComponent.IsRole() &&
          this.CreatureDataComponent.GetPlayerId() ===
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId())) &&
        (this.DMr = 101),
      (t.Priority = this.DMr);
  }
  get LoadState() {
    return this.dsr;
  }
  set LoadState(t) {
    this.dsr = t;
  }
  get CollectMinorAsset() {
    return this.Csr;
  }
  set CollectMinorAsset(t) {
    this.Csr = t;
  }
  get Entity() {
    return this.$fo?.Entity;
  }
  get EntityHandle() {
    return this.$fo;
  }
  get BlueprintClassPath() {
    return this.gsr;
  }
  set BlueprintClassPath(t) {
    this.gsr = t;
  }
  get CharacterPath() {
    return this.RMr;
  }
  set CharacterPath(t) {
    this.RMr = t;
  }
  get PartHitEffectPath() {
    return this.UMr;
  }
  set PartHitEffectPath(t) {
    this.UMr = t;
  }
  get SkillDataTable() {
    return this.AMr;
  }
  set SkillDataTable(t) {
    this.AMr = t;
  }
  AddObject(t, e) {
    let s;
    this.$fo?.Valid &&
      ((s =
        ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.EntityAssetMap.Get(
          this.$fo.Id,
        ))
        ? this.AssetForIndexMap.set(t, s.Assets.Num())
        : this.AssetForIndexMap.set(t, 0),
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddEntityAsset(
        this.$fo.Id,
        e,
      ));
  }
  Clear() {
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.RemoveEntityAssets(
      this.Entity.Id,
    ),
      this.MajorAssets.clear(),
      (this.AMr = void 0),
      (this.RMr = void 0),
      (this.gsr = void 0),
      (this.$fo = void 0),
      (this.CreatureDataComponent = void 0),
      (this.Csr = !1),
      (this.dsr = 0),
      (this.IsDestroy = !0),
      super.Clear();
  }
  GetLoadPriority() {
    return this.DMr;
  }
  PrintDebugInfo() {
    const e =
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.EntityAssetMap.Get(
        this.Entity.Id,
      ).Assets;
    let s = `
预加载的实体资源列表如下:(CreatureDataId:${this.CreatureDataComponent.GetCreatureDataId()}, 数量:${e.Num()}):
`;
    let t;
    let i;
    const h = new Map();
    for ([t, i] of this.AssetForIndexMap) h.set(i, t);
    for (let t = 0; t < e.Num(); ++t) {
      const r = e.Get(t);
      const a = h.get(t);
      s += `    索引:${t}, Path:${a}, IsValid:${r?.IsValid()}, Name:${r?.IsValid() ? r.GetName() : void 0}
`;
    }
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 3, s);
  }
}
exports.EntityAssetElement = EntityAssetElement;
class PreloadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.PreCreateEffect = new PreCreateEffect_1.PreCreateEffect()),
      (this.CommonAssetElement = new CommonAssetElement()),
      (this.PreloadAssetMap = new Map()),
      (this.AllEntityAssetMap = new Map()),
      (this.PMr = void 0),
      (this.xMr = !0),
      (this.LoadAssetOneByOneState = !1),
      (this.UseEntityProfilerInternal = !0),
      (this.ResourcesLoadTime = new Array()),
      (this.LoadingNeedWaitEntitySet = new Set());
  }
  OnInit() {
    return (
      GlobalData_1.GlobalData.IsPlayInEditor || (this.xMr = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          3,
          "预加载信息",
          ["是否开启预加载", this.xMr],
          ["是否使用LoadOneByOne", this.LoadAssetOneByOneState],
        ),
      (this.PMr = UE.NewObject(
        UE.HoldPreloadObject.StaticClass(),
        GlobalData_1.GlobalData.GameInstance,
      )),
      this.PreCreateEffect.RegisterTick(),
      this.PreCreateEffect.Init(),
      !0
    );
  }
  OnClear() {
    return (
      (this.ResourcesLoadTime.length = 0),
      this.PMr.Clear(),
      this.PMr?.IsValid() && this.PMr.Clear(),
      (this.PMr = void 0),
      this.PreCreateEffect.UnregisterTick(),
      this.PreCreateEffect.Clear(),
      !0
    );
  }
  get HoldPreloadObject() {
    return this.PMr;
  }
  AddPreloadResource(t) {
    let e;
    this.PreloadAssetMap.has(t)
      ? ((e = this.PreloadAssetMap.get(t)), this.PreloadAssetMap.set(t, e + 1))
      : this.PreloadAssetMap.set(t, 1);
  }
  RemovePreloadResource(t) {
    if (!this.PreloadAssetMap.has(t)) return !1;
    let e = this.PreloadAssetMap.get(t);
    return (
      e > 0 && (e--, this.PreloadAssetMap.set(t, e)),
      e === 0 && this.PreloadAssetMap.delete(t),
      !0
    );
  }
  ClearPreloadResource() {
    this.PreloadAssetMap.clear(),
      this.PMr.Clear(),
      this.LoadingNeedWaitEntitySet.clear();
  }
  AddEntityAsset(t, e) {
    return (
      !this.AllEntityAssetMap.has(t) && (this.AllEntityAssetMap.set(t, e), !0)
    );
  }
  RemoveEntityAsset(t) {
    return this.AllEntityAssetMap.delete(t);
  }
  ClearEntityAsset() {
    this.AllEntityAssetMap.clear();
  }
  get IsUsePreload() {
    return this.xMr;
  }
  set IsUsePreload(t) {
    this.xMr = t;
  }
  AddResourcesLoadTime(t) {
    this.ResourcesLoadTime.push(t);
  }
  ClearResourcesLoadTime() {
    this.ResourcesLoadTime.length = 0;
  }
  AddNeedWaitEntity(t) {
    this.LoadingNeedWaitEntitySet.add(t);
  }
  RemoveNeedWaitEntity(t) {
    this.LoadingNeedWaitEntitySet.delete(t);
  }
}
exports.PreloadModel = PreloadModel;
// # sourceMappingURL=PreloadModel.js.map
