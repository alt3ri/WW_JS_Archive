"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, a) {
    var i,
      n = arguments.length,
      r =
        n < 3
          ? e
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(e, o))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, o, a);
    else
      for (var s = t.length - 1; 0 <= s; s--)
        (i = t[s]) && (r = (n < 3 ? i(r) : 3 < n ? i(e, o, r) : i(e, o)) || r);
    return 3 < n && r && Object.defineProperty(e, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterStateMachineNewComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
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
    var t = this.Entity.GetComponent(3),
      e = this.Entity.GetComponent(185),
      t = t.CreatureData?.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent");
      if (t?.InitState)
        if (0 === t.InitState.Type) e.AddTag(1927538016);
        else if (1 === t.InitState.Type)
          for (const o of ObjectUtils_1.ObjectUtils.GetGameplayTags(
            t.InitState.StandbyTags,
          ))
            e.AddTag(o?.TagId);
        else
          2 === t.InitState.Type
            ? e.AddTag(447365096)
            : 3 === t.InitState.Type && e.AddTag(-1183618125);
      this.StateMachineGroup.OnActivate();
    }
    return !0;
  }
  OnEnd() {
    return this.StateMachineGroup?.Clear(), !(this.StateMachineGroup = void 0);
  }
  OnControl() {
    this.StateMachineGroup.OnControl();
  }
  static ChangeStateNotify(t, e, o) {
    o = MathUtils_1.MathUtils.LongToBigInt(o.s4n);
    t?.GetComponent(65)?.StateMachineGroup.HandleSwitch(e.ukn, e.mkn, e.dkn, o);
  }
  static ChangeStateConfirmNotify(t, e) {
    t?.GetComponent(65)?.StateMachineGroup.HandleChangeStateConfirm(
      e.ukn,
      e.ckn,
    );
  }
  static FsmResetNotify(t, e, o) {
    o = MathUtils_1.MathUtils.LongToBigInt(o.s4n);
    t?.GetComponent(65)?.StateMachineGroup.ResetStateMachine(e.aps, o);
  }
  static FsmBlackboardNotify(t, e) {
    t?.GetComponent(65)?.StateMachineGroup.HandleBlackboard(e);
  }
  static FsmCustomBlackboardNotify(t, e) {
    t?.GetComponent(65)?.StateMachineGroup.HandleCustomBlackboard(e);
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("g2n")],
  CharacterStateMachineNewComponent,
  "ChangeStateNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("f2n")],
    CharacterStateMachineNewComponent,
    "ChangeStateConfirmNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("S2n")],
    CharacterStateMachineNewComponent,
    "FsmResetNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("I2n")],
    CharacterStateMachineNewComponent,
    "FsmBlackboardNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("k2n")],
    CharacterStateMachineNewComponent,
    "FsmCustomBlackboardNotify",
    null,
  ),
  (CharacterStateMachineNewComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(65)],
    CharacterStateMachineNewComponent,
  )),
  (exports.CharacterStateMachineNewComponent =
    CharacterStateMachineNewComponent);
//# sourceMappingURL=CharacterStateMachineNewComponent.js.map
