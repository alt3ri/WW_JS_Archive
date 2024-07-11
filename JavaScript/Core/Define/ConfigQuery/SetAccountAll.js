"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSetAccountAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SetAccount_1 = require("../Config/SetAccount"),
  DB = "db_platformchannel.db",
  FILE = "p.平台渠道.xlsx",
  TABLE = "SetAccount",
  COMMAND = "select BinData from `SetAccount` where PackageType!=?",
  KEY_PREFIX = "SetAccountAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigListStat = void 0,
  CONFIG_LIST_STAT_PREFIX = "configSetAccountAll.GetConfigList(";
exports.configSetAccountAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n = !0) => {
    var e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) return r;
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PackageType",
              o,
            ])
          )
            break;
          var t = void 0;
          if (
            (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PackageType", o],
            )),
            !e)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t = SetAccount_1.SetAccount.getRootAsSetAccount(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          r.push(t);
        }
        return (
          n &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=SetAccountAll.js.map
