"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldConfig = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  LockOnConfigById_1 = require("../../../Core/Define/ConfigQuery/LockOnConfigById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
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
      (this.nGn = void 0),
      (this.sGn = void 0);
  }
  OnInit() {
    return !0;
  }
  GetLockOnConfig(t) {
    return LockOnConfigById_1.configLockOnConfigById.GetConfig(t);
  }
  GetRoleCommonSkillInfo() {
    return (
      this.zsr ||
        ((this.zsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          ROLE_COMMON_SKILLINFO_PATH,
          UE.DataTable,
        )),
        (this.Zsr = new Array()),
        this.zsr &&
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            this.zsr,
            this.Zsr,
          )),
      this.zsr
    );
  }
  GetRoleCommonSkillRowNames() {
    return this.Zsr || this.GetRoleCommonSkillInfo(), this.Zsr;
  }
  GetMonsterCommonSkillInfo() {
    return (
      this.ear ||
        ((this.ear = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          MOMSTER_COMMON_SKILLINFO_PATH,
          UE.DataTable,
        )),
        (this.tar = new Array()),
        this.ear &&
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            this.ear,
            this.tar,
          )),
      this.ear
    );
  }
  GetMonsterCommonSkillRowNames() {
    return this.tar || this.GetMonsterCommonSkillInfo(), this.tar;
  }
  GetVisionCommonSkillInfo() {
    return (
      this.iar ||
        ((this.iar = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          VISION_COMMON_SKILLINFO_PATH,
          UE.DataTable,
        )),
        (this.oar = new Array()),
        this.iar &&
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            this.iar,
            this.oar,
          )),
      this.iar
    );
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
    if (
      !this.nGn &&
      ((this.nGn = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        QTE_TAG_DATA_PATH,
        UE.DataTable,
      )),
      (this.sGn = new Map()),
      this.nGn)
    ) {
      var t,
        i,
        e = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(
        this.nGn,
        e,
      );
      for (const o of e)
        void 0 !== o[0] &&
          void 0 !== o[1] &&
          ((t = o[0]), "None" !== (i = o[1]).QteTag.TagName) &&
          (this.sGn.has(i.QteTag.TagId)
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("Config", 29, "DT_QteTag重复注册QTE标签", [
                "tag",
                i.QteTag.TagName,
              ])
            : this.sGn.set(i.QteTag.TagId, t));
    }
    return this.nGn;
  }
  GetQteTagDataMap() {
    return this.sGn || this.GetQteTagDataTable(), this.sGn;
  }
}
exports.WorldConfig = WorldConfig;
//# sourceMappingURL=WorldConfig.js.map
