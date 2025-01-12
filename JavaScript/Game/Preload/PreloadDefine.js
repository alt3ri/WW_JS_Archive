"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadSetting =
    exports.EntityAssetElement =
    exports.FightAssetManager =
    exports.StateMachineAssetManager =
    exports.BulletAssetManager =
    exports.SkillAssetManager =
    exports.CommonAssetElement =
    exports.AssetElement =
    exports.EntityMainAssetRecord =
    exports.StateMachineAssetRecord =
    exports.BulletAssetRecord =
    exports.SkillAssetRecord =
    exports.AssetRecord =
    exports.USE_DB =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
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
class EntityMainAssetRecord {
  constructor() {
    (this.ModelId = 0),
      (this.ActorClassPath = void 0),
      (this.AssetRecord = new AssetRecord());
  }
}
exports.EntityMainAssetRecord = EntityMainAssetRecord;
class AssetElement {
  constructor() {
    (this.AssetForIndexMap = new Map()),
      (this.HasError = !1),
      (this.AssetPathSet = new Set()),
      (this.NeedLoadAssets = new Array()),
      (this.LoadingSet = new Set()),
      (this.LoadedSet = new Set()),
      (this.AddObjectCallback = void 0),
      (this.LoadPriority = 100),
      (this.B7 = void 0);
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
    this.LoadedSet.has(t) || this.AddObjectCallback?.(s, t);
  }
  AddActorClass(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([0, t]), !0)
    );
  }
  AddAnimation(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([1, t]), !0)
    );
  }
  AddEffect(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([2, t]), !0)
    );
  }
  AddAudio(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([3, t]), !0)
    );
  }
  AddMesh(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([4, t]), !0)
    );
  }
  AddMaterial(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([5, t]), !0)
    );
  }
  AddOther(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([7, t]), !0)
    );
  }
  AddAnimationBlueprint(t) {
    return (
      !!this.CheckPath(t) &&
      !!this.AddPath(t) &&
      (this.NeedLoadAssets.push([6, t]), !0)
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
  AddLoaded(t) {
    return !this.LoadedSet.has(t) && (this.LoadedSet.add(t), !0);
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
    this.AssetForIndexMap.set(
      t,
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.CommonAssets.Num(),
    ),
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddCommonAsset(
        s,
      );
  }
  PrintDebugInfo() {
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
        o = r.get(t);
      e += `    索引:${t}, Path:${o}, IsValid:${h?.IsValid()}, Name:${h?.IsValid() ? h.GetName() : void 0}
`;
    }
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 3, e);
  }
  Clear() {
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.ClearCommonAsset(),
      super.Clear();
  }
}
exports.CommonAssetElement = CommonAssetElement;
class SkillAssetManager {
  constructor(t) {
    (this.FightAssetManager = t),
      (this.SkillAssetMap = new Map()),
      (this._ar = void 0);
  }
  AddSkill(e, t) {
    return (
      void 0 === this._ar &&
        (this._ar = UE.NewObject(
          UE.HoldPreloadObject.StaticClass(),
          GlobalData_1.GlobalData.GameInstance,
        )),
      this.SkillAssetMap.has(e)
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("World", 3, "[预加载] 重复添加技能", [
              "SkillId",
              e,
            ]),
          !1)
        : t
          ? (this.SkillAssetMap.set(e, t),
            (t.AddObjectCallback = (t, s) => {
              3 !== this.FightAssetManager.EntityAssetElement.LoadState &&
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
      (this.jEe = -1),
      (this._ar = UE.NewObject(
        UE.HoldPreloadObject.StaticClass(),
        GlobalData_1.GlobalData.GameInstance,
      ));
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
        3 !== this.FightAssetManager.EntityAssetElement.LoadState &&
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
class StateMachineAssetManager {
  constructor(t) {
    (this.FightAssetManager = t),
      (this.StateMachineMapping = new Map()),
      (this.IndexMapping = new Map()),
      (this.StateMachineAssetMap = new Map()),
      (this._ar = void 0),
      (this.jEe = -1),
      (this._ar = UE.NewObject(
        UE.HoldPreloadObject.StaticClass(),
        GlobalData_1.GlobalData.GameInstance,
      ));
  }
  AddStateMachine(t, s) {
    if (
      (void 0 === this._ar &&
        (this._ar = UE.NewObject(
          UE.HoldPreloadObject.StaticClass(),
          GlobalData_1.GlobalData.GameInstance,
        )),
      this.StateMachineMapping.has(t))
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 3, "[预加载] 重复添加状态机", ["fsmKey", t]),
        !1
      );
    if (!s)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[预加载] assetElement无效，添加状态机失败",
            ["FsmKey", t],
          ),
        !1
      );
    const e = ++this.jEe;
    return (
      this.StateMachineMapping.set(t, e),
      this.IndexMapping.set(e, t),
      this.StateMachineAssetMap.set(e, s),
      (s.AddObjectCallback = (t, s) => {
        3 !== this.FightAssetManager.EntityAssetElement.LoadState &&
          this._ar.AddEntityAsset(e, t);
      }),
      !0
    );
  }
  GetStateMachine(t) {
    t = this.StateMachineMapping.get(t);
    if (void 0 !== t) return this.StateMachineAssetMap.get(t);
  }
  RemoveStateMachine(t) {
    var s = this.StateMachineMapping.get(t);
    return (
      void 0 !== s &&
      (this.IndexMapping.delete(s),
      this.StateMachineMapping.delete(t),
      this.StateMachineAssetMap.delete(s),
      this._ar?.RemoveEntityAssets(s),
      !0)
    );
  }
  Clear() {
    (this.jEe = -1),
      this.StateMachineMapping.clear(),
      this.IndexMapping.clear(),
      this.StateMachineAssetMap.clear(),
      this._ar?.Clear();
  }
}
exports.StateMachineAssetManager = StateMachineAssetManager;
class FightAssetManager {
  constructor(t) {
    (this.EntityAssetElement = t),
      (this.SkillAssetManager = new SkillAssetManager(this)),
      (this.BulletAssetManager = new BulletAssetManager(this)),
      (this.StateMachineAssetManager = new StateMachineAssetManager(this));
  }
  Clear() {
    this.SkillAssetManager.Clear(),
      this.BulletAssetManager.Clear(),
      this.StateMachineAssetManager.Clear();
  }
}
exports.FightAssetManager = FightAssetManager;
class EntityAssetElement {
  constructor(t) {
    (this.Promise = void 0),
      (this.MainAsset = new AssetElement()),
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
      (ModelManager_1.ModelManager.PreloadModel.LoadingNeedWaitEntitySet.has(
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
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.RemoveEntityAssets(
      this.Entity.Id,
    ),
      this.FightAssetManager.Clear(),
      (this.mar = void 0),
      (this.EntityHandle = void 0),
      (this.CreatureDataComponent = void 0),
      (this.car = !1),
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
  (PreloadSetting.dar = !1);
//# sourceMappingURL=PreloadDefine.js.map
