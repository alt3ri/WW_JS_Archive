"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCache = void 0);
const LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityData_1 = require("./ActivityData");
class ActivityCache {
  constructor() {
    this.nNe = new Map();
  }
  InitData() {
    this.nNe =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.Activity,
      ) ?? new Map();
  }
  OnReceiveActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap();
    const t = new Array();
    e.forEach((e, a) => {
      e = e.GetCacheKey();
      t.push(e);
    });
    var a = Array.from(this.nNe.keys()),
      r = a.length;
    for (let e = 0; e < r; e++) t.includes(a[e]) || this.nNe.delete(a[e]);
  }
  SaveData() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Activity,
      this.nNe,
    );
  }
  SaveCacheData(e, a, t, r, i) {
    let o = this.nNe.get(e.GetCacheKey());
    o || ((o = new Array()), this.nNe.set(e.GetCacheKey(), o));
    var c = 1e5 * a + 1e3 * t + 100 * r;
    let n = !1;
    var s = o.length;
    for (let e = 0; e < s; e++) o[e].Key === c && ((o[e].Value = i), (n = !0));
    n ||
      (((a = new ActivityData_1.ActivityCacheData()).Key = c),
      (a.Value = i),
      o.push(a)),
      this.nNe.set(e.GetCacheKey(), o),
      this.SaveData();
  }
  GetCacheData(e, a, t, r, i) {
    var o = this.nNe.get(e.GetCacheKey());
    if (o) {
      var c = o.length,
        n = 1e5 * t + 1e3 * r + 100 * i;
      for (let e = 0; e < c; e++) if (o[e].Key === n) return o[e].Value;
    }
    return a;
  }
}
exports.ActivityCache = ActivityCache;
//# sourceMappingURL=ActivityCache.js.map
