"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFavorWordByRoleIdAndType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FavorWord_1 = require("../Config/FavorWord");
const DB = "db_favor.db";
const FILE = "h.好感度.xlsx";
const TABLE = "FavorWord";
const COMMAND =
  "select BinData from `FavorWord` where RoleId=? and Type=? Order By Sort";
const KEY_PREFIX = "FavorWordByRoleIdAndType";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configFavorWordByRoleIdAndType.GetConfigList(";
exports.configFavorWordByRoleIdAndType = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n, e = !0) => {
    let r;
    if (
      (r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var i = KEY_PREFIX + `#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) return a;
      }
      if (
        (r =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["RoleId", o],
              ["Type", n],
            ) !== 1
          )
            break;
          let d = void 0;
          if (
            (([r, d] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
              ["Type", n],
            )),
            !r)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          d = FavorWord_1.FavorWord.getRootAsFavorWord(
            new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)),
          );
          a.push(d);
        }
        return (
          e &&
            ((i = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=FavorWordByRoleIdAndType.js.map
