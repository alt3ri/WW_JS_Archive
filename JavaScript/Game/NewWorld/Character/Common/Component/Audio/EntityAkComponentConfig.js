"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityAkComponentConfig =
    exports.FoleySynthModel2Config =
    exports.FoleySynthModel1Config =
    exports.FoleySynthModelConfig =
    exports.FoleySynthAllConfig =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const CharacterAudioConfigByIdWithDefaultId_1 = require("../../../../../../Core/Define/ConfigQuery/CharacterAudioConfigByIdWithDefaultId");
const EntityAudioConfigByIdWithZero_1 = require("../../../../../../Core/Define/ConfigQuery/EntityAudioConfigByIdWithZero");
const FoleySynthBoneConfigById_1 = require("../../../../../../Core/Define/ConfigQuery/FoleySynthBoneConfigById");
const FoleySynthConfigByIdWithDefaultId_1 = require("../../../../../../Core/Define/ConfigQuery/FoleySynthConfigByIdWithDefaultId");
const ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const DEFAULT_DB_ID = 0;
class FoleySynthAllConfig {
  constructor() {
    (this.FoleySynthModel1Configs = new Array()),
      (this.FoleySynthModel2Configs = new Array()),
      (this.Model2AccelerationMaxCount = 0),
      (this.Model2VelocityMaxCount = 0),
      (this.CurLoadCount = 0);
  }
  IsLoadSuccess() {
    return this.CurLoadCount === 0;
  }
}
exports.FoleySynthAllConfig = FoleySynthAllConfig;
class FoleySynthModelConfig {
  constructor() {
    (this.BoneName = void 0), (this.Model = 0);
  }
}
class FoleySynthModel1Config extends (exports.FoleySynthModelConfig =
  FoleySynthModelConfig) {
  constructor() {
    super(...arguments),
      (this.Ceil = 0),
      (this.CeilEvent = ""),
      (this.Floor = 0),
      (this.FloorEvent = ""),
      (this.Rtpc = void 0),
      (this.CeilInterpolation = -0),
      (this.FloorInterpolation = -0);
  }
}
exports.FoleySynthModel1Config = FoleySynthModel1Config;
class FoleySynthModel2Config extends FoleySynthModelConfig {
  constructor() {
    super(...arguments),
      (this.Ceil = 0),
      (this.CeilEvent = ""),
      (this.Floor = 0),
      (this.FloorEvent = ""),
      (this.FloorPrecent = -0),
      (this.RtpcVelMax = void 0),
      (this.RtpcAccMax = void 0),
      (this.RtpcVelDur = void 0),
      (this.CeilInterpolation = -0),
      (this.FloorInterpolation = -0);
  }
}
exports.FoleySynthModel2Config = FoleySynthModel2Config;
class EntityAkComponentConfig extends ConfigBase_1.ConfigBase {
  GetEntityAkComponentConfig(o) {
    var o = o.GetComponent(0);
    if (o)
      return (
        (o = o.EntityPbModelConfigId),
        EntityAudioConfigByIdWithZero_1.configEntityAudioConfigByIdWithZero.GetConfig(
          o,
          o,
          o,
        )
      );
  }
  GetEntityFoleySynthConfig(o) {
    o = o.GetComponent(0);
    if (o) {
      var e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
        o.GetPbDataId(),
      );
      var e = e?.IsTrialRole() ? e.GetRoleId() : o.GetPbDataId();
      var o =
        FoleySynthConfigByIdWithDefaultId_1.configFoleySynthConfigByIdWithDefaultId.GetConfig(
          DEFAULT_DB_ID,
          e,
          e,
          e,
        );
      if (o) {
        if (o.Id !== DEFAULT_DB_ID) {
          const i = new FoleySynthAllConfig();
          for (const t of o.Model1Config) {
            const n =
              FoleySynthBoneConfigById_1.configFoleySynthBoneConfigById.GetConfig(
                t,
              );
            if (n) {
              const r = new FoleySynthModel1Config();
              (r.BoneName = FNameUtil_1.FNameUtil.GetDynamicFName(n.BoneName)),
                (r.Ceil = n.Model1Ceil),
                (r.CeilEvent = n.Model1CeilEventPath),
                (r.Floor = n.Model1Floor),
                (r.FloorEvent = n.Model1FloorEventPath),
                i.CurLoadCount++,
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  n.Model1RtpcPath,
                  UE.AkRtpc,
                  (o) => {
                    (r.Rtpc = o),
                      i.CurLoadCount--,
                      r.Rtpc ||
                        (Log_1.Log.CheckWarn() &&
                          Log_1.Log.Warn(
                            "Audio",
                            58,
                            "音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
                            ["Id", n.Id],
                            ["Path", n.Model1RtpcPath],
                          ));
                  },
                ),
                (r.CeilInterpolation = n.Model1CeilInterpolation),
                (r.FloorInterpolation = n.Model1FloorInterpolation),
                i.FoleySynthModel1Configs.push(r);
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Audio",
                  58,
                  "音频组件配置表配置的音频骨骼Id无效 /Config/y.音频组件配置表/角色音频配置",
                  ["Id", t],
                  ["ConfigId", t],
                );
          }
          for (const s of o.Model2Config) {
            const y =
              FoleySynthBoneConfigById_1.configFoleySynthBoneConfigById.GetConfig(
                s,
              );
            if (y) {
              const d = new FoleySynthModel2Config();
              (d.BoneName = FNameUtil_1.FNameUtil.GetDynamicFName(y.BoneName)),
                (d.Ceil = y.Model2Ceil),
                (d.CeilEvent = y.Model2CeilEventPath),
                (d.Floor = y.Model2Floor),
                (d.FloorEvent = y.Model2FloorPath),
                (d.FloorPrecent = y.Model2FloorPrecent),
                i.CurLoadCount++,
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  y.Model2RptcVelocityMax,
                  UE.AkRtpc,
                  (o) => {
                    (d.RtpcVelMax = o),
                      i.CurLoadCount--,
                      d.RtpcVelMax ||
                        (Log_1.Log.CheckWarn() &&
                          Log_1.Log.Warn(
                            "Audio",
                            58,
                            "音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
                            ["Id", y.Id],
                            ["Path", y.Model2RptcVelocityMax],
                          ));
                  },
                ),
                i.CurLoadCount++,
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  y.Model2RptcAccelerationMax,
                  UE.AkRtpc,
                  (o) => {
                    (d.RtpcAccMax = o),
                      i.CurLoadCount--,
                      d.RtpcAccMax ||
                        (Log_1.Log.CheckWarn() &&
                          Log_1.Log.Warn(
                            "Audio",
                            58,
                            "音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
                            ["Id", y.Id],
                            ["Path", y.Model2RptcAccelerationMax],
                          ));
                  },
                ),
                i.CurLoadCount++,
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  y.Model2RptcVelocityDuring,
                  UE.AkRtpc,
                  (o) => {
                    (d.RtpcVelDur = o),
                      i.CurLoadCount--,
                      d.RtpcVelDur ||
                        (Log_1.Log.CheckWarn() &&
                          Log_1.Log.Warn(
                            "Audio",
                            58,
                            "音频组件配置表配置的音频路径无效 /Config/y.音频组件配置表/角色音频配置",
                            ["Id", y.Id],
                            ["Path", y.Model2RptcVelocityDuring],
                          ));
                  },
                ),
                (d.CeilInterpolation = y.Model2CeilInterpolation),
                (d.FloorInterpolation = y.Model2FloorInterpolation),
                i.FoleySynthModel2Configs.push(d);
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Audio",
                  58,
                  "音频组件配置表配置的音频骨骼Id无效 /Config/y.音频组件配置表/角色音频配置",
                  ["Id", s],
                  ["ConfigId", s],
                );
          }
          return (
            (i.Model2AccelerationMaxCount = o.Model2AccMaxCount),
            (i.Model2VelocityMaxCount = o.Model2VelMaxCount),
            i
          );
        }
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            58,
            "该角色未在角色音频配置表中配置 /Config/y.音频组件配置表/音频运动实体配置",
            ["Id", e],
            ["现替换Id", DEFAULT_DB_ID],
          );
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            58,
            "该角色未在角色音频配置表中默认值配置 /Config/y.音频组件配置表/音频运动实体配置",
            ["默认值Id", DEFAULT_DB_ID],
          );
    }
  }
  GetCharacterAudioConfigByEntity(o) {
    let e;
    var o = o.GetComponent(0);
    if (o)
      return (
        (e = (e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
          o.GetPbDataId(),
        ))?.IsTrialRole()
          ? e.GetRoleId()
          : o.GetPbDataId()),
        this.GetCharacterAudioConfigByConfigId(e)
      );
  }
  GetCharacterAudioConfigByConfigId(o) {
    const e =
      CharacterAudioConfigByIdWithDefaultId_1.configCharacterAudioConfigByIdWithDefaultId.GetConfig(
        DEFAULT_DB_ID,
        o,
        o,
        o,
      );
    if (e) {
      if (e.Id !== DEFAULT_DB_ID) return e;
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Audio",
          58,
          "该角色未在角色音频配置表中配置 /Config/y.音频组件配置表/角色音频配置 ",
          ["Id", o],
          ["现替换Id", DEFAULT_DB_ID],
        );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Audio",
          58,
          "该角色未在角色音频配置表中默认值配置 /Config/y.音频组件配置表/角色音频配置 ",
          ["默认值Id", DEFAULT_DB_ID],
        );
  }
}
exports.EntityAkComponentConfig = EntityAkComponentConfig;
// # sourceMappingURL=EntityAkComponentConfig.js.map
