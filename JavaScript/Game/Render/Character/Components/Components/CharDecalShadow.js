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
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
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
      (this.shr = 1),
      (this.ahr = new UE.FName("Opacity"));
  }
  static OnSetDecalShadowEnabled(t) {
    if (0 < t) for (const e of CharDecalShadow.hhr) e.EnableDecalShadow();
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
    var e = this.thr.K2_GetComponentsByClass(
        UE.PrimitiveComponent.StaticClass(),
      ),
      i = e.Num();
    for (let t = 0; t < i; t++) {
      var h = e.Get(t);
      h.CastShadow && this.ihr.set(h.GetName(), h);
    }
  }
  AddPrimitiveComponent(t, e) {
    e.CastShadow &&
      (this.RemovePrimitiveComponent(t),
      this.ihr.set(t, e),
      this.RealtimeShadowEnabled || (e.CastShadow = !1));
  }
  RemovePrimitiveComponent(t) {
    var e = this.ihr.get(t);
    e && ((e.CastShadow = !0), this.ihr.delete(t));
  }
  EnableDecalShadow() {
    var t, e, i;
    this.DecalShadowEnabled ||
      ((t = this.Lo) &&
        ((i = (e = this.thr).GetComponentByClass(
          UE.CapsuleComponent.StaticClass(),
        ))
          ? (this.ohr
              ? (this.rhr.SetVisibility(!0),
                Info_1.Info.IsGameRunning() ||
                  this.uhr(t, i.CapsuleRadius, i.CapsuleHalfHeight))
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
                this.uhr(t, i.CapsuleRadius, i.CapsuleHalfHeight)),
            (this.DecalShadowEnabled = !0),
            this.SetDecalShadowOpacity(this.shr))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Render", 26, "Decal Shadow找不到胶囊体", [
              "Actor: ",
              e.GetName(),
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
      for (const t of this.ihr.values()) t.SetCastShadow(!0);
      (this.RealtimeShadowEnabled = !0),
        this.SetRealtimeShadowOpacity(this.shr);
    }
  }
  DisableRealtimeShadow() {
    if (this.RealtimeShadowEnabled) {
      for (const t of this.ihr.values()) t.SetCastShadow(!1);
      (this.RealtimeShadowEnabled = !1),
        this.SetRealtimeShadowOpacity(this.shr);
    }
  }
  DisableAllShadow() {
    this.DisableDecalShadow(), this.DisableRealtimeShadow();
  }
  SetDecalShadowOpacity(t) {
    (this.shr = t),
      this.DecalShadowEnabled &&
        (t < MathUtils_1.MathUtils.KindaSmallNumber
          ? this.rhr.SetVisibility(!1)
          : (this.rhr.SetVisibility(!0),
            this.nhr.SetScalarParameterValue(this.ahr, t)));
  }
  SetRealtimeShadowOpacity(t) {
    if (
      ((this.shr = t),
      this.RealtimeShadowEnabled &&
        3 == this.GetRenderingComponent().RenderType)
    ) {
      var e = t > CharDecalShadow.chr;
      for (const i of this.ihr.values()) i.SetCastShadow(e);
    }
  }
  uhr(t, e, i) {
    (this.rhr.ZFadingFactor = t.ZDistanceFadeFactor),
      (this.rhr.ZFadingPower = t.ZDistanceFadePower),
      (this.nhr = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
        this.rhr,
        t.DecalShadowMaterial,
      )),
      this.rhr.SetDecalMaterial(this.nhr);
    var h = 25 * t.DecalBoxScaleHori,
      i = i * t.DecalBoxScaleVerti;
    this.rhr.SetWorldScale3D(new UE.Vector(i, h, h));
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
