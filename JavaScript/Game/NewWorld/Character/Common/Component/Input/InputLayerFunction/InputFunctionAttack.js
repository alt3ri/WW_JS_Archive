"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.attackOnRelease =
    exports.attackOnPress =
    exports.attackFunction =
      void 0);
const Global_1 = require("../../../../../../Global"),
  InputFunctionCommon_1 = require("./InputFunctionCommon");
function attackFunction(t, n) {
  var o,
    e = Global_1.Global.BaseCharacter;
  return (e = e && e.CharacterActorComponent?.Entity) &&
    (o = e.GetComponent(203)) &&
    o.Valid &&
    (o = ((n.通用_攻击按下 = !1),
    InputFunctionCommon_1.createInputCommandFromDataTable)(e.Id, 4, 1))
    ? ((n.通用_攻击按下 = !0), o)
    : void 0;
}
function attackOnPress(t, n) {
  return attackFunction(t, n);
}
function attackOnRelease(t, n) {}
(exports.attackFunction = attackFunction),
  (exports.attackOnPress = attackOnPress),
  (exports.attackOnRelease = attackOnRelease);
//# sourceMappingURL=InputFunctionAttack.js.map
