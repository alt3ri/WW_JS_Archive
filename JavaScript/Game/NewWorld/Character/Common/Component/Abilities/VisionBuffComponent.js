"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    let s;
    const i = arguments.length;
    let n =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, o)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(e, t, o, r);
    else
      for (let f = e.length - 1; f >= 0; f--)
        (s = e[f]) && (n = (i < 3 ? s(n) : i > 3 ? s(t, o, n) : s(t, o)) || n);
    return i > 3 && n && Object.defineProperty(t, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionBuffComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const CharacterBuffComponent_1 = require("./CharacterBuffComponent");
let VisionBuffComponent = class VisionBuffComponent extends CharacterBuffComponent_1.CharacterBuffComponent {
  constructor() {
    super(...arguments), (this.P2r = void 0);
  }
  x2r() {
    let e, t;
    return void 0 !== this.P2r
      ? this.P2r
      : (t = this.Entity.GetComponent(47)?.GetAttributeHolder()) !==
          this.Entity &&
          ((t = t?.CheckGetComponent(34)) &&
            ((e = t.GetVisionId()),
            (t = t.GetVisionData(e)),
            (this.P2r = !0 === t?.buff是否转移)),
          this.P2r ?? !1);
  }
  AddBuff(e, t) {
    !(this.CreatureDataId === t.InstigatorId) && this.x2r()
      ? this.Entity.GetComponent(47)
          .GetAttributeHolder()
          .GetComponent(157)
          .AddBuff(e, t)
      : super.AddBuff(e, t);
  }
  RemoveBuff(e, t, o) {
    this.x2r() &&
      this.Entity.GetComponent(47)
        .GetAttributeHolder()
        .GetComponent(157)
        .RemoveBuff(e, t, o),
      super.RemoveBuff(e, t, o);
  }
};
(VisionBuffComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(159)],
  VisionBuffComponent,
)),
  (exports.VisionBuffComponent = VisionBuffComponent);
// # sourceMappingURL=VisionBuffComponent.js.map
