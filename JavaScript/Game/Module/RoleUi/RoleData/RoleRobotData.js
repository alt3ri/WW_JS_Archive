"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleRobotData = void 0);
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttributeModel_1 = require("../../Attribute/AttributeModel");
const PhantomTrialBattleData_1 = require("../../Phantom/PhantomBattle/Data/PhantomTrialBattleData");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
const SkillNodeDataInfo_1 = require("./Module/DataInfo/SkillNodeDataInfo");
const RoleDataBase_1 = require("./RoleDataBase");
class RoleRobotData extends RoleDataBase_1.RoleDataBase {
  constructor(a) {
    super(a), (this.h1o = void 0), this.SetDefaultData();
  }
  SetDefaultData() {
    this.l1o(), this._1o(), this.u1o(), this.c1o(), this.m1o();
  }
  l1o() {
    const a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
      this.Id,
    );
    const e = this.GetLevelData();
    const t = (e.SetLevel(a.Level), this.GetRoleConfig());
    for (const r of ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachList(
      t.BreachId,
    ))
      if (a.Level <= r.MaxLevel) {
        e.SetBreachLevel(r.BreachLevel);
        break;
      }
  }
  _1o() {
    const a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
      this.Id,
    );
    const e = this.GetSkillData();
    const t = this.GetRoleConfig().SkillId;
    for (const l of e.GetSkillList()) {
      var r = this.d1o(l.Id);
      var r = r < a.UnlockSkillLevel ? r : a.UnlockSkillLevel;
      const o =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndSkillId(
          t,
          l.Id,
        );
      o &&
        (o?.NodeType === 3
          ? e.SetSkillLevel(l.Id, 0)
          : e.SetSkillLevel(l.Id, r),
        e.SetSkillReferenceMapBySkillId(l.Id));
    }
    const n = [];
    for (const _ of a.UnlockSkillNodeList) {
      const i =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(
          t,
          _,
        );
      const s = i?.NodeType;
      (s !== 4 && s !== 3) ||
        n.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(i.Id, !0, i.SkillId));
    }
    n.length > 0 && e.SetSkillNodeStateData(n);
  }
  d1o(a) {
    (a = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigList(a),
    )),
      a.sort((a, e) => a.Id - e.Id),
      (a = a[a.length - 1]);
    return a.SkillId;
  }
  u1o() {
    const a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
      this.Id,
    );
    this.GetResonanceData().SetResonantChainGroupIndex(a.ResonanceLevel);
  }
  c1o() {
    const a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
      this.Id,
    );
    (this.h1o = new WeaponTrialData_1.WeaponTrialData()),
      this.h1o.SetTrialId(a.TrailWeapon),
      this.h1o.SetRoleId(this.Id);
  }
  m1o() {
    const t = this.GetPhantomData();
    const r =
      (t.SetIsTrial(!0),
      ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id));
    for (let a = 0, e = r.PhantomEquipList.length; a < e; ++a) {
      const o = r.PhantomEquipList[a];
      const n =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrialPhantomPropConfig(
          o.Item2,
        );
      const i = new PhantomTrialBattleData_1.PhantomTrialBattleData();
      i.SetIncId(
        PhantomTrialBattleData_1.PhantomTrialBattleData.GenerateLocalUniqueId(
          this.GetRoleId(),
          a,
        ),
      ),
        i.SetConfigId(o.Item1),
        i.SetPhantomLevel(n.Level),
        i.SetSlotIndex(a),
        i.SetFetterGroupId(n.FetterGroupId);
      for (const g of n.MainProps) {
        const s =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(
            g,
          );
        var l =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(
            n.MainPropGrowth,
            n.Level,
          );
        var l = AttributeModel_1.TipsDataTool.GetAttributeValue(s.Value, l, !1);
        i.SetMainPropValue(s.Id, l, s.IsRatio);
      }
      for (const f of n.SubPropList) {
        const _ =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(
            f,
          );
        i.SetSubPropValue(_.Id, _.Value, _.IsRatio);
      }
      t.SetDataMap(a, i),
        ModelManager_1.ModelManager.PhantomBattleModel.SetRobotPhantomData(
          i.GetIncrId(),
          i,
        );
    }
  }
  GetRoleId() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id)
      .ParentId;
  }
  IsTrialRole() {
    return !0;
  }
  GetName(a) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
      this.GetRoleConfig().Name,
    );
  }
  SetName(a) {
    this.Name = a;
  }
  CanChangeName() {
    return !1;
  }
  GetWeaponData() {
    return this.h1o;
  }
  IsOnlineRole() {
    return !1;
  }
  GetRoleCreateTime() {
    return 0;
  }
  GetIsNew() {
    return !1;
  }
}
exports.RoleRobotData = RoleRobotData;
// # sourceMappingURL=RoleRobotData.js.map
