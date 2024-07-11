"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    let o;
    const r = arguments.length;
    let s =
      r < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, i, n);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (o = t[h]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, i, s) : o(e, i)) || s);
    return r > 3 && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DurabilityComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
let DurabilityComponent = class DurabilityComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.zht = void 0),
      (this.ac = void 0),
      (this.ect = void 0),
      (this.Bht = void 0),
      (this.DeadActions = void 0);
  }
  get IsDestroyed() {
    return this.ac >= 1;
  }
  OnInit() {
    (this.zht = this.Entity.GetComponent(0)),
      (this.ac = 0),
      (this.ect = void 0);
    var t = this.zht.GetPbEntityInitData();
    var t = (0, IComponent_1.getComponent)(
      t.ComponentsData,
      "DestructibleItem",
    );
    return (
      t.DurabilityStateConfig?.NonDestructable ||
        (this.DeadActions = t.DestructionActions),
      this.Entity.GetComponent(106).SetLogicRange(
        ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
      ),
      !0
    );
  }
  OnStart() {
    return (
      (this.Bht = (t) => {
        this.dnn();
      }),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemDurabilityChange,
        this.Bht,
      ),
      this.dnn(),
      !0
    );
  }
  OnEnd() {
    return (
      void 0 !== this.Bht &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Bht,
        ),
        (this.Bht = void 0)),
      (this.ac = void 0) !== this.ect &&
        TimerSystem_1.TimerSystem.Has(this.ect) &&
        TimerSystem_1.TimerSystem.Remove(this.ect),
      !(this.ect = void 0)
    );
  }
  dnn() {
    this.ac !== 0 ||
      this.zht.GetDurabilityValue() > 0 ||
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSceneItemDestroy,
        this.Entity,
      ),
      (this.ac = 1));
  }
};
(DurabilityComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(90)],
  DurabilityComponent,
)),
  (exports.DurabilityComponent = DurabilityComponent);
// # sourceMappingURL=DurablityComponent.js.map
