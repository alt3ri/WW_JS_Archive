"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  AkiMapAll_1 = require("../../../Core/Define/ConfigQuery/AkiMapAll"),
  AkiMapByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapByMapId"),
  AkiMapSourceByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapSourceByMapId"),
  AudioById_1 = require("../../../Core/Define/ConfigQuery/AudioById"),
  CustomMarkAll_1 = require("../../../Core/Define/ConfigQuery/CustomMarkAll"),
  ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
  PunishReportById_1 = require("../../../Core/Define/ConfigQuery/PunishReportById"),
  TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WorldMapConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.AKa = new Map());
  }
  OnInit() {
    var e = AkiMapAll_1.configAkiMapAll.GetConfigList();
    return (
      e
        ? e.forEach((e) => {
            this.AKa.set(e.MapId, e);
          })
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            64,
            "[地图系统]->不存在地图配置，请联系策划检查akiMap配置!",
          ),
      !0
    );
  }
  OnClear() {
    return this.AKa.clear(), !0;
  }
  GetCacheAkiMapConfig(e) {
    return this.AKa.get(e);
  }
  IsInBigWorld(e) {
    e = this.GetInstanceDungeonConfig(e);
    return void 0 !== e && 13 === e.InstSubType;
  }
  GetCommonValue(e) {
    return CommonParamById_1.configCommonParamById.GetIntConfig(e) ?? 0;
  }
  GetCommonIntArray(e) {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(e);
  }
  GetCustomMarks() {
    return CustomMarkAll_1.configCustomMarkAll.GetConfigList();
  }
  GetAreaId(e) {
    var r = TeleporterById_1.configTeleporterById.GetConfig(e);
    return r
      ? r.AreaId
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "传送表找不到配置", ["Id", e]),
        0);
  }
  GetTeleportEntityConfigId(e) {
    var r = TeleporterById_1.configTeleporterById.GetConfig(e);
    return r
      ? r.TeleportEntityConfigId
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "传送表找不到配置", ["Id", e]),
        0);
  }
  GetAkiMapConfig(e) {
    var r = AkiMapByMapId_1.configAkiMapByMapId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "AkiMap表找不到配置", ["MapId", e])),
      r
    );
  }
  GetAkiMapSourceConfig(e) {
    var r = AkiMapSourceByMapId_1.configAkiMapSourceByMapId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 40, "AkiMapSource表找不到配置", ["MapId", e])),
      r
    );
  }
  GetAudioConfig(e) {
    var r = AudioById_1.configAudioById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "Audio表找不到配置", ["Id", e])),
      r
    );
  }
  GetDailyTaskMarkItem(e) {
    var r = MapNoteById_1.configMapNoteById.GetConfig(1).MarkIdMap.get(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            50,
            "d.地图便签表DailyMarkId列找不到对应配置",
            ["国家Id:", e],
          )),
      r
    );
  }
  GetExploreProgressInfoById(e) {
    var r = ExploreProgressById_1.configExploreProgressById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            50,
            `t.探索度配置表
            找不到对应配置`,
            ["Id", e],
          )),
      r
    );
  }
  GetInstanceDungeonConfig(e) {
    return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
  }
  GetPunishReportConfig(e) {
    return PunishReportById_1.configPunishReportById.GetConfig(e);
  }
}
exports.WorldMapConfig = WorldMapConfig;
//# sourceMappingURL=WorldMapConfig.js.map
