"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapConfig = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  AkiMapAll_1 = require("../../../Core/Define/ConfigQuery/AkiMapAll"),
  AkiMapSourceByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapSourceByMapId"),
  AudioById_1 = require("../../../Core/Define/ConfigQuery/AudioById"),
  ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById"),
  CustomMarkAll_1 = require("../../../Core/Define/ConfigQuery/CustomMarkAll"),
  EntityGravityConfigAll_1 = require("../../../Core/Define/ConfigQuery/EntityGravityConfigAll"),
  ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById"),
  InstanceDungeonAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonAll"),
  MapFogByFog_1 = require("../../../Core/Define/ConfigQuery/MapFogByFog"),
  MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
  MapRangeByMapId_1 = require("../../../Core/Define/ConfigQuery/MapRangeByMapId"),
  PunishReportById_1 = require("../../../Core/Define/ConfigQuery/PunishReportById"),
  TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  MapUtil_1 = require("../Map/MapUtil");
class WorldMapConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.KYa = new Map()),
      (this.z0l = new Map()),
      (this.YLc = new Map()),
      (this.fc1 = new Map());
  }
  OnInit() {
    var e = AkiMapAll_1.configAkiMapAll.GetConfigList(),
      e =
        (e
          ? e.forEach((e) => {
              this.KYa.set(e.MapId, e);
            })
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Map",
              63,
              "[地图系统]->不存在地图配置，请联系策划检查akiMap配置!",
            ),
        InstanceDungeonAll_1.configInstanceDungeonAll.GetConfigList());
    return (
      e &&
        e.forEach((e) => {
          this.z0l.set(e.Id, e);
        }),
      this.gc1(),
      !0
    );
  }
  OnClear() {
    return this.KYa.clear(), this.z0l.clear(), !0;
  }
  IsDungeonInWorld(e) {
    var e = this.z0l.get(e);
    return void 0 !== e && ((e = e.MapConfigId), this.IsMapInWorld(e));
  }
  IsMapInWorld(e) {
    return void 0 !== this.GetAkiMapConfig(e, !1);
  }
  GetDungeonConfig(e) {
    return this.z0l.get(e);
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
  GetTeleportEntityConfigId(e) {
    var r = TeleporterById_1.configTeleporterById.GetConfig(e);
    return r
      ? r.TeleportEntityConfigId
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 18, "传送表找不到配置", ["Id", e]),
        0);
  }
  GetAkiMapConfig(e, r = !0) {
    var o = this.KYa.get(e);
    return (
      !o &&
        r &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 18, "AkiMap表找不到配置", ["MapId", e]),
      o
    );
  }
  GetAkiMapSourceConfig(e) {
    var r = AkiMapSourceByMapId_1.configAkiMapSourceByMapId.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 39, "AkiMapSource表找不到配置", ["MapId", e])),
      r
    );
  }
  GetAudioConfig(e) {
    var r = AudioById_1.configAudioById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 18, "Audio表找不到配置", ["Id", e])),
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
            49,
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
            49,
            `t.探索度配置表
            找不到对应配置`,
            ["Id", e],
          )),
      r
    );
  }
  GetPunishReportConfig(e) {
    return PunishReportById_1.configPunishReportById.GetConfig(e);
  }
  GetConditionGroup(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
  GetMapFogConfig(e) {
    return MapFogByFog_1.configMapFogByFog.GetConfig(e);
  }
  GetAllMapRangeConfigByMapId(e) {
    return MapRangeByMapId_1.configMapRangeByMapId.GetConfigList(e);
  }
  ReloadConfig() {
    this.gc1();
  }
  gc1() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.YLc.clear();
      var e =
        EntityGravityConfigAll_1.configEntityGravityConfigAll.GetConfigList();
      if (e)
        for (const t of e) {
          var r = this.YLc.get(t.MapId) ?? new Map();
          this.YLc.set(t.MapId, r), r.set(t.EntityId, t);
        }
    } else {
      this.fc1.clear();
      (e = UE.KismetSystemLibrary.ConvertToAbsolutePath(
        UE.BlueprintPathsLibrary.ProjectDir(),
      )),
        (e = UE.KismetSystemLibrary.ConvertToAbsolutePath(
          "" + e + IGlobal_1.globalConfigTemp.GravityAbnormalEntityListPath,
        ));
      if (UE.BlueprintPathsLibrary.FileExists(e)) {
        var o = (0, puerts_1.$ref)(""),
          o =
            (UE.KuroStaticLibrary.LoadFileToString(o, e),
            (o = (0, puerts_1.$unref)(o)),
            JSON.parse(o));
        for (const n of o.AllConfig)
          for (const a of n.EntityDirectionConfig) {
            var i = this.fc1.get(n.LevelId) ?? new Map();
            this.fc1.set(n.LevelId, i), i.set(a.EntityId, a);
          }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Editor", 63, "文件不存在", ["Path", e]);
    }
  }
  GetEntityGravityConfig(e, r) {
    return this.YLc.get(e)?.get(r);
  }
  GetEditorEntityGravityConfig(e, r) {
    return this.fc1.get(e)?.get(r);
  }
  GetEntityGravityDirection(e, r) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var o = this.GetEntityGravityConfig(e, r);
      if (o && 3 <= o.GravityDirection.length)
        return MapUtil_1.MapUtil.IsStandardGravity(o.GravityDirection[2])
          ? 1
          : 2;
    } else {
      o = this.GetEditorEntityGravityConfig(e, r);
      if (o && void 0 !== o.GravityDirection?.Z)
        return MapUtil_1.MapUtil.IsStandardGravity(o.GravityDirection?.Z)
          ? 1
          : 2;
    }
    return 0;
  }
  GetEditorEntityGravityMap() {
    return this.fc1;
  }
}
exports.WorldMapConfig = WorldMapConfig;
//# sourceMappingURL=WorldMapConfig.js.map
