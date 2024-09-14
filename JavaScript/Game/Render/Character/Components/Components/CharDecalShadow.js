"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharDecalShadow = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  RenderDataManager_1 = require("../../../Data/RenderDataManager"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase"),
  materialParameterNameOpacity = new UE.FName("Opacity");
class CharDecalShadow extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.DecalShadowEnabled = !1),
      (this.RealtimeShadowEnabled = !0),
      (this.thr = void 0),
      (this.Lo = void 0),
      (this.ihr = new Map()),
      (this.ohr = void 0),
      (this.rhr = void 0),
      (this.nhr = void 0),
      (this.shr = 1);
  }
  static OnSetDecalShadowEnabled(e) {
    if (0 < e) for (const t of CharDecalShadow.hhr) t.EnableDecalShadow();
    else for (const i of CharDecalShadow.hhr) i.DisableDecalShadow();
  }
  Start() {
    (this.thr = this.GetRenderingComponent().GetOwner()),
      (this.Lo = this.GetRenderingComponent().DecalShadowConfig),
      this.Lo ||
        (this.Lo =
          RenderDataManager_1.RenderDataManager.Get().GetGlobalDecalShadowConfig()),
      this.Lo &&
        (this.lhr(),
        CharDecalShadow.hhr.add(this),
        CharDecalShadow._hr ||
          (EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.SetDecalShadowEnabled,
            CharDecalShadow.OnSetDecalShadowEnabled,
          ),
          (CharDecalShadow._hr = !0)),
        this.OnInitSuccess());
  }
  Destroy() {
    this.ohr?.K2_DestroyActor(), CharDecalShadow.hhr.delete(this);
  }
  lhr() {
    var t = this.thr.K2_GetComponentsByClass(
        UE.PrimitiveComponent.StaticClass(),
      ),
      i = t.Num();
    for (let e = 0; e < i; e++) {
      var a = t.Get(e);
      a.CastShadow && this.ihr.set(a.GetName(), a);
    }
  }
  AddPrimitiveComponent(e, t) {
    t.CastShadow &&
      (this.RemovePrimitiveComponent(e),
      this.ihr.set(e, t),
      this.RealtimeShadowEnabled || (t.CastShadow = !1));
  }
  RemovePrimitiveComponent(e) {
    var t = this.ihr.get(e);
    t && ((t.CastShadow = !0), this.ihr.delete(e));
  }
  EnableDecalShadow() {
    var e, t, i;
    this.DecalShadowEnabled ||
      ((e = this.Lo) &&
        ((i = (t = this.thr).GetComponentByClass(
          UE.CapsuleComponent.StaticClass(),
        ))
          ? (this.ohr
              ? (this.rhr.SetVisibility(!0),
                Info_1.Info.IsGameRunning() ||
                  this.uhr(e, i.CapsuleRadius, i.CapsuleHalfHeight))
              : ((this.ohr = ActorSystem_1.ActorSystem.Spawn(
                  UE.Actor.StaticClass(),
                  void 0,
                  this.thr,
                )),
                (this.rhr = this.ohr.AddComponentByClass(
                  UE.DecalComponent.StaticClass(),
                  !1,
                  void 0,
                  !1,
                )),
                ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
                  this.ohr,
                  this.thr,
                  2,
                  "CharDecalShadow.EnableDecalShadow",
                  void 0,
                  0,
                  0,
                  0,
                  !1,
                ),
                this.ohr.K2_SetActorRotation(
                  UE.Rotator.MakeFromEuler(new UE.Vector(0, -90, 0)),
                  !0,
                ),
                this.ohr.K2_SetActorRelativeLocation(
                  new UE.Vector(0, 0, -i.CapsuleHalfHeight),
                  !1,
                  void 0,
                  !0,
                ),
                this.uhr(e, i.CapsuleRadius, i.CapsuleHalfHeight)),
            (this.DecalShadowEnabled = !0),
            this.SetDecalShadowOpacity(this.shr))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Render", 26, "Decal Shadow找不到胶囊体", [
              "Actor: ",
              t.GetName(),
            ])));
  }
  DisableDecalShadow() {
    this.DecalShadowEnabled &&
      (this.rhr?.SetVisibility(!1),
      (this.DecalShadowEnabled = !1),
      this.SetDecalShadowOpacity(this.shr));
  }
  EnableRealtimeShadow() {
    if (!this.RealtimeShadowEnabled) {
      for (const e of this.ihr.values()) e.SetCastShadow(!0);
      (this.RealtimeShadowEnabled = !0),
        this.SetRealtimeShadowOpacity(this.shr);
    }
  }
  DisableRealtimeShadow() {
    if (this.RealtimeShadowEnabled) {
      for (const e of this.ihr.values()) e.SetCastShadow(!1);
      (this.RealtimeShadowEnabled = !1),
        this.SetRealtimeShadowOpacity(this.shr);
    }
  }
  DisableAllShadow() {
    this.DisableDecalShadow(), this.DisableRealtimeShadow();
  }
  SetDecalShadowOpacity(e) {
    (this.shr = e),
      this.DecalShadowEnabled &&
        (e < MathUtils_1.MathUtils.KindaSmallNumber
          ? this.rhr.SetVisibility(!1)
          : (this.rhr.SetVisibility(!0),
            this.nhr.SetScalarParameterValue(materialParameterNameOpacity, e)));
  }
  SetRealtimeShadowOpacity(e) {
    if (
      ((this.shr = e),
      this.RealtimeShadowEnabled &&
        3 === this.GetRenderingComponent().RenderType)
    ) {
      var t = e > CharDecalShadow.chr;
      for (const i of this.ihr.values()) i.SetCastShadow(t);
    }
  }
  uhr(e, t, i) {
    (this.rhr.ZFadingFactor = e.ZDistanceFadeFactor),
      (this.rhr.ZFadingPower = e.ZDistanceFadePower),
      (this.nhr = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
        this.rhr,
        e.DecalShadowMaterial,
      )),
      this.rhr.SetDecalMaterial(this.nhr);
    var a = 25 * e.DecalBoxScaleHori,
      i = i * e.DecalBoxScaleVerti;
    this.rhr.SetWorldScale3D(new UE.Vector(i, a, a));
  }
  GetStatName() {
    return "CharDecalShadow";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdDecalShadow;
  }
}
((exports.CharDecalShadow = CharDecalShadow)._hr = !1),
  (CharDecalShadow.hhr = new Set()),
  (CharDecalShadow.chr = 0.2);
//# sourceMappingURL=CharDecalShadow.js.map
