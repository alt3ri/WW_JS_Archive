"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    var o,
      r = arguments.length,
      s =
        r < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, i, n);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (s = (r < 3 ? o(s) : 3 < r ? o(e, i, s) : o(e, i)) || s);
    return 3 < r && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DurabilityComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
let DurabilityComponent = class DurabilityComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.u1t = void 0),
      (this.ac = void 0),
      (this.cmt = void 0),
      (this.Qlt = void 0),
      (this.DeadActions = void 0);
  }
  get IsDestroyed() {
    return 1 <= this.ac;
  }
  OnInit() {
    (this.u1t = this.Entity.GetComponent(0)),
      (this.ac = 0),
      (this.cmt = void 0);
    var t = this.u1t.GetPbEntityInitData(),
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "DestructibleItem");
    return (
      t.DurabilityStateConfig?.NonDestructable ||
        (this.DeadActions = t.DestructionActions),
      this.Entity.GetComponent(109).SetLogicRange(
        ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
      ),
      !0
    );
  }
  OnStart() {
    return (
      (this.Qlt = (t) => {
        this.$rn();
      }),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemDurabilityChange,
        this.Qlt,
      ),
      this.$rn(),
      !0
    );
  }
  OnEnd() {
    return (
      void 0 !== this.Qlt &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Qlt,
        ),
        (this.Qlt = void 0)),
      (this.ac = void 0) !== this.cmt &&
        TimerSystem_1.TimerSystem.Has(this.cmt) &&
        TimerSystem_1.TimerSystem.Remove(this.cmt),
      !(this.cmt = void 0)
    );
  }
  $rn() {
    0 !== this.ac ||
      0 < this.u1t.GetDurabilityValue() ||
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSceneItemDestroy,
        this.Entity,
      ),
      (this.ac = 1));
  }
};
(DurabilityComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(93)],
  DurabilityComponent,
)),
  (exports.DurabilityComponent = DurabilityComponent);
//# sourceMappingURL=DurablityComponent.js.map
