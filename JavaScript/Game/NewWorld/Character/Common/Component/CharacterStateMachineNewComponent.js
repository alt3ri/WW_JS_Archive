"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, a) {
    var n,
      i = arguments.length,
      r =
        i < 3
          ? e
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(e, o))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, o, a);
    else
      for (var s = t.length - 1; 0 <= s; s--)
        (n = t[s]) && (r = (i < 3 ? n(r) : 3 < i ? n(e, o, r) : n(e, o)) || r);
    return 3 < i && r && Object.defineProperty(e, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterStateMachineNewComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  AiStateMachineGroup_1 = require("../../../../AI/StateMachine/AiStateMachineGroup"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
let CharacterStateMachineNewComponent = class CharacterStateMachineNewComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.StateMachineName = ""),
      (this.StateMachineJsonObject = void 0),
      (this.StateMachineGroup = void 0);
  }
  OnTick(t) {
    this.StateMachineGroup.OnTick(t);
  }
  OnInit() {
    return (
      (this.StateMachineGroup = new AiStateMachineGroup_1.AiStateMachineGroup(
        this,
      )),
      !0
    );
  }
  OnActivate() {
    return this.StateMachineGroup.OnActivate(), !0;
  }
  OnEnd() {
    return this.StateMachineGroup?.Clear(), !(this.StateMachineGroup = void 0);
  }
  OnControl() {
    this.StateMachineGroup.OnControl();
  }
  static ChangeStateNotify(t, e, o) {
    o = MathUtils_1.MathUtils.LongToBigInt(o.$8n);
    t?.GetComponent(75)?.StateMachineGroup.HandleSwitch(e.$4n, e.J4n, e.z4n, o);
  }
  static ChangeStateConfirmNotify(t, e) {
    t?.GetComponent(75)?.StateMachineGroup.HandleChangeStateConfirm(
      e.$4n,
      e.Y4n,
    );
  }
  static FsmResetNotify(t, e, o) {
    o = MathUtils_1.MathUtils.LongToBigInt(o.$8n);
    t?.GetComponent(75)?.StateMachineGroup.ResetStateMachine(e.Uys, o);
  }
  static FsmBlackboardNotify(t, e) {
    t?.GetComponent(75)?.StateMachineGroup.HandleBlackboard(e);
  }
  static FsmCustomBlackboardNotify(t, e) {
    t?.GetComponent(75)?.StateMachineGroup.HandleCustomBlackboard(e);
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("e3n", !0)],
  CharacterStateMachineNewComponent,
  "ChangeStateNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("t3n", !0)],
    CharacterStateMachineNewComponent,
    "ChangeStateConfirmNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("n3n", !0)],
    CharacterStateMachineNewComponent,
    "FsmResetNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("h3n", !0)],
    CharacterStateMachineNewComponent,
    "FsmBlackboardNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("I3n", !0)],
    CharacterStateMachineNewComponent,
    "FsmCustomBlackboardNotify",
    null,
  ),
  (CharacterStateMachineNewComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(75)],
    CharacterStateMachineNewComponent,
  )),
  (exports.CharacterStateMachineNewComponent =
    CharacterStateMachineNewComponent);
//# sourceMappingURL=CharacterStateMachineNewComponent.js.map
