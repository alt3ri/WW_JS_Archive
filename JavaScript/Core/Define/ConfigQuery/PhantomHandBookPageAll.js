"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhantomHandBookPageAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomHandBookPage_1 = require("../Config/PhantomHandBookPage");
const DB = "db_handbook.db";
const FILE = "t.图鉴系统.xlsx";
const TABLE = "PhantomHandBookPage";
const COMMAND = "select BinData from `PhantomHandBookPage`";
const KEY_PREFIX = "PhantomHandBookPageAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configPhantomHandBookPageAll = {
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
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) return i;
      }
      const i = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let a = void 0;
        if (
          (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        a =
          PhantomHandBookPage_1.PhantomHandBookPage.getRootAsPhantomHandBookPage(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
        i.push(a);
      }
      return (
        o &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        i
      );
    }
  },
};
// # sourceMappingURL=PhantomHandBookPageAll.js.map
