"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiFormationData = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  followerMap = new Map([
    [658750002, 1],
    [658750003, 1],
    [65875e4, 2],
  ]);
class BattleUiFormationData {
  constructor() {
    (this.sXe = void 0),
      (this.EnvironmentPropertyList = []),
      (this.UiEnvironmentPropertyMap = new Map()),
      (this.gU = !1),
      (this.ORn = void 0),
      (this.rJa = 0),
      (this.oJa = !1);
  }
  Init() {
    this.gU = !0;
    var e = CommonParamById_1.configCommonParamById.GetStringConfig(
      "EnvironmentPropertyInfoPath",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, (e) => {
      if (this.gU && (this.sXe = e)) {
        var t = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, t);
        for (const o of t) {
          var i,
            r = Number(o);
          r &&
            ((i = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, o)),
            this.UiEnvironmentPropertyMap.set(r, i),
            this.EnvironmentPropertyList.push(r));
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
  GetUiEnvironmentProperty(e) {
    if (this.gU)
      return GlobalData_1.GlobalData.IsPlayInEditor
        ? DataTableUtil_1.DataTableUtil.GetDataTableRow(this.sXe, e.toString())
        : this.UiEnvironmentPropertyMap.get(e);
  }
  AddFollower(e) {
    e !== this.ORn &&
      (this.FRn(),
      (this.ORn = e),
      (this.rJa = followerMap.get(e.PbDataId) ?? 0),
      (e = e.Entity.GetComponent(204)),
      this.nJa(e?.IsEnable ?? !1));
  }
  RemoveFollower() {
    this.FRn();
  }
  ChangePlayerFollowerEnable(e) {
    this.ORn && this.nJa(e);
  }
  nJa(e) {
    this.oJa !== e &&
      ((this.oJa = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        e,
        0 === this.rJa,
      ),
      1 === this.rJa) &&
      (this.oJa &&
        ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetFollowShootAimVisible,
        e,
      ));
  }
  GetFollowerAiming() {
    return this.oJa && 2 !== this.rJa;
  }
  GetFollowerEnable() {
    return this.oJa;
  }
  GetFollowerEntityHandle() {
    return this.ORn;
  }
  FRn() {
    this.oJa && this.nJa(!1),
      (this.ORn = void 0),
      1 === this.rJa &&
        ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(1),
      (this.rJa = 0);
  }
}
exports.BattleUiFormationData = BattleUiFormationData;
//# sourceMappingURL=BattleUiFormationData.js.map
