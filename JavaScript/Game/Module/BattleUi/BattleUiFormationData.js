"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiFormationData = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData");
class BattleUiFormationData {
  constructor() {
    (this.sXe = void 0),
      (this.EnvironmentPropertyList = []),
      (this.UiEnvironmentPropertyMap = new Map()),
      (this.gU = !1),
      (this.NRn = void 0),
      (this.ORn = void 0),
      (this.aHs = !1),
      (this.kRn = (t, e) => {
        this.hHs(e);
      });
  }
  Init() {
    this.gU = !0;
    var t = CommonParamById_1.configCommonParamById.GetStringConfig(
      "EnvironmentPropertyInfoPath",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, (e) => {
      if (this.gU && (this.sXe = e)) {
        var t = (0, puerts_1.$ref)(void 0),
          i =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(e, t),
            (0, puerts_1.$unref)(t));
        if (i) {
          var r = i.Num();
          if (!(r <= 0))
            for (let t = 0; t < r; t++) {
              var s = i.Get(t).toString(),
                o = Number(s);
              o &&
                ((s = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, s)),
                this.UiEnvironmentPropertyMap.set(o, s),
                this.EnvironmentPropertyList.push(o));
            }
        }
      }
    });
  }
  OnLeaveLevel() {}
  Clear() {
    (this.gU = !1),
      (this.sXe = void 0),
      (this.EnvironmentPropertyList.length = 0),
      this.UiEnvironmentPropertyMap.clear(),
      this.FRn();
  }
  GetUiEnvironmentProperty(t) {
    if (this.gU)
      return GlobalData_1.GlobalData.IsPlayInEditor
        ? DataTableUtil_1.DataTableUtil.GetDataTableRow(this.sXe, t.toString())
        : this.UiEnvironmentPropertyMap.get(t);
  }
  AddFollower(t) {
    t !== this.ORn &&
      (this.FRn(),
      (t = (this.ORn = t).Entity.GetComponent(188)),
      (this.NRn = t.ListenForTagAddOrRemove(-1058855731, this.kRn)),
      this.hHs(t.HasTag(-1058855731)));
  }
  RemoveFollower() {
    this.FRn();
  }
  hHs(t) {
    this.aHs !== t &&
      ((this.aHs = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        t,
      ));
  }
  GetFollowerAiming() {
    return this.aHs;
  }
  FRn() {
    this.NRn && this.NRn.EndTask(),
      (this.NRn = void 0),
      (this.ORn = void 0),
      this.aHs && this.hHs(!1);
  }
}
exports.BattleUiFormationData = BattleUiFormationData;
//# sourceMappingURL=BattleUiFormationData.js.map
