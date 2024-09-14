"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterWeaponMesh = exports.CharacterWeapon = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  SkeletalMeshEffectContext_1 = require("../../../../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  SkeletalMeshComponentPool_1 = require("../MeshHelper/SkeletalMeshComponentPool"),
  WeaponMeshVisibleHelper_1 = require("./WeaponMeshVisibleHelper"),
  WEAPON_HIDDEN_EFFECT =
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
      (this.VisibleHelper =
        new WeaponMeshVisibleHelper_1.WeaponMeshVisibleHelper(this));
  }
  Destroy() {
    this.ReleaseHideEffect();
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
  ShowHideEffect() {
    var e,
      t = this.Mesh.GetSocketTransform(FNameUtil_1.FNameUtil.EMPTY, 0);
    EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect) ||
      (((e = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
        this.EntityId,
      )).SkeletalMeshComp = this.Mesh),
      (this.WeaponHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(
        this.Mesh,
        t,
        WEAPON_HIDDEN_EFFECT,
        "[CharacterWeapon.ShowHideEffect]",
        e,
      ))),
      EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect)
        ? ((e = EffectSystem_1.EffectSystem.GetEffectActor(
            this.WeaponHideEffect,
          )).K2_AttachToComponent(
            this.Mesh,
            FNameUtil_1.FNameUtil.EMPTY,
            0,
            0,
            0,
            !1,
          ),
          e.K2_SetActorTransform(t, !1, void 0, !0))
        : (this.WeaponHideEffect = 0);
  }
  SetBuffEffectsHiddenInGame(e) {
    for (const s of this.WeaponBuffEffects) {
      var t;
      EffectSystem_1.EffectSystem.IsValid(s)
        ? (t = EffectSystem_1.EffectSystem.GetEffectActor(s)) instanceof
            UE.Actor &&
          t?.IsValid() &&
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
