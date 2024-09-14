"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFormationPropertyAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FormationProperty_1 = require("../Config/FormationProperty"),
  DB = "db_formationproperty.db",
  FILE = "d.队伍属性表.xlsx",
  TABLE = "FormationProperty",
  COMMAND = "select BinData from `FormationProperty`",
  KEY_PREFIX = "FormationPropertyAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configFormationPropertyAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configFormationPropertyAll.GetConfigList",
  );
exports.configFormationPropertyAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var t;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      const r = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !t)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        i = FormationProperty_1.FormationProperty.getRootAsFormationProperty(
          new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
        );
        r.push(i);
      }
      return (
        o &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        r
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FormationPropertyAll.js.map
