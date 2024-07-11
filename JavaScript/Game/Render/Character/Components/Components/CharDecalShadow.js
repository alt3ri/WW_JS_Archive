"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharDecalShadow = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const RenderDataManager_1 = require("../../../Data/RenderDataManager");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharDecalShadow extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.DecalShadowEnabled = !1),
      (this.RealtimeShadowEnabled = !0),
      (this.tar = void 0),
      (this.Lo = void 0),
      (this.iar = new Map()),
      (this.oar = void 0),
      (this.rar = void 0),
      (this.nar = void 0),
      (this.sar = 1),
      (this.aar = new UE.FName("Opacity"));
  }
  static OnSetDecalShadowEnabled(t) {
    if (t > 0) for (const e of CharDecalShadow.har) e.EnableDecalShadow();
    else for (const i of CharDecalShadow.har) i.DisableDecalShadow();
  }
  Start() {
    (this.tar = this.GetRenderingComponent().GetOwner()),
      (this.Lo = this.GetRenderingComponent().DecalShadowConfig),
      this.Lo ||
        (this.Lo =
          RenderDataManager_1.RenderDataManager.Get().GetGlobalDecalShadowConfig()),
      this.Lo &&
        (this.lar(),
        CharDecalShadow.har.add(this),
        CharDecalShadow._ar ||
          (EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.SetDecalShadowEnabled,
            CharDecalShadow.OnSetDecalShadowEnabled,
          ),
          (CharDecalShadow._ar = !0)),
        this.OnInitSuccess());
  }
  Destroy() {
    this.oar?.K2_DestroyActor(), CharDecalShadow.har.delete(this);
  }
  lar() {
    const e = this.tar.K2_GetComponentsByClass(
      UE.PrimitiveComponent.StaticClass(),
    );
    const i = e.Num();
    for (let t = 0; t < i; t++) {
      const h = e.Get(t);
      h.CastShadow && this.iar.set(h.GetName(), h);
    }
  }
  AddPrimitiveComponent(t, e) {
    e.CastShadow &&
      (this.RemovePrimitiveComponent(t),
      this.iar.set(t, e),
      this.RealtimeShadowEnabled || (e.CastShadow = !1));
  }
  RemovePrimitiveComponent(t) {
    const e = this.iar.get(t);
    e && ((e.CastShadow = !0), this.iar.delete(t));
  }
  EnableDecalShadow() {
    let t, e, i;
    this.DecalShadowEnabled ||
      ((t = this.Lo) &&
        ((i = (e = this.tar).GetComponentByClass(
          UE.CapsuleComponent.StaticClass(),
        ))
          ? (this.oar
              ? (this.rar.SetVisibility(!0),
                Info_1.Info.IsGameRunning() ||
                  this.uar(t, i.CapsuleRadius, i.CapsuleHalfHeight))
              : ((this.oar = ActorSystem_1.ActorSystem.Spawn(
                  UE.Actor.StaticClass(),
                  void 0,
                  this.tar,
                )),
                (this.rar = this.oar.AddComponentByClass(
                  UE.DecalComponent.StaticClass(),
                  !1,
                  void 0,
                  !1,
                )),
                ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
                  this.oar,
                  this.tar,
                  2,
                  "CharDecalShadow.EnableDecalShadow",
                  void 0,
                  0,
                  0,
                  0,
                  !1,
                ),
                this.oar.K2_SetActorRotation(
                  UE.Rotator.MakeFromEuler(new UE.Vector(0, -90, 0)),
                  !0,
                ),
                this.oar.K2_SetActorRelativeLocation(
                  new UE.Vector(0, 0, -i.CapsuleHalfHeight),
                  !1,
                  void 0,
                  !0,
                ),
                this.uar(t, i.CapsuleRadius, i.CapsuleHalfHeight)),
            (this.DecalShadowEnabled = !0),
            this.SetDecalShadowOpacity(this.sar))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Render", 26, "Decal Shadow找不到胶囊体", [
              "Actor: ",
              e.GetName(),
            ])));
  }
  DisableDecalShadow() {
    this.DecalShadowEnabled &&
      (this.rar?.SetVisibility(!1),
      (this.DecalShadowEnabled = !1),
      this.SetDecalShadowOpacity(this.sar));
  }
  EnableRealtimeShadow() {
    if (!this.RealtimeShadowEnabled) {
      for (const t of this.iar.values()) t.SetCastShadow(!0);
      (this.RealtimeShadowEnabled = !0),
        this.SetRealtimeShadowOpacity(this.sar);
    }
  }
  DisableRealtimeShadow() {
    if (this.RealtimeShadowEnabled) {
      for (const t of this.iar.values()) t.SetCastShadow(!1);
      (this.RealtimeShadowEnabled = !1),
        this.SetRealtimeShadowOpacity(this.sar);
    }
  }
  DisableAllShadow() {
    this.DisableDecalShadow(), this.DisableRealtimeShadow();
  }
  SetDecalShadowOpacity(t) {
    (this.sar = t),
      this.DecalShadowEnabled &&
        (t < MathUtils_1.MathUtils.KindaSmallNumber
          ? this.rar.SetVisibility(!1)
          : (this.rar.SetVisibility(!0),
            this.nar.SetScalarParameterValue(this.aar, t)));
  }
  SetRealtimeShadowOpacity(t) {
    if (
      ((this.sar = t),
      this.RealtimeShadowEnabled &&
        this.GetRenderingComponent().RenderType == 3)
    ) {
      const e = t > CharDecalShadow.car;
      for (const i of this.iar.values()) i.SetCastShadow(e);
    }
  }
  uar(t, e, i) {
    (this.rar.ZFadingFactor = t.ZDistanceFadeFactor),
      (this.rar.ZFadingPower = t.ZDistanceFadePower),
      (this.nar = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
        this.rar,
        t.DecalShadowMaterial,
      )),
      this.rar.SetDecalMaterial(this.nar);
    (e *= t.DecalBoxScaleHori), (i *= t.DecalBoxScaleVerti);
    this.rar.SetWorldScale3D(new UE.Vector(i, e, e));
  }
  GetStatName() {
    return "CharDecalShadow";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdDecalShadow;
  }
}
((exports.CharDecalShadow = CharDecalShadow)._ar = !1),
  (CharDecalShadow.har = new Set()),
  (CharDecalShadow.car = 0.2);
// # sourceMappingURL=CharDecalShadow.js.map
