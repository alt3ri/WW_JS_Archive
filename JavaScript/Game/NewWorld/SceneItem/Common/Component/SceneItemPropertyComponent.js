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
      (this.J1n = void 0),
      (this.z1n = 0),
      (this.Z1n = !1),
      (this.Ioo = !1),
      (this.e_n = (t, e) => {
        t.includes(-662723379)
          ? TimerSystem_1.TimerSystem.Next(() => {
              this.Xte?.AddTag(this.z1n),
                (this.Z1n = !0),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemLockPropChange,
                  !0,
                );
            })
          : e.includes(-662723379) &&
            TimerSystem_1.TimerSystem.Next(() => {
              this.Xte?.RemoveTag(this.z1n),
                (this.Z1n = !1),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemLockPropChange,
                  !1,
                );
            });
      });
  }
  get IsMoving() {
    return this.Ioo;
  }
  set IsMoving(t) {
    this.Ioo !== t &&
      ((this.Ioo = t)
        ? (this.Xte?.AddTag(197059111), this.Xte?.RemoveTag(-1443491052))
        : (this.Xte?.AddTag(-1443491052), this.Xte?.RemoveTag(197059111)));
  }
  get IsLocked() {
    return this.Z1n;
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
        (this.J1n = t?.LockConfig),
        this.J1n) &&
        ((this.Xte = this.Entity?.GetComponent(177)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.e_n,
        ),
        this.t_n()),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnLevelTagChanged,
        this.e_n,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.e_n,
        ),
      !0
    );
  }
  t_n() {
    if (this.J1n) {
      switch (this.J1n?.LockType) {
        case "Program":
          this.z1n = -2073998558;
          break;
        case "Blackstone":
          this.z1n = 1023182128;
          break;
        case "Holovision":
          this.z1n = 1479110609;
          break;
        default:
          this.z1n = -1900469744;
      }
      (this.Z1n = !1),
        this.Xte.HasTag(-662723379) &&
          ((this.Z1n = !0), this.Xte.AddTag(this.z1n));
    }
  }
  RemoveLockPerformanceTagLocal() {
    this.J1n && this.z1n && this.Xte.RemoveTag(this.z1n);
  }
  SetIsBeingTargeted(t) {
    t
      ? this.Xte.HasTag(712704422) || this.Xte.AddTag(712704422)
      : this.Xte.HasTag(712704422) && this.Xte.RemoveTag(712704422);
  }
};
(SceneItemPropertyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(115)],
  SceneItemPropertyComponent,
)),
  (exports.SceneItemPropertyComponent = SceneItemPropertyComponent);
//# sourceMappingURL=SceneItemPropertyComponent.js.map
