"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueInfoView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  WeeklyRogueTeamInfoPanel_1 = require("../Components/WeeklyRogueTeamInfoPanel"),
  WeeklyRogueTokenInfoPanel_1 = require("../Components/WeeklyRogueTokenInfoPanel"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class WeeklyRogueInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.nV_ = void 0),
      (this.sV_ = void 0),
      (this.dmo = void 0),
      (this.V2i = () => {
        this.CloseMe();
      }),
      (this._V_ = () => {
        ModelManager_1.ModelManager.WeeklyRogueModel.ChangeDescMode();
      }),
      (this.aV_ = () => {
        this.GetExtendToggle(2).SetToggleState(0, !1),
          this.nV_.SetActive(!0),
          this.sV_.SetActive(!1),
          this.GetExtendToggle(5).GetRootComponent()?.SetUIActive(!1),
          this.GetText(6).SetUIActive(!1),
          this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(!0);
      }),
      (this.hV_ = () => {
        this.GetExtendToggle(1).SetToggleState(0, !1),
          this.nV_.SetActive(!1),
          this.sV_.SetActive(!0),
          this.GetExtendToggle(5).GetRootComponent()?.SetUIActive(!0),
          this.GetText(6).SetUIActive(!0),
          this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(!1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIExtendToggle],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.V2i],
        [1, this.aV_],
        [2, this.hV_],
        [5, this._V_],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.nV_ = new WeeklyRogueTeamInfoPanel_1.WeeklyRogueTeamInfoPanel()),
      (this.sV_ = new WeeklyRogueTokenInfoPanel_1.WeeklyRogueTokenInfoPanel()),
      (this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
      await Promise.all([
        this.nV_.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
        this.sV_.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      ]),
      this.GetExtendToggle(1).SetToggleState(1, !1),
      this.GetExtendToggle(2).SetToggleState(0, !1),
      this.nV_.SetActive(!0),
      this.sV_.SetActive(!1),
      this.GetExtendToggle(5).GetRootComponent()?.SetUIActive(!1),
      this.GetText(6).SetUIActive(!1);
    var e = 0 === ModelManager_1.ModelManager.WeeklyRogueModel.DescMode ? 1 : 0;
    this.GetExtendToggle(5).SetToggleState(e);
  }
  OnHandleLoadScene() {
    this.dmo ||
      (this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
      this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo),
      (this.dmo = void 0);
  }
}
exports.WeeklyRogueInfoView = WeeklyRogueInfoView;
//# sourceMappingURL=WeeklyRogueInfoView.js.map
