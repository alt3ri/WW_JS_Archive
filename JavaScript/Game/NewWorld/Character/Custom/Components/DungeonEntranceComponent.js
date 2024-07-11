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
      (this.cen = void 0),
      (this.men = void 0),
      (this.den = (t, e) => {
        this.Cen();
      }),
      (this.gen = (t) => {
        this.Cen(t);
      });
  }
  OnStart() {
    return (
      (this.cen = this.Entity.GetComponent(119)),
      (this.men = new Array()),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.den,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
        this.gen,
      ),
      this.Cen(),
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
        this.den,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
        this.gen,
      ),
      !(this.men = void 0)
    );
  }
  RegisterRestoreCb(t) {
    this.men.push(t);
  }
  Restore() {
    if (this.men?.length) {
      for (const t of this.men) t();
      this.men.length = 0;
    }
  }
  Cen(t) {
    t
      ? -3775711 === t && this.cen.ChangePerformanceState(217251158, !1, !1)
      : 2 === this.cen?.State &&
        this.cen.ChangePerformanceState(217251158, !1, !1);
  }
};
(DungeonEntranceComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(74)],
  DungeonEntranceComponent,
)),
  (exports.DungeonEntranceComponent = DungeonEntranceComponent);
//# sourceMappingURL=DungeonEntranceComponent.js.map
