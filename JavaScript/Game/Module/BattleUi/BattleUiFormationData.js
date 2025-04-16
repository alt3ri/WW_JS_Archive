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
      (this.doh = 0),
      (this.Coh = !1),
      (this.Juc = !1),
      (this.$d1 = !1);
  }
  Init() {
    this.gU = !0;
    var t = CommonParamById_1.configCommonParamById.GetStringConfig(
      "EnvironmentPropertyInfoPath",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, (t) => {
      if (this.gU && (this.sXe = t)) {
        var e = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(t, e);
        for (const o of e) {
          var i,
            r = Number(o);
          r &&
            ((i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, o)),
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
      this.FRn(),
      (this.AutoMovingSettingEnable = !1);
  }
  GetUiEnvironmentProperty(t) {
    if (this.gU)
      return GlobalData_1.GlobalData.IsPlayInEditor
        ? DataTableUtil_1.DataTableUtil.GetDataTableRow(this.sXe, t.toString())
        : this.UiEnvironmentPropertyMap.get(t);
  }
  AddFollower(e) {
    if (e !== this.ORn) {
      this.FRn();
      var i = (this.ORn = e).Entity.GetComponent(219);
      let t = i?.AimType;
      (t = t || (followerMap.get(e.PbDataId) ?? 0)),
        (this.doh = t),
        this.goh(i?.IsEnable ?? !1);
    }
  }
  RemoveFollower() {
    this.FRn();
  }
  ChangePlayerFollowerEnable(t) {
    this.ORn && this.goh(t);
  }
  goh(t) {
    this.Coh !== t &&
      ((this.Coh = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        t,
        0 === this.doh,
      ),
      1 === this.doh
        ? (this.Coh &&
            ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(
              1,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SetFollowShootAimVisible,
            t,
          ))
        : 3 === this.doh
          ? (this.Coh &&
              ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(
                2,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.SetFollowShootAutoAimVisible,
              t,
            ))
          : 4 === this.doh &&
            (this.Coh &&
              ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(
                3,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.SetFollowShootAutoAimVisible,
              t,
            )));
  }
  GetFollowType() {
    return this.doh;
  }
  GetFollowerAiming() {
    return this.Coh && 2 !== this.doh;
  }
  GetFollowerEnable() {
    return this.Coh;
  }
  GetFollowerEntityHandle() {
    return this.ORn;
  }
  FRn() {
    this.Coh && this.goh(!1),
      (this.ORn = void 0),
      1 === this.doh
        ? ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(1)
        : 3 === this.doh
          ? ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(
              2,
            )
          : 4 === this.doh &&
            ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(
              3,
            ),
      (this.doh = 0);
  }
  get AutoMovingSettingEnable() {
    return this.Juc;
  }
  set AutoMovingSettingEnable(t) {
    this.Juc !== t &&
      ((this.Juc = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AutoMovingSettingChanged,
        t,
      ));
  }
  get AutoSprintSettingEnable() {
    return this.$d1;
  }
  set AutoSprintSettingEnable(t) {
    this.$d1 !== t &&
      ((this.$d1 = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AutoSprintSettingChanged,
        t,
      ));
  }
}
exports.BattleUiFormationData = BattleUiFormationData;
//# sourceMappingURL=BattleUiFormationData.js.map
