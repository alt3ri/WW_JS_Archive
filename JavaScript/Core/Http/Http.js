"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Http = exports.HttpResponseData = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  CustomPromise_1 = require("../Common/CustomPromise");
class HttpResponseData {
  constructor(e, t, s) {
    (this.Success = e), (this.Code = t), (this.Data = s);
  }
}
exports.HttpResponseData = HttpResponseData;
class Http {
  static Get(e, t, o) {
    let s = void 0;
    if (t) {
      s = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (var [u, i] of t) s.Add(u, i);
    } else s = ue_1.KuroHttp.GetDefaultHeader();
    if (o) {
      const r = (e, t, s) => {
        o(e, t, s), (0, puerts_1.releaseManualReleaseDelegate)(r);
      };
      ue_1.KuroHttp.Get(e, s, (0, puerts_1.toManualReleaseDelegate)(r));
    } else ue_1.KuroHttp.Get(e, s, void 0);
  }
  static async GetAsync(e, t) {
    const o = new CustomPromise_1.CustomPromise();
    return (
      this.Get(e, t, (e, t, s) => {
        e = new HttpResponseData(e, t, s);
        o.SetResult(e);
      }),
      await o.Promise
    );
  }
  static Post(e, t, s, o) {
    let u = void 0;
    if (s) {
      u = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (var [i, r] of s) u.Add(i, r);
    } else u = ue_1.KuroHttp.GetDefaultHeader();
    if (o) {
      const _ = (e, t, s) => {
        o(e, t, s), (0, puerts_1.releaseManualReleaseDelegate)(_);
      };
      ue_1.KuroHttp.Post(e, u, t, (0, puerts_1.toManualReleaseDelegate)(_));
    } else ue_1.KuroHttp.Post(e, u, t, void 0);
  }
  static SetHttpThreadActiveMinimumSleepTimeInSeconds(e) {
    ue_1.KuroStaticLibrary.SetHttpThreadActiveMinimumSleepTimeInSeconds(e);
  }
  static SetHttpThreadIdleMinimumSleepTimeInSeconds(e) {
    ue_1.KuroStaticLibrary.SetHttpThreadIdleMinimumSleepTimeInSeconds(e);
  }
}
exports.Http = Http;
//# sourceMappingURL=Http.js.map
