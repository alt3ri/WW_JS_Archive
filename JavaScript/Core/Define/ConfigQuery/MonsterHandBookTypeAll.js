"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMonsterHandBookTypeAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MonsterHandBookType_1 = require("../Config/MonsterHandBookType");
const DB = "db_handbook.db";
const FILE = "t.图鉴系统.xlsx";
const TABLE = "MonsterHandBookType";
const COMMAND = "select BinData from `MonsterHandBookType`";
const KEY_PREFIX = "MonsterHandBookTypeAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configMonsterHandBookTypeAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) return r;
      }
      const r = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i =
          MonsterHandBookType_1.MonsterHandBookType.getRootAsMonsterHandBookType(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
        r.push(i);
      }
      return (
        o &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        r
      );
    }
  },
};
// # sourceMappingURL=MonsterHandBookTypeAll.js.map
