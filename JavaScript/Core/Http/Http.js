"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Http = void 0);
const puerts_1 = require("puerts");
const ue_1 = require("ue");
class Http {
  static Get(e, t, s) {
    let u = void 0;
    if (t) {
      u = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (const [_, r] of t) u.Add(_, r);
    } else u = ue_1.KuroHttp.GetDefaultHeader();
    if (s) {
      const o = (e, t, u) => {
        s(e, t, u), (0, puerts_1.releaseManualReleaseDelegate)(o);
      };
      ue_1.KuroHttp.Get(e, u, (0, puerts_1.toManualReleaseDelegate)(o));
    } else ue_1.KuroHttp.Get(e, u, void 0);
  }
  static Post(e, t, u, s) {
    let _ = void 0;
    if (u) {
      _ = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (const [r, o] of u) _.Add(r, o);
    } else _ = ue_1.KuroHttp.GetDefaultHeader();
    if (s) {
      const i = (e, t, u) => {
        s(e, t, u), (0, puerts_1.releaseManualReleaseDelegate)(i);
      };
      ue_1.KuroHttp.Post(e, _, t, (0, puerts_1.toManualReleaseDelegate)(i));
    } else ue_1.KuroHttp.Post(e, _, t, void 0);
  }
}
exports.Http = Http;
// # sourceMappingURL=Http.js.map
