"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var n,
      o = arguments.length,
      r =
        o < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (n = t[h]) && (r = (o < 3 ? n(r) : 3 < o ? n(e, i, r) : n(e, i)) || r);
    return 3 < o && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPropertyComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
let SceneItemPropertyComponent = class SceneItemPropertyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Xte = void 0),
      (this.A1n = void 0),
      (this.P1n = 0),
      (this.x1n = !1),
      (this.Ero = !1),
      (this.w1n = (t, e) => {
        t.includes(-662723379)
          ? TimerSystem_1.TimerSystem.Next(() => {
              this.Xte?.AddTag(this.P1n),
                (this.x1n = !0),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemLockPropChange,
                  !0,
                );
            })
          : e.includes(-662723379) &&
            TimerSystem_1.TimerSystem.Next(() => {
              this.Xte?.RemoveTag(this.P1n),
                (this.x1n = !1),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemLockPropChange,
                  !1,
                );
            });
      });
  }
  get IsMoving() {
    return this.Ero;
  }
  set IsMoving(t) {
    this.Ero !== t &&
      ((this.Ero = t)
        ? (this.Xte?.AddTag(197059111), this.Xte?.RemoveTag(-1443491052))
        : (this.Xte?.AddTag(-1443491052), this.Xte?.RemoveTag(197059111)));
  }
  get IsLocked() {
    return this.x1n;
  }
  OnStart() {
    var t = this.Entity?.GetComponent(0);
    return (
      t &&
        (t = t.GetPbEntityInitData()) &&
        ((t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "EntityStateComponent",
        )),
        (this.A1n = t?.LockConfig),
        this.A1n) &&
        ((this.Xte = this.Entity?.GetComponent(180)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.w1n,
        ),
        this.B1n()),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnLevelTagChanged,
        this.w1n,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.w1n,
        ),
      !0
    );
  }
  B1n() {
    if (this.A1n) {
      switch (this.A1n?.LockType) {
        case "Program":
          this.P1n = -2073998558;
          break;
        case "Blackstone":
          this.P1n = 1023182128;
          break;
        case "Holovision":
          this.P1n = 1479110609;
          break;
        default:
          this.P1n = -1900469744;
      }
      (this.x1n = !1),
        this.Xte.HasTag(-662723379) &&
          ((this.x1n = !0), this.Xte.AddTag(this.P1n));
    }
  }
  RemoveLockPerformanceTagLocal() {
    this.A1n && this.P1n && this.Xte.RemoveTag(this.P1n);
  }
  SetIsBeingTargeted(t) {
    t
      ? this.Xte.HasTag(712704422) || this.Xte.AddTag(712704422)
      : this.Xte.HasTag(712704422) && this.Xte.RemoveTag(712704422);
  }
};
(SceneItemPropertyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(117)],
  SceneItemPropertyComponent,
)),
  (exports.SceneItemPropertyComponent = SceneItemPropertyComponent);
//# sourceMappingURL=SceneItemPropertyComponent.js.map
