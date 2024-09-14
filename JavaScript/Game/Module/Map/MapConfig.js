"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  AreaByLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByLevel"),
  BlockSwitchById_1 = require("../../../Core/Define/ConfigQuery/BlockSwitchById"),
  CustomMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/CustomMarkByMarkId"),
  DynamicMapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkByMarkId"),
  EnrichmentAreaConfigByEnrichmentId_1 = require("../../../Core/Define/ConfigQuery/EnrichmentAreaConfigByEnrichmentId"),
  EnrichmentAreaConfigByItemId_1 = require("../../../Core/Define/ConfigQuery/EnrichmentAreaConfigByItemId"),
  FogBlockAll_1 = require("../../../Core/Define/ConfigQuery/FogBlockAll"),
  FogBlockByBlockAndMapId_1 = require("../../../Core/Define/ConfigQuery/FogBlockByBlockAndMapId"),
  FogTextureConfigAll_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigAll"),
  FogTextureConfigByBlockAndMapId_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigByBlockAndMapId"),
  FogTextureConfigByMapId_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigByMapId"),
  LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId"),
  MapBorderAll_1 = require("../../../Core/Define/ConfigQuery/MapBorderAll"),
  MapBorderByBorderIdAndMapId_1 = require("../../../Core/Define/ConfigQuery/MapBorderByBorderIdAndMapId"),
  MapMarkByMapId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMapId"),
  MapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  MapMarkRelativeSubTypeAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeAll"),
  MapMarkRelativeSubTypeByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeByFunctionId"),
  MapMarkRelativeSubTypeById_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeById"),
  MultiMapAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAll"),
  MultiMapAreaConfigAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigAll"),
  MultiMapAreaConfigByBlock_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigByBlock"),
  MultiMapByGroupId_1 = require("../../../Core/Define/ConfigQuery/MultiMapByGroupId"),
  MultiMapById_1 = require("../../../Core/Define/ConfigQuery/MultiMapById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  SoundBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/SoundBoxMarkByMarkId"),
  TaskMarkAll_1 = require("../../../Core/Define/ConfigQuery/TaskMarkAll"),
  TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId"),
  TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
  TemporaryTeleportMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TemporaryTeleportMarkByMarkId"),
  TreasureBoxDetectorMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxDetectorMarkByMarkId"),
  TreasureBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxMarkByMarkId"),
  UiResourceById_1 = require("../../../Core/Define/ConfigQuery/UiResourceById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  DEFAULT_CONFIG_ID = 1;
class MapConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.pDi = void 0),
      (this.vDi = void 0),
      (this.E5a = void 0),
      (this.ZQa = void 0),
      (this.eKa = void 0);
  }
  OnInit() {
    (this.pDi = new Map()), (this.vDi = new Map());
    var e =
      MapMarkRelativeSubTypeAll_1.configMapMarkRelativeSubTypeAll.GetConfigList();
    if (e) for (const r of e) this.pDi.set(r.FunctionId, !0);
    e = FogBlockAll_1.configFogBlockAll.GetConfigList();
    if (e) for (const i of e) this.vDi.set(i.Block + "_" + i.MapId, !0);
    e = TaskMarkAll_1.configTaskMarkAll.GetConfigList();
    if (e) {
      this.E5a = new Map();
      for (const a of e) this.E5a.set(a.QuestId, a);
    }
    return this.tKa(), !0;
  }
  OnClear() {
    return (
      this.pDi?.clear(),
      this.vDi?.clear(),
      this.E5a?.clear(),
      this.WorldMapNavigateAreaMap?.clear(),
      this.WorldMapNavigateCountryMap?.clear(),
      (this.pDi = void 0),
      !(this.vDi = void 0)
    );
  }
  tKa() {
    (this.ZQa = new Map()), (this.eKa = new Map());
    var e = AreaByLevel_1.configAreaByLevel.GetConfigList(2);
    e
      ? this.iKa(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Map",
          64,
          "[地图系统]->不存在1级区域配置，请联系策划检查q.区域配置!",
        );
  }
  iKa(e) {
    e.forEach((e) => {
      var r = {
        AreaId: e.AreaId,
        StateId: e.StateId,
        CountryId: e.CountryId,
        MarkId: e.DeliveryMarkId,
        MarkType: e.DeliveryMarkType,
      };
      this.ZQa.set(e.AreaId, r);
      let i = this.eKa.get(e.CountryId);
      void 0 === i &&
        ((i = { StateMap: void 0, AreaNavigateList: [] }),
        this.eKa.set(e.CountryId, i));
      e = r.StateId;
      0 !== e &&
        (void 0 === i.StateMap && (i.StateMap = new Map()),
        i.StateMap.has(e) ||
          i.StateMap.set(e, { StateId: e, AreaNavigateList: [] }),
        i.StateMap.get(e).AreaNavigateList.push(r)),
        i.AreaNavigateList.push(r);
    });
  }
  get WorldMapNavigateAreaMap() {
    return this.ZQa;
  }
  get WorldMapNavigateCountryMap() {
    return this.eKa;
  }
  GetTaskMarkConfig(e) {
    return TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
  }
  GetTaskMarkConfigByQuestId(e) {
    return this.E5a?.get(e);
  }
  GetTaskMarkIdByQuestId(e) {
    e = this.GetTaskMarkConfigByQuestId(e);
    if (e) return e.MarkId;
  }
  GetConfigMarks(e) {
    var r = MapMarkByMapId_1.configMapMarkByMapId.GetConfigList(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 64, "找不到MapMark表", ["mapId", e])),
      r
    );
  }
  GetConfigMark(e) {
    return MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(e);
  }
  GetDynamicConfigMark(e) {
    var r = DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 64, "找不到DynamicMapMark表", ["markId", e])),
      r
    );
  }
  SearchGetMarkConfig(e) {
    return this.GetConfigMark(e) ?? this.GetDynamicConfigMark(e);
  }
  GetTeleportConfigById(e) {
    var r = TeleporterById_1.configTeleporterById.GetConfig(e);
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
    var r =
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
  GetTileConfig(e, r) {
    return FogTextureConfigByBlockAndMapId_1.configFogTextureConfigByBlockAndMapId.GetConfig(
      e,
      r,
    );
  }
  GetAllTileConfig() {
    return FogTextureConfigAll_1.configFogTextureConfigAll.GetConfigList();
  }
  GetAllTileConfigByMapId(e) {
    return FogTextureConfigByMapId_1.configFogTextureConfigByMapId.GetConfigList(
      e,
    );
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
    var r = MultiMapAll_1.configMultiMapAll.GetConfigList();
    if (r) for (const i of r) if (i.Area.includes(e)) return i;
  }
  GetCustomMarkConfig(e) {
    var r = CustomMarkByMarkId_1.configCustomMarkByMarkId.GetConfig(e);
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
  GetFogBlockConfig(e, r) {
    if (this.vDi.has(e + "_" + r))
      return FogBlockByBlockAndMapId_1.configFogBlockByBlockAndMapId.GetConfig(
        e,
        r,
      );
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
  GetMapBorderConfig(e, r) {
    return MapBorderByBorderIdAndMapId_1.configMapBorderByBorderIdAndMapId.GetConfig(
      e,
      r,
    );
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
    var r = SoundBoxMarkByMarkId_1.configSoundBoxMarkByMarkId.GetConfig(e);
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
    var r =
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
    var r =
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
    if (this.pDi.has(e))
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
  GetEnrichmentAreaConfigByItemId(e) {
    return EnrichmentAreaConfigByItemId_1.configEnrichmentAreaConfigByItemId.GetConfigList(
      e,
    );
  }
  GetEnrichmentAreaConfigByEnrichmentId(e) {
    e =
      EnrichmentAreaConfigByEnrichmentId_1.configEnrichmentAreaConfigByEnrichmentId.GetConfigList(
        e,
      );
    if (e) return e[0];
  }
}
exports.MapConfig = MapConfig;
//# sourceMappingURL=MapConfig.js.map
