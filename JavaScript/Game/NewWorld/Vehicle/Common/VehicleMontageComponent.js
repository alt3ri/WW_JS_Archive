"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var r,
      s = arguments.length,
      i =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, o, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (r = e[a]) && (i = (s < 3 ? r(i) : 3 < s ? r(t, o, i) : r(t, o)) || i);
    return 3 < s && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleMontageComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  BaseMontageComponent_1 = require("../../Character/Common/Component/Abilities/BaseMontageComponent");
let VehicleMontageComponent = class VehicleMontageComponent extends BaseMontageComponent_1.BaseMontageComponent {
  constructor() {
    super(...arguments), (this.AnimationComponent = void 0);
  }
  OnStart() {
    return (
      (this.AnimationComponent = this.Entity.CheckGetComponent(232)),
      !!super.OnStart()
    );
  }
  GetMainAnimInstance() {
    return this.AnimationComponent.MainAnimInstance;
  }
};
(VehicleMontageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(272)],
  VehicleMontageComponent,
)),
  (exports.VehicleMontageComponent = VehicleMontageComponent);
//# sourceMappingURL=VehicleMontageComponent.js.map
