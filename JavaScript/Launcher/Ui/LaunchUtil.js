"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LaunchUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherResourceLib_1 = require("../Util/LauncherResourceLib");
class LaunchUtil {
  static GetDataTableMap(e, r) {
    var t = new Map(),
      u = (0, puerts_1.$ref)(void 0),
      a =
        (UE.DataTableFunctionLibrary.GetDataTableRowNames(e, u),
        (0, puerts_1.$unref)(u)),
      s = UE.DataTableFunctionLibrary.GetDataTableColumnAsString(
        e,
        new UE.FName(r),
      );
    for (let e = 0; e < a.Num(); e++) {
      var c = a.Get(e).toString(),
        o = s.Get(e);
      t.set(c, o);
    }
    return t;
  }
  static async LoadResourceAsync(e, t, u, a) {
    return new Promise((r) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        e,
        UE.PrefabAsset,
        (e) => {
          e = UE.LGUIBPLibrary.LoadPrefabWithAsset(t, e, u);
          a && a(e), r(e);
        },
      );
    });
  }
}
(exports.LaunchUtil = LaunchUtil).UiRootPath =
  "/Game/Aki/UI/Module/HotFix/Prefab/ScreenSpaceUIRoot.ScreenSpaceUIRoot";
//# sourceMappingURL=LaunchUtil.js.map
