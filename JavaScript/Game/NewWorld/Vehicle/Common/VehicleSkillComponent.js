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
  (exports.VehicleSkillComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  BaseSkillComponent_1 = require("../../Character/Common/Component/Skill/BaseSkillComponent");
let VehicleSkillComponent = class VehicleSkillComponent extends BaseSkillComponent_1.BaseSkillComponent {
  constructor() {
    super(...arguments), (this.oRe = void 0), (this.Gce = void 0);
  }
  OnInit() {
    return (
      !!super.OnInit() &&
      ((this.oRe = this.Entity.GetComponent(232)),
      (this.Gce = this.Entity.GetComponent(233)),
      !0)
    );
  }
  GetMainAnimInstance() {
    return this.oRe.MainAnimInstance;
  }
  DoSkillBeginMoveAction(e, t) {
    this.TagComp?.HasTag(1616400338) &&
      this.Gce?.SetForceSpeed(Vector_1.Vector.ZeroVector);
  }
};
(VehicleSkillComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(40)],
  VehicleSkillComponent,
)),
  (exports.VehicleSkillComponent = VehicleSkillComponent);
//# sourceMappingURL=VehicleSkillComponent.js.map
