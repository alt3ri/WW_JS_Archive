"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiFormationData = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  GlobalData_1 = require("../../GlobalData");
class BattleUiFormationData {
  constructor() {
    (this.XKe = void 0),
      (this.EnvironmentPropertyList = []),
      (this.UiEnvironmentPropertyMap = new Map()),
      (this.gU = !1);
  }
  Init() {
    this.gU = !0;
    var e = CommonParamById_1.configCommonParamById.GetStringConfig(
      "EnvironmentPropertyInfoPath",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, (t) => {
      if (this.gU && (this.XKe = t)) {
        var e = (0, puerts_1.$ref)(void 0),
          r =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(t, e),
            (0, puerts_1.$unref)(e));
        if (r) {
          var i = r.Num();
          if (!(i <= 0))
            for (let e = 0; e < i; e++) {
              var a = r.Get(e).toString(),
                o = Number(a);
              o &&
                ((a = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, a)),
                this.UiEnvironmentPropertyMap.set(o, a),
                this.EnvironmentPropertyList.push(o));
            }
        }
      }
    });
  }
  OnLeaveLevel() {}
  Clear() {
    (this.gU = !1),
      (this.XKe = void 0),
      (this.EnvironmentPropertyList.length = 0),
      this.UiEnvironmentPropertyMap.clear();
  }
  GetUiEnvironmentProperty(e) {
    if (this.gU)
      return GlobalData_1.GlobalData.IsPlayInEditor
        ? DataTableUtil_1.DataTableUtil.GetDataTableRow(this.XKe, e.toString())
        : this.UiEnvironmentPropertyMap.get(e);
  }
}
exports.BattleUiFormationData = BattleUiFormationData;
//# sourceMappingURL=BattleUiFormationData.js.map
