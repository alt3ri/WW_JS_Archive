"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldConfig = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
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
    "/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo";
class WorldConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.tsr = void 0),
      (this.isr = void 0),
      (this.osr = void 0),
      (this.rsr = void 0),
      (this.nsr = void 0),
      (this.ssr = void 0),
      (this.asr = void 0),
      (this.hsr = void 0),
      (this.lsr = void 0),
      (this._sr = void 0);
  }
  OnInit() {
    this.usr = new Map();
    var i = UE.DataTableUtil_C.LoadAllSkillMontages(
      GlobalData_1.GlobalData.World,
    );
    for (let t = 0; t < i.Num(); ++t) {
      var e = i.Get(t);
      if (0 !== e.CharacterPath.length) {
        let t = this.usr.get(e.CharacterPath);
        t || ((t = new Map()), this.usr.set(e.CharacterPath, t)),
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
    if (!this.tsr) {
      this.tsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        ROLE_COMMON_SKILLINFO_PATH,
        UE.DataTable,
      );
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.tsr, t),
          (0, puerts_1.$unref)(t));
      this.isr = new Array();
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t);
        this.isr.push(e.toString());
      }
    }
    return this.tsr;
  }
  GetRoleCommonSkillRowNames() {
    return this.isr || this.GetRoleCommonSkillInfo(), this.isr;
  }
  GetMonsterCommonSkillInfo() {
    if (!this.osr) {
      this.osr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        MOMSTER_COMMON_SKILLINFO_PATH,
        UE.DataTable,
      );
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.osr, t),
          (0, puerts_1.$unref)(t));
      this.rsr = new Array();
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t);
        this.rsr.push(e.toString());
      }
    }
    return this.osr;
  }
  GetMonsterCommonSkillRowNames() {
    return this.rsr || this.GetMonsterCommonSkillInfo(), this.rsr;
  }
  GetVisionCommonSkillInfo() {
    if (!this.nsr) {
      this.nsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        VISION_COMMON_SKILLINFO_PATH,
        UE.DataTable,
      );
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.nsr, t),
          (0, puerts_1.$unref)(t));
      this.ssr = new Array();
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t);
        this.ssr.push(e.toString());
      }
    }
    return this.nsr;
  }
  GetVisionCommonSkillRowNames() {
    return this.ssr || this.GetVisionCommonSkillInfo(), this.ssr;
  }
  GetCaughtDataInfo() {
    return (
      this.lsr ||
        (this.lsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          CAUGHT_DATA_PATH,
          UE.DataTable,
        )),
      this.lsr
    );
  }
  GetCommonBulletData() {
    return (
      this.asr ||
        (this.asr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          COMMON_BULLET_PATH,
          UE.DataTable,
        )),
      this.asr
    );
  }
  GetCommonHitEffectData() {
    return (
      this.hsr ||
        (this.hsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          COMMON_HIT_EFFECT_PATH,
          UE.DataTable,
        )),
      this.hsr
    );
  }
  GetSkillMontage(t, i) {
    if (this.usr) {
      t = this.usr.get(t);
      if (t) return t.get(i);
    }
  }
  GetMontageMap(t) {
    if (this.usr) return this.usr.get(t);
  }
  GetCharacterFightInfo(t) {
    return (
      this._sr ||
        (this._sr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          CHARACTERFIGHTINFO_DATA_PATH,
          UE.DataTable,
        )),
      DataTableUtil_1.DataTableUtil.GetDataTableRow(this._sr, t)
    );
  }
  ClearCommonSkillData() {
    (this.tsr = void 0),
      (this.osr = void 0),
      (this.asr = void 0),
      (this.nsr = void 0),
      (this.lsr = void 0),
      (this._sr = void 0);
  }
  GetRoleConfig(t) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
  }
  OnClear() {
    return this.ClearCommonSkillData(), !0;
  }
}
exports.WorldConfig = WorldConfig;
//# sourceMappingURL=WorldConfig.js.map
