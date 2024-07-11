"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    let o;
    const i = arguments.length;
    let s =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, n, r);
    else
      for (let f = e.length - 1; f >= 0; f--)
        (o = e[f]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectAreaComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks");
let EffectAreaComponent = class EffectAreaComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.pln = !1),
      (this.vln = (e) => {
        (this.pln = e),
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestPlayerAccessEffectArea(
            this.Entity.Id,
            e,
          );
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
        this.vln,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
        this.vln,
      ),
      this.pln && this.vln(!1),
      !0
    );
  }
};
(EffectAreaComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(195)],
  EffectAreaComponent,
)),
  (exports.EffectAreaComponent = EffectAreaComponent);
// # sourceMappingURL=EffectAreaComponent.js.map
