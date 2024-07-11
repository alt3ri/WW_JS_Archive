"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configChipTypeAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ChipType_1 = require("../Config/ChipType"),
  DB = "db_handbook.db",
  FILE = "t.图鉴系统.xlsx",
  TABLE = "ChipType",
  COMMAND = "select BinData from `ChipType`",
  KEY_PREFIX = "ChipTypeAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigListStat = void 0;
exports.configChipTypeAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    var e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) return r;
      }
      const r = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var n = void 0;
        if (
          (([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !e)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n = ChipType_1.ChipType.getRootAsChipType(
          new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
        );
        r.push(n);
      }
      return (
        o &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        r
      );
    }
  },
};
//# sourceMappingURL=ChipTypeAll.js.map
