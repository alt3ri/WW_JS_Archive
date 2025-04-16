"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalEditView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PersonalCardComponent_1 = require("./PersonalCardComponent"),
  PersonalEditTabItem_1 = require("./PersonalEditTabItem"),
  PersonalHeadPhotoComponent_1 = require("./PersonalHeadPhotoComponent"),
  PersonalPlayerTitleComponent_1 = require("./PersonalPlayerTitleComponent");
class PersonalEditView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.tVi = 0),
      (this.B7t = void 0),
      (this.z5i = void 0),
      (this.Z5i = void 0),
      (this.J0c = void 0),
      (this.p5i = void 0),
      (this.m8t = void 0),
      (this.Z0c = () => {
        var t = new PersonalEditTabItem_1.PersonalEditTabItem();
        return t.SetToggleCallBack(this.TabItemToggleClick), t;
      }),
      (this.TabItemToggleClick = (t, e) => {
        this.B7t.SelectGridProxy(t), this.ShowContent(e);
      }),
      (this.RefreshBtnConfirm = (t, e) => {
        this.GetInteractionGroup(5).SetInteractable(t);
        let i = "";
        (i =
          2 === this.tVi
            ? e
              ? "Text_PhantomTakeOff_Text"
              : "ConfirmBox_173_ButtonText_1"
            : e
              ? "Text_InUse_Text"
              : "ConfirmBox_173_ButtonText_1"),
          this.m8t.SetLocalTextNew(i);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIInteractionGroup],
    ];
  }
  async OnBeforeStartAsync() {
    (this.tVi = this.OpenParam),
      (this.p5i =
        ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData()),
      (this.m8t = new ButtonItem_1.ButtonItem(this.GetButton(3).RootUIComp)),
      (this.B7t = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.Z0c,
      ));
    var t = [],
      e = (t.push(0), ModelManager_1.ModelManager.FunctionModel.IsOpen(10061)),
      e =
        (e && t.push(1),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10082)),
      e =
        (e && t.push(2),
        await this.B7t.RefreshByDataAsync(t),
        t.findIndex((t) => t === this.tVi));
    this.B7t.SelectGridProxy((e = e < 0 ? 0 : e)),
      await this.ShowContent(this.tVi);
  }
  async ShowContent(t) {
    switch (
      ((this.tVi = t),
      this.Z5i?.SetActive(!1),
      this.z5i?.SetActive(!1),
      this.J0c?.SetActive(!1),
      t)
    ) {
      case 0:
        this.Z5i
          ? this.Z5i.SetActive(!0)
          : ((this.Z5i =
              new PersonalHeadPhotoComponent_1.PersonalHeadPhotoComponent()),
            this.Z5i.SetRefreshConfirmBtn(this.RefreshBtnConfirm),
            await this.Z5i.CreateThenShowByResourceIdAsync(
              "UiItem_EditHead",
              this.GetItem(4),
            )),
          this.m8t?.SetFunction(this.Z5i.OnClickConfirm);
        break;
      case 1:
        this.z5i
          ? this.z5i.SetActive(!0)
          : ((this.z5i = new PersonalCardComponent_1.PersonalCardComponent(
              void 0,
              !1,
              this.p5i,
            )),
            this.z5i.SetRefreshConfirmBtn(this.RefreshBtnConfirm),
            await this.z5i.CreateThenShowByResourceIdAsync(
              "UiItem_EditCard",
              this.GetItem(4),
            )),
          this.m8t?.SetFunction(this.z5i.OnClickConfirm);
        break;
      case 2:
        this.J0c
          ? this.J0c.SetActive(!0)
          : ((this.J0c =
              new PersonalPlayerTitleComponent_1.PersonalPlayerTitleComponent()),
            this.J0c.SetPersonalInfoData(this.p5i),
            this.J0c.SetRefreshConfirmBtn(this.RefreshBtnConfirm),
            await this.J0c.CreateThenShowByResourceIdAsync(
              "UiItem_EditTitles",
              this.GetItem(4),
            )),
          this.m8t?.SetFunction(this.J0c.OnClickConfirm);
    }
    this.UpdateCollectNum();
  }
  UpdateCollectNum() {
    let t = 0;
    switch (this.tVi) {
      case 0:
        t = ModelManager_1.ModelManager.PersonalModel.GetUnlockHeadNum();
        break;
      case 1:
        t = this.p5i.GetUnlockCardDataCount();
        break;
      case 2:
        t = ModelManager_1.ModelManager.PersonalModel.GetUnlockTitleDataCount();
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "Collected", t);
  }
  OnClickedConfirm() {}
  OnBeforeDestroy() {
    this.Z5i?.Destroy(),
      (this.Z5i = void 0),
      this.z5i?.Destroy(),
      (this.z5i = void 0),
      this.J0c?.Destroy(),
      (this.J0c = void 0);
  }
}
exports.PersonalEditView = PersonalEditView;
//# sourceMappingURL=PersonalEditView.js.map
