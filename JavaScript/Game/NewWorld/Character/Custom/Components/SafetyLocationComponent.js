"use strict";
var SafetyLocationComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, n, o) {
      var i,
        r = arguments.length,
        s =
          r < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, n, o);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (i = t[a]) &&
            (s = (r < 3 ? i(s) : 3 < r ? i(e, n, s) : i(e, n)) || s);
      return 3 < r && s && Object.defineProperty(e, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SafetyLocationComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global");
let SafetyLocationComponent =
  (SafetyLocationComponent_1 = class SafetyLocationComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.R0n = void 0),
        (this.Lya = !1),
        (this.Dya = (t) => {
          this.Lya = t;
          var e =
            Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
              88,
            );
          e &&
            (t
              ? e.AddSafetyLocationConfig(this.Entity, this.R0n)
              : e.RemoveSafetyLocationConfig(this.Entity));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SafetyLocationComponent_1)[0];
      return (this.R0n = t), !0;
    }
    OnStart() {
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Dya,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Dya,
        ),
        this.Lya && this.Dya(!1),
        !0
      );
    }
  });
(SafetyLocationComponent = SafetyLocationComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(211)],
    SafetyLocationComponent,
  )),
  (exports.SafetyLocationComponent = SafetyLocationComponent);
//# sourceMappingURL=SafetyLocationComponent.js.map
