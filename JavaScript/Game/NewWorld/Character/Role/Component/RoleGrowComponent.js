"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    let o;
    const n = arguments.length;
    let s =
      n < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, i)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, i, r);
    else
      for (let l = e.length - 1; l >= 0; l--)
        (o = e[l]) && (s = (n < 3 ? o(s) : n > 3 ? o(t, i, s) : o(t, i)) || s);
    return n > 3 && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGrowComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleSkillData_1 = require("../../../../Module/RoleUi/RoleData/Module/RoleSkillData");
const CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let RoleGrowComponent = class RoleGrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.$te = void 0),
      (this.Xte = void 0),
      (this.elt = void 0),
      (this._do = void 0),
      (this.Eon = 0),
      (this.RefreshAttributeGrowHandle = (e, t) => {
        this.RefreshGrowAttribute(t), this.yon(e);
      });
  }
  OnStart() {
    (this.$te = this.Entity.CheckGetComponent(156)),
      (this.Xte = this.Entity.CheckGetComponent(185)),
      (this.elt = this.Entity.CheckGetComponent(157)),
      this.Ion();
    const e = this.Entity.CheckGetComponent(0);
    var t = e.GetPlayerId();
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t;
    const i = e.GetRoleId();
    return (
      (this.Eon = e.GetRoleConfig().WeaponType),
      (this._do = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i, t)),
      this._do &&
        EventSystem_1.EventSystem.AddWithTarget(
          this._do,
          EventDefine_1.EEventName.RoleRefreshAttribute,
          this.RefreshAttributeGrowHandle,
        ),
      !0
    );
  }
  OnEnd() {
    return (
      this._do &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this._do,
          EventDefine_1.EEventName.RoleRefreshAttribute,
          this.RefreshAttributeGrowHandle,
        ),
      !0
    );
  }
  Ion() {
    this.Xte.AddTag(1098729489), this.Xte.AddTag(-8769906);
  }
  yon(t) {
    for (let e = 1; e < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; e++) {
      var i;
      t.has(e) && ((i = t.get(e)), this.$te.SetBaseValue(e, i));
    }
  }
  RefreshGrowAttribute(e) {
    this.elt.UpdateSysGrowBuff(e);
  }
  GetWeaponType() {
    return this.Eon || 0;
  }
  GetSkillLevelBySkillInfoId(e) {
    return this._do
      ? this._do
          .GetSkillData()
          .GetReferencedSkillLevel(
            e,
            RoleSkillData_1.ERoleSkillReferenceType.SkillInfo,
          )
      : 0;
  }
  GetSkillLevelByBuffId(e) {
    return this._do
      ? this._do
          .GetSkillData()
          .GetReferencedSkillLevel(
            e,
            RoleSkillData_1.ERoleSkillReferenceType.Buff,
          )
      : 0;
  }
  GetSkillLevelByDamageId(e) {
    return this._do
      ? this._do
          .GetSkillData()
          .GetReferencedSkillLevel(
            e,
            RoleSkillData_1.ERoleSkillReferenceType.Damage,
          )
      : 0;
  }
};
(RoleGrowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(83)],
  RoleGrowComponent,
)),
  (exports.RoleGrowComponent = RoleGrowComponent);
// # sourceMappingURL=RoleGrowComponent.js.map
