"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskWeaponRoot = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskWeaponRoot extends SkipTask_1.SkipTask {
  OnRun(e) {
    var a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    void 0 !== a &&
      ((e = {
        WeaponIncId: e,
        WeaponSkinId:
          ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(
            a.GetRoleId(),
          ),
        IsFromRoleRootView: !1,
      }),
      UiManager_1.UiManager.OpenView("WeaponRootView", e)),
      this.Finish();
  }
}
exports.SkipTaskWeaponRoot = SkipTaskWeaponRoot;
//# sourceMappingURL=SkipTaskWeaponRoot.js.map
