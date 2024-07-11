"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.randomArray =
    exports.whetherRepeatDoOnFailed =
    exports.whetherRepeatDoOnFailedAsync =
      void 0);
const LauncherLog_1 = require("./LauncherLog");
async function whetherRepeatDoOnFailedAsync(e, r) {
  let t = await e().catch((e) => {
      LauncherLog_1.LauncherLog.ErrorWithStack(
        e instanceof Error ? e.message : e,
        e,
      );
    }),
    a = !t || !t.Success;
  for (; a; )
    try {
      t = await r(t ? t.Others : void 0, e);
    } catch (e) {
      LauncherLog_1.LauncherLog.ErrorWithStack(
        e instanceof Error ? e.message : e,
        e,
      );
    } finally {
      a = !t || !t.Success;
    }
}
async function whetherRepeatDoOnFailed(r, t) {
  let a = void 0;
  try {
    a = r();
  } catch (e) {
    LauncherLog_1.LauncherLog.ErrorWithStack(
      e instanceof Error ? e.message : e,
      e,
    );
  } finally {
    let e = !a || !a.Success;
    for (; e; )
      try {
        a = await t(a ? a.Others : void 0, r);
      } catch (e) {
        LauncherLog_1.LauncherLog.ErrorWithStack(
          e instanceof Error ? e.message : e,
          e,
        );
      } finally {
        e = !a || !a.Success;
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
