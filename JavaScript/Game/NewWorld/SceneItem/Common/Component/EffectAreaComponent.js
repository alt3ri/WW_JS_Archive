"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var r,
      i = arguments.length,
      s =
        i < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, n, o);
    else
      for (var f = e.length - 1; 0 <= f; f--)
        (r = e[f]) && (s = (i < 3 ? r(s) : 3 < i ? r(t, n, s) : r(t, n)) || s);
    return 3 < i && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectAreaComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
let EffectAreaComponent = class EffectAreaComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Zhn = !1),
      (this.eln = (e) => {
        this.Zhn = e;
      });
  }
  OnInitData(e) {
    return !0;
  }
  OnStart() {
    return (
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
        this.eln,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
        this.eln,
      ),
      this.Zhn && this.eln(!1),
      !0
    );
  }
};
(EffectAreaComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(217)],
  EffectAreaComponent,
)),
  (exports.EffectAreaComponent = EffectAreaComponent);
//# sourceMappingURL=EffectAreaComponent.js.map
