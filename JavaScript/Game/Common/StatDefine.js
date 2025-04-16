"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InitStatConsoleCommand =
    exports.battleStat =
    exports.BATTLESTAT_GROUP =
    exports.BATTLESTAT_ENABLED =
      void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Stats_1 = require("../../Core/Common/Stats");
(exports.BATTLESTAT_ENABLED = !0),
  (exports.BATTLESTAT_GROUP = "STATGROUP_KuroBattle"),
  (exports.battleStat = (function () {
    var e = {
        BulletTick: ["Bullet Tick"],
        BulletAfterTick: ["Bullet AfterTick"],
        MonsterTick: ["Monster Tick"],
        FightCameraTick: ["FightCamera Tick"],
        BulletCreate: ["Bullet Create"],
        BulletDestroy: ["Bullet Destroy"],
      },
      t = {};
    for (const r in e) {
      var o = e[r];
      t[r] = Stats_1.Stat.CreateNoFlameGraph(
        o[0],
        "",
        exports.BATTLESTAT_GROUP,
      );
    }
    return t;
  })());
let orgExecuteConsoleCommand = void 0;
function StatConsoleCommand(e, t, o) {
  var r = cpp_1.KuroTime.GetMicroseconds64(),
    e =
      (orgExecuteConsoleCommand(e, t, o),
      cpp_1.KuroTime.GetMicroseconds64() - r),
    o = t.replace(/[ .]+/g, "_");
  cpp_1.FKuroPerfSightHelper.PostValueFloat1("ExecuteConsoleCommand", o, e);
}
function InitStatConsoleCommand() {
  (orgExecuteConsoleCommand = UE.KismetSystemLibrary.ExecuteConsoleCommand),
    (UE.KismetSystemLibrary.ExecuteConsoleCommand = StatConsoleCommand);
}
exports.InitStatConsoleCommand = InitStatConsoleCommand;
//# sourceMappingURL=StatDefine.js.map
