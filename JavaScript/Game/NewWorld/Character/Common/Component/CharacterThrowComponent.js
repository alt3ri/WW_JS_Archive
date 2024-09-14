"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, r, o) {
    var n,
      i = arguments.length,
      s =
        i < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, r, o);
    else
      for (var c = t.length - 1; 0 <= c; c--)
        (n = t[c]) && (s = (i < 3 ? n(s) : 3 < i ? n(e, r, s) : n(e, r)) || s);
    return 3 < i && s && Object.defineProperty(e, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterThrowComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let CharacterThrowComponent = class CharacterThrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.mKr = void 0);
  }
  get ProjectilePathTracer() {
    return this.mKr;
  }
  OnStart() {
    return (
      (this.mKr = ActorSystem_1.ActorSystem.Get(
        UE.BP_KuroProjectilePathTracer_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      !0
    );
  }
  SetPredictProjectileInfo(t, e, r, o) {
    this.mKr.SetPredictProjectileInfo(t, e, r, o);
  }
  SetVisible(t) {
    this.mKr.SetVisible(t);
  }
};
(CharacterThrowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(70)],
  CharacterThrowComponent,
)),
  (exports.CharacterThrowComponent = CharacterThrowComponent);
//# sourceMappingURL=CharacterThrowComponent.js.map
