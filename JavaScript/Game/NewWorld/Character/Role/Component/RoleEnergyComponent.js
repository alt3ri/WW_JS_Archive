"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    let n;
    const i = arguments.length;
    let s =
      i < 3 ? e : r === null ? (r = Object.getOwnPropertyDescriptor(e, o)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, o, r);
    else
      for (let c = t.length - 1; c >= 0; c--)
        (n = t[c]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, o, s) : n(e, o)) || s);
    return i > 3 && s && Object.defineProperty(e, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleEnergyComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const energyAttrIds = [EAttributeId.Proto_Energy, EAttributeId.Proto_EnergyMax];
let RoleEnergyComponent = class RoleEnergyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.$te = void 0),
      (this.mon = (t, e, o) => {
        const r = this.$te.GetCurrentValue(EAttributeId.Proto_Energy);
        const n = this.$te.GetCurrentValue(EAttributeId.Proto_EnergyMax);
        this.nXt.Actor?.CharRenderingComponent.SetStarScarEnergy(r / n);
      });
  }
  OnStart() {
    return (
      (this.nXt = this.Entity.CheckGetComponent(3)),
      (this.$te = this.Entity.CheckGetComponent(156)),
      this.$te.AddListeners(energyAttrIds, this.mon, "RoleEnergyComponent"),
      this.mon(),
      !0
    );
  }
  OnEnd() {
    return this.$te.RemoveListeners(energyAttrIds, this.mon), !0;
  }
};
(RoleEnergyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(80)],
  RoleEnergyComponent,
)),
  (exports.RoleEnergyComponent = RoleEnergyComponent);
// # sourceMappingURL=RoleEnergyComponent.js.map
