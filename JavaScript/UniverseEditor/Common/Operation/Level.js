"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getSetEntityVisibleWhiteList =
    exports.getLevelRewardWhiteList =
    exports.getDefaultLevelId =
    exports.getEntityPathNew =
    exports.getLevelIdByEntityPath =
    exports.getEntityPathByIdAndName =
    exports.getEntityPath =
    exports.getLevelAssetPath =
    exports.getTemplateLevelId =
    exports.TEMPLATE_MAP_ID =
    exports.levelNameToId =
    exports.levelIdToName =
    exports.isWpLevelByLevelId =
    exports.isWpLevel =
    exports.isLevelMap =
    exports.getLevelConfig =
    exports.getAllLevelExportPaths =
    exports.getLevelDataPath =
    exports.isExistLevel =
    exports.getExportConfig =
    exports.getLevelConfigByName =
    exports.getLevelConfigById =
    exports.getLevels =
    exports.getLevelsConfig =
    exports.getMapConfigFromCsv =
      void 0);
const IGlobal_1 = require("../../Interface/IGlobal"),
  Init_1 = require("../../Interface/Init"),
  CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  DungeonRewardWhiteListCsv_1 = require("../CsvConfig/DungeonRewardWhiteListCsv"),
  LevelsConfigCsv_1 = require("../CsvConfig/LevelsConfigCsv"),
  SetEntityVisibleWhiteListCsv_1 = require("../CsvConfig/SetEntityVisibleWhiteListCsv"),
  File_1 = require("../Misc/File"),
  Util_1 = require("../Misc/Util"),
  SegmentIdGenerator_1 = require("./SegmentIdGenerator");
