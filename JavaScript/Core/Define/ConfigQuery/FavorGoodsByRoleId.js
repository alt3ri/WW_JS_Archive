"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFavorGoodsByRoleId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FavorGoods_1 = require("../Config/FavorGoods");
const DB = "db_favor.db";
const FILE = "h.好感度.xlsx";
const TABLE = "FavorGoods";
const COMMAND = "select BinData from `FavorGoods` where RoleId=? Order By Sort";
const KEY_PREFIX = "FavorGoodsByRoleId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configFavorGoodsByRoleId.GetConfigList(";
exports.configFavorGoodsByRoleId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (d) return d;
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const d = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "RoleId",
              o,
            ]) !== 1
          )
            break;
          let r = void 0;
          if (
            (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
            )),
            !e)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = FavorGoods_1.FavorGoods.getRootAsFavorGoods(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          d.push(r);
        }
        return (
          n &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, d, d.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          d
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=FavorGoodsByRoleId.js.map
