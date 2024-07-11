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
    e = e?.GetComponent(87);
    e &&
      (e.TargetLocation || (e.TargetLocation = Vector_1.Vector.Create()),
      (e.TargetLocation.X = t.M3n.X),
      (e.TargetLocation.Y = t.M3n.Y),
      (e.TargetLocation.Z = t.M3n.Z));
  }
}
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("C2n")],
  RoleSceneInteractController,
  "OnHookMoveNotify",
  null,
),
  (exports.RoleSceneInteractController = RoleSceneInteractController);
//# sourceMappingURL=RoleSceneInteractController.js.map
