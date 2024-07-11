"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessHelperPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  EditTeamModule_1 = require("../Common/EditTeamModule");
class BusinessHelperPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.EditTeamModule = void 0),
      (this.SelectedRoleId = 0),
      (this.RoleList = []),
      (this.zGn = void 0),
      (this.Mke = () => {
        this.zGn?.SkipToInteractivePanel();
      }),
      (this.Yga = () => {
        var e,
          i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
            this.SelectedRoleId,
          );
        1 === i.JumpType
          ? this.zGn?.SkipToTaskView(1, i.Id)
          : 2 === i.JumpType &&
            (0 ===
            ModelManager_1.ModelManager.MoonChasingTaskModel.GetBranchLineState(
              i.JumpParam,
            )
              ? (e =
                  ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingIdByRoleId(
                    i.Id,
                  )) <= 0
                ? this.zGn?.SkipToBuildingPreview()
                : this.zGn?.SkipToBuildingView(e)
              : this.zGn?.SkipToTaskView(2, i.Id));
      }),
      (this.qke = (e, i, s) => {
        var t = this.SelectedRoleId,
          h =
            ((this.SelectedRoleId = e),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
              e,
            ));
        this.GetButton(1)?.RootUIComp.SetUIActive(h.IsOwn),
          this.GetButton(2)?.RootUIComp.SetUIActive(!h.IsOwn),
          0 !== t && this.EditTeamModule.SelectEditTeamItem(s),
          this.zGn?.RefreshSpine(e).finally(void 0);
      }),
      (this.Lke = (e, i) => this.SelectedRoleId !== e || 1 !== i),
      (this.fda = (e) => this.SelectedRoleId === e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.Mke],
        [2, this.Yga],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.EditTeamModule = new EditTeamModule_1.EditTeamModule()),
      this.EditTeamModule.SetClickEvent(this.qke),
      this.EditTeamModule.SetCanExecuteChange(this.Lke),
      this.EditTeamModule.SetIsItemSelected(this.fda),
      await this.EditTeamModule.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      ),
      this.EditTeamModule.SetTitleItemActive(!1);
  }
  async OnBeforeShowAsyncImplement() {
    (this.RoleList =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList()),
      this.EditTeamModule.SetEditTeamDataList(this.RoleList),
      await this.EditTeamModule.RefreshEditTeamModule(),
      this.EditTeamModule.SelectEditTeamItem(
        this.EditTeamModule.GetSelectGridIndex(),
        !0,
      );
  }
  RegisterViewController(e) {
    this.zGn = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return this.EditTeamModule.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.BusinessHelperPanel = BusinessHelperPanel;
//# sourceMappingURL=BusinessHelperPanel.js.map
