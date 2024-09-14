"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configVideoDataByCgNameAndGirlOrBoy = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  VideoData_1 = require("../Config/VideoData"),
  DB = "db_cgvedio.db",
  FILE = "g.过场cg.xlsx",
  TABLE = "VideoData",
  COMMAND = "select BinData from `VideoData` where CgName=? AND GirlOrBoy=?",
  KEY_PREFIX = "VideoDataByCgNameAndGirlOrBoy",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configVideoDataByCgNameAndGirlOrBoy.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configVideoDataByCgNameAndGirlOrBoy.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configVideoDataByCgNameAndGirlOrBoy.GetConfig(";
exports.configVideoDataByCgNameAndGirlOrBoy = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var a = KEY_PREFIX + `#${o}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["CgName", o],
              ["GirlOrBoy", i],
            ))
      ) {
        a = void 0;
        if (
          (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["CgName", o],
            ["GirlOrBoy", i],
          )),
          t)
        ) {
          const C = VideoData_1.VideoData.getRootAsVideoData(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o}#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=VideoDataByCgNameAndGirlOrBoy.js.map
