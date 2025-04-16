"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, r) {
    var a,
      l = arguments.length,
      s =
        l < 3
          ? o
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(o, t))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, o, t, r);
    else
      for (var i = e.length - 1; 0 <= i; i--)
        (a = e[i]) && (s = (l < 3 ? a(s) : 3 < l ? a(o, t, s) : a(o, t)) || s);
    return 3 < l && s && Object.defineProperty(o, t, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSceneInteractController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("./CombatMessage");
class RoleSceneInteractController extends ControllerBase_1.ControllerBase {
  static OnHookMoveNotify(e, o) {
    var t = e?.GetComponent(97);
    if (t)
      if ("CIl" === o.j6n)
        (t.SimulateHookTargetEntity = void 0),
          t.SimulateHookTargetLocation ||
            (t.SimulateHookTargetLocation = Vector_1.Vector.Create()),
          (t.SimulateHookTargetLocation.X = o.CIl.X),
          (t.SimulateHookTargetLocation.Y = o.CIl.Y),
          (t.SimulateHookTargetLocation.Z = o.CIl.Z);
      else if ("TVn" === o.j6n) {
        t.SimulateHookTargetLocation = void 0;
        const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          MathUtils_1.MathUtils.LongToNumber(o.TVn),
        );
        t.SimulateHookTargetEntity = e;
      }
  }
  static SendHookMoveRequest(e, o) {
    var t;
    e?.GetComponent(1)?.IsAutonomousProxy &&
      (((t = Protocol_1.Aki.Protocol.Ae_.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(
          e.GetComponent(0).GetCreatureDataId(),
        )),
      o.IsMovable()
        ? ((t.j6n = "TVn"),
          (t.TVn = MathUtils_1.MathUtils.NumberToLong(
            o.Entity.GetComponent(0).GetCreatureDataId(),
          )))
        : ((t.j6n = "CIl"),
          (t.CIl = Protocol_1.Aki.Protocol.Gks.create()),
          (t.CIl.X = o.HookLocation.X),
          (t.CIl.Y = o.HookLocation.Y),
          (t.CIl.Z = o.HookLocation.Z)),
      CombatMessage_1.CombatNet.Send(19473, e, t));
  }
}
__decorate(
  [CombatMessage_1.CombatNet.Listen("ZFn", !1)],
  RoleSceneInteractController,
  "OnHookMoveNotify",
  null,
),
  (exports.RoleSceneInteractController = RoleSceneInteractController);
//# sourceMappingURL=RoleSceneInteractController.js.map
