"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalHeadPhotoComponent = void 0);
const UE = require("ue"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
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
      (this.RoleIdList = []),
      (this.rVi = (e, i) => {
        var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id),
          t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i.Id);
        return (void 0 !== r && void 0 !== t) || (void 0 === r && void 0 === t)
          ? e.Id - i.Id
          : void 0 === t
            ? -1
            : 1;
      }),
      (this.p5t = () => {
        PersonalController_1.PersonalController.SendChangeHeadPhotoRequest(
          this.nVi,
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
  get nVi() {
    var e = this.xqe.GetGenericLayout().GetSelectedGridIndex();
    return e < 0 || e >= this.RoleIdList.length ? 0 : this.RoleIdList[e];
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UITexture],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIInteractionGroup],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.p5t]]);
  }
  async OnBeforeStartAsync() {
    if (
      (this.InitRoleList(),
      (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.Y5i,
      )),
      0 < this.RoleIdList.length)
    ) {
      await this.xqe.RefreshByDataAsync(this.RoleIdList);
      const o = ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId();
      var e = this.RoleIdList.findIndex((e) => e === o);
      this.xqe.ScrollTo(this.xqe.GetItemByIndex(e)), this.aVi(o);
    }
    var i = this.RoleIdList.length;
    let r = 0;
    for (let e = 0; e < i; e++) {
      var t = this.RoleIdList[e];
      ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t) && r++,
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "Collected", r);
    }
  }
  InitRoleList() {
    var i = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1),
      ),
      r = (i.sort(this.rVi), i.length);
    this.RoleIdList = [];
    for (let e = 0; e < r; e++) {
      var t = i[e];
      t.IsTrial ||
        (ModelManager_1.ModelManager.RoleModel.IsMainRole(t.Id) &&
          ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() !==
            t.Id) ||
        this.RoleIdList.push(t.Id);
    }
  }
  aVi(i) {
    var e = this.RoleIdList.findIndex((e) => e === i),
      e =
        (this.xqe?.GetGenericLayout()?.SelectGridProxy(e),
        ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId()),
      r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i),
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i),
      r = void 0 !== r,
      e =
        (this.GetInteractionGroup(4).SetInteractable(r && e !== i),
        e === i ? "Text_InUse_Text" : "ConfirmBox_173_ButtonText_1");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e),
      this.SetRoleIcon(t.RoleHeadIconLarge, this.GetTexture(1), i),
      this.GetText(5).ShowTextNew(t.Name),
      this.GetItem(6).SetUIActive(!r);
  }
}
exports.PersonalHeadPhotoComponent = PersonalHeadPhotoComponent;
//# sourceMappingURL=PersonalHeadPhotoComponent.js.map
