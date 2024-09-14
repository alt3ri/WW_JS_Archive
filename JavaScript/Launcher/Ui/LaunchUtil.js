"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LaunchUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherResourceLib_1 = require("../Util/LauncherResourceLib");
class LaunchUtil {
  static GetDataTableMap(e, r) {
    var t = new Map(),
      a = (0, puerts_1.$ref)(void 0),
      s =
        (UE.DataTableFunctionLibrary.GetDataTableRowNames(e, a),
        (0, puerts_1.$unref)(a)),
      u = UE.DataTableFunctionLibrary.GetDataTableColumnAsString(
        e,
        new UE.FName(r),
      );
    for (let e = 0; e < s.Num(); e++) {
      var c = s.Get(e).toString(),
        o = u.Get(e);
      t.set(c, o);
    }
    return t;
  }
  static async LoadResourceAsync(e, t, a, s) {
    return new Promise((r) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        e,
        UE.PrefabAsset,
        (e) => {
          e = UE.LGUIBPLibrary.LoadPrefabWithAsset(t, e, a);
          s && s(e), r(e);
        },
      );
    });
  }
  static ObjToMap(e) {
    var r = new Map();
    for (const a in e) {
      var t = Number(a);
      isNaN(t) || r.set(t, e[a]);
    }
    return r;
  }
}
(exports.LaunchUtil = LaunchUtil).UiRootPath =
  "/Game/Aki/UI/Module/HotFix/Prefab/ScreenSpaceUIRoot.ScreenSpaceUIRoot";
//# sourceMappingURL=LaunchUtil.js.map
