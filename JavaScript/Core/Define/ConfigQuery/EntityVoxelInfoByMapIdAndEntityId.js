"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntityVoxelInfoByMapIdAndEntityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntityVoxelInfo_1 = require("../Config/EntityVoxelInfo"),
  DB = "db_entityvoxelinfo.db",
  FILE = "UniverseEditor/EntityVoxelInfo.csv",
  TABLE = "EntityVoxelInfo",
  COMMAND =
    "select BinData from `EntityVoxelInfo` where MapId=? and EntityId=?",
  KEY_PREFIX = "EntityVoxelInfoByMapIdAndEntityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configEntityVoxelInfoByMapIdAndEntityId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configEntityVoxelInfoByMapIdAndEntityId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configEntityVoxelInfoByMapIdAndEntityId.GetConfig(";
exports.configEntityVoxelInfoByMapIdAndEntityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n}#${o})`),
      e =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (t) {
        var f = KEY_PREFIX + `#${n}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (C)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["MapId", n],
              ["EntityId", o],
            ))
      ) {
        f = void 0;
        if (
          (([e, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MapId", n],
            ["EntityId", o],
          )),
          e)
        ) {
          const C = EntityVoxelInfo_1.EntityVoxelInfo.getRootAsEntityVoxelInfo(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          return (
            t &&
              ((e = KEY_PREFIX + `#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EntityVoxelInfoByMapIdAndEntityId.js.map
