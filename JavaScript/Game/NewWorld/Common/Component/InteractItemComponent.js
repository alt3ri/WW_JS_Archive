"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, r, n) {
    let o;
    const i = arguments.length;
    let s =
      i < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, r)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, r, n);
    else
      for (let c = t.length - 1; c >= 0; c--)
        (o = t[c]) && (s = (i < 3 ? o(s) : i > 3 ? o(e, r, s) : o(e, r)) || s);
    return i > 3 && s && Object.defineProperty(e, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractItemComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const POSITION_TAG = new UE.FName("Position");
let InteractItemComponent = class InteractItemComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.cC = void 0),
      (this.Cnn = void 0),
      (this.IsInit = !1);
  }
  OnStart() {
    let t;
    const e = WorldFunctionLibrary_1.default.GetDynamicEntity(this.Entity.Id);
    return (
      e &&
        ((t = e.GetComponentsByTag(
          UE.ChildActorComponent.StaticClass(),
          POSITION_TAG,
        )) &&
          t.Num() > 0 &&
          (this.cC = t.Get(0)),
        (this.Cnn = e.GetComponentByClass(UE.ArrowComponent.StaticClass())),
        (this.IsInit = !0)),
      !0
    );
  }
  GetInteractPosition() {
    if (this.cC) return this.cC.K2_GetComponentLocation();
  }
  GetInteractRotator() {
    if (this.Cnn) return this.Cnn.K2_GetComponentRotation();
  }
};
(InteractItemComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(91)],
  InteractItemComponent,
)),
  (exports.InteractItemComponent = InteractItemComponent);
// # sourceMappingURL=InteractItemComponent.js.map
