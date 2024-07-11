"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadModel =
    exports.EntityAssetElement =
    exports.CommonAssetElement =
    exports.AssetElement =
    exports.preloadAssetTypeForName =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  PreCreateEffect_1 = require("../../Effect/PreCreateEffect"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager");
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
      !(!t || 0 === t.length) ||
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
    var t = this.OtherAssetSet.size,
      e = this.AnimationAssetSet.size,
      s = this.AudioAssetSet.size;
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
    Macro_1.NOT_SHIPPING_ENVIRONMENT && this.AssetForIndexMap.clear(),
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
    Macro_1.NOT_SHIPPING_ENVIRONMENT &&
      this.AssetForIndexMap.set(
        t,
        ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.CommonAssets.Num(),
      ),
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddCommonAsset(
        e,
      );
  }
  PrintDebugInfo() {
    if (Macro_1.NOT_SHIPPING_ENVIRONMENT) {
      var s =
        ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.CommonAssets;
      let e = `
预加载的公共资源列表如下(数量:${s.Num()}):
`;
      var t,
        i,
        r = new Map();
      for ([t, i] of this.AssetForIndexMap) r.set(i, t);
      for (let t = 0; t < s.Num(); ++t) {
        var h = s.Get(t),
          a = r.get(t);
        e += `    索引:${t}, Path:${a}, IsValid:${h?.IsValid()}, Name:${h?.IsValid() ? h.GetName() : void 0}
`;
      }
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 3, e);
    }
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
      (this.IEr = 100),
      (this.uar = 0),
      (this.CreatureDataComponent = void 0),
      (this.car = !1),
      (this.Kpo = void 0),
      (this.mar = void 0),
      (this.TEr = void 0),
      (this.LEr = void 0),
      (this.DEr = void 0),
      (this.IsDestroy = !1),
      (this.Kpo = t),
      (this.CreatureDataComponent = t.Entity.GetComponent(0)),
      (ModelManager_1.ModelManager.PreloadModel.LoadingNeedWaitEntitySet.has(
        t.Id,
      ) ||
        (this.CreatureDataComponent.IsRole() &&
          this.CreatureDataComponent.GetPlayerId() ===
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId())) &&
        (this.IEr = 101),
      (t.Priority = this.IEr);
  }
  get LoadState() {
    return this.uar;
  }
  set LoadState(t) {
    this.uar = t;
  }
  get CollectMinorAsset() {
    return this.car;
  }
  set CollectMinorAsset(t) {
    this.car = t;
  }
  get Entity() {
    return this.Kpo?.Entity;
  }
  get EntityHandle() {
    return this.Kpo;
  }
  get BlueprintClassPath() {
    return this.mar;
  }
  set BlueprintClassPath(t) {
    this.mar = t;
  }
  get CharacterPath() {
    return this.TEr;
  }
  set CharacterPath(t) {
    this.TEr = t;
  }
  get PartHitEffectPath() {
    return this.LEr;
  }
  set PartHitEffectPath(t) {
    this.LEr = t;
  }
  get SkillDataTable() {
    return this.DEr;
  }
  set SkillDataTable(t) {
    this.DEr = t;
  }
  AddObject(t, e) {
    var s;
    this.Kpo?.Valid &&
      (Macro_1.NOT_SHIPPING_ENVIRONMENT &&
        ((s =
          ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.EntityAssetMap.Get(
            this.Kpo.Id,
          ))
          ? this.AssetForIndexMap.set(t, s.Assets.Num())
          : this.AssetForIndexMap.set(t, 0)),
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddEntityAsset(
        this.Kpo.Id,
        e,
      ));
  }
  Clear() {
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.RemoveEntityAssets(
      this.Entity.Id,
    ),
      this.MajorAssets.clear(),
      (this.DEr = void 0),
      (this.TEr = void 0),
      (this.mar = void 0),
      (this.Kpo = void 0),
      (this.CreatureDataComponent = void 0),
      (this.car = !1),
      (this.uar = 0),
      (this.IsDestroy = !0),
      super.Clear();
  }
  GetLoadPriority() {
    return this.IEr;
  }
  PrintDebugInfo() {
    if (Macro_1.NOT_SHIPPING_ENVIRONMENT) {
      var s =
        ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.EntityAssetMap.Get(
          this.Entity.Id,
        ).Assets;
      let e = `
预加载的实体资源列表如下:(CreatureDataId:${this.CreatureDataComponent.GetCreatureDataId()}, 数量:${s.Num()}):
`;
      var t,
        i,
        r = new Map();
      for ([t, i] of this.AssetForIndexMap) r.set(i, t);
      for (let t = 0; t < s.Num(); ++t) {
        var h = s.Get(t),
          a = r.get(t);
        e += `    索引:${t}, Path:${a}, IsValid:${h?.IsValid()}, Name:${h?.IsValid() ? h.GetName() : void 0}
`;
      }
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 3, e);
    }
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
      (this.REr = void 0),
      (this.UEr = !0),
      (this.LoadAssetOneByOneState = !1),
      (this.UseEntityProfilerInternal = !0),
      (this.ResourcesLoadTime = new Array()),
      (this.LoadingNeedWaitEntitySet = new Set());
  }
  OnInit() {
    return (
      GlobalData_1.GlobalData.IsPlayInEditor || (this.UEr = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          3,
          "预加载信息",
          ["是否开启预加载", this.UEr],
          ["是否使用LoadOneByOne", this.LoadAssetOneByOneState],
        ),
      (this.REr = UE.NewObject(
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
      this.REr.Clear(),
      this.REr?.IsValid() && this.REr.Clear(),
      (this.REr = void 0),
      this.PreCreateEffect.UnregisterTick(),
      this.PreCreateEffect.Clear(),
      !0
    );
  }
  get HoldPreloadObject() {
    return this.REr;
  }
  AddPreloadResource(t) {
    var e;
    this.PreloadAssetMap.has(t)
      ? ((e = this.PreloadAssetMap.get(t)), this.PreloadAssetMap.set(t, e + 1))
      : this.PreloadAssetMap.set(t, 1);
  }
  RemovePreloadResource(t) {
    if (!this.PreloadAssetMap.has(t)) return !1;
    let e = this.PreloadAssetMap.get(t);
    return (
      0 < e && (e--, this.PreloadAssetMap.set(t, e)),
      0 === e && this.PreloadAssetMap.delete(t),
      !0
    );
  }
  ClearPreloadResource() {
    this.PreloadAssetMap.clear(),
      this.REr.Clear(),
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
    return this.UEr;
  }
  set IsUsePreload(t) {
    this.UEr = t;
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
//# sourceMappingURL=PreloadModel.js.map
