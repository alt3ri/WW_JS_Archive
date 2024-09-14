"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharGrassInteraction = void 0);
const UE = require("ue"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  GlobalData_1 = require("../../../../GlobalData"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase"),
  refBoneName = new UE.FName("Bip001Head");
class CharGrassInteraction extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.GrassInteractionComponent = void 0),
      (this.Enabled = !0),
      (this.IsOnMobile = !1),
      (this.OwnerCapsule = void 0),
      (this.OwnerSkeletal = void 0),
      (this.BaseBias = void 0),
      (this.oFa = 0),
      (this.nFa = !1),
      (this.InteractionDefaultRadius = 70),
      (this.InteractionDefaultBias = new UE.Vector(0, 0, 70));
  }
  sFa() {
    return this.OwnerSkeletal.GetSocketTransform(refBoneName, 2).GetLocation()
      .Z;
  }
  SetEnabled(t) {
    (this.Enabled = t),
      this.GrassInteractionComponent &&
        (this.GrassInteractionComponent.bEnabled = t);
  }
  SetConfig(t) {
    var s, i;
    t &&
      !this.IsOnMobile &&
      ((s = t.植被交互半径),
      (i = t.植被交互相对位置),
      (t = t.启用植被交互),
      this.LDa(s, i, t));
  }
  LDa(t, s, i) {
    if (!this.IsOnMobile) {
      const e = this.RenderComponent.GetCachedOwner();
      if (
        (e &&
          e instanceof TsBaseCharacter_1.default &&
          ((this.OwnerCapsule = e.CapsuleComponent),
          (this.OwnerSkeletal = e.Mesh)),
        this.OwnerCapsule && this.OwnerSkeletal)
      ) {
        if (
          (-1 !== this.OwnerSkeletal.GetBoneIndex(refBoneName) &&
            ((this.oFa = this.sFa()), (this.nFa = !0)),
          (this.BaseBias = new UE.Vector(
            s.X,
            s.Y,
            s.Z - this.OwnerCapsule.CapsuleHalfHeight,
          )),
          !this.GrassInteractionComponent)
        ) {
          const e = this.GetRenderingComponent().GetOwner();
          this.GrassInteractionComponent = e.AddComponentByClass(
            UE.KuroGrassInteractionSphereComponent.StaticClass(),
            !1,
            new UE.Transform(this.BaseBias),
            !1,
          );
        }
        (this.GrassInteractionComponent.Radius = t),
          (this.GrassInteractionComponent.bEnabled = i),
          (this.Enabled = i);
      }
    }
  }
  Start() {
    (this.IsOnMobile =
      0 ===
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
        GlobalData_1.GlobalData.World,
      )),
      this.IsOnMobile ||
        (this.RenderComponent.InteractionConfig
          ? this.SetConfig(this.RenderComponent.InteractionConfig)
          : this.LDa(
              this.InteractionDefaultRadius,
              this.InteractionDefaultBias,
              !0,
            )),
      this.OnInitSuccess();
  }
  Update() {
    var t;
    !this.IsOnMobile &&
      this.GrassInteractionComponent &&
      this.nFa &&
      ((t = this.sFa()),
      (this.oFa = 0.9 * this.oFa + 0.1 * t),
      (t = t - this.oFa),
      (t = Math.max(-10, t)),
      (t = new UE.Vector(
        this.BaseBias.X,
        this.BaseBias.Y,
        this.BaseBias.Z + 3 * t,
      )),
      this.GrassInteractionComponent.K2_SetRelativeLocation(t, !1, void 0, !1));
  }
  Destroy() {
    this.GrassInteractionComponent &&
      this.GrassInteractionComponent.GetOwner()?.K2_DestroyComponent(
        this.GrassInteractionComponent,
      );
  }
  GetStatName() {
    return "CharGrassInteraction";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdGrassInteraction;
  }
}
exports.CharGrassInteraction = CharGrassInteraction;
//# sourceMappingURL=CharGrassInteraction.js.map
