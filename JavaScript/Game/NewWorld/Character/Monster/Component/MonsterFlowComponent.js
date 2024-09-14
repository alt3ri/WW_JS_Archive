"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var r,
      s = arguments.length,
      i =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, o, n);
    else
      for (var c = e.length - 1; 0 <= c; c--)
        (r = e[c]) && (i = (s < 3 ? r(i) : 3 < s ? r(t, o, i) : r(t, o)) || i);
    return 3 < s && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterFlowComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent");
let MonsterFlowComponent = class MonsterFlowComponent extends CharacterFlowComponent_1.CharacterFlowComponent {
  constructor() {
    super(...arguments), (this.Stn = void 0), (this.I5r = void 0);
  }
  OnStart() {
    return (
      (this.I5r = this.Entity.GetComponent(161)),
      (this.Stn = this.Entity.GetComponent(109)),
      super.OnStart(),
      !0
    );
  }
  InitFlowLogicRange(e, t) {
    return (
      !!super.InitFlowLogicRange(e, t) &&
      (this.Stn?.SetLogicRange(
        t ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      ),
      !0)
    );
  }
  CheckCondition() {
    return (
      !!super.CheckCondition() &&
      !!this.Stn &&
      ((this.Stn.IsInLogicRange && !this.I5r.IsInFightState()) ||
        (this.ForceStopFlow(), !1))
    );
  }
};
(MonsterFlowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(167)],
  MonsterFlowComponent,
)),
  (exports.MonsterFlowComponent = MonsterFlowComponent);
//# sourceMappingURL=MonsterFlowComponent.js.map
