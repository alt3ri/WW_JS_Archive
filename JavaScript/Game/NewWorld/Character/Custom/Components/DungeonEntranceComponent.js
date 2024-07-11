"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, n, i) {
    let o;
    const s = arguments.length;
    let r =
      s < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, n)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, n, i);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (o = t[h]) && (r = (s < 3 ? o(r) : s > 3 ? o(e, n, r) : o(e, n)) || r);
    return s > 3 && r && Object.defineProperty(e, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DungeonEntranceComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let DungeonEntranceComponent = class DungeonEntranceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Ben = void 0),
      (this.ben = void 0),
      (this.qen = (t, e) => {
        this.Nen();
      }),
      (this.Oen = (t) => {
        this.Nen(t);
      });
  }
  OnStart() {
    return (
      (this.Ben = this.Entity.GetComponent(117)),
      (this.ben = new Array()),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.qen,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
        this.Oen,
      ),
      this.Nen(),
      !0
    );
  }
  OnActivate() {
    return !0;
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.qen,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
        this.Oen,
      ),
      !(this.ben = void 0)
    );
  }
  RegisterRestoreCb(t) {
    this.ben.push(t);
  }
  Restore() {
    if (this.ben?.length) {
      for (const t of this.ben) t();
      this.ben.length = 0;
    }
  }
  Nen(t) {
    t
      ? t === -3775711 && this.Ben.ChangePerformanceState(217251158, !1, !1)
      : this.Ben?.State === 2 &&
        this.Ben.ChangePerformanceState(217251158, !1, !1);
  }
};
(DungeonEntranceComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(72)],
  DungeonEntranceComponent,
)),
  (exports.DungeonEntranceComponent = DungeonEntranceComponent);
// # sourceMappingURL=DungeonEntranceComponent.js.map
