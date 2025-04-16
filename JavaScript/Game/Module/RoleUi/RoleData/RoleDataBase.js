"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleDataBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  FormationPropertyById_1 = require("../../../../Core/Define/ConfigQuery/FormationPropertyById"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AttrListScrollData_1 = require("../View/ViewData/AttrListScrollData"),
  RoleAttributeData_1 = require("./Module/RoleAttributeData"),
  RoleAudioData_1 = require("./Module/RoleAudioData"),
  RoleFavorData_1 = require("./Module/RoleFavorData"),
  RoleLevelData_1 = require("./Module/RoleLevelData"),
  RolePhantomData_1 = require("./Module/RolePhantomData"),
  RoleResonanceData_1 = require("./Module/RoleResonanceData"),
  RoleSkillData_1 = require("./Module/RoleSkillData");
class RoleDataBase {
  constructor(e) {
    (this.RoleModelConfig = void 0),
      (this.t_o = new Map()),
      (this.i_o = [
        RoleLevelData_1.RoleLevelData,
        RoleAttributeData_1.RoleAttributeData,
        RoleSkillData_1.RoleSkillData,
        RoleResonanceData_1.RoleResonanceData,
        RolePhantomData_1.RolePhantomData,
        RoleAudioData_1.RoleAudioData,
        RoleFavorData_1.RoleFavorData,
      ]),
      (this.BIl = -1),
      (this.SortAttrList = (e, t) => {
        var a = 0 !== e.Priority,
          r = 0 !== t.Priority;
        return a && r ? e.Priority - t.Priority : a ? -1 : r ? 1 : e.Id - t.Id;
      }),
      (this.Id = e),
      (this.Name = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
        this.GetRoleConfig().Name,
      )),
      this.o_o();
  }
  o_o() {
    var e = this.GetRoleId();
    for (const t of this.i_o) this.t_o.set(t, new t(e));
  }
  GetLevelData() {
    return this.t_o.get(RoleLevelData_1.RoleLevelData);
  }
  GetAttributeData() {
    return this.t_o.get(RoleAttributeData_1.RoleAttributeData);
  }
  GetSkillData() {
    return this.t_o.get(RoleSkillData_1.RoleSkillData);
  }
  GetResonanceData() {
    return this.t_o.get(RoleResonanceData_1.RoleResonanceData);
  }
  GetPhantomData() {
    return this.t_o.get(RolePhantomData_1.RolePhantomData);
  }
  GetAudioData() {
    return this.t_o.get(RoleAudioData_1.RoleAudioData);
  }
  GetFavorData() {
    return this.t_o.get(RoleFavorData_1.RoleFavorData);
  }
  SetRoleSkinId(e) {
    this.BIl = e;
  }
  GetRoleSkinId() {
    return this.BIl <= 0 ? this.GetRoleConfig().SkinId : this.BIl;
  }
  GetElementInfo() {
    var e = this.GetRoleConfig();
    return ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
      e.ElementId,
    );
  }
  GetQualityConfig() {
    var e = this.GetRoleConfig();
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
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
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
    let a = new Array();
    var e =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList();
    if (e) {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
          ParamType: 0,
          OnlyMyRole: !0,
        }),
        r = t ? t.EntityHandle.Entity.GetComponent(171) : void 0;
      for (const i of e)
        if (i.IsShow) {
          let e = 0,
            t = 0;
          t = r
            ? ((e = r.GetBaseValue(i.Id) ?? 0),
              r.GetCurrentValue(i.Id) - e ?? 0)
            : ((o = this.GetAttributeData()),
              (e = o.GetRoleBaseAttr(i.Id)),
              o.GetRoleAddAttr(i.Id));
          var o = new AttrListScrollData_1.AttrListScrollData(
            i.Id,
            e,
            t,
            i.Priority,
            !1,
            0,
          );
          a.push(o);
        }
      t = this.y3l();
      (a = a.concat(t)).sort(this.SortAttrList);
    }
    return a;
  }
  y3l() {
    var e,
      t,
      a = FormationPropertyById_1.configFormationPropertyById.GetConfig(10);
    return ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
      a.Condition.toString(),
      void 0,
    )
      ? ((e = new Array()),
        (t = ModelManager_1.ModelManager.FormationAttributeModel.GetData(10)),
        (a =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            a.PropertyIndex,
          )),
        t &&
          ((t = new AttrListScrollData_1.AttrListScrollData(
            a.Id,
            t.BaseMax / 100,
            0,
            a.Priority,
            !1,
            0,
          )),
          e.push(t)),
        e)
      : [];
  }
  GetShowAttributeValueById(e) {
    var t,
      a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
        ParamType: 0,
        OnlyMyRole: !0,
      }),
      a = a ? a.EntityHandle?.Entity?.GetComponent(171) : void 0;
    let r = 0;
    return (
      a
        ? 0 === (r = a.GetCurrentValue(e)) &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 43, "角色界面获取实体属性值为0", [
            "id",
            e,
          ])
        : ((t = (a = this.GetAttributeData()).GetRoleBaseAttr(e)),
          (a = a.GetRoleAddAttr(e)),
          0 === (r = t + a) &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              43,
              "角色界面从服务器获取的属性值为0",
              ["id", e],
              ["baseAttr", t],
              ["addAttr", a],
            )),
      r
    );
  }
  GetBaseAttributeValueById(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
        ParamType: 0,
        OnlyMyRole: !0,
      }),
      t = t ? t.EntityHandle.Entity.GetComponent(171) : void 0;
    let a = 0;
    return (a = t
      ? t.GetBaseValue(e)
      : this.GetAttributeData().GetRoleBaseAttr(e));
  }
  TryRemoveNewFlag() {
    return !1;
  }
}
exports.RoleDataBase = RoleDataBase;
//# sourceMappingURL=RoleDataBase.js.map
