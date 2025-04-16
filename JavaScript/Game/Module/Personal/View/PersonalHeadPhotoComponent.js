"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalHeadPhotoComponent = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalRoleSmallItemGrid_1 = require("./PersonalRoleSmallItemGrid");
class PersonalHeadPhotoComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.PlayerHeadDataList = []),
      (this.P7e = void 0),
      (this.OnClickConfirm = () => {
        PersonalController_1.PersonalController.SendChangeHeadPhotoRequest(
          this.p3l.Id,
        ),
          UiManager_1.UiManager.CloseView("PersonalEditView"),
          UiManager_1.UiManager.CloseView("PersonalOptionView");
      }),
      (this.Y5i = () => {
        var e = new PersonalRoleSmallItemGrid_1.PersonalRoleSmallItemGrid();
        return e.BindToggleClickCallBack(this.sVi), e;
      }),
      (this.sVi = (e) => {
        this.aVi(e);
      });
  }
  get p3l() {
    var e = this.xqe.GetGenericLayout().GetSelectedGridIndex();
    if (!(e < 0 || e >= this.PlayerHeadDataList.length))
      return this.PlayerHeadDataList[e];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    (this.PlayerHeadDataList =
      ModelManager_1.ModelManager.PersonalModel.GetPlayerShowHeadDataList()),
      (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.Y5i,
      ));
  }
  async OnBeforeShowAsyncImplement() {
    if (
      ((this.PlayerHeadDataList =
        ModelManager_1.ModelManager.PersonalModel.GetPlayerShowHeadDataList()),
      0 < this.PlayerHeadDataList.length)
    ) {
      await this.xqe.RefreshByDataAsync(this.PlayerHeadDataList);
      const i = ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId();
      var e = this.PlayerHeadDataList.findIndex((e) => e.Id === i);
      this.xqe.ScrollTo(this.xqe.GetItemByIndex(e)),
        this.aVi(this.PlayerHeadDataList[e]);
    }
  }
  SetRefreshConfirmBtn(e) {
    this.P7e = e;
  }
  aVi(i) {
    var e = this.PlayerHeadDataList.findIndex((e) => e === i),
      e =
        (this.xqe?.GetGenericLayout()?.SelectGridProxy(e),
        ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId()),
      t = !i.Lock && e !== i.Id;
    this.P7e && this.P7e(t, e === i.Id);
    const r = this.GetTexture(1);
    r.SetUIActive(!1),
      this.SetTextureShowUntilLoaded(i.GetRoleHeadIconCircle(), r, () => {
        r.SetUIActive(!0);
      }),
      this.GetText(2).ShowTextNew(i.GetName());
    t = this.GetText(3);
    t.SetUIActive(i.Lock),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i.Config.Tips);
  }
}
exports.PersonalHeadPhotoComponent = PersonalHeadPhotoComponent;
//# sourceMappingURL=PersonalHeadPhotoComponent.js.map
