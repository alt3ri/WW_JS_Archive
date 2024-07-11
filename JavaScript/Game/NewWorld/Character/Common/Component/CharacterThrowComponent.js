"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, r, o) {
    let n;
    const i = arguments.length;
    let s =
      i < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, r)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, r, o);
    else
      for (let c = t.length - 1; c >= 0; c--)
        (n = t[c]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, r, s) : n(e, r)) || s);
    return i > 3 && s && Object.defineProperty(e, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterThrowComponent = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let CharacterThrowComponent = class CharacterThrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.wKr = void 0);
  }
  get ProjectilePathTracer() {
    return this.wKr;
  }
  OnStart() {
    return (
      (this.wKr = ActorSystem_1.ActorSystem.Get(
        UE.BP_KuroProjectilePathTracer_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      !0
    );
  }
  SetPredictProjectileInfo(t, e, r, o) {
    this.wKr.SetPredictProjectileInfo(t, e, r, o);
  }
  SetVisible(t) {
    this.wKr.SetVisible(t);
  }
};
(CharacterThrowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(67)],
  CharacterThrowComponent,
)),
  (exports.CharacterThrowComponent = CharacterThrowComponent);
// # sourceMappingURL=CharacterThrowComponent.js.map
