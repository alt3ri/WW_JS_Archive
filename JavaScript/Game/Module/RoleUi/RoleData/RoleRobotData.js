"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleRobotData = void 0);
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AttributeModel_1 = require("../../Attribute/AttributeModel"),
  PhantomTrialBattleData_1 = require("../../Phantom/PhantomBattle/Data/PhantomTrialBattleData"),
  WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
  SkillNodeDataInfo_1 = require("./Module/DataInfo/SkillNodeDataInfo"),
  RoleDataBase_1 = require("./RoleDataBase");
class RoleRobotData extends RoleDataBase_1.RoleDataBase {
  constructor(a) {
    super(a), (this.r_o = void 0), this.SetDefaultData();
  }
  SetDefaultData() {
    this.n_o(), this.s_o(), this.a_o(), this.h_o(), this.l_o(), this.Cbl();
  }
  n_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
        this.Id,
      ),
      e = this.GetLevelData(),
      t = (e.SetLevel(a.Level), this.GetRoleConfig());
    for (const r of ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachList(
      t.BreachId,
    ))
      if (a.Level <= r.MaxLevel) {
        e.SetBreachLevel(r.BreachLevel);
        break;
      }
  }
  s_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
        this.Id,
      ),
      e = this.GetSkillData(),
      t = this.GetRoleConfig().SkillId,
      r = this.GetRoleId(),
      o =
        ModelManager_1.ModelManager.RoleModel.ClientCheckRoleIsUpgradeLightMainRole(
          r,
        );
    for (const g of e.GetSkillList()) {
      var i = this.__o(g.Id),
        i = i < a.UnlockSkillLevel ? i : a.UnlockSkillLevel,
        n =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndSkillId(
            t,
            g.Id,
          );
      (n || o) &&
        (3 === n?.NodeType
          ? e.SetSkillLevel(g.Id, 0)
          : e.SetSkillLevel(g.Id, i),
        e.SetSkillReferenceMapBySkillId(g.Id));
    }
    var s = [];
    for (const h of a.UnlockSkillNodeList) {
      var l =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(
            t,
            h,
          ),
        _ = l?.NodeType;
      (4 !== _ && 3 !== _) ||
        s.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(l.Id, !0, l.SkillId));
    }
    0 < s.length && e.SetSkillNodeStateData(s);
  }
  __o(a) {
    (a = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigList(a),
    )),
      a.sort((a, e) => a.Id - e.Id),
      (a = a[a.length - 1]);
    return a.SkillId;
  }
  a_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
      this.Id,
    );
    this.GetResonanceData().SetResonantChainGroupIndex(a.ResonanceLevel);
  }
  h_o() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
      this.Id,
    );
    (this.r_o = new WeaponTrialData_1.WeaponTrialData()),
      this.r_o.SetTrialId(a.TrailWeapon),
      this.r_o.SetRoleId(this.Id);
  }
  l_o() {
    var t = this.GetPhantomData(),
      r =
        (t.SetIsTrial(!0),
        ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id));
    for (let a = 0, e = r.PhantomEquipList.length; a < e; ++a) {
      var o = r.PhantomEquipList[a],
        i =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrialPhantomPropConfig(
            o.Item2,
          ),
        n = new PhantomTrialBattleData_1.PhantomTrialBattleData();
      n.SetIncId(
        PhantomTrialBattleData_1.PhantomTrialBattleData.GenerateLocalUniqueId(
          this.GetRoleId(),
          a,
        ),
      ),
        n.SetConfigId(o.Item1),
        n.SetPhantomLevel(i.Level),
        n.SetSlotIndex(a),
        n.SetFetterGroupId(i.FetterGroupId);
      for (const g of i.MainProps) {
        var s =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(
              g,
            ),
          l =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(
              i.MainPropGrowth,
              i.Level,
            ),
          l = AttributeModel_1.TipsDataTool.GetAttributeValue(s.Value, l, !1);
        n.SetMainPropValue(s.Id, l, s.IsRatio);
      }
      for (const h of i.SubPropList) {
        var _ =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(
            h,
          );
        n.SetSubPropValue(_.Id, _.Value, _.IsRatio);
      }
      t.SetDataMap(a, n),
        ModelManager_1.ModelManager.PhantomBattleModel.SetRobotPhantomData(
          n.GetIncrId(),
          n,
        );
    }
  }
  Cbl() {
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
      this.Id,
    );
    0 < a.RoleSkin && this.SetRoleSkinId(a.RoleSkin);
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
    return this.r_o;
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
//# sourceMappingURL=RoleRobotData.js.map
