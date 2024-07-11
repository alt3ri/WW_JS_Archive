"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const AkiMapByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapByMapId");
const AkiMapSourceByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapSourceByMapId");
const AudioById_1 = require("../../../Core/Define/ConfigQuery/AudioById");
const CustomMarkAll_1 = require("../../../Core/Define/ConfigQuery/CustomMarkAll");
const ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById");
const MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById");
const TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WorldMapConfig extends ConfigBase_1.ConfigBase {
  GetCommonValue(e) {
    return CommonParamById_1.configCommonParamById.GetIntConfig(e) ?? 0;
  }
  GetCustomMarks() {
    return CustomMarkAll_1.configCustomMarkAll.GetConfigList();
  }
  GetAreaId(e) {
    const r = TeleporterById_1.configTeleporterById.GetConfig(e);
    return r
      ? r.AreaId
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "传送表找不到配置", ["Id", e]),
        0);
  }
  GetTeleportEntityConfigId(e) {
    const r = TeleporterById_1.configTeleporterById.GetConfig(e);
    return r
      ? r.TeleportEntityConfigId
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "传送表找不到配置", ["Id", e]),
        0);
  }
  GetAkiMapConfig(e) {
    const r = AkiMapByMapId_1.configAkiMapByMapId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "AkiMap表找不到配置", ["MapId", e])),
      r
    );
  }
  GetAkiMapSourceConfig(e) {
    const r = AkiMapSourceByMapId_1.configAkiMapSourceByMapId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 40, "AkiMapSource表找不到配置", ["MapId", e])),
      r
    );
  }
  GetAudioConfig(e) {
    const r = AudioById_1.configAudioById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "Audio表找不到配置", ["Id", e])),
      r
    );
  }
  GetDailyTaskMarkItem(e) {
    const r = MapNoteById_1.configMapNoteById.GetConfig(1).MarkIdMap.get(e);
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
    const r = ExploreProgressById_1.configExploreProgressById.GetConfig(e);
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
}
exports.WorldMapConfig = WorldMapConfig;
// # sourceMappingURL=WorldMapConfig.js.map
