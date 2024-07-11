"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      r = arguments.length,
      a =
        r < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (a = (r < 3 ? s(a) : 3 < r ? s(e, i, a) : s(e, i)) || a);
    return 3 < r && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLogicStateSyncComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
  CombatLog_1 = require("../../../../Utils/CombatLog");
let CharacterLogicStateSyncComponent = class CharacterLogicStateSyncComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.I5r = void 0),
      (this.T9r = void 0),
      (this.L9r = []),
      (this.D9r = []),
      (this.Inited = !1),
      (this.OnSwitchControl = (t) => {
        t && !this.Inited && (this.R9r(), (this.Inited = !0));
      }),
      (this.U9r = () => {
        if (this.Hte.IsMoveAutonomousProxy) {
          var t,
            i = this.I5r;
          if (i) {
            let e = !1;
            (this.L9r[0] = i.PositionState),
              (this.L9r[1] = i.MoveState),
              (this.L9r[2] = i.DirectionState),
              (this.L9r[3] = i.PositionSubState);
            for (let t = 0; t < this.L9r.length; ++t)
              if (this.L9r[t] !== this.D9r[t]) {
                e = !0;
                break;
              }
            e &&
              (((t = Protocol_1.Aki.Protocol.B3n.create()).Xjn =
                Protocol_1.Aki.Protocol.Cys.create()),
              (this.D9r[0] = t.Xjn.fWn = i.PositionState),
              (this.D9r[1] = t.Xjn.pWn = i.MoveState),
              (this.D9r[2] = t.Xjn.vWn = i.DirectionState),
              (this.D9r[3] = t.Xjn.MWn = i.PositionSubState),
              CombatMessage_1.CombatNet.Call(10937, this.Entity, t, () => {}));
          }
        }
      });
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.CheckGetComponent(3)),
      (this.I5r = this.Entity.CheckGetComponent(160)),
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
      this.U9r,
    );
    var t = this.Entity.GetComponent(0);
    (this.T9r = t.ComponentDataMap.get("Cys")?.Cys),
      this.Hte.IsAutonomousProxy
        ? (this.R9r(), (this.Inited = !0))
        : this.T9r && this.A9r(this.T9r),
      (this.L9r[0] = this.I5r.PositionState),
      (this.L9r[1] = this.I5r.MoveState),
      (this.L9r[2] = this.I5r.DirectionState),
      (this.L9r[3] = this.I5r.PositionSubState);
    for (let t = 0; t < this.L9r.length; t++) this.D9r[t] = this.L9r[t];
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
  R9r() {
    var t = Protocol_1.Aki.Protocol.P3n.create();
    (t.SWn = Protocol_1.Aki.Protocol.Cys.create()),
      (t.SWn.fWn = this.I5r.PositionState),
      (t.SWn.pWn = this.I5r.MoveState),
      (t.SWn.vWn = this.I5r.DirectionState),
      (t.SWn.MWn = this.I5r.PositionSubState),
      CombatMessage_1.CombatNet.Call(27805, this.Entity, t, () => {});
  }
  A9r(t) {
    this.P9r(0, t.fWn),
      this.P9r(1, t.pWn),
      this.P9r(2, t.vWn),
      this.P9r(3, t.MWn),
      CombatLog_1.CombatLog.Info("LogicState", this.Entity, "初始化逻辑状态", [
        "states",
        [t.fWn, t.pWn, t.vWn, t.MWn],
      ]),
      (this.Inited = !0);
  }
  P9r(t, e) {
    switch (t) {
      case 0:
        this.I5r.SetPositionStateHandle(e);
        break;
      case 1:
        this.I5r.SetMoveStateHandle(e);
        break;
      case 2:
        this.I5r.SetDirectionStateHandle(e);
        break;
      case 3:
        this.I5r.SetPositionSubStateHandle(e);
    }
  }
  static LogicStateInitNotify(t, e) {
    t?.GetComponent(55)?.A9r(e.SWn);
  }
  static SwitchLogicStateNotify(t, e) {
    t?.GetComponent(3)?.IsMoveAutonomousProxy ||
      ((t = t?.GetComponent(55)) &&
        e.Xjn &&
        (t.P9r(0, e.Xjn.fWn),
        t.P9r(1, e.Xjn.pWn),
        t.P9r(2, e.Xjn.vWn),
        t.P9r(3, e.Xjn.MWn)));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("DFn")],
  CharacterLogicStateSyncComponent,
  "LogicStateInitNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("AFn")],
    CharacterLogicStateSyncComponent,
    "SwitchLogicStateNotify",
    null,
  ),
  (CharacterLogicStateSyncComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(55)],
    CharacterLogicStateSyncComponent,
  )),
  (exports.CharacterLogicStateSyncComponent = CharacterLogicStateSyncComponent);
//# sourceMappingURL=CharacterLogicStateSyncComponent.js.map
