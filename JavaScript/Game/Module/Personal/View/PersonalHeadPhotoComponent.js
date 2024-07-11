"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalHeadPhotoComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalRoleSmallItemGrid_1 = require("./PersonalRoleSmallItemGrid"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
class PersonalHeadPhotoComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.RoleIdList = []),
      (this.n5i = (e, i) => {
        var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id),
          o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i.Id);
        return (void 0 !== r && void 0 !== o) || (void 0 === r && void 0 === o)
          ? e.Id - i.Id
          : void 0 === o
            ? -1
            : 1;
      }),
      (this.p4t = () => {
        PersonalController_1.PersonalController.SendChangeHeadPhotoRequest(
          this.s5i,
        ),
          UiManager_1.UiManager.CloseView("PersonalEditView"),
          UiManager_1.UiManager.CloseView("PersonalOptionView");
      }),
      (this.J4i = () => {
        var e = new PersonalRoleSmallItemGrid_1.PersonalRoleSmallItemGrid();
        return e.BindToggleClickCallBack(this.a5i), e;
      }),
      (this.a5i = (e) => {
        this.h5i(e);
      });
  }
  get s5i() {
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
    ]),
      (this.BtnBindInfo = [[2, this.p4t]]);
  }
  async OnBeforeStartAsync() {
    if (
      (this.InitRoleList(),
      (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.J4i,
      )),
      0 < this.RoleIdList.length)
    ) {
      await this.xqe.RefreshByDataAsync(this.RoleIdList);
      const t = ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId();
      var e = this.RoleIdList.findIndex((e) => e === t);
      this.xqe.ScrollTo(this.xqe.GetItemByIndex(e)), this.h5i(t);
    }
    var i = this.RoleIdList.length;
    let r = 0;
    for (let e = 0; e < i; e++) {
      var o = this.RoleIdList[e];
      ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o) && r++,
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "Collected", r);
    }
  }
  InitRoleList() {
    var i = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1),
      ),
      r = (i.sort(this.n5i), i.length);
    this.RoleIdList = [];
    for (let e = 0; e < r; e++) {
      var o = i[e];
      o.IsTrial ||
        (ModelManager_1.ModelManager.RoleModel.IsMainRole(o.Id) &&
          ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() !==
            o.Id) ||
        this.RoleIdList.push(o.Id);
    }
  }
  h5i(i) {
    var e = this.RoleIdList.findIndex((e) => e === i),
      e =
        (this.xqe?.GetGenericLayout()?.SelectGridProxy(e),
        ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId()),
      r =
        void 0 !== ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
    this.GetInteractionGroup(4).SetInteractable(r && e !== i),
      this.RefreshHeadPhotoInfo(i);
  }
  RefreshHeadPhotoInfo(e) {
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.SetRoleIcon(i.RoleHeadIconLarge, this.GetTexture(1), e);
  }
}
exports.PersonalHeadPhotoComponent = PersonalHeadPhotoComponent;
//# sourceMappingURL=PersonalHeadPhotoComponent.js.map