function getMapConfigFromCsv() {
  var e = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
    LevelsConfigCsv_1.LevelsConfigCsv,
  );
  const t = [];
  return (
    e.forEach((e) => {
      t.push({
        Id: e.MapId,
        Name: e.ContentPath.substring(e.ContentPath.lastIndexOf("/") + 1),
        ContentPath: e.ContentPath,
        IsPartition: e.IsPartition,
        IsTest: e.IsTest,
      });
    }),
    { Levels: t }
  );
}
exports.getMapConfigFromCsv = getMapConfigFromCsv;
class LevelsConfigManager {
  constructor() {
    this.Init();
  }
  static get Instance() {
    return (
      LevelsConfigManager.m ||
        (LevelsConfigManager.m = new LevelsConfigManager()),
      LevelsConfigManager.m
    );
  }
  get LevelsConfig() {
    if ((this.ye || this.Init(), this.ye)) return this.ye;
    throw new Error("LevelsConfigManager: MyLevelsConfig is undefined");
  }
  GetLevelConfigByName(e) {
    if ((this.ge || this.Init(), this.ge)) return this.ge.get(e);
    throw new Error("LevelsConfigManager: LevelConfigByName is undefined");
  }
  GetLevelConfigById(e) {
    if ((this.fe || this.Init(), this.fe)) return this.fe.get(e);
    throw new Error("LevelsConfigManager: LevelConfigById is undefined");
  }
  Init() {
    (this.ye = this.ExportLevelsConfig()),
      (this.fe = (0, Util_1.arrayToMap)(this.ye.Levels, "Id")),
      (this.ge = (0, Util_1.arrayToMap)(this.ye.Levels, "Name"));
  }
  GetJsonLevelsConfig() {
    var e = (0, File_1.getProjectPath)(IGlobal_1.globalConfig.LevelsConfigPath);
    return (0, Util_1.readJsonObj)(e, { Levels: [] });
  }
  ExportLevelsConfig() {
    if (2 === (0, Util_1.getPlatformType)())
      return (
        (e = (0, File_1.getProjectPath)(
          IGlobal_1.globalConfig.LevelsConfigPath,
        )),
        (0, Util_1.readJsonObj)(e, { Levels: [] })
      );
    var e = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      LevelsConfigCsv_1.LevelsConfigCsv,
    );
    const t = [];
    return (
      e.forEach((e) => {
        t.push({
          Id: e.MapId,
          Name: e.ContentPath.substring(e.ContentPath.lastIndexOf("/") + 1),
          ContentPath: e.ContentPath,
          IsPartition: e.IsPartition,
          IsTest: e.IsTest,
        });
      }),
      t.sort((e, t) => e.Name.localeCompare(t.Name)),
      { Levels: t }
    );
  }
  Refresh() {
    this.Init();
  }
}
function getLevelsConfig() {
  return LevelsConfigManager.Instance.LevelsConfig;
}
function getLevels() {
  return LevelsConfigManager.Instance.LevelsConfig.Levels;
}
function getLevelConfigById(e) {
  return LevelsConfigManager.Instance.GetLevelConfigById(e);
}
function getLevelConfigByName(e) {
  return LevelsConfigManager.Instance.GetLevelConfigByName(e);
}
function getExportConfig() {
  return (
    LevelsConfigManager.Instance.Refresh(),
    LevelsConfigManager.Instance.ExportLevelsConfig()
  );
}
function isExistLevel(t) {
  return "number" == typeof t
    ? void 0 !== getLevels().find((e) => e.Id === t)
    : void 0 !== getLevels().find((e) => e.Name === t);
}
function getLevelDataPath(e) {
  e = getLevelConfigByName(e);
  if (e)
    return (0, File_1.getProjectPath)(
      `${IGlobal_1.globalConfig.LevelsDataDir}/${e.Id}/Level.json`,
    );
}
function getAllLevelExportPaths() {
  const t = [];
  return (
    getLevels().forEach((e) => {
      t.push(getLevelDataPath(e.Name));
    }),
    t
  );
}
function getLevelConfig(e) {
  return getLevelConfigByName(e);
}
function isLevelMap(e) {
  return !!getLevelConfigByName(e);
}
function isWpLevel(e) {
  return !!getLevelConfig(e)?.IsPartition;
}
function isWpLevelByLevelId(e) {
  return !!getLevelConfigById(e)?.IsPartition;
}
function levelIdToName(e) {
  return getLevelConfigById(e)?.Name;
}
function levelNameToId(e) {
  return getLevelConfigByName(e)?.Id;
}
function getTemplateLevelId() {
  return exports.TEMPLATE_MAP_ID;
}
function getLevelAssetPath(e) {
  var t = ("number" == typeof e ? getLevelConfigById : getLevelConfigByName)(e);
  if (t)
    return "" + (0, File_1.getProjectPath)(`Content/${t.ContentPath}.umap`);
  throw new Error(`getLevelAssetPath: levelNameOrId = ${e} is not exist`);
}
function getEntityPath(e, t) {
  e = "string" == typeof e ? levelNameToId(e) : e;
  return (
    (0, File_1.getProjectPath)(IGlobal_1.globalConfig.LevelsDir) +
    `/${e}/${t}.json`
  );
}
function getEntityPathByIdAndName(e, t, n) {
  e = "string" == typeof e ? levelNameToId(e) : e;
  return (
    (0, File_1.getProjectPath)(IGlobal_1.globalConfig.LevelsDir) +
    `/${e}/${(0, SegmentIdGenerator_1.getCreatorById)(t)}/${t}_${n}.json`
  );
}
function getLevelIdByEntityPath(e) {
  var t = (0, File_1.getProjectPath)(IGlobal_1.globalConfig.LevelsDir),
    e = (0, File_1.getRelativePathToDir)(e, t).split("/")[0];
  if (e) return parseInt(e, 10);
}
function getEntityPathNew(e, t) {
  return getEntityPathByIdAndName(e, t.Id, t.Name);
}
function getDefaultLevelId() {
  return (0, Init_1.isUe5)() ? 1 : 8;
}
function getLevelRewardWhiteList(t) {
  const n = new Set(),
    i = new Set();
  return (
    CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      DungeonRewardWhiteListCsv_1.DungeonRewardWhiteListCsv,
    ).forEach((e) => {
      e.LevelId === t &&
        (e.RewardList?.forEach((e) => {
          n.add(e);
        }),
        e.VisionList?.forEach((e) => {
          i.add(e);
        }));
    }),
    [[...n], [...i]]
  );
}
function getSetEntityVisibleWhiteList() {
  return CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
    SetEntityVisibleWhiteListCsv_1.SetEntityVisibleWhiteListCsv,
  ).map((e) => e.EntityUid);
}
(exports.getLevelsConfig = getLevelsConfig),
  (exports.getLevels = getLevels),
  (exports.getLevelConfigById = getLevelConfigById),
  (exports.getLevelConfigByName = getLevelConfigByName),
  (exports.getExportConfig = getExportConfig),
  (exports.isExistLevel = isExistLevel),
  (exports.getLevelDataPath = getLevelDataPath),
  (exports.getAllLevelExportPaths = getAllLevelExportPaths),
  (exports.getLevelConfig = getLevelConfig),
  (exports.isLevelMap = isLevelMap),
  (exports.isWpLevel = isWpLevel),
  (exports.isWpLevelByLevelId = isWpLevelByLevelId),
  (exports.levelIdToName = levelIdToName),
  (exports.levelNameToId = levelNameToId),
  (exports.TEMPLATE_MAP_ID = 41),
  (exports.getTemplateLevelId = getTemplateLevelId),
  (exports.getLevelAssetPath = getLevelAssetPath),
  (exports.getEntityPath = getEntityPath),
  (exports.getEntityPathByIdAndName = getEntityPathByIdAndName),
  (exports.getLevelIdByEntityPath = getLevelIdByEntityPath),
  (exports.getEntityPathNew = getEntityPathNew),
  (exports.getDefaultLevelId = getDefaultLevelId),
  (exports.getLevelRewardWhiteList = getLevelRewardWhiteList),
  (exports.getSetEntityVisibleWhiteList = getSetEntityVisibleWhiteList);
//# sourceMappingURL=Level.js.map
