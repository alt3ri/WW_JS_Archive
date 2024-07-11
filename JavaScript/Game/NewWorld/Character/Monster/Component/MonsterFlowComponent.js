"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    let r;
    const s = arguments.length;
    let i =
      s < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, o)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(e, t, o, n);
    else
      for (let c = e.length - 1; c >= 0; c--)
        (r = e[c]) && (i = (s < 3 ? r(i) : s > 3 ? r(t, o, i) : r(t, o)) || i);
    return s > 3 && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterFlowComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent");
let MonsterFlowComponent = class MonsterFlowComponent extends CharacterFlowComponent_1.CharacterFlowComponent {
  constructor() {
    super(...arguments), (this.Htn = void 0), (this.W5r = void 0);
  }
  OnStart() {
    return (
      (this.W5r = this.Entity.GetComponent(158)),
      (this.Htn = this.Entity.GetComponent(106)),
      super.OnStart(),
      !0
    );
  }
  InitFlowLogicRange(e, t) {
    return (
      !!super.InitFlowLogicRange(e, t) &&
      (this.Htn?.SetLogicRange(
        t ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      ),
      !0)
    );
  }
  CheckCondition() {
    return (
      !!super.CheckCondition() &&
      !!this.Htn &&
      ((this.Htn.IsInLogicRange && !this.W5r.IsInFightState()) ||
        (this.ForceStopFlow(), !1))
    );
  }
};
(MonsterFlowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(164)],
  MonsterFlowComponent,
)),
  (exports.MonsterFlowComponent = MonsterFlowComponent);
// # sourceMappingURL=MonsterFlowComponent.js.map
