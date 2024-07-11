"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    let r;
    const a = arguments.length;
    let c =
      a < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, n)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      c = Reflect.decorate(e, t, n, o);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
    return a > 3 && c && Object.defineProperty(t, n, c), c;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnInteractBaseComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let PawnInteractBaseComponent = class PawnInteractBaseComponent extends EntityComponent_1.EntityComponent {
  InteractPawn(e = 0) {}
  CloseInteract(e = 0) {}
  ForceUpdate() {}
  IsPawnInteractive() {
    return !1;
  }
  get OwenActor() {}
};
(PawnInteractBaseComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(103)],
  PawnInteractBaseComponent,
)),
  (exports.PawnInteractBaseComponent = PawnInteractBaseComponent);
// # sourceMappingURL=PawnInteractBaseComponent.js.map
