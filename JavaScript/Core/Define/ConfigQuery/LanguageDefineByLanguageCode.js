"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLanguageDefineByLanguageCode = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LanguageDefine_1 = require("../Config/LanguageDefine"),
  DB = "db_menu.db",
  FILE = "s.设置系统.xlsx",
  TABLE = "LanguageDefine",
  COMMAND = "select BinData from `LanguageDefine` where LanguageCode=?",
  KEY_PREFIX = "LanguageDefineByLanguageCode",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configLanguageDefineByLanguageCode.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configLanguageDefineByLanguageCode.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configLanguageDefineByLanguageCode.GetConfig(";
exports.configLanguageDefineByLanguageCode = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      g =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (g) {
      if (e) {
        var a = KEY_PREFIX + `#${n})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (g =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "LanguageCode",
              n,
            ]))
      ) {
        a = void 0;
        if (
          (([g, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["LanguageCode", n],
          )),
          g)
        ) {
          const i = LanguageDefine_1.LanguageDefine.getRootAsLanguageDefine(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            e &&
              ((g = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(g, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LanguageDefineByLanguageCode.js.map
