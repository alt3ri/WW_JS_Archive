"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldConfig = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  LockOnConfigById_1 = require("../../../Core/Define/ConfigQuery/LockOnConfigById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ROLE_COMMON_SKILLINFO_PATH =
    "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo",
  MOMSTER_COMMON_SKILLINFO_PATH =
    "/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo",
  VISION_COMMON_SKILLINFO_PATH =
    "/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo",
  COMMON_BULLET_PATH =
    "/Game/Aki/Data/Fight/DT_CommonNewBulletDataMain.DT_CommonNewBulletDataMain",
  COMMON_HIT_EFFECT_PATH =
    "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect",
  CAUGHT_DATA_PATH = "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo",
  CHARACTERFIGHTINFO_DATA_PATH =
    "/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo",
  QTE_TAG_DATA_PATH = "/Game/Aki/Data/Fight/DT_QteTag.DT_QteTag";
class WorldConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.zsr = void 0),
      (this.Zsr = void 0),
      (this.ear = void 0),
      (this.tar = void 0),
      (this.iar = void 0),
      (this.oar = void 0),
      (this.rar = void 0),
      (this.nar = void 0),
      (this.sar = void 0),
      (this.aar = void 0),
      (this.har = void 0),
      (this.Yqn = void 0),
      (this.Jqn = void 0);
  }
  OnInit() {
    this.har = new Map();
    var i = UE.DataTableUtil_C.LoadAllSkillMontages(
      GlobalData_1.GlobalData.World,
    );
    for (let t = 0; t < i.Num(); ++t) {
      var e = i.Get(t);
      if (0 !== e.CharacterPath.length) {
        let t = this.har.get(e.CharacterPath);
        t || ((t = new Map()), this.har.set(e.CharacterPath, t)),
          0 < e.CommonAnim.ToAssetPathName().length &&
          "None" !== e.CommonAnim.ToAssetPathName()
            ? t.set(e.MontageName, e.CommonAnim)
            : 0 < e.BaseAnim.ToAssetPathName().length &&
              "None" !== e.BaseAnim.ToAssetPathName() &&
              t.set(e.MontageName, e.BaseAnim);
      }
    }
    return !0;
  }
  GetLockOnConfig(t) {
    return LockOnConfigById_1.configLockOnConfigById.GetConfig(t);
  }
  GetRoleCommonSkillInfo() {
    if (!this.zsr) {
      this.zsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        ROLE_COMMON_SKILLINFO_PATH,
        UE.DataTable,
      );
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.zsr, t),
          (0, puerts_1.$unref)(t));
      this.Zsr = new Array();
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t);
        this.Zsr.push(e.toString());
      }
    }
    return this.zsr;
  }
  GetRoleCommonSkillRowNames() {
    return this.Zsr || this.GetRoleCommonSkillInfo(), this.Zsr;
  }
  GetMonsterCommonSkillInfo() {
    if (!this.ear) {
      this.ear = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        MOMSTER_COMMON_SKILLINFO_PATH,
        UE.DataTable,
      );
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.ear, t),
          (0, puerts_1.$unref)(t));
      this.tar = new Array();
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t);
        this.tar.push(e.toString());
      }
    }
    return this.ear;
  }
  GetMonsterCommonSkillRowNames() {
    return this.tar || this.GetMonsterCommonSkillInfo(), this.tar;
  }
  GetVisionCommonSkillInfo() {
    if (!this.iar) {
      this.iar = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        VISION_COMMON_SKILLINFO_PATH,
        UE.DataTable,
      );
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.iar, t),
          (0, puerts_1.$unref)(t));
      this.oar = new Array();
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t);
        this.oar.push(e.toString());
      }
    }
    return this.iar;
  }
  GetVisionCommonSkillRowNames() {
    return this.oar || this.GetVisionCommonSkillInfo(), this.oar;
  }
  GetCaughtDataInfo() {
    return (
      this.sar ||
        (this.sar = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          CAUGHT_DATA_PATH,
          UE.DataTable,
        )),
      this.sar
    );
  }
  GetCommonBulletData() {
    return (
      this.rar ||
        (this.rar = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          COMMON_BULLET_PATH,
          UE.DataTable,
        )),
      this.rar
    );
  }
  GetCommonHitEffectData() {
    return (
      this.nar ||
        (this.nar = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          COMMON_HIT_EFFECT_PATH,
          UE.DataTable,
        )),
      this.nar
    );
  }
  GetSkillMontage(t, i) {
    if (this.har) {
      t = this.har.get(t);
      if (t) return t.get(i);
    }
  }
  GetMontageMap(t) {
    if (this.har) return this.har.get(t);
  }
  GetCharacterFightInfo(t) {
    return (
      this.aar ||
        (this.aar = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          CHARACTERFIGHTINFO_DATA_PATH,
          UE.DataTable,
        )),
      DataTableUtil_1.DataTableUtil.GetDataTableRow(this.aar, t)
    );
  }
  ClearCommonSkillData() {
    (this.zsr = void 0),
      (this.ear = void 0),
      (this.rar = void 0),
      (this.iar = void 0),
      (this.sar = void 0),
      (this.aar = void 0);
  }
  GetRoleConfig(t) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
  }
  OnClear() {
    return this.ClearCommonSkillData(), !0;
  }
  GetQteTagDataTable() {
    if (!this.Yqn) {
      this.Yqn = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        QTE_TAG_DATA_PATH,
        UE.DataTable,
      );
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.Yqn, t),
          (0, puerts_1.$unref)(t));
      this.Jqn = new Map();
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t).toString(),
          o = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Yqn, e);
        "None" !== o.QteTag.TagName &&
          (this.Jqn.has(o.QteTag.TagId)
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("Config", 29, "DT_QteTag重复注册QTE标签", [
                "tag",
                o.QteTag.TagName,
              ])
            : this.Jqn.set(o.QteTag.TagId, e));
      }
    }
    return this.Yqn;
  }
  GetQteTagDataMap() {
    return this.Jqn || this.GetQteTagDataTable(), this.Jqn;
  }
}
exports.WorldConfig = WorldConfig;
//# sourceMappingURL=WorldConfig.js.map
