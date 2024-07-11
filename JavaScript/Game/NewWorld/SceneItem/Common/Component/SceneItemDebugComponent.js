"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    let r;
    const i = arguments.length;
    let c =
      i < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, n)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      c = Reflect.decorate(e, t, n, o);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (r = e[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(t, n, c) : r(t, n)) || c);
    return i > 3 && c && Object.defineProperty(t, n, c), c;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemDebugComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let SceneItemDebugComponent = class SceneItemDebugComponent extends EntityComponent_1.EntityComponent {
  GetTagDebugStrings() {
    return this.Entity.GetComponent(177).GetTagDebugStrings();
  }
};
(SceneItemDebugComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(111)],
  SceneItemDebugComponent,
)),
  (exports.SceneItemDebugComponent = SceneItemDebugComponent);
// # sourceMappingURL=SceneItemDebugComponent.js.map
