"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    let s;
    const r = arguments.length;
    let n =
      r < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, o);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (s = t[a]) && (n = (r < 3 ? s(n) : r > 3 ? s(e, i, n) : s(e, i)) || n);
    return r > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLogicStateSyncComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
let CharacterLogicStateSyncComponent = class CharacterLogicStateSyncComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.W5r = void 0),
      (this.W9r = void 0),
      (this.K9r = []),
      (this.Q9r = []),
      (this.Inited = !1),
      (this.OnSwitchControl = (t) => {
        t && !this.Inited && (this.X9r(), (this.Inited = !0));
      }),
      (this.$9r = () => {
        if (this.Hte.IsMoveAutonomousProxy) {
          let t;
          const i = this.W5r;
          if (i) {
            let e = !1;
            (this.K9r[0] = i.PositionState),
              (this.K9r[1] = i.MoveState),
              (this.K9r[2] = i.DirectionState),
              (this.K9r[3] = i.PositionSubState);
            for (let t = 0; t < this.K9r.length; ++t)
              if (this.K9r[t] !== this.Q9r[t]) {
                e = !0;
                break;
              }
            e &&
              (((t = Protocol_1.Aki.Protocol.oNn.create()).f9n =
                Protocol_1.Aki.Protocol.zvs.create()),
              (this.Q9r[0] = t.f9n.k9n = i.PositionState),
              (this.Q9r[1] = t.f9n.F9n = i.MoveState),
              (this.Q9r[2] = t.f9n.V9n = i.DirectionState),
              (this.Q9r[3] = t.f9n.H9n = i.PositionSubState),
              CombatMessage_1.CombatNet.Call(3108, this.Entity, t, () => {}));
          }
        }
      });
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.CheckGetComponent(3)),
      (this.W5r = this.Entity.CheckGetComponent(158)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSwitchControl,
        this.OnSwitchControl,
      ),
      !0
    );
  }
  OnActivate() {
    CombatMessageController_1.CombatMessageController.RegisterAfterTick(
      this,
      this.$9r,
    );
    const t = this.Entity.GetComponent(0);
    (this.W9r = t.ComponentDataMap.get("zvs")?.zvs),
      this.Hte.IsAutonomousProxy
        ? (this.X9r(), (this.Inited = !0))
        : this.W9r && this.Y9r(this.W9r),
      (this.K9r[0] = this.W5r.PositionState),
      (this.K9r[1] = this.W5r.MoveState),
      (this.K9r[2] = this.W5r.DirectionState),
      (this.K9r[3] = this.W5r.PositionSubState);
    for (let t = 0; t < this.K9r.length; t++) this.Q9r[t] = this.K9r[t];
    return !0;
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSwitchControl,
        this.OnSwitchControl,
      ),
      CombatMessageController_1.CombatMessageController.UnregisterAfterTick(
        this,
      ),
      !0
    );
  }
  X9r() {
    const t = Protocol_1.Aki.Protocol.rNn.create();
    (t.j9n = Protocol_1.Aki.Protocol.zvs.create()),
      (t.j9n.k9n = this.W5r.PositionState),
      (t.j9n.F9n = this.W5r.MoveState),
      (t.j9n.V9n = this.W5r.DirectionState),
      (t.j9n.H9n = this.W5r.PositionSubState),
      CombatMessage_1.CombatNet.Call(22734, this.Entity, t, () => {});
  }
  Y9r(t) {
    this.J9r(0, t.k9n),
      this.J9r(1, t.F9n),
      this.J9r(2, t.V9n),
      this.J9r(3, t.H9n),
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "LogicState",
        this.Entity,
        "初始化逻辑状态",
        ["states", [t.k9n, t.F9n, t.V9n, t.H9n]],
      ),
      (this.Inited = !0);
  }
  J9r(t, e) {
    switch (t) {
      case 0:
        this.W5r.SetPositionStateHandle(e);
        break;
      case 1:
        this.W5r.SetMoveStateHandle(e);
        break;
      case 2:
        this.W5r.SetDirectionStateHandle(e);
        break;
      case 3:
        this.W5r.SetPositionSubStateHandle(e);
    }
  }
  static LogicStateInitNotify(t, e) {
    t?.GetComponent(54)?.Y9r(e.j9n);
  }
  static SwitchLogicStateNotify(t, e) {
    t?.GetComponent(3)?.IsMoveAutonomousProxy ||
      ((t = t?.GetComponent(54)) &&
        e.f9n &&
        (t.J9r(0, e.f9n.k9n),
        t.J9r(1, e.f9n.F9n),
        t.J9r(2, e.f9n.V9n),
        t.J9r(3, e.f9n.H9n)));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("zOn")],
  CharacterLogicStateSyncComponent,
  "LogicStateInitNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("ZOn")],
    CharacterLogicStateSyncComponent,
    "SwitchLogicStateNotify",
    null,
  ),
  (CharacterLogicStateSyncComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(54)],
    CharacterLogicStateSyncComponent,
  )),
  (exports.CharacterLogicStateSyncComponent = CharacterLogicStateSyncComponent);
// # sourceMappingURL=CharacterLogicStateSyncComponent.js.map
