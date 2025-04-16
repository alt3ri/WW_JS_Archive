"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, i) {
    var n,
      r = arguments.length,
      l =
        r < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, t, o, i);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (n = e[s]) && (l = (r < 3 ? n(l) : 3 < r ? n(t, o, l) : n(t, o)) || l);
    return 3 < r && l && Object.defineProperty(t, o, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleAbilityComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  BaseAbilityComponent_1 = require("../../Character/Common/Component/Abilities/BaseAbilityComponent");
let VehicleAbilityComponent = class VehicleAbilityComponent extends BaseAbilityComponent_1.BaseAbilityComponent {
  GetAbilitySystemComponent() {
    var e = this.Entity.GetComponent(231);
    if (e)
      return (
        e.Actor.TryAddTsAbilitySystemComponent(), e.Actor.AbilitySystemComponent
      );
  }
};
(VehicleAbilityComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(236)],
  VehicleAbilityComponent,
)),
  (exports.VehicleAbilityComponent = VehicleAbilityComponent);
//# sourceMappingURL=VehicleAbilityComponent.js.map
