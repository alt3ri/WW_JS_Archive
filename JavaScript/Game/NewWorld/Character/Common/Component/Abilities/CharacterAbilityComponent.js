"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var i,
      r = arguments.length,
      s =
        r < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, o, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (i = e[a]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, o, s) : i(t, o)) || s);
    return 3 < r && s && Object.defineProperty(t, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAbilityComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  BaseAbilityComponent_1 = require("./BaseAbilityComponent");
let CharacterAbilityComponent = class CharacterAbilityComponent extends BaseAbilityComponent_1.BaseAbilityComponent {
  GetAbilitySystemComponent() {
    var e = this.Entity.GetComponent(3);
    if (e)
      return (
        e.Actor.TryAddTsAbilitySystemComponent(), e.Actor.AbilitySystemComponent
      );
  }
};
(CharacterAbilityComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(18)],
  CharacterAbilityComponent,
)),
  (exports.CharacterAbilityComponent = CharacterAbilityComponent);
//# sourceMappingURL=CharacterAbilityComponent.js.map
