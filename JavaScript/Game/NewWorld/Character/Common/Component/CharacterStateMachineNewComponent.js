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
      e = this.Entity.GetComponent(190),
      t = t.CreatureData?.GetPbEntityInitData();
    if (t) {
      var o = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent");
      switch (o?.InitState?.Type) {
        case 0:
          e.AddTag(1927538016);
          break;
        case 1:
          for (const a of ObjectUtils_1.ObjectUtils.GetGameplayTags(
            o.InitState.StandbyTags,
          ))
            e.AddTag(a?.TagId);
          break;
        case 2:
          e.AddTag(447365096);
          break;
        case 3:
          e.AddTag(-1183618125);
          break;
        case 4:
          e.AddTag(-1609174800);
      }
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
    o = MathUtils_1.MathUtils.LongToBigInt(o.$8n);
    t?.GetComponent(68)?.StateMachineGroup.HandleSwitch(e.$4n, e.J4n, e.z4n, o);
  }
  static ChangeStateConfirmNotify(t, e) {
    t?.GetComponent(68)?.StateMachineGroup.HandleChangeStateConfirm(
      e.$4n,
      e.Y4n,
    );
  }
  static FsmResetNotify(t, e, o) {
    o = MathUtils_1.MathUtils.LongToBigInt(o.$8n);
    t?.GetComponent(68)?.StateMachineGroup.ResetStateMachine(e.Uys, o);
  }
  static FsmBlackboardNotify(t, e) {
    t?.GetComponent(68)?.StateMachineGroup.HandleBlackboard(e);
  }
  static FsmCustomBlackboardNotify(t, e) {
    t?.GetComponent(68)?.StateMachineGroup.HandleCustomBlackboard(e);
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("e3n")],
  CharacterStateMachineNewComponent,
  "ChangeStateNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("t3n")],
    CharacterStateMachineNewComponent,
    "ChangeStateConfirmNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("n3n")],
    CharacterStateMachineNewComponent,
    "FsmResetNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("h3n")],
    CharacterStateMachineNewComponent,
    "FsmBlackboardNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("I3n")],
    CharacterStateMachineNewComponent,
    "FsmCustomBlackboardNotify",
    null,
  ),
  (CharacterStateMachineNewComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(68)],
    CharacterStateMachineNewComponent,
  )),
  (exports.CharacterStateMachineNewComponent =
    CharacterStateMachineNewComponent);
//# sourceMappingURL=CharacterStateMachineNewComponent.js.map
