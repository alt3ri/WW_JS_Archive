"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleResonanceTabViewNew = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RoleController_1 = require("../RoleController");
class RoleResonanceTabViewNew extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.d1o = void 0),
      (this.aCo = void 0),
      (this.Vdo = (e) => {
        (this.aCo = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
          this.PlayMontageStart(),
          this.FTt();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  UnBindRedDot() {
    this.aCo.IsTrialRole() ||
      RedDotController_1.RedDotController.UnBindRedDot("RoleResonanceTabHole");
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Vdo,
    );
  }
  OnStart() {
    (this.d1o = this.OpenParam),
      void 0 === this.d1o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleResonanceTabViewNew",
          ])
        : ((this.aCo = this.d1o.GetCurSelectRoleData()),
          this.PlayMontageStart());
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(7);
  }
  OnBeforeShow() {
    this.FTt();
  }
  FTt() {
    var e = this.aCo.GetRoleConfig(),
      t = this.GetText(0),
      e =
        ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
          e.ResonantChainGroupId,
        ),
      e =
        (t.SetText(
          this.aCo.GetResonanceData().GetResonantChainGroupIndex() +
            "/" +
            e.length,
        ),
        this.GetItem(1).SetUIActive(!this.aCo.IsTrialRole()),
        UiManager_1.UiManager.IsViewShow("RoleHandBookRootView"));
    e &&
      t.GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(!1);
  }
  OnBeforeHide() {
    this.UnBindRedDot();
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Vdo,
    );
  }
}
exports.RoleResonanceTabViewNew = RoleResonanceTabViewNew;
//# sourceMappingURL=RoleResonanceTabViewNew.js.map
