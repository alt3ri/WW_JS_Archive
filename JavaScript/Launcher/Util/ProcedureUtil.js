"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.randomArray =
    exports.whetherRepeatDoOnFailed =
    exports.whetherRepeatDoOnFailedAsync =
      void 0);
const LauncherLog_1 = require("./LauncherLog");
async function whetherRepeatDoOnFailedAsync(e, r, t = !1) {
  let a = await e().catch((e) => {
      LauncherLog_1.LauncherLog.ErrorWithStack(
        e instanceof Error ? e.message : e,
        e,
      );
    }),
    o = !a || !a.Success;
  for (; o; )
    try {
      a = await r(a ? a.Others : void 0, e);
    } catch (e) {
      LauncherLog_1.LauncherLog.ErrorWithStack(
        e instanceof Error ? e.message : e,
        e,
      );
    } finally {
      o = !(t || (a && a.Success));
    }
}
async function whetherRepeatDoOnFailed(r, t, a = !1) {
  let o = void 0;
  try {
    o = r();
  } catch (e) {
    LauncherLog_1.LauncherLog.ErrorWithStack(
      e instanceof Error ? e.message : e,
      e,
    );
  } finally {
    let e = !o || !o.Success;
    for (; e; )
      try {
        o = await t(o ? o.Others : void 0, r);
      } catch (e) {
        LauncherLog_1.LauncherLog.ErrorWithStack(
          e instanceof Error ? e.message : e,
          e,
        );
      } finally {
        e = !(a || (o && o.Success));
      }
  }
}
function randomArray(r) {
  for (let e = r.length - 1; 0 <= e; e--) {
    var t, a;
    0 < e &&
      (t = Math.floor(Math.random() * (e + 1))) !== e &&
      ((a = r[t]), (r[t] = r[e]), (r[e] = a));
  }
}
(exports.whetherRepeatDoOnFailedAsync = whetherRepeatDoOnFailedAsync),
  (exports.whetherRepeatDoOnFailed = whetherRepeatDoOnFailed),
  (exports.randomArray = randomArray);
//# sourceMappingURL=ProcedureUtil.js.map
