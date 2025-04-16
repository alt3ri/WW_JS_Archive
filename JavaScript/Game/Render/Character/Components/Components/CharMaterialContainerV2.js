"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialContainerV2 = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase"),
  charMeshName = new UE.FName("CharacterMesh0");
class CharMaterialContainerV2 extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.gel = void 0),
      (this.xW = void 0),
      (this.vI1 = void 0),
      (this.IdentifyName = ""),
      (this.pel = void 0);
  }
  Start() {
    var t = this.GetRenderingComponent().GetCachedOwner(),
      e = this.GetRenderingComponent().RenderType;
    t &&
      ((this.gel = t.GetComponentByClass(
        UE.KuroMaterialControllerComponent.StaticClass(),
      )),
      this.gel ||
        ((this.gel = t.AddComponentByClass(
          UE.KuroMaterialControllerComponent.StaticClass(),
          !1,
          void 0,
          !1,
        )),
        6 === e || 7 === e
          ? this.gel.SetInitTakeOver(!1)
          : this.gel.SetInitTakeOver(!0),
        this.gel.InitFromOwner()),
      0 === e && this.gel.SetToonCustomStencilValue(1),
      (this.IdentifyName = t.GetClass().GetName()),
      (e =
        this.gel.GetRegisteredSkeletalMeshComponent(
          charMeshName,
        )?.SkeletalMesh) &&
        (this.IdentifyName = this.IdentifyName + "_" + e.GetName()),
      (this.xW = Stats_1.Stat.CreateNoFlameGraph(
        "CharMaterialContainerV2_Tick_" + this.IdentifyName,
      )),
      (this.vI1 = Stats_1.Stat.CreateNoFlameGraph(
        "CharMaterialContainerV2_UpdateEffectOnly_" + this.IdentifyName,
      )),
      this.OnInitSuccess());
  }
  Update() {
    this.xW?.Start();
    var t = this.RenderComponent.GetTimeDilation(),
      i =
        (this.gel.ManualTick(this.GetDeltaTime() * t, !1, !1),
        this.gel.UpdateEffects(),
        this.gel.SetUpdateForce(!1),
        this.gel.RemoveDeadEffects());
    if (this.pel)
      for (let t = 0, e = i.Num(); t < e; ++t)
        for (const s of this.pel) s(i.Get(t));
    this.xW?.Stop();
  }
  UpdateEffectsOnly() {
    this.vI1?.Start(), this.gel.UpdateEffects(), this.vI1?.Stop();
  }
  ForceUpdateOnce() {
    this.gel?.MarkForceUpdateAllOnce(), this.gel?.SetUpdateForce(!0);
  }
  AddSkeletalComponent(t, e, i = !1) {
    this.gel.AddSkeletalMeshComponent(t, new UE.FName(e), i);
  }
  GetSkeletalComponent(t) {
    return this.gel.GetRegisteredSkeletalMeshComponent(new UE.FName(t));
  }
  RemoveSkeletalComponent(t) {
    this.gel.RemoveSkeletalMeshComponent(new UE.FName(t));
  }
  AddEffect(t, e, i, s, a = !1) {
    return this.gel.AddEffect_Ex(t, e, i, s, a);
  }
  SetEffectLoop(t, e) {
    this.gel.SetHandleLoop(t, e, !0);
  }
  SetEffectPause(t, e) {
    this.gel.SetHandlePause(t, e);
  }
  SetEffectProgress(t, e) {
    this.gel.SeekHandleFactor(t, e);
  }
  RemoveEffect(t) {
    if ((this.gel.RemoveEffect(t), this.pel)) for (const e of this.pel) e(t);
  }
  OnResetRenderState() {
    this.gel.RemoveAllEffects(), this.gel.UpdateEffects();
  }
  SetFloatUpdateParamPermanent(t, e, i, s, a) {
    this.gel.AddFloatUpdateParamPermanent(t, e, i, s, a ?? 17);
  }
  SetColorUpdateParamPermanent(t, e, i, s, a) {
    this.gel.AddColorUpdateParamPermanent(t, e, i, s, a ?? 17);
  }
  SetTextureUpdateParamPermanent(t, e, i, s, a) {
    this.gel.AddTextureUpdateParamPermanent(t, e, i, s, a ?? 17);
  }
  RemoveFloatUpdateParamPermanent(t, e, i, s) {
    this.gel.RemoveFloatUpdateParamPermanent(t, e, i, s ?? 17);
  }
  RemoveColorUpdateParamPermanent(t, e, i, s) {
    this.gel.RemoveColorUpdateParamPermanent(t, e, i, s ?? 17);
  }
  RemoveTextureUpdateParamPermanent(t, e, i, s) {
    this.gel.RemoveTextureUpdateParamPermanent(t, e, i, s ?? 17);
  }
  SetExternalMaterialReplace(t, e, i, s) {
    this.gel.SetExternalMaterialReplace(t, e, i, s ?? 17);
  }
  RemoveExternalMaterialReplace(t, e, i) {
    this.gel.RemoveExternalMaterialReplace(t, e, i ?? 17);
  }
  AddAlphaTestCount(t) {
    this.gel.AddExternalAlphaTestRefCount(t);
  }
  AddOutlineStencilTestCount(t) {
    this.gel.AddExternalOutlineStencilTestRefCount(t);
  }
  AddBattleCount(t) {
    this.gel.AddExternalBattleRefCount(t);
  }
  AddBattleMaskCount(t) {
    this.gel.AddExternalBattleMaskRefCount(t);
  }
  RemoveAlphaTestCount(t) {
    this.gel.RemoveExternalAlphaTestRefCount(t);
  }
  RemoveOutlineStencilTestCount(t) {
    this.gel.RemoveExternalOutlineStencilTestRefCount(t);
  }
  RemoveBattleCount(t) {
    this.gel.RemoveExternalBattleRefCount(t);
  }
  RemoveBattleMaskCount(t) {
    this.gel.RemoveExternalBattleMaskRefCount(t);
  }
  SetNoWater(t) {
    this.gel.SetAllBodyNoWater(t);
  }
  AddEffectFinishCallback(t) {
    t &&
      (this.pel || (this.pel = new Set()), this.pel.has(t) || this.pel.add(t));
  }
  RemoveEffectFinishCallback(t) {
    t && this.pel && this.pel.delete(t);
  }
  GetAnyUnloopEffect() {
    return this.gel.GetAnyUnloopEffect();
  }
  Destroy() {}
  GetStatName() {
    return "CharMaterialContainerV2";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdMaterialContainerV2;
  }
}
exports.CharMaterialContainerV2 = CharMaterialContainerV2;
//# sourceMappingURL=CharMaterialContainerV2.js.map
