"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, o, n);
    else
      for (var c = e.length - 1; 0 <= c; c--)
        (r = e[c]) && (s = (a < 3 ? r(s) : 3 < a ? r(t, o, s) : r(t, o)) || s);
    return 3 < a && s && Object.defineProperty(t, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMontageComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  BaseMontageComponent_1 = require("./BaseMontageComponent");
let CharacterMontageComponent = class CharacterMontageComponent extends BaseMontageComponent_1.BaseMontageComponent {
  constructor() {
    super(...arguments), (this.AnimationComponent = void 0);
  }
  OnStart() {
    return (
      (this.AnimationComponent = this.Entity.CheckGetComponent(175)),
      !!super.OnStart()
    );
  }
  GetMainAnimInstance() {
    return this.AnimationComponent.MainAnimInstance;
  }
};
(CharacterMontageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(25)],
  CharacterMontageComponent,
)),
  (exports.CharacterMontageComponent = CharacterMontageComponent);
//# sourceMappingURL=CharacterMontageComponent.js.map
