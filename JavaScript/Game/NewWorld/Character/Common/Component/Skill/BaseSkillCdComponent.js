"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, n) {
    var i,
      s = arguments.length,
      r =
        s < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, o, n);
    else
      for (var l = t.length - 1; 0 <= l; l--)
        (i = t[l]) && (r = (s < 3 ? i(r) : 3 < s ? i(e, o, r) : i(e, o)) || r);
    return 3 < s && r && Object.defineProperty(e, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseSkillCdComponent = void 0);
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
let BaseSkillCdComponent = class BaseSkillCdComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.BuffComp = void 0),
      (this.HasModifyCdEffect = !1);
  }
  OnInit() {
    return (this.BuffComp = this.Entity.CheckGetComponent(194)), !0;
  }
  UpdateModifyCdEffect(t, e) {
    if (this.BuffComp)
      if (t) this.HasModifyCdEffect = !0;
      else {
        for (const o of this.BuffComp.BuffEffectManager.FilterById(49))
          if (e !== o && 0 < o.SkillIdOrGenres.size)
            return void (this.HasModifyCdEffect = !0);
        this.HasModifyCdEffect = !1;
      }
    else this.HasModifyCdEffect = !1;
  }
};
(BaseSkillCdComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(191)],
  BaseSkillCdComponent,
)),
  (exports.BaseSkillCdComponent = BaseSkillCdComponent);
//# sourceMappingURL=BaseSkillCdComponent.js.map
