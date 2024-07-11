"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiRoleData = void 0);
const UE = require("ue"),
  RoleBattleViewInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleBattleViewInfoById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
class BattleUiRoleData {
  constructor() {
    (this.IsCurEntity = !1),
      (this.EntityHandle = void 0),
      (this.AttributeComponent = void 0),
      (this.GameplayTagComponent = void 0),
      (this.RoleElementComponent = void 0),
      (this.BuffComponent = void 0),
      (this.ShieldComponent = void 0),
      (this.RoleQteComponent = void 0),
      (this.CreatureDataComponent = void 0),
      (this.ElementType = void 0),
      (this.ElementConfig = void 0),
      (this.ElementColor = void 0),
      (this.ElementLinearColor = void 0),
      (this.UltimateSkillColor = void 0),
      (this.CreatureRoleId = void 0),
      (this.RoleConfig = void 0),
      (this.RoleBattleViewInfo = void 0),
      (this.QteCdTagId = 0),
      (this.Mia = void 0),
      (this.i$e = []),
      (this.o$e = (t, i, s) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiElementEnergyChanged,
          this.EntityHandle.Id,
        );
      }),
      (this.r$e = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiElementHideTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.n$e = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiDeadTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.s$e = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.a$e = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiQteCdTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.h$e = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiUseQteTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.l$e = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiConcertoEnableTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this._$e = (t, i) => {
        this.IsCurEntity &&
          t !== i &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAimStateChanged,
          );
      }),
      (this.u$e = (t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiShieldChanged,
          this.EntityHandle.Id,
        );
      }),
      (this.Sia = () => {
        this.Eia();
      }),
      (this.hXe = (t, i, s) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiHealthChanged,
          this.EntityHandle.Id,
        );
      }),
      (this.m2 = (t, i, s) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiLevelChanged,
          this.EntityHandle.Id,
        );
      });
  }
  Init(t, i) {
    (this.EntityHandle = t),
      (this.IsCurEntity = i),
      (this.AttributeComponent = t.Entity.GetComponent(158)),
      (this.GameplayTagComponent = t.Entity.GetComponent(188)),
      (this.RoleElementComponent = t.Entity.GetComponent(81)),
      (this.BuffComponent = t.Entity.GetComponent(159)),
      (this.ShieldComponent = t.Entity.GetComponent(66)),
      (this.RoleQteComponent = t.Entity.GetComponent(88)),
      (this.CreatureDataComponent = t.Entity.GetComponent(0)),
      (this.ElementType = this.RoleElementComponent.RoleElementType),
      (this.ElementConfig =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
          this.ElementType,
        )),
      (this.ElementColor = UE.Color.FromHex(this.ElementConfig.ElementColor)),
      (this.ElementLinearColor = new UE.LinearColor(this.ElementColor)),
      (this.UltimateSkillColor = UE.Color.FromHex(
        this.ElementConfig.UltimateSkillColor,
      )),
      (this.CreatureRoleId = this.CreatureDataComponent?.GetRoleId()),
      (this.RoleConfig = this.CreatureDataComponent?.GetRoleConfig()),
      this.RoleConfig &&
        2 === this.RoleConfig.RoleType &&
        (this.RoleBattleViewInfo =
          RoleBattleViewInfoById_1.configRoleBattleViewInfoById.GetConfig(
            this.RoleConfig.Id,
          )),
      this.c$e();
  }
  OnChangeRole(t) {
    this.IsCurEntity = t;
  }
  Clear() {
    this.m$e(),
      (this.AttributeComponent = void 0),
      (this.GameplayTagComponent = void 0),
      (this.RoleElementComponent = void 0),
      (this.BuffComponent = void 0),
      (this.ShieldComponent = void 0),
      (this.RoleQteComponent = void 0),
      (this.CreatureDataComponent = void 0),
      (this.ElementType = void 0),
      (this.ElementConfig = void 0),
      (this.ElementColor = void 0),
      (this.ElementLinearColor = void 0),
      (this.UltimateSkillColor = void 0),
      (this.CreatureRoleId = void 0),
      (this.RoleConfig = void 0),
      (this.RoleBattleViewInfo = void 0),
      (this.QteCdTagId = 0);
  }
  c$e() {
    for (const i of BattleUiRoleData.HideElementTagList) this.d$e(i, this.r$e);
    this.d$e(1008164187, this.n$e),
      this.d$e(166024319, this.s$e),
      this.d$e(1674960297, this.h$e),
      this.d$e(-426018619, this.l$e),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        this._$e,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharShieldChange,
        this.u$e,
      ),
      this.Eia(),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharQteTagRowNameChanged,
        this.Sia,
      );
    var t = this.AttributeComponent;
    t.AddListener(EAttributeId.Proto_Life, this.hXe),
      t.AddListener(EAttributeId.e5n, this.hXe),
      t.AddListener(EAttributeId.Proto_Lv, this.m2),
      t.AddListener(EAttributeId.Proto_ElementEnergy, this.o$e),
      t.AddListener(EAttributeId.Proto_ElementEnergyMax, this.o$e);
  }
  m$e() {
    for (const i of this.i$e) i?.EndTask();
    (this.i$e.length = 0),
      this.Mia && (this.Mia.EndTask(), (this.Mia = void 0)),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        this._$e,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharShieldChange,
        this.u$e,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharQteTagRowNameChanged,
        this.Sia,
      );
    var t = this.AttributeComponent;
    t.RemoveListener(EAttributeId.Proto_Life, this.hXe),
      t.RemoveListener(EAttributeId.e5n, this.hXe),
      t.RemoveListener(EAttributeId.Proto_Lv, this.m2),
      t.RemoveListener(EAttributeId.Proto_ElementEnergy, this.o$e),
      t.RemoveListener(EAttributeId.Proto_ElementEnergyMax, this.o$e);
  }
  d$e(t, i) {
    t = this.GameplayTagComponent.ListenForTagAddOrRemove(t, i);
    t && this.i$e.push(t);
  }
  Eia() {
    var t = this.RoleQteComponent?.GetQteTagData()?.NoTag.TagId ?? 0;
    t !== this.QteCdTagId &&
      (this.Mia && (this.Mia.EndTask(), (this.Mia = void 0)),
      (this.QteCdTagId = t),
      this.QteCdTagId) &&
      (this.Mia = this.GameplayTagComponent.ListenForTagAddOrRemove(
        t,
        this.a$e,
      ));
  }
  GetTopButtonVisible() {
    return !this.RoleBattleViewInfo || this.RoleBattleViewInfo.TopButtonVisible;
  }
  GetElementAttributePercent() {
    var t, i;
    return !this.RoleElementComponent ||
      ((t = this.RoleElementComponent.RoleElementEnergy),
      (i = this.RoleElementComponent.RoleElementEnergyMax) <= 0)
      ? 0
      : t / i;
  }
  IsPhantom() {
    return 2 === this.RoleConfig?.RoleType;
  }
}
(exports.BattleUiRoleData = BattleUiRoleData).HideElementTagList = [
  -1623647531, 666997186, -1987078323, -1751370752, 1522720219, 33752370,
];
//# sourceMappingURL=BattleUiRoleData.js.map
