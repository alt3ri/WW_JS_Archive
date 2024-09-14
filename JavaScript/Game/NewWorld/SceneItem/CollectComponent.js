"use strict";
var CollectComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, n) {
      var l,
        r = arguments.length,
        c =
          r < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, o))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        c = Reflect.decorate(e, t, o, n);
      else
        for (var C = e.length - 1; 0 <= C; C--)
          (l = e[C]) &&
            (c = (r < 3 ? l(c) : 3 < r ? l(t, o, c) : l(t, o)) || c);
      return 3 < r && c && Object.defineProperty(t, o, c), c;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
let CollectComponent = (CollectComponent_1 = class CollectComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments), (this.MPa = !1);
  }
  OnInitData(e) {
    e = e.GetParam(CollectComponent_1)[0];
    return (this.MPa = e.IsDisableOneClickCollection ?? !1), !0;
  }
  GetIsDisableOneClickCollection() {
    return this.MPa;
  }
});
(CollectComponent = CollectComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(213)],
    CollectComponent,
  )),
  (exports.CollectComponent = CollectComponent);
//# sourceMappingURL=CollectComponent.js.map
