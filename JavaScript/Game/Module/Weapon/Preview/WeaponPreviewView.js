"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponPreviewView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  WeaponController_1 = require("../WeaponController"),
  WeaponDetailTipsComponent_1 = require("../WeaponDetailTipsComponent"),
  WeaponListComponent_1 = require("../WeaponListComponent");
class WeaponPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.q2i = void 0),
      (this.G2i = void 0),
      (this.lqe = void 0),
      (this.Sjs = !0),
      (this.AMo = () => {
        UiManager_1.UiManager.CloseView("WeaponPreviewView");
      }),
      (this.k2i = () => {
        let e = this.G2i.GetCurSelectedData();
        var i,
          t = e.GetFullLevelWeaponData();
        void 0 === t
          ? this.lqe.SetToggleVisible(!1)
          : (this.lqe.SetToggleVisible(!0),
            (i = 1 === this.lqe.GetToggleState()),
            (e = i ? t : e)),
          this.q2i.UpdateComponent(e),
          WeaponController_1.WeaponController.OnSelectedWeaponChange(
            e,
            this.N2i,
            this.O2i,
            this.Sjs,
          );
      }),
      (this.N2i = void 0),
      (this.O2i = void 0),
      (this.gzs = (e) => {
        let i = this.G2i.GetCurSelectedData();
        var t = i.GetFullLevelWeaponData();
        1 === e && t && (i = t),
          this.q2i.UpdateComponent(i),
          WeaponController_1.WeaponController.OnSelectedWeaponChange(
            i,
            this.N2i,
            this.O2i,
            this.Sjs,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  async OnBeforeStartAsync() {
    (this.q2i = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      await this.q2i.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.q2i.SetCanShowEquip(!1),
      (this.G2i = new WeaponListComponent_1.WeaponListComponent()),
      this.G2i.Init(this.GetScrollViewWithScrollbar(2)),
      this.G2i.SetWeaponChangeCallBack(this.k2i),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1))),
      await this.lqe.CreateToggleTab(this.gzs),
      this.lqe.SetToggleName("PrefabTextItem_3652268202_Text"),
      this.lqe.SetCloseCallBack(this.AMo);
    var e = this.OpenParam.WeaponDataList;
    e && 0 !== e.length && (await this.G2i.UpdateDataList(e));
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
    var e = this.OpenParam;
    this.G2i?.SetCurSelect(e.SelectedIndex);
  }
  OnAfterHide() {
    this.G2i?.CancelSelect(),
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0);
  }
  OnBeforeCreate() {
    var e = this.OpenParam?.WeaponObservers;
    e
      ? ((this.N2i = e.WeaponObserver), (this.O2i = e.WeaponScabbardObserver))
      : ((this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver(
          this.Sjs,
        )),
        (this.O2i =
          UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver()));
  }
  OnBeforeDestroy() {
    this.OpenParam?.WeaponObservers ||
      (UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.N2i),
      (this.N2i = void 0),
      UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.O2i),
      (this.O2i = void 0));
  }
}
exports.WeaponPreviewView = WeaponPreviewView;
//# sourceMappingURL=WeaponPreviewView.js.map
