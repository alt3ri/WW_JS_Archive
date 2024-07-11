"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var r,
      s = arguments.length,
      a =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, n, o);
    else
      for (var i = e.length - 1; 0 <= i; i--)
        (r = e[i]) && (a = (s < 3 ? r(a) : 3 < s ? r(t, n, a) : r(t, n)) || a);
    return 3 < s && a && Object.defineProperty(t, n, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnGamePlayComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let PawnGamePlayComponent = class PawnGamePlayComponent extends EntityComponent_1.EntityComponent {
  ScanResponse() {}
  WeightResponse() {}
  GrabResponse() {}
};
(PawnGamePlayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(101)],
  PawnGamePlayComponent,
)),
  (exports.PawnGamePlayComponent = PawnGamePlayComponent);
//# sourceMappingURL=PawnGamePlayComponent.js.map
