"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    var o,
      n = arguments.length,
      s =
        n < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, r);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (o = e[l]) && (s = (n < 3 ? o(s) : 3 < n ? o(t, i, s) : o(t, i)) || s);
    return 3 < n && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGrowComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RoleSkillData_1 = require("../../../../Module/RoleUi/RoleData/Module/RoleSkillData"),
  CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let RoleGrowComponent = class RoleGrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.$te = void 0),
      (this.Xte = void 0),
      (this.m1t = void 0),
      (this.aCo = void 0),
      (this.ion = 0),
      (this.RefreshAttributeGrowHandle = (e, t) => {
        this.RefreshGrowAttribute(t), this.oon(e);
      });
  }
  OnStart() {
    (this.$te = this.Entity.CheckGetComponent(159)),
      (this.Xte = this.Entity.CheckGetComponent(190)),
      (this.m1t = this.Entity.CheckGetComponent(160)),
      this.ron();
    var e = this.Entity.CheckGetComponent(0),
      t = e.GetPlayerId(),
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t,
      i = e.GetRoleId();
    return (
      (this.ion = e.GetRoleConfig().WeaponType),
      (this.aCo = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i, t)),
      this.aCo &&
        EventSystem_1.EventSystem.AddWithTarget(
          this.aCo,
          EventDefine_1.EEventName.RoleRefreshAttribute,
          this.RefreshAttributeGrowHandle,
        ),
      !0
    );
  }
  OnEnd() {
    return (
      this.aCo &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.aCo,
          EventDefine_1.EEventName.RoleRefreshAttribute,
          this.RefreshAttributeGrowHandle,
        ),
      !0
    );
  }
  ron() {
    this.Xte.AddTag(1098729489), this.Xte.AddTag(-8769906);
  }
  oon(t) {
    for (let e = 1; e < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; e++) {
      var i;
      t.has(e) && ((i = t.get(e)), this.$te.SetBaseValue(e, i));
    }
  }
  RefreshGrowAttribute(e) {
    this.m1t.UpdateSysGrowBuff(e);
  }
  GetWeaponType() {
    return this.ion || 0;
  }
  GetSkillLevelBySkillInfoId(e) {
    return this.aCo
      ? this.aCo
          .GetSkillData()
          .GetReferencedSkillLevel(
            e,
            RoleSkillData_1.ERoleSkillReferenceType.SkillInfo,
          )
      : 0;
  }
  GetSkillLevelByBuffId(e) {
    return this.aCo
      ? this.aCo
          .GetSkillData()
          .GetReferencedSkillLevel(
            e,
            RoleSkillData_1.ERoleSkillReferenceType.Buff,
          )
      : 0;
  }
  GetSkillLevelByDamageId(e) {
    return this.aCo
      ? this.aCo
          .GetSkillData()
          .GetReferencedSkillLevel(
            e,
            RoleSkillData_1.ERoleSkillReferenceType.Damage,
          )
      : 0;
  }
};
(RoleGrowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(86)],
  RoleGrowComponent,
)),
  (exports.RoleGrowComponent = RoleGrowComponent);
//# sourceMappingURL=RoleGrowComponent.js.map
