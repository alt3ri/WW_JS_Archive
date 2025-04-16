"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, s) {
    var i,
      r = arguments.length,
      f =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, o))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      f = Reflect.decorate(t, e, o, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (i = t[n]) && (f = (r < 3 ? i(f) : 3 < r ? i(e, o, f) : i(e, o)) || f);
    return 3 < r && f && Object.defineProperty(e, o, f), f;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionBuffComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  CharacterBuffComponent_1 = require("./CharacterBuffComponent");
let VisionBuffComponent = class VisionBuffComponent extends CharacterBuffComponent_1.CharacterBuffComponent {
  constructor() {
    super(...arguments), (this.a2r = void 0);
  }
  h2r() {
    var t, e;
    return void 0 !== this.a2r
      ? this.a2r
      : (e = this.Entity.GetComponent(55)?.GetAttributeHolder()) !==
          this.Entity &&
          ((e = e?.CheckGetComponent(42)) &&
            ((t = e.GetVisionId()),
            (e = e.GetVisionData(t)),
            (this.a2r = !0 === e?.buff是否转移)),
          this.a2r ?? !1);
  }
  AddBuff(t, e) {
    var o;
    !(this.CreatureDataId === e.InstigatorId) && this.h2r()
      ? (o = this.Entity.GetComponent(55)
          ?.GetAttributeHolder()
          ?.GetComponent(172)) && o !== this
        ? o.AddBuff(t, e)
        : CombatLog_1.CombatLog.Error(
            "Buff",
            this.Entity,
            "添加幻象buff时无法获取到合法的召唤者",
            ["buffId", t],
            ["reason", e?.Reason],
          )
      : super.AddBuff(t, e);
  }
  RemoveBuff(t, e, o) {
    var s;
    this.h2r() &&
      ((s = this.Entity.GetComponent(55)
        ?.GetAttributeHolder()
        ?.GetComponent(172)) && s !== this
        ? s.RemoveBuff(t, e, o)
        : CombatLog_1.CombatLog.Error(
            "Buff",
            this.Entity,
            "移除幻象buff时无法获取到合法的召唤者",
            ["buffId", t],
            ["reason", o],
          )),
      super.RemoveBuff(t, e, o);
  }
  GetBuffApplyTarget(t, e) {
    var o;
    return this.CreatureDataId === e || !this.h2r()
      ? this
      : (o = this.Entity.GetComponent(55)
            ?.GetAttributeHolder()
            ?.GetComponent(172)) && o !== this
        ? o.GetBuffApplyTarget(t, e)
        : void 0;
  }
};
(VisionBuffComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(174)],
  VisionBuffComponent,
)),
  (exports.VisionBuffComponent = VisionBuffComponent);
//# sourceMappingURL=VisionBuffComponent.js.map
