"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var l,
      c = arguments.length,
      n =
        c < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, o, r);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (l = e[s]) && (n = (c < 3 ? l(n) : 3 < c ? l(t, o, n) : l(t, o)) || n);
    return 3 < c && n && Object.defineProperty(t, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSceneInteractController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  CombatMessage_1 = require("./CombatMessage");
class RoleSceneInteractController extends ControllerBase_1.ControllerBase {
  static OnHookMoveNotify(e, t) {
    e = e?.GetComponent(89);
    e &&
      (e.TargetLocation || (e.TargetLocation = Vector_1.Vector.Create()),
      (e.TargetLocation.X = t.e8n.X),
      (e.TargetLocation.Y = t.e8n.Y),
      (e.TargetLocation.Z = t.e8n.Z));
  }
}
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("jFn")],
  RoleSceneInteractController,
  "OnHookMoveNotify",
  null,
),
  (exports.RoleSceneInteractController = RoleSceneInteractController);
//# sourceMappingURL=RoleSceneInteractController.js.map
