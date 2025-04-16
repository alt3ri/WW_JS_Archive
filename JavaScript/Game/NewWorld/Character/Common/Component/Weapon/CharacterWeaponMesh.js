"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterWeaponMesh =
    exports.CharacterWeapon =
    exports.WEAPON_HIDDEN_EFFECT =
      void 0);
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  SkeletalMeshEffectContext_1 = require("../../../../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SkeletalMeshComponentPool_1 = require("../MeshHelper/SkeletalMeshComponentPool"),
  WeaponMeshVisibleHelper_1 = require("./WeaponMeshVisibleHelper");
exports.WEAPON_HIDDEN_EFFECT =
  "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd";
class CharacterWeapon {
  constructor(e, t, s, i = void 0) {
    (this.Index = e),
      (this.Mesh = t),
      (this.HideEffectMode = s),
      (this.EntityId = i),
      (this.NormalSocket = void 0),
      (this.BattleSocket = void 0),
      (this.BattleEffectId = void 0),
      (this.LerpStartTransform = void 0),
      (this.LerpEndTransform = void 0),
      (this.WeaponHidden = !1),
      (this.WeaponHideEffect = 0),
      (this.WeaponBuffEffects = new Set()),
      (this.SceneInteractId = 0),
      (this.VisibleHelper =
        new WeaponMeshVisibleHelper_1.WeaponMeshVisibleHelper(this));
  }
  Destroy() {
    this.ReleaseHideEffect(),
      0 !== this.SceneInteractId &&
        ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(
          this.SceneInteractId,
        );
  }
  ReleaseHideEffect() {
    EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.WeaponHideEffect,
        "[CharacterWeapon.Destroy]",
        !0,
      ),
      (this.WeaponHideEffect = 0));
  }
  ShowHideEffect(e = void 0) {
    var t,
      s = this.Mesh.D_GetSocketTransform(FNameUtil_1.FNameUtil.EMPTY, 0);
    EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect) ||
      (((t = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
        this.EntityId,
      )).SkeletalMeshComp = this.Mesh),
      (this.WeaponHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(
        this.Mesh,
        s,
        e ?? exports.WEAPON_HIDDEN_EFFECT,
        "[CharacterWeapon.ShowHideEffect]",
        t,
      ))),
      EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect)
        ? e ||
          ((t = EffectSystem_1.EffectSystem.GetEffectActor(
            this.WeaponHideEffect,
          )).K2_AttachToComponent(
            this.Mesh,
            FNameUtil_1.FNameUtil.EMPTY,
            0,
            0,
            0,
            !1,
          ),
          t.D_K2_SetActorTransform(s, !1, void 0, !0))
        : (this.WeaponHideEffect = 0);
  }
  SetBuffEffectsHiddenInGame(e) {
    for (const s of this.WeaponBuffEffects) {
      var t;
      EffectSystem_1.EffectSystem.IsValid(s)
        ? (t = EffectSystem_1.EffectSystem.GetSureEffectActor(s))?.IsValid() &&
          t.bHidden !== e &&
          EffectSystem_1.EffectSystem.SetEffectHidden(s, e)
        : this.WeaponBuffEffects.delete(s);
    }
  }
  AddBuffEffect(e) {
    this.WeaponBuffEffects.add(e),
      this.WeaponHidden &&
        EffectSystem_1.EffectSystem.GetEffectActor(e)?.IsValid() &&
        EffectSystem_1.EffectSystem.SetEffectHidden(e, !0);
  }
  RemoveBuffEffect(e) {
    this.WeaponBuffEffects.delete(e);
  }
  UpdateSceneInteractEnable(e) {
    var t;
    if (ModelManager_1.ModelManager.SceneBattleInteractModel?.Open)
      return (
        (e = e && !this.WeaponHidden),
        0 === this.SceneInteractId
          ? e
            ? void (
                (t =
                  ModelManager_1.ModelManager.SceneBattleInteractModel.GetDefaultWeaponInteractConfig()) &&
                (t =
                  ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(
                    t,
                  )) &&
                ((this.SceneInteractId = t.Id),
                t.SetUpdateLocationSocket(
                  this.Mesh,
                  FNameUtil_1.FNameUtil.EMPTY,
                ),
                t.SetEnable(!0))
              )
            : void 0
          : void ModelManager_1.ModelManager.SceneBattleInteractModel.SetSceneBattleInteractEnable(
              this.SceneInteractId,
              e,
            )
      );
    this.SceneInteractId = 0;
  }
}
exports.CharacterWeapon = CharacterWeapon;
const WEAPON_POOL_MAX_SIZE = 3;
class CharacterWeaponMesh {
  constructor() {
    (this.ler = new Array()), (this._er = void 0), (this.OC = void 0);
  }
  Init(t, e, s, i) {
    if (
      ((this._er = new SkeletalMeshComponentPool_1.SkeletalMeshComponentPool()),
      this._er.Init(WEAPON_POOL_MAX_SIZE, e, s, t, i),
      (this.OC = s),
      0 !== t.length)
    ) {
      let e = 0;
      for (const h of t)
        this.ler.push(
          new CharacterWeapon(e, h, s.WeaponHideEffect, this.OC.EntityId),
        ),
          e++;
    }
    return !0;
  }
  Destroy() {
    for (const e of this.ler) e.Destroy();
    this.ler.splice(0, this.ler.length), (this._er = void 0);
  }
  ChangeCharacterWeapons(t) {
    var s = this.ler.length;
    if (t > WEAPON_POOL_MAX_SIZE) return [];
    var i = this._er?.GetComponents(t);
    if (!i) return [];
    if (t < s) {
      this.ler.splice(t, s - t);
      for (let e = 0; e < t; ++e) this.ler[e].Mesh = i[e];
    } else if (s < t) {
      var h = t - s;
      for (let e = 0; e < s; ++e) this.ler[e].Mesh = i[e];
      for (let e = 0; e < h; ++e)
        this.ler.push(
          new CharacterWeapon(
            e + s,
            i[e + s],
            this.OC.WeaponHideEffect,
            this.OC.EntityId,
          ),
        );
    }
    return this.ler;
  }
  get CharacterWeapons() {
    return this.ler;
  }
  Clean() {
    this.ChangeCharacterWeapons(0);
  }
  ShrinkPool() {
    this._er.Shrink();
  }
  GetUsedLength() {
    return this._er.GetUsedLength();
  }
}
exports.CharacterWeaponMesh = CharacterWeaponMesh;
//# sourceMappingURL=CharacterWeaponMesh.js.map
