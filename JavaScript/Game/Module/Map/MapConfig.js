"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const BlockSwitchById_1 = require("../../../Core/Define/ConfigQuery/BlockSwitchById");
const CustomMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/CustomMarkByMarkId");
const DynamicMapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkByMarkId");
const FogBlockAll_1 = require("../../../Core/Define/ConfigQuery/FogBlockAll");
const FogBlockByBlock_1 = require("../../../Core/Define/ConfigQuery/FogBlockByBlock");
const FogTextureConfigAll_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigAll");
const FogTextureConfigByBlock_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigByBlock");
const LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId");
const MapBorderAll_1 = require("../../../Core/Define/ConfigQuery/MapBorderAll");
const MapBorderByBorderId_1 = require("../../../Core/Define/ConfigQuery/MapBorderByBorderId");
const MapMarkByMapId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMapId");
const MapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMarkId");
const MapMarkRelativeSubTypeAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeAll");
const MapMarkRelativeSubTypeByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeByFunctionId");
const MapMarkRelativeSubTypeById_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeById");
const MultiMapAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAll");
const MultiMapAreaConfigAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigAll");
const MultiMapAreaConfigByBlock_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigByBlock");
const MultiMapByGroupId_1 = require("../../../Core/Define/ConfigQuery/MultiMapByGroupId");
const MultiMapById_1 = require("../../../Core/Define/ConfigQuery/MultiMapById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const SoundBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/SoundBoxMarkByMarkId");
const TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId");
const TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById");
const TemporaryTeleportMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TemporaryTeleportMarkByMarkId");
const TreasureBoxDetectorMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxDetectorMarkByMarkId");
const TreasureBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxMarkByMarkId");
const UiResourceById_1 = require("../../../Core/Define/ConfigQuery/UiResourceById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const DEFAULT_CONFIG_ID = 1;
class MapConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.pLi = void 0), (this.vLi = void 0);
  }
  OnInit() {
    (this.pLi = new Map()), (this.vLi = new Map());
    let e =
      MapMarkRelativeSubTypeAll_1.configMapMarkRelativeSubTypeAll.GetConfigList();
    if (e) for (const r of e) this.pLi.set(r.FunctionId, !0);
    e = FogBlockAll_1.configFogBlockAll.GetConfigList();
    if (e) for (const o of e) this.vLi.set(o.Block, !0);
    return !0;
  }
  OnClear() {
    return (
      this.pLi?.clear(),
      this.vLi?.clear(),
      (this.pLi = void 0),
      !(this.vLi = void 0)
    );
  }
  GetTaskMarkConfig(e) {
    return TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
  }
  GetConfigMarks(e) {
    e = MapMarkByMapId_1.configMapMarkByMapId.GetConfigList(e);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "找不到MapMark表")),
      e
    );
  }
  GetConfigMark(e) {
    return MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(e);
  }
  GetDynamicConfigMark(e) {
    e = DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId.GetConfig(e);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 50, "找不到DynamicMapMark表")),
      e
    );
  }
  SearchGetMarkConfig(e) {
    return this.GetConfigMark(e) ?? this.GetDynamicConfigMark(e);
  }
  GetTeleportConfigById(e) {
    const r = TeleporterById_1.configTeleporterById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "找不到Teleporter表的配置,Id = ", [
            "teleportId",
            e,
          ])),
      r
    );
  }
  GetDefaultDetectorMarkConfigId() {
    return DEFAULT_CONFIG_ID;
  }
  GetDefaultTemporaryTeleportMarkConfigId() {
    return DEFAULT_CONFIG_ID;
  }
  GetTemporaryTeleportMarkConfigById(e) {
    const r =
      TemporaryTeleportMarkByMarkId_1.configTemporaryTeleportMarkByMarkId.GetConfig(
        e,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            50,
            "找不到TemporaryTeleportMark表的配置,Id = ",
            ["markId", e],
          )),
      r
    );
  }
  GetTileConfig(e) {
    const r =
      FogTextureConfigByBlock_1.configFogTextureConfigByBlock.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "找不到FogTextureConfig表的配置", [
            "Block",
            e,
          ])),
      r
    );
  }
  GetAllTileConfig() {
    return FogTextureConfigAll_1.configFogTextureConfigAll.GetConfigList();
  }
  GetSubMapConfigByGroupId(e) {
    return MultiMapByGroupId_1.configMultiMapByGroupId.GetConfigList(e);
  }
  GetSubMapConfigById(e) {
    return MultiMapById_1.configMultiMapById.GetConfig(e);
  }
  GetUnlockMapTileConfigById(e) {
    return BlockSwitchById_1.configBlockSwitchById.GetConfig(e);
  }
  GetAllSubMapConfig() {
    return MultiMapAll_1.configMultiMapAll.GetConfigList();
  }
  GetSubMapConfigByAreaId(e) {
    const r = MultiMapAll_1.configMultiMapAll.GetConfigList();
    if (r) for (const o of r) if (o.Area.includes(e)) return o;
  }
  GetCustomMarkConfig(e) {
    const r = CustomMarkByMarkId_1.configCustomMarkByMarkId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "找不到CustomMark表的配置", [
            "MarkId",
            e,
          ])),
      r
    );
  }
  GetFogBlockConfig(e) {
    if (this.vLi.has(e))
      return FogBlockByBlock_1.configFogBlockByBlock.GetConfig(e);
  }
  GetLocalText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetEntityConfigByMapIdAndEntityId(e, r) {
    return LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(
      e,
      r,
    );
  }
  GetMapBorderConfig(e) {
    return MapBorderByBorderId_1.configMapBorderByBorderId.GetConfig(e);
  }
  GetMapBorderConfigList() {
    return MapBorderAll_1.configMapBorderAll.GetConfigList();
  }
  GetMapDissolveTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MapDissolveTime",
    );
  }
  GetSoundBoxMarkConfig(e) {
    const r = SoundBoxMarkByMarkId_1.configSoundBoxMarkByMarkId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 50, "找不到SoundBoxMark表的配置", [
            "MarkId",
            e,
          ])),
      r
    );
  }
  GetTreasureBoxMarkConfig(e) {
    const r =
      TreasureBoxMarkByMarkId_1.configTreasureBoxMarkByMarkId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 50, "找不到TreasureBoxMark表的配置", [
            "MarkId",
            e,
          ])),
      r
    );
  }
  GetTreasureBoxDetectorMarkConfig(e) {
    const r =
      TreasureBoxDetectorMarkByMarkId_1.configTreasureBoxDetectorMarkByMarkId.GetConfig(
        e,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 50, "找不到TreasureBoxDetectorMark表的配置", [
            "MarkId",
            e,
          ])),
      r
    );
  }
  GetMapMarkFuncTypeConfigByFuncId(e) {
    if (this.pLi.has(e))
      return MapMarkRelativeSubTypeByFunctionId_1.configMapMarkRelativeSubTypeByFunctionId.GetConfig(
        e,
      );
  }
  GetMapMarkFuncTypeConfigById(e) {
    return MapMarkRelativeSubTypeById_1.configMapMarkRelativeSubTypeById.GetConfig(
      e,
    );
  }
  GetUiResourcePathById(e) {
    return StringUtils_1.StringUtils.IsEmpty(e)
      ? ""
      : UiResourceById_1.configUiResourceById.GetConfig(e).Path;
  }
  GetMultiMapAreaConfigList() {
    return MultiMapAreaConfigAll_1.configMultiMapAreaConfigAll.GetConfigList();
  }
  GetMultiMapAreaConfigById(e) {
    return MultiMapAreaConfigByBlock_1.configMultiMapAreaConfigByBlock.GetConfig(
      e,
    );
  }
}
exports.MapConfig = MapConfig;
// # sourceMappingURL=MapConfig.js.map
