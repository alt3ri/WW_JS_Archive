"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  CharacterDitherEffectController_1 = require("../Character/Common/Component/Effect/CharacterDitherEffectController");
class TsBaseVehicle extends UE.KuroBaseVehicle {
  constructor() {
    super(...arguments),
      (this.EntityId = 0),
      (this.VehicleActorComponent = void 0),
      (this.CharRenderingComponent = void 0),
      (this.RenderType = 7),
      (this.InputComponentClass = void 0),
      (this.PlatformActor = void 0),
      (this.DitherEffectControllerInternal = void 0);
  }
  Constructor() {
    (this.VehicleActorComponent = void 0),
      (this.DitherEffectControllerInternal = void 0);
  }
  SetEntityId(t) {
    (this.EntityId = t), (this.EntityIdInternal = t);
  }
  GetEntityId() {
    return this.VehicleActorComponent
      ? this.VehicleActorComponent.Entity.Id
      : 0;
  }
  GetEntityIdNoBlueprint() {
    return this.VehicleActorComponent
      ? this.VehicleActorComponent.Entity.Id
      : 0;
  }
  GetEntityNoBlueprint() {
    if (this.VehicleActorComponent) return this.VehicleActorComponent.Entity;
  }
  ReceiveDestroyed() {
    ObjectUtils_1.ObjectUtils.IsValid(this) &&
      ((this.InputComponentClass = void 0),
      (this.VehicleActorComponent = void 0),
      (this.CharRenderingComponent = void 0),
      (this.DitherEffectControllerInternal = void 0),
      super.ReceiveDestroyed());
  }
  TryAddTsAbilitySystemComponent() {
    this.AbilitySystemComponent ||
      (this.AbilitySystemComponent = this.AddComponentByClass(
        UE.BaseAbilitySystemComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      ));
  }
  set DitherEffectController(t) {
    this.DitherEffectControllerInternal = t;
  }
  get DitherEffectController() {
    return (
      this.DitherEffectControllerInternal ||
        (this.DitherEffectControllerInternal =
          new CharacterDitherEffectController_1.CharacterDitherEffectController(
            this,
            this.CharRenderingComponent,
          )),
      this.DitherEffectControllerInternal
    );
  }
  get HasDitherEffectController() {
    return void 0 !== this.DitherEffectControllerInternal;
  }
  SetDitherEffect(t, e = 3) {
    this.DitherEffectController?.SetDitherEffect(t, e);
  }
}
exports.default = TsBaseVehicle;
//# sourceMappingURL=TsBaseVehicle.js.map
