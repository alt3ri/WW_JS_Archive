"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, n, o) {
    let i;
    const r = arguments.length;
    let c =
      r < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, n)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      c = Reflect.decorate(t, e, n, o);
    else
      for (let s = t.length - 1; s >= 0; s--)
        (i = t[s]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, n, c) : i(e, n)) || c);
    return r > 3 && c && Object.defineProperty(e, n, c), c;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeActorTickManageComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let UeActorTickManageComponent = class UeActorTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.Hte = void 0);
  }
  static get Dependencies() {
    return [1];
  }
  OnInit() {
    return !0;
  }
  OnActivate() {
    (this.Hte = this.Entity.GetComponent(1)),
      this.Hte.DisableTick("[UeActorTickManageComponent.OnActivate]");
  }
  OnTick(t) {
    this.Hte.Owner.KuroTickActorOutside(
      t * MathUtils_1.MathUtils.MillisecondToSecond,
    );
  }
};
(UeActorTickManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(96)],
  UeActorTickManageComponent,
)),
  (exports.UeActorTickManageComponent = UeActorTickManageComponent);
// # sourceMappingURL=UeActorTickManageComponent.js.map
