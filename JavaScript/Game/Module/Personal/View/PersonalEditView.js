"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalEditView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PersonalCardComponent_1 = require("./PersonalCardComponent"),
  PersonalHeadPhotoComponent_1 = require("./PersonalHeadPhotoComponent");
class PersonalEditView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.z5i = void 0),
      (this.Z5i = void 0),
      (this.eVi = void 0),
      (this.g8t = void 0),
      (this.tVi = 0),
      (this.iVi = () => {
        this.Z5i.SetActive(!0), this.z5i.SetActive(!1);
      }),
      (this.oVi = () => {
        this.Z5i.SetActive(!1), this.z5i.SetActive(!0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.iVi],
        [3, this.oVi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.tVi = this.OpenParam),
      (this.eVi = this.GetItem(0)),
      (this.g8t = this.GetItem(1)),
      (this.z5i = new PersonalCardComponent_1.PersonalCardComponent(
        this.eVi,
        !1,
        ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData(),
      )),
      (this.Z5i =
        new PersonalHeadPhotoComponent_1.PersonalHeadPhotoComponent()),
      await this.Z5i.CreateThenShowByActorAsync(this.g8t.GetOwner());
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10061);
    this.GetExtendToggle(3).RootUIComp.SetUIActive(e),
      (this.tVi = e ? this.tVi : 0),
      RedDotController_1.RedDotController.BindRedDot(
        "PersonalCard",
        this.GetItem(4),
      ),
      1 === this.tVi
        ? (this.GetExtendToggle(3).SetToggleState(1),
          this.GetExtendToggle(2).SetToggleState(0),
          this.oVi())
        : 0 === this.tVi &&
          (this.GetExtendToggle(3).SetToggleState(0),
          this.GetExtendToggle(2).SetToggleState(1),
          this.iVi());
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "PersonalCard",
      this.GetItem(4),
    ),
      (this.eVi = void 0),
      (this.g8t = void 0),
      this.z5i.Destroy(),
      this.Z5i.Destroy();
  }
}
exports.PersonalEditView = PersonalEditView;
//# sourceMappingURL=PersonalEditView.js.map
