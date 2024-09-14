"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadSetting =
    exports.EntityAssetElement =
    exports.FightAssetManager =
    exports.TemplateDataAssetManager =
    exports.PbDataAssetManager =
    exports.BulletAssetManager =
    exports.SkillAssetManager =
    exports.CommonAssetElement =
    exports.AssetElement =
    exports.EntityMainAssetRecord =
    exports.PbDataAssetRecord =
    exports.TemplateDataAssetRecord =
    exports.StateMachineAssetRecord =
    exports.BulletAssetRecord =
    exports.SkillAssetRecord =
    exports.AssetRecord =
    exports.USE_DB =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  EntitySkillPreloadByActorBlueprint_1 = require("../../Core/Define/ConfigQuery/EntitySkillPreloadByActorBlueprint"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  FORBID_PATH = ((exports.USE_DB = !1), "/Game/Aki/Scene/Assets/Temp");
class AssetRecord {
  constructor() {
    (this.AssetSet = new Set()),
      (this.ActorClass = new Array()),
      (this.Animations = new Array()),
      (this.Effects = new Array()),
      (this.Audios = new Array()),
      (this.Meshes = new Array()),
      (this.Materials = new Array()),
      (this.AnimationBlueprints = new Array()),
      (this.Others = new Array());
  }
  AddActorClass(t) {
    return !!this.lar(t) && (this.ActorClass.push(t), !0);
  }
  AddAnimation(t) {
    this.lar(t) && this.Animations.push(t);
  }
  AddEffect(t) {
    return !!this.lar(t) && (this.Effects.push(t), !0);
  }
  AddAudio(t) {
    this.lar(t) && this.Audios.push(t);
  }
  AddMesh(t) {
    this.lar(t) && this.Meshes.push(t);
  }
  AddMaterial(t) {
    this.lar(t) && this.Materials.push(t);
  }
  AddAnimationBlueprint(t) {
    this.lar(t) && this.AnimationBlueprints.push(t);
  }
  AddOther(t) {
    this.lar(t) && this.Others.push(t);
  }
  lar(t) {
    return !(
      !t?.length ||
      (t.startsWith(FORBID_PATH)
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Preload", 3, "[预加载] 不能搜集该目录的资源", [
              "Path",
              t,
            ]),
          1)
        : this.AssetSet.has(t) || (this.AssetSet.add(t), 0))
    );
  }
  Copy(t) {
    for (const s of t.ActorClass) this.AddActorClass(s);
    for (const e of t.Animations) this.AddAnimation(e);
    for (const i of t.Effects) this.AddEffect(i);
    for (const r of t.Audios) this.AddAudio(r);
    for (const h of t.Meshes) this.AddMesh(h);
    for (const o of t.Materials) this.AddMaterial(o);
    for (const a of t.AnimationBlueprints) this.AddAnimationBlueprint(a);
    for (const n of t.Others) this.AddOther(n);
    return !0;
  }
}
exports.AssetRecord = AssetRecord;
class SkillAssetRecord {
  constructor() {
    (this.SkillId = 0),
      (this.ActorBlueprint = ""),
      (this.IsCommon = !1),
      (this.HasMontagePath = !1),
      (this.AssetRecord = new AssetRecord());
  }
}
exports.SkillAssetRecord = SkillAssetRecord;
class BulletAssetRecord {
  constructor() {
    (this.BulletId = ""),
      (this.ActorBlueprint = ""),
      (this.AssetRecord = new AssetRecord());
  }
}
exports.BulletAssetRecord = BulletAssetRecord;
class StateMachineAssetRecord {
  constructor() {
    (this.FsmKey = ""), (this.AssetRecord = new AssetRecord());
  }
}
exports.StateMachineAssetRecord = StateMachineAssetRecord;
class TemplateDataAssetRecord {
  constructor() {
    (this.TemplateDataId = 0), (this.AssetRecord = new AssetRecord());
  }
}
exports.TemplateDataAssetRecord = TemplateDataAssetRecord;
class PbDataAssetRecord {
  constructor() {
    (this.PbDataId = 0), (this.AssetRecord = new AssetRecord());
  }
}
exports.PbDataAssetRecord = PbDataAssetRecord;
class EntityMainAssetRecord {
  constructor() {
    (this.ModelId = 0),
      (this.ActorClassPath = void 0),
      (this.AssetRecord = new AssetRecord());
  }
}
exports.EntityMainAssetRecord = EntityMainAssetRecord;
class AssetElement {
  constructor(t) {
    (this.XJr = void 0),
      (this.AssetForIndexMap = new Map()),
      (this.HasError = !1),
      (this.AssetPathSet = new Set()),
      (this.NeedLoadAssets = new Array()),
      (this.NeedLoadAssetTypes = new Array()),
      (this.LoadingSet = new Set()),
      (this.LoadedSet = new Set()),
      (this.AddObjectCallback = void 0),
      (this.LoadPriority = 100),
      (this.B7 = void 0),
      (this.XJr = t);
  }
  GetEntityAssetElement() {
    return this.XJr;
  }
  SetCallback(t) {
    this.B7 = t;
  }
  ExecuteCallback() {
    var t = this.B7;
    (this.B7 = void 0), t?.(!this.HasError);
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
  AddObject(t, s) {
    return (
      !this.LoadedSet.has(t) &&
      (this.LoadedSet.add(t), this.AddObjectCallback?.(s, t), !0)
    );
  }
  AddActorClass(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(0), !0)
    );
  }
  AddAnimation(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(1), !0)
    );
  }
  AddEffect(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(2), !0)
    );
  }
  AddAudio(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(3), !0)
    );
  }
  AddMesh(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(4), !0)
    );
  }
  AddMaterial(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(5), !0)
    );
  }
  AddOther(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(7), !0)
    );
  }
  AddAnimationBlueprint(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(6), !0)
    );
  }
  AddAsset(t, s) {
    switch (t) {
      case 0:
        return this.AddActorClass(s);
      case 1:
        return this.AddAnimation(s);
      case 2:
        return this.AddEffect(s);
      case 3:
        return this.AddAudio(s);
      case 4:
        return this.AddMesh(s);
      case 5:
        return this.AddMaterial(s);
      case 6:
        return this.AddAnimationBlueprint(s);
      case 7:
        return this.AddOther(s);
    }
    return !0;
  }
  NeedLoadCount() {
    return this.NeedLoadAssets.length;
  }
  AddLoading(t) {
    return (
      !this.LoadedSet.has(t) &&
      !this.LoadingSet.has(t) &&
      (this.LoadingSet.add(t), !0)
    );
  }
  RemoveLoading(t) {
    return this.LoadingSet.delete(t);
  }
  RemoveLoaded(t) {
    return this.LoadedSet.delete(t);
  }
  Loading() {
    return 0 < this.NeedLoadAssets.length || 0 < this.LoadingSet.size;
  }
  Clear() {
    this.AssetForIndexMap.clear(),
      this.AssetPathSet.clear(),
      this.LoadedSet.clear(),
      this.LoadingSet.clear();
  }
  PrintDebugInfo() {}
}
class CommonAssetElement extends (exports.AssetElement = AssetElement) {
  AddObject(t, s) {
    return (
      !!super.AddObject(t, s) &&
      (this.AssetForIndexMap.set(
        t,
        ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.CommonAssets.Num(),
      ),
      ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.AddCommonAsset(
        s,
      ),
      !0)
    );
  }
  PrintDebugInfo() {
    var s =
      ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject
        .CommonAssets;
    let e = `
预加载的公共资源列表如下(数量:${s.Num()}):
`;
    var t,
      i,
      r = new Map();
    for ([t, i] of this.AssetForIndexMap) r.set(i, t);
    for (let t = 0; t < s.Num(); ++t) {
      var h = s.Get(t),
        o = r.get(t);
      e += `    索引:${t}, Path:${o}, IsValid:${h?.IsValid()}, Name:${h?.IsValid() ? h.GetName() : void 0}
`;
    }
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 3, e);
  }
  Clear() {
    ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.ClearCommonAsset(),
      super.Clear();
  }
}
exports.CommonAssetElement = CommonAssetElement;
class SkillAssetManager {
  constructor(t) {
    (this.FightAssetManager = t),
      (this.IWa = void 0),
      (this.SkillAssetMap = new Map()),
      (this._ar = void 0);
  }
  GetEntitySkillPreload(t) {
    var s;
    return (
      this.IWa ||
        ((this.IWa = new Map()),
        (s = this.FightAssetManager.EntityAssetElement.BlueprintClassPath)
          ?.length &&
          EntitySkillPreloadByActorBlueprint_1.configEntitySkillPreloadByActorBlueprint
            .GetConfigList(s)
            ?.forEach((t) => {
              this.IWa.set(t.SkillId, t);
            })),
      this.IWa.get(t)
    );
  }
  AddSkill(e, t) {
    return (
      void 0 === this._ar &&
        (this._ar = UE.NewObject(
          UE.HoldPreloadObject.StaticClass(),
          GlobalData_1.GlobalData.GameInstance,
        )),
      this.SkillAssetMap.has(e) &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("World", 3, "[预加载] 覆盖添加技能", ["SkillId", e]),
      t
        ? (this.SkillAssetMap.set(e, t),
          (t.AddObjectCallback = (t, s) => {
            4 !== this.FightAssetManager.EntityAssetElement.LoadState &&
              this._ar.AddEntityAsset(e, t);
          }),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[预加载] assetElement无效，添加技能失败",
              ["SkillId", e],
            ),
          !1)
    );
  }
  RemoveSkill(t) {
    return (
      !!this.SkillAssetMap.get(t) &&
      (this.SkillAssetMap.delete(t), this._ar?.RemoveEntityAssets(t), !0)
    );
  }
  GetSkill(t) {
    t = this.SkillAssetMap.get(t);
    if (t) return t;
  }
  Clear() {
    this.SkillAssetMap.clear(), this._ar?.Clear();
  }
}
exports.SkillAssetManager = SkillAssetManager;
class BulletAssetManager {
  constructor(t) {
    (this.FightAssetManager = t),
      (this.BulletMapping = new Map()),
      (this.IndexMapping = new Map()),
      (this.BulletAssetMap = new Map()),
      (this._ar = void 0),
      (this.jEe = -1);
  }
  AddBullet(t, s) {
    if (
      (void 0 === this._ar &&
        (this._ar = UE.NewObject(
          UE.HoldPreloadObject.StaticClass(),
          GlobalData_1.GlobalData.GameInstance,
        )),
      this.BulletMapping.has(t))
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 3, "[预加载] 重复添加子弹", ["BulletId", t]),
        !1
      );
    if (!s)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[预加载] assetElement无效，添加子弹失败",
            ["bulletId", t],
          ),
        !1
      );
    const e = ++this.jEe;
    return (
      this.BulletMapping.set(t, e),
      this.IndexMapping.set(e, t),
      this.BulletAssetMap.set(e, s),
      (s.AddObjectCallback = (t, s) => {
        4 !== this.FightAssetManager.EntityAssetElement.LoadState &&
          this._ar.AddEntityAsset(e, t);
      }),
      !0
    );
  }
  GetBullet(t) {
    t = this.BulletMapping.get(t);
    if (void 0 !== t) return this.BulletAssetMap.get(t);
  }
  RemoveBullet(t) {
    var s = this.BulletMapping.get(t);
    return (
      void 0 !== s &&
      (this.IndexMapping.delete(s),
      this.BulletMapping.delete(t),
      this.BulletAssetMap.delete(s),
      this._ar?.RemoveEntityAssets(s),
      !0)
    );
  }
  Clear() {
    (this.jEe = -1),
      this.BulletMapping.clear(),
      this.IndexMapping.clear(),
      this.BulletAssetMap.clear(),
      this._ar?.Clear();
  }
}
exports.BulletAssetManager = BulletAssetManager;
class PbDataAssetManager {
  constructor(t) {
    (this.FightAssetManager = t), (this._ar = void 0), (this._Gt = 1);
  }
  InitPbData(t) {
    return (
      void 0 === this._ar &&
        (this._ar = UE.NewObject(
          UE.HoldPreloadObject.StaticClass(),
          GlobalData_1.GlobalData.GameInstance,
        )),
      t
        ? ((t.AddObjectCallback = (t, s) => {
            4 !== this.FightAssetManager.EntityAssetElement.LoadState &&
              this._ar.AddEntityAsset(this._Gt, t);
          }),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("World", 3, "[预加载] assetElement无效"),
          !1)
    );
  }
  Clear() {
    this._ar?.Clear();
  }
}
exports.PbDataAssetManager = PbDataAssetManager;
class TemplateDataAssetManager {
  constructor(t) {
    (this.FightAssetManager = t), (this._ar = void 0), (this._Gt = 1);
  }
  InitTemplateData(t) {
    return (
      void 0 === this._ar &&
        (this._ar = UE.NewObject(
          UE.HoldPreloadObject.StaticClass(),
          GlobalData_1.GlobalData.GameInstance,
        )),
      t
        ? ((t.AddObjectCallback = (t, s) => {
            4 !== this.FightAssetManager.EntityAssetElement.LoadState &&
              this._ar.AddEntityAsset(this._Gt, t);
          }),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("World", 3, "[预加载] assetElement无效"),
          !1)
    );
  }
  Clear() {
    this._ar?.Clear();
  }
}
exports.TemplateDataAssetManager = TemplateDataAssetManager;
class FightAssetManager {
  constructor(t) {
    (this.EntityAssetElement = t),
      (this.SkillAssetManager = new SkillAssetManager(this)),
      (this.BulletAssetManager = new BulletAssetManager(this)),
      (this.PbDataAssetManager = new PbDataAssetManager(this)),
      (this.TemplateDataAssetManager = new TemplateDataAssetManager(this));
  }
  Clear() {
    this.SkillAssetManager.Clear(),
      this.BulletAssetManager.Clear(),
      this.PbDataAssetManager.Clear(),
      this.TemplateDataAssetManager.Clear();
  }
}
exports.FightAssetManager = FightAssetManager;
class EntityAssetElement {
  constructor(t) {
    (this.Promise = void 0),
      (this.MainAsset = new AssetElement(this)),
      (this.FightAssetManager = new FightAssetManager(this)),
      (this.EntityHandle = void 0),
      (this.CreatureDataComponent = void 0),
      (this.Callbacks = void 0),
      (this.LoadPriority = 100),
      (this.uar = 0),
      (this.car = !1),
      (this.mar = void 0),
      (this.IsDestroy = !1),
      (this.EntityHandle = t),
      (this.CreatureDataComponent = t.Entity.GetComponent(0)),
      (ModelManager_1.ModelManager.PreloadModelNew.LoadingNeedWaitEntitySet.has(
        t.Id,
      ) ||
        (this.CreatureDataComponent.IsRole() &&
          this.CreatureDataComponent.GetPlayerId() ===
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId())) &&
        (this.LoadPriority = 101);
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
    return this.EntityHandle?.Entity;
  }
  get BlueprintClassPath() {
    return this.mar;
  }
  set BlueprintClassPath(t) {
    this.mar = t;
  }
  AddCallback(t) {
    t &&
      (this.Callbacks || (this.Callbacks = new Array()),
      this.Callbacks.push(t));
  }
  DoCallback(t) {
    if (this.Callbacks?.length) {
      for (const s of this.Callbacks) s(t);
      this.Callbacks = void 0;
    }
  }
  ClearCallback() {
    this.Callbacks = void 0;
  }
  Clear() {
    var t = this.Entity?.GetComponent(0)?.GetCreatureDataId();
    ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.RemoveEntityAssets(
      t,
    ),
      this.FightAssetManager.Clear(),
      (this.mar = void 0),
      (this.EntityHandle = void 0),
      (this.CreatureDataComponent = void 0),
      (this.car = !1),
      this.Callbacks && this.DoCallback(4),
      (this.Callbacks = void 0),
      (this.uar = 0),
      (this.IsDestroy = !0);
  }
  PrintDebugInfo() {}
}
exports.EntityAssetElement = EntityAssetElement;
class PreloadSetting {
  static get UseNewPreload() {
    return PreloadSetting.dar;
  }
  static SetUseNewPreload(t) {
    PreloadSetting.dar = t;
  }
}
((exports.PreloadSetting = PreloadSetting).Default = new PreloadSetting()),
  (PreloadSetting.dar = !0);
//# sourceMappingURL=PreloadDefine.js.map
