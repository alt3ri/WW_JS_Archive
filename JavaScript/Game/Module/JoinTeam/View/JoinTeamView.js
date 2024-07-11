"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JoinTeamView = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  MiniElementItem_1 = require("../../Common/MiniElementItem"),
  JoinTeamController_1 = require("../JoinTeamController"),
  RoleController_1 = require("../../RoleUi/RoleController");
class JoinTeamView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Vfi = void 0),
      (this.Hfi = !1),
      (this.jfi = () => {
        var e = ModelManager_1.ModelManager.RoleModel,
          i = ModelManager_1.ModelManager.JoinTeamModel.GetRoleDescriptionId(),
          i = ConfigManager_1.ConfigManager.JoinTeamConfig.GetRoleConfigId(i),
          e = e.GetRoleDataById(i);
        JoinTeamController_1.JoinTeamController.CloseJoinTeamView(),
          e &&
            RoleController_1.RoleController.OpenRoleMainView(0, e.GetRoleId());
      }),
      (this.Vgt = () => {
        JoinTeamController_1.JoinTeamController.CloseJoinTeamView();
      }),
      (this.Wfi = () => {
        this.Kfi();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UINiagara],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.jfi],
        [6, this.Vgt],
      ]);
  }
  OnStart(e = !1) {
    (this.Hfi = e),
      this.GetTexture(1)?.SetUIActive(!1),
      this.GetButton(4)?.RootUIComp.SetUIActive(!e),
      this.Kfi(),
      this.Ore();
  }
  OnBeforeDestroy() {
    this.kre(), this.Vfi && (this.Vfi.Destroy(), (this.Vfi = void 0));
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshJoinTeamRole,
      this.Wfi,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshJoinTeamRole,
      this.Wfi,
    );
  }
  Kfi() {
    var e,
      i,
      t,
      r,
      s = ModelManager_1.ModelManager.JoinTeamModel.GetRoleDescriptionId();
    s &&
      ((e = (r = ConfigManager_1.ConfigManager.JoinTeamConfig).GetRoleNameId(
        s,
      )),
      (i = r.GetRoleTexturePath(s)),
      (t = r.GetRoleElementId(s)),
      (r = r.GetRoleDescriptionId(s)),
      this.Qfi(t),
      this.Xfi(i),
      this.$fi(e),
      this.Yfi(r),
      this.GetUiNiagara(2).ActivateSystem(!0),
      this.Jfi());
  }
  Qfi(e) {
    var i = this.GetItem(5).GetOwner();
    this.Vfi = new MiniElementItem_1.MiniElementItem(e, void 0, i);
  }
  $fi(e) {
    this.GetText(0).ShowTextNew(e);
  }
  Xfi(e) {
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e) => {
      this.GetTexture(1)?.SetTexture(e), this.GetTexture(1)?.SetUIActive(!0);
    });
  }
  Yfi(e) {
    this.GetText(3).ShowTextNew(e);
  }
  Jfi() {
    this.GetItem(7)?.SetUIActive(this.Hfi);
  }
}
exports.JoinTeamView = JoinTeamView;
//# sourceMappingURL=JoinTeamView.js.map
