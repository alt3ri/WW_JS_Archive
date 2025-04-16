"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MapMark_1 = require("../../../Core/Define/Config/MapMark"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  AreaByLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByLevel"),
  BlockSwitchById_1 = require("../../../Core/Define/ConfigQuery/BlockSwitchById"),
  CustomMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/CustomMarkByMarkId"),
  DynamicMapMarkAll_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkAll"),
  DynamicMapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkByMarkId"),
  EnrichmentAreaConfigByEnrichmentId_1 = require("../../../Core/Define/ConfigQuery/EnrichmentAreaConfigByEnrichmentId"),
  EnrichmentAreaConfigByItemId_1 = require("../../../Core/Define/ConfigQuery/EnrichmentAreaConfigByItemId"),
  FogBlockAll_1 = require("../../../Core/Define/ConfigQuery/FogBlockAll"),
  FogBlockByBlockAndMapId_1 = require("../../../Core/Define/ConfigQuery/FogBlockByBlockAndMapId"),
  FogTextureConfigAll_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigAll"),
  FogTextureConfigByMapId_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigByMapId"),
  LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId"),
  MapBorderAll_1 = require("../../../Core/Define/ConfigQuery/MapBorderAll"),
  MapMarkAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkAll"),
  MapMarkByEntityConfigId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByEntityConfigId"),
  MapMarkByInstanceDungeonId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByInstanceDungeonId"),
  MapMarkByMapId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMapId"),
  MapMarkByRelativeId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByRelativeId"),
  MapMarkRelativeSubTypeAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeAll"),
  MapMarkRelativeSubTypeByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeByFunctionId"),
  MapMarkRelativeSubTypeById_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeById"),
  MonsterDetectionAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionAll"),
  MultiMapAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAll"),
  MultiMapAreaConfigAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigAll"),
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
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  MapLogger_1 = require("./Misc/MapLogger");
class MapConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.At1 = new Map()),
      (this.pDi = void 0),
      (this.vDi = void 0),
      (this.aVa = void 0),
      (this.vSl = void 0),
      (this.MSl = void 0),
      (this.rO_ = void 0),
      (this.vYa = void 0),
      (this.MYa = void 0),
      (this.NCc = []),
      (this.mlh = new Map()),
      (this.nUl = new Set()),
      (this.IC1 = new Map());
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
      this.aVa = new Map();
      for (const a of e) this.aVa.set(a.QuestId, a);
    }
    e = MonsterDetectionAll_1.configMonsterDetectionAll.GetConfigList();
    if (e) {
      this.rO_ = new Map();
      for (const t of e) this.rO_.set(t.MarkId, t);
    }
    e = MapMarkAll_1.configMapMarkAll.GetConfigList();
    if (e) {
      this.vSl = new Map();
      for (const o of e) this.vSl.set(o.MarkId, o);
    }
    e = DynamicMapMarkAll_1.configDynamicMapMarkAll.GetConfigList();
    if (e) {
      this.MSl = new Map();
      for (const n of e) this.MSl.set(n.MarkId, n);
    }
    return this.SYa(), this.Pt1(), this.TC1(), !0;
  }
  OnClear() {
    return (
      this.pDi?.clear(),
      this.vDi?.clear(),
      this.aVa?.clear(),
      this.vSl?.clear(),
      this.MSl?.clear(),
      this.WorldMapNavigateAreaMap?.clear(),
      this.WorldMapNavigateCountryMap?.clear(),
      this.rO_?.clear(),
      this.mlh.clear(),
      this.nUl.clear(),
      this.At1?.clear(),
      (this.pDi = void 0),
      (this.vDi = void 0),
      this.IC1.clear(),
      !0
    );
  }
  SYa() {
    (this.vYa = new Map()), (this.MYa = new Map());
    var e = AreaByLevel_1.configAreaByLevel.GetConfigList(2);
    e
      ? this.yYa(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Map",
          63,
          "[地图系统]->不存在1级区域配置，请联系策划检查q.区域配置!",
        );
  }
  Pt1() {
    var e = this.GetAllTileConfig();
    if (e)
      for (const i of e) {
        var r = this.xt1(i.Block, i.MapId, i.GravityFlip);
        this.At1.set(r, i);
      }
  }
  TC1() {
    var e = this.GetMapBorderConfigList();
    if (e)
      for (const i of e) {
        var r = this.bC1(i.BorderId, i.MapId);
        this.IC1.set(r, i);
      }
  }
  yYa(e) {
    e.forEach((e) => {
      var r = {
        AreaId: e.AreaId,
        StateId: e.StateId,
        CountryId: e.CountryId,
        MarkId: e.DeliveryMarkId,
        MarkType: e.DeliveryMarkType,
      };
      this.vYa.set(e.AreaId, r);
      let i = this.MYa.get(e.CountryId);
      void 0 === i &&
        ((i = { StateMap: void 0, AreaNavigateList: [] }),
        this.MYa.set(e.CountryId, i),
        (e = { CountryId: e.CountryId, NavigateCountry: i }),
        this.NCc.push(e),
        this.NCc.sort((e, r) => {
          return (
            (ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
              e.CountryId,
            )?.SortIndex ?? 0) -
            (ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
              r.CountryId,
            )?.SortIndex ?? 0)
          );
        }));
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
    return this.vYa;
  }
  get WorldMapNavigateCountryMap() {
    return this.MYa;
  }
  get WorldMapNavigateCountryList() {
    return this.NCc;
  }
  GetTaskMarkConfig(e) {
    return TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
  }
  GetTaskMarkConfigByQuestId(e) {
    return this.aVa?.get(e);
  }
  GetTaskMarkIdByQuestId(e) {
    e = this.GetTaskMarkConfigByQuestId(e);
    if (e) return e.MarkId;
  }
  GetMonsterDetectionConfig(e) {
    return this.rO_?.get(e);
  }
  GetConfigMarks(e) {
    var r = MapMarkByMapId_1.configMapMarkByMapId.GetConfigList(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 63, "找不到MapMark表", ["mapId", e])),
      r
    );
  }
  GetConfigMark(e) {
    return this.vSl.get(e);
  }
  GetDynamicConfigMark(e) {
    var r = DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 63, "找不到DynamicMapMark表", ["markId", e])),
      r
    );
  }
  SearchMarkConfig(e) {
    return this.vSl.has(e)
      ? this.vSl.get(e)
      : this.MSl.has(e)
        ? this.MSl.get(e)
        : void MapLogger_1.MapLogger.ErrorOnce(
            e,
            63,
            "查询标记配置失败->MapMark和DynamicMark配置都不存在相关配置",
            ["MarkId", e],
          );
  }
  SearchMapConfigByType(e, r) {
    var i = this.vSl.get(e);
    return (i && i.ObjectType === r) ||
      ((i = this.MSl.get(e)) && i.ObjectType === r)
      ? i
      : void 0;
  }
  SearchMarkInstanceDungeonId(e, r) {
    if (9 !== r)
      return (e = this.SearchMapConfigByType(e, r)) instanceof MapMark_1.MapMark
        ? e.RelativeDungeonId
        : e?.InstanceDungeonId;
  }
  GetTeleportConfigById(e) {
    var r = TeleporterById_1.configTeleporterById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 18, "找不到Teleporter表的配置,Id = ", [
            "teleportId",
            e,
          ])),
      r
    );
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
            49,
            "找不到TemporaryTeleportMark表的配置,Id = ",
            ["markId", e],
          )),
      r
    );
  }
  xt1(e, r, i) {
    return e + `_${r}_` + i;
  }
  GetTileConfig(e, r, i) {
    e = this.xt1(e, r, i);
    return this.At1.get(e);
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
    var r;
    if (!this.nUl.has(e))
      return (
        void 0 === (r = MultiMapById_1.configMultiMapById.GetConfig(e)) &&
          this.nUl.add(e),
        r
      );
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
          Log_1.Log.Error("Map", 18, "找不到CustomMark表的配置", [
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
    var i = e + "-" + r;
    if (!this.mlh.has(i))
      return (
        void 0 ===
          (e =
            LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(
              e,
              r,
            )) && this.mlh.set(i, !0),
        e
      );
  }
  bC1(e, r) {
    return e + "_" + r;
  }
  GetMapBorderConfig(e, r) {
    e = this.bC1(e, r);
    return this.IC1.get(e);
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
          Log_1.Log.Error("Map", 49, "找不到SoundBoxMark表的配置", [
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
          Log_1.Log.Error("Map", 49, "找不到TreasureBoxMark表的配置", [
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
          Log_1.Log.Error("Map", 49, "找不到TreasureBoxDetectorMark表的配置", [
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
    var r;
    return StringUtils_1.StringUtils.IsEmpty(e)
      ? ""
      : (r = UiResourceById_1.configUiResourceById.GetConfig(e))
        ? r.Path
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Map", 63, "找不到UiResource表的配置", ["key", e]),
          "");
  }
  GetMultiMapAreaConfigList() {
    return MultiMapAreaConfigAll_1.configMultiMapAreaConfigAll.GetConfigList();
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
  GetMapMarkByRelativeId(e, r) {
    return MapMarkByRelativeId_1.configMapMarkByRelativeId.GetConfig(e, r);
  }
  GetMapMarkByEntityConfigId(e) {
    return MapMarkByEntityConfigId_1.configMapMarkByEntityConfigId.GetConfig(e);
  }
  GetMapMarkListByInstanceDungeonId(e) {
    return MapMarkByInstanceDungeonId_1.configMapMarkByInstanceDungeonId.GetConfigList(
      e,
    );
  }
}
exports.MapConfig = MapConfig;
//# sourceMappingURL=MapConfig.js.map
