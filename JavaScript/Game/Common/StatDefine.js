"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.battleStat =
    exports.BATTLESTAT_GROUP =
    exports.BATTLESTAT_ENABLED =
      void 0);
const Stats_1 = require("../../Core/Common/Stats");
(exports.BATTLESTAT_ENABLED = !0),
  (exports.BATTLESTAT_GROUP = "STATGROUP_KuroBattle"),
  (exports.battleStat = (function () {
    var t = {
        BattleTotal: ["JS Total (ms)", 3],
        BulletTick: ["Bullet Tick"],
        BulletAfterTick: ["Bullet AfterTick"],
        MonsterTick: ["Monster Tick"],
        FightCameraTick: ["FightCamera Tick"],
        BulletCreate: ["Bullet Create"],
        BulletDestroy: ["Bullet Destroy"],
      },
      e = {};
    for (const o in t) {
      var r = t[o];
      e[o] = Stats_1.Stat.CreateStatOfType(
        r[1] ?? 1,
        r[0],
        "",
        exports.BATTLESTAT_GROUP,
      );
    }
    return e;
  })());
//# sourceMappingURL=StatDefine.js.map
