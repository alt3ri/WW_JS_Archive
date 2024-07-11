"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var i,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, o, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (i = e[a]) && (r = (s < 3 ? i(r) : 3 < s ? i(t, o, r) : i(t, o)) || r);
    return 3 < s && r && Object.defineProperty(t, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterBehaviorComponent = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes");
let MonsterBehaviorComponent = class MonsterBehaviorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Xte = void 0),
      (this.N1t = void 0),
      (this.tVr = void 0),
      (this.Kqr = (e, t) => {
        var o;
        t !== CharacterUnifiedStateTypes_1.ECharPositionState.Water ||
          this.Xte.HasTag(-1714966381) ||
          ((t = this.Hte.ActorLocationProxy),
          ((o = Protocol_1.Aki.Protocol.v4n.create()).e8n = t),
          CombatMessage_1.CombatNet.Call(18989, this.Entity, o));
      }),
      (this.qtn = () => {
        ModelManager_1.ModelManager.GameModeModel.IsMulti ||
          this.tVr.SetEnableMovementSync(
            !1,
            "MonsterBehaviorComponent LeaveFight",
          );
      }),
      (this.Ntn = (e, t) => {
        !t ||
          ModelManager_1.ModelManager.GameModeModel.IsMulti ||
          this.tVr.SetEnableMovementSync(
            !0,
            "MonsterBehaviorComponent InFight",
          );
      });
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.CheckGetComponent(3)),
      (this.Xte = this.Entity.CheckGetComponent(188)),
      (this.tVr = this.Entity.CheckGetComponent(59)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.Kqr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.qtn,
      ),
      (this.N1t = this.Xte.ListenForTagAddOrRemove(1996802261, this.Ntn)),
      !0
    );
  }
  OnActivate() {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      this.tVr?.SetEnableMovementSync(
        !1,
        "MonsterBehaviorComponent OnActivate",
      );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.Kqr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.qtn,
      ),
      this.N1t && this.N1t.EndTask(),
      !(this.N1t = void 0)
    );
  }
};
(MonsterBehaviorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(79)],
  MonsterBehaviorComponent,
)),
  (exports.MonsterBehaviorComponent = MonsterBehaviorComponent);
//# sourceMappingURL=MonsterBehaviorComponent.js.map
