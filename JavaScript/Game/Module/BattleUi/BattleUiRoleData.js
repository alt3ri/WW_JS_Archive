"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiRoleData = void 0);
const UE = require("ue"),
  RoleBattleViewInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleBattleViewInfoById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const elementAttributeIds = [
  void 0,
  EAttributeId.Proto_ElementPower1,
  EAttributeId.Proto_ElementPower2,
  EAttributeId.Proto_ElementPower3,
  EAttributeId.Proto_ElementPower4,
  EAttributeId.Proto_ElementPower5,
  EAttributeId.Proto_ElementPower6,
];
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
      (this.ElementType = void 0),
      (this.ElementConfig = void 0),
      (this.ElementColor = void 0),
      (this.ElementLinearColor = void 0),
      (this.UltimateSkillColor = void 0),
      (this.CreatureRoleId = void 0),
      (this.RoleConfig = void 0),
      (this.RoleBattleViewInfo = void 0),
      (this.QteCanUse = !1),
      (this.jQe = []),
      (this.WQe = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiElementEnergyChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.KQe = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiElementHideTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.QQe = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiDeadTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.XQe = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.$Qe = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiQteCdTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.YQe = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiUseQteTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.JQe = (t, i) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiConcertoEnableTagChanged,
          this.EntityHandle.Id,
          t,
          i,
        );
      }),
      (this.zQe = (t, i) => {
        this.IsCurEntity &&
          t !== i &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAimStateChanged,
          );
      }),
      (this.ZQe = (t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiShieldChanged,
          this.EntityHandle.Id,
        );
      }),
      (this.YKe = (t, i, e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiHealthChanged,
          this.EntityHandle.Id,
        );
      }),
      (this.m2 = (t, i, e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiLevelChanged,
          this.EntityHandle.Id,
        );
      });
  }
  Init(t, i) {
    (this.EntityHandle = t),
      (this.IsCurEntity = i),
      (this.AttributeComponent = t.Entity.GetComponent(156)),
      (this.GameplayTagComponent = t.Entity.GetComponent(185)),
      (this.RoleElementComponent = t.Entity.GetComponent(79)),
      (this.BuffComponent = t.Entity.GetComponent(157)),
      (this.ShieldComponent = t.Entity.GetComponent(64)),
      (this.RoleQteComponent = t.Entity.GetComponent(86)),
      (this.ElementType = this.RoleElementComponent.RoleElementType),
      (this.ElementConfig =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
          this.ElementType,
        )),
      (this.ElementColor = UE.Color.FromHex(this.ElementConfig.ElementColor)),
      (this.ElementLinearColor = new UE.LinearColor(this.ElementColor)),
      (this.UltimateSkillColor = UE.Color.FromHex(
        this.ElementConfig.UltimateSkillColor,
      ));
    i = t.Entity.GetComponent(0);
    (this.CreatureRoleId = i?.GetRoleId()),
      (this.RoleConfig = i?.GetRoleConfig()),
      this.RoleConfig &&
        2 === this.RoleConfig.RoleType &&
        (this.RoleBattleViewInfo =
          RoleBattleViewInfoById_1.configRoleBattleViewInfoById.GetConfig(
            this.RoleConfig.Id,
          )),
      this.eXe();
  }
  OnChangeRole(t) {
    this.IsCurEntity = t;
  }
  Clear() {
    this.tXe(),
      (this.AttributeComponent = void 0),
      (this.GameplayTagComponent = void 0),
      (this.RoleElementComponent = void 0),
      (this.BuffComponent = void 0),
      (this.ShieldComponent = void 0),
      (this.ElementType = void 0),
      (this.ElementConfig = void 0),
      (this.ElementColor = void 0),
      (this.ElementLinearColor = void 0),
      (this.UltimateSkillColor = void 0),
      (this.CreatureRoleId = void 0),
      (this.RoleConfig = void 0),
      (this.RoleBattleViewInfo = void 0);
  }
  eXe() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.EntityHandle.Entity,
      EventDefine_1.EEventName.CharOnElementEnergyChanged,
      this.WQe,
    );
    for (const i of BattleUiRoleData.HideElementTagList) this.iXe(i, this.KQe);
    this.iXe(1008164187, this.QQe),
      this.iXe(166024319, this.XQe),
      this.iXe(-1732116741, this.$Qe),
      this.iXe(1674960297, this.YQe),
      this.iXe(-426018619, this.JQe),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        this.zQe,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharShieldChange,
        this.ZQe,
      );
    var t = this.AttributeComponent;
    t.AddListener(EAttributeId.Proto_Life, this.YKe),
      t.AddListener(EAttributeId.Tkn, this.YKe),
      t.AddListener(EAttributeId.Proto_Lv, this.m2);
  }
  tXe() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.EntityHandle.Entity,
      EventDefine_1.EEventName.CharOnElementEnergyChanged,
      this.WQe,
    );
    for (const i of this.jQe) i?.EndTask();
    (this.jQe.length = 0),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        this.zQe,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.EntityHandle.Entity,
        EventDefine_1.EEventName.CharShieldChange,
        this.ZQe,
      );
    var t = this.AttributeComponent;
    t.RemoveListener(EAttributeId.Proto_Life, this.YKe),
      t.RemoveListener(EAttributeId.Tkn, this.YKe),
      t.RemoveListener(EAttributeId.Proto_Lv, this.m2);
  }
  iXe(t, i) {
    t = this.GameplayTagComponent.ListenForTagAddOrRemove(t, i);
    t && this.jQe.push(t);
  }
  GetTopButtonVisible() {
    return !this.RoleBattleViewInfo || this.RoleBattleViewInfo.TopButtonVisible;
  }
  GetElementAttributeId() {
    return elementAttributeIds[this.ElementType ?? 0];
  }
  IsPhantom() {
    return 2 === this.RoleConfig?.RoleType;
  }
}
(exports.BattleUiRoleData = BattleUiRoleData).HideElementTagList = [
  -1623647531, 666997186, -1987078323, -1751370752, 1522720219, 33752370,
];
//# sourceMappingURL=BattleUiRoleData.js.map
