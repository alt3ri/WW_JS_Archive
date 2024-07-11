"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, n, i) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, n, i);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (r = (s < 3 ? o(r) : 3 < s ? o(e, n, r) : o(e, n)) || r);
    return 3 < s && r && Object.defineProperty(e, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DungeonEntranceComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
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
      ? -3775711 === t && this.Ben.ChangePerformanceState(217251158, !1, !1)
      : 2 === this.Ben?.State &&
        this.Ben.ChangePerformanceState(217251158, !1, !1);
  }
};
(DungeonEntranceComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(72)],
  DungeonEntranceComponent,
)),
  (exports.DungeonEntranceComponent = DungeonEntranceComponent);
//# sourceMappingURL=DungeonEntranceComponent.js.map
