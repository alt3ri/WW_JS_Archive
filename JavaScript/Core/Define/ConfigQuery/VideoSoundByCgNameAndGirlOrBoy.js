"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configVideoSoundByCgNameAndGirlOrBoy = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  VideoSound_1 = require("../Config/VideoSound"),
  DB = "db_cgvedio.db",
  FILE = "g.过场cg.xlsx",
  TABLE = "VideoSound",
  COMMAND = "select BinData from `VideoSound` where CgName=? AND GirlOrBoy=?",
  KEY_PREFIX = "VideoSoundByCgNameAndGirlOrBoy",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configVideoSoundByCgNameAndGirlOrBoy.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configVideoSoundByCgNameAndGirlOrBoy.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(";
exports.configVideoSoundByCgNameAndGirlOrBoy = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o}#${i})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var C = KEY_PREFIX + `#${o}#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (r)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["CgName", o],
              ["GirlOrBoy", i],
            )
          )
            break;
          var g = void 0;
          if (
            (([t, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["CgName", o],
              ["GirlOrBoy", i],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = VideoSound_1.VideoSound.getRootAsVideoSound(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          r.push(g);
        }
        return (
          n &&
            ((C = KEY_PREFIX + `#${o}#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(C, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=VideoSoundByCgNameAndGirlOrBoy.js.map
