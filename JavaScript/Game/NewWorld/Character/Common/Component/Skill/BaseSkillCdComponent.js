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
      for (var l = t.length - 1; 0 <= l; l--)
        (n = t[l]) && (r = (o < 3 ? n(r) : 3 < o ? n(e, i, r) : n(e, i)) || r);
    return 3 < o && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseSkillCdComponent = void 0);
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
let BaseSkillCdComponent = class BaseSkillCdComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.BuffComp = void 0),
      (this.HasModifyCdEffect = !1),
      (this.Gzr = void 0),
      (this.bzr = void 0);
  }
  OnInit() {
    return (
      (this.BuffComp = this.Entity.CheckGetComponent(207)),
      (this.Gzr = new Map()),
      (this.bzr =
        ModelManager_1.ModelManager.SkillCdModel.GetCurWorldPassiveSkillCdData()),
      !0
    );
  }
  OnEnd() {
    return (
      super.OnEnd(),
      this.bzr && (this.bzr.RemoveEntity(this.Entity), (this.bzr = void 0)),
      !0
    );
  }
  UpdateModifyCdEffect(t, e) {
    if (this.BuffComp)
      if (t) this.HasModifyCdEffect = !0;
      else {
        for (const i of this.BuffComp.BuffEffectManager.FilterById(49))
          if (e !== i && 0 < i.SkillIdOrGenres.size)
            return void (this.HasModifyCdEffect = !0);
        this.HasModifyCdEffect = !1;
      }
    else this.HasModifyCdEffect = !1;
  }
  InitPassiveSkill(t) {
    var e = t.Id,
      i = this.Gzr.get(e);
    return (
      i ||
        ((i = this.bzr.InitPassiveSkillCd(this.Entity, t)), this.Gzr.set(e, i)),
      i
    );
  }
  IsPassiveSkillInCd(t) {
    t = this.Gzr.get(t);
    return !!t && t.IsInCd();
  }
  StartPassiveCd(t, e = -1) {
    var i = this.Gzr.get(t);
    return !!i && (i.StartCd(t, e), !0);
  }
  GetPassiveSkillCdInfo(t) {
    return this.Gzr.get(t);
  }
};
(BaseSkillCdComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(204)],
  BaseSkillCdComponent,
)),
  (exports.BaseSkillCdComponent = BaseSkillCdComponent);
//# sourceMappingURL=BaseSkillCdComponent.js.map
