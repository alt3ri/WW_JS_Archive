"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherHttp = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue");
class LauncherHttp {
  static Get(e, t, u) {
    let s = void 0;
    if (t) {
      s = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (var [r, i] of t) s.Add(r, i);
    } else s = ue_1.KuroHttp.GetDefaultHeader();
    if (u) {
      const o = (e, t, s) => {
        u(e, t, s), (0, puerts_1.releaseManualReleaseDelegate)(o);
      };
      ue_1.KuroHttp.Get(e, s, (0, puerts_1.toManualReleaseDelegate)(o));
    } else ue_1.KuroHttp.Get(e, s, void 0);
  }
  static Post(e, t, s, u, r) {
    let i = void 0;
    if (s) {
      i = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (var [o, _] of s) i.Add(o, _);
    } else i = ue_1.KuroHttp.GetDefaultHeader();
    if (u) {
      const c = (e, t, s) => {
        u(e, t, s), (0, puerts_1.releaseManualReleaseDelegate)(c);
      };
      ue_1.KuroHttp.Post(e, i, t, (0, puerts_1.toManualReleaseDelegate)(c), r);
    } else ue_1.KuroHttp.Post(e, i, t, void 0);
  }
  static async PostAsync(t, s, r, i) {
    return new Promise((u, e) => {
      LauncherHttp.Post(
        t,
        s,
        r,
        (e, t, s) => {
          u({ Success: e, Code: t, Data: s });
        },
        i,
      );
    });
  }
  static SetHttpThreadActiveMinimumSleepTimeInSeconds(e) {
    ue_1.KuroStaticLibrary.SetHttpThreadActiveMinimumSleepTimeInSeconds(e);
  }
  static SetHttpThreadIdleMinimumSleepTimeInSeconds(e) {
    ue_1.KuroStaticLibrary.SetHttpThreadIdleMinimumSleepTimeInSeconds(e);
  }
}
exports.LauncherHttp = LauncherHttp;
//# sourceMappingURL=LauncherHttp.js.map
