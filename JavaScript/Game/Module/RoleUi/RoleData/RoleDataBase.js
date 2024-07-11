"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleDataBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttrListScrollData_1 = require("../View/ViewData/AttrListScrollData");
const RoleAttributeData_1 = require("./Module/RoleAttributeData");
const RoleAudioData_1 = require("./Module/RoleAudioData");
const RoleFavorData_1 = require("./Module/RoleFavorData");
const RoleLevelData_1 = require("./Module/RoleLevelData");
const RolePhantomData_1 = require("./Module/RolePhantomData");
const RoleResonanceData_1 = require("./Module/RoleResonanceData");
const RoleSkillData_1 = require("./Module/RoleSkillData");
class RoleDataBase {
  constructor(e) {
    (this.RoleModelConfig = void 0),
      (this.n1o = new Map()),
      (this.s1o = [
        RoleLevelData_1.RoleLevelData,
        RoleAttributeData_1.RoleAttributeData,
        RoleSkillData_1.RoleSkillData,
        RoleResonanceData_1.RoleResonanceData,
        RolePhantomData_1.RolePhantomData,
        RoleAudioData_1.RoleAudioData,
        RoleFavorData_1.RoleFavorData,
      ]),
      (this.SortAttrList = (e, a) => {
        const t = e.Priority !== 0;
        const r = a.Priority !== 0;
        return t && r ? e.Priority - a.Priority : t ? -1 : r ? 1 : e.Id - a.Id;
      }),
      (this.Id = e),
      (this.Name = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
        this.GetRoleConfig().Name,
      )),
      this.a1o();
  }
  a1o() {
    const e = this.GetRoleId();
    for (const a of this.s1o) this.n1o.set(a, new a(e));
  }
  GetLevelData() {
    return this.n1o.get(RoleLevelData_1.RoleLevelData);
  }
  GetAttributeData() {
    return this.n1o.get(RoleAttributeData_1.RoleAttributeData);
  }
  GetSkillData() {
    return this.n1o.get(RoleSkillData_1.RoleSkillData);
  }
  GetResonanceData() {
    return this.n1o.get(RoleResonanceData_1.RoleResonanceData);
  }
  GetPhantomData() {
    return this.n1o.get(RolePhantomData_1.RolePhantomData);
  }
  GetAudioData() {
    return this.n1o.get(RoleAudioData_1.RoleAudioData);
  }
  GetFavorData() {
    return this.n1o.get(RoleFavorData_1.RoleFavorData);
  }
  GetElementInfo() {
    const e = this.GetRoleConfig();
    return ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
      e.ElementId,
    );
  }
  GetQualityConfig() {
    const e = this.GetRoleConfig();
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(
      e.QualityId,
    );
  }
  GetRoleConfig() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
      this.GetRoleId(),
    );
  }
  GetRoleSkillTreeConfig() {
    const e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
      this.GetRoleId(),
    );
    if (e)
      return ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeListByGroupId(
        e.SkillTreeGroupId,
      );
  }
  GetDataId() {
    return this.Id;
  }
  GetShowAttrList() {
    const t = new Array();
    const e =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList();
    if (e) {
      const a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
        this.Id,
        { ParamType: 0, OnlyMyRole: !0 },
      );
      const r = a ? a.EntityHandle.Entity.GetComponent(156) : void 0;
      for (const i of e)
        if (i.IsShow) {
          let e = 0;
          let a = 0;
          a = r
            ? ((e = r.GetBaseValue(i.Id) ?? 0),
              r.GetCurrentValue(i.Id) - e ?? 0)
            : ((o = this.GetAttributeData()),
              (e = o.GetRoleBaseAttr(i.Id)),
              o.GetRoleAddAttr(i.Id));
          var o = new AttrListScrollData_1.AttrListScrollData(
            i.Id,
            e,
            a,
            i.Priority,
            !1,
            0,
          );
          t.push(o);
        }
      t.sort(this.SortAttrList);
    }
    return t;
  }
  GetShowAttributeValueById(e) {
    let a;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
      ParamType: 0,
      OnlyMyRole: !0,
    });
    var t = t ? t.EntityHandle.Entity.GetComponent(156) : void 0;
    let r = 0;
    return (
      t
        ? (r = t.GetCurrentValue(e)) === 0 &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 44, "角色界面获取实体属性值为0", [
            "id",
            e,
          ])
        : ((a = (t = this.GetAttributeData()).GetRoleBaseAttr(e)),
          (t = t.GetRoleAddAttr(e)),
          (r = a + t) === 0 &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              44,
              "角色界面从服务器获取的属性值为0",
              ["id", e],
              ["baseAttr", a],
              ["addAttr", t],
            )),
      r
    );
  }
  GetBaseAttributeValueById(e) {
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
      ParamType: 0,
      OnlyMyRole: !0,
    });
    var a = a ? a.EntityHandle.Entity.GetComponent(156) : void 0;
    let t = 0;
    return (t = a
      ? a.GetBaseValue(e)
      : this.GetAttributeData().GetRoleBaseAttr(e));
  }
  TryRemoveNewFlag() {}
}
exports.RoleDataBase = RoleDataBase;
// # sourceMappingURL=RoleDataBase.js.map
