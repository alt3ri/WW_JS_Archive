"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var n,
      r = arguments.length,
      h =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (n = t[o]) && (h = (r < 3 ? n(h) : 3 < r ? n(e, i, h) : n(e, i)) || h);
    return 3 < r && h && Object.defineProperty(e, i, h), h;
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
      (this.Xrh = void 0),
      (this.x1n = !1),
      (this.Ero = !1),
      (this.AttributeIdSet = void 0),
      (this.Yrh = !1),
      (this.zrh = (t, e) => {
        -662723379 === t &&
          (e
            ? TimerSystem_1.TimerSystem.Next(() => {
                this.Xte?.AddTag(this.P1n),
                  (this.x1n = !0),
                  EventSystem_1.EventSystem.EmitWithTarget(
                    this.Entity,
                    EventDefine_1.EEventName.OnSceneItemLockPropChange,
                    !0,
                  );
              })
            : e ||
              TimerSystem_1.TimerSystem.Next(() => {
                this.Xte?.RemoveTag(this.P1n),
                  (this.x1n = !1),
                  EventSystem_1.EventSystem.EmitWithTarget(
                    this.Entity,
                    EventDefine_1.EEventName.OnSceneItemLockPropChange,
                    !1,
                  );
              }));
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
  OnInitData(t) {
    var e = this.Entity?.GetComponent(0);
    return (
      e?.PbSceneItemAttributeIds &&
        (this.AttributeIdSet = new Set(e.PbSceneItemAttributeIds)),
      !0
    );
  }
  OnStart() {
    var t = this.Entity?.GetComponent(0);
    return (
      (this.Xte = this.Entity?.GetComponent(194)),
      t &&
        (t = t.GetPbEntityInitData()) &&
        ((t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "EntityStateComponent",
        )),
        (this.A1n = t?.LockConfig),
        this.A1n) &&
        (this.Xrh ||
          (this.Xrh = this.Xte?.ListenForTagAddOrRemove(-662723379, this.zrh)),
        this.B1n(),
        this.Jrh()),
      !0
    );
  }
  OnEnd() {
    return (
      this.Xrh && (this.Xrh.EndTask(), (this.Xrh = void 0)),
      !(this.AttributeIdSet = void 0)
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
  SetIsBeingTargeted(t) {
    t
      ? this.Xte.HasTag(712704422) || this.Xte.AddTag(712704422)
      : this.Xte.HasTag(712704422) && this.Xte.RemoveTag(712704422);
  }
  Jrh() {
    if (this.AttributeIdSet && this.Xte)
      for (const t of this.AttributeIdSet)
        this.Xte.HasTag(t) || this.Xte.AddTag(t);
    this.Yrh = !0;
  }
  HandleAttributeChanged(t, e) {
    this.AttributeIdSet || (this.AttributeIdSet = new Set()),
      e ? this.AttributeIdSet.add(t) : this.AttributeIdSet.delete(t),
      this.Yrh && (e ? this.Xte?.AddTag(t) : this.Xte?.RemoveTag(t));
  }
};
(SceneItemPropertyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(128)],
  SceneItemPropertyComponent,
)),
  (exports.SceneItemPropertyComponent = SceneItemPropertyComponent);
//# sourceMappingURL=SceneItemPropertyComponent.js.map
