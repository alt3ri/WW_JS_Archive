"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var c,
      m = arguments.length,
      r =
        m < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, n, o);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (c = e[s]) && (r = (m < 3 ? c(r) : 3 < m ? c(t, n, r) : c(t, n)) || r);
    return 3 < m && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMovementSyncComponent = void 0);
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  BaseMovementSyncComponent_1 = require("../Character/Common/Component/BaseMovementSyncComponent");
let SceneItemMovementSyncComponent = class SceneItemMovementSyncComponent extends BaseMovementSyncComponent_1.BaseMovementSyncComponent {};
(SceneItemMovementSyncComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(144)],
  SceneItemMovementSyncComponent,
)),
  (exports.SceneItemMovementSyncComponent = SceneItemMovementSyncComponent);
//# sourceMappingURL=SceneItemMovementSyncComponent.js.map
