"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponPreviewView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const WeaponController_1 = require("../WeaponController");
const WeaponDetailTipsComponent_1 = require("../WeaponDetailTipsComponent");
const WeaponListComponent_1 = require("../WeaponListComponent");
class WeaponPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.qki = void 0),
      (this.Gki = void 0),
      (this.lqe = void 0),
      (this.wvo = () => {
        UiManager_1.UiManager.CloseView("WeaponPreviewView");
      }),
      (this.kki = () => {
        const e = this.Gki.GetCurSelectedData();
        this.qki.UpdateComponent(e),
          WeaponController_1.WeaponController.OnSelectedWeaponChange(
            e,
            this.Nki,
            this.Oki,
          );
      }),
      (this.Nki = void 0),
      (this.Oki = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  async OnBeforeStartAsync() {
    (this.qki = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      await this.qki.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.qki.SetCanShowEquip(!1),
      (this.Gki = new WeaponListComponent_1.WeaponListComponent()),
      this.Gki.Init(this.GetScrollViewWithScrollbar(2)),
      this.Gki.SetWeaponChangeCallBack(this.kki),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1))),
      this.lqe.SetCloseCallBack(this.wvo);
    const e = this.OpenParam.WeaponDataList;
    e && e.length !== 0 && (await this.Gki.UpdateDataList(e));
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
    const e = this.OpenParam;
    this.Gki?.SetCurSelect(e.SelectedIndex);
  }
  OnAfterHide() {
    this.Gki?.CancelSelect(),
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0);
  }
  OnBeforeCreate() {
    const e = this.OpenParam?.WeaponObservers;
    e
      ? ((this.Nki = e.WeaponObserver), (this.Oki = e.WeaponScabbardObserver))
      : ((this.Nki = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
        (this.Oki =
          UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver()));
  }
  OnBeforeDestroy() {
    this.OpenParam?.WeaponObservers ||
      (UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.Nki),
      (this.Nki = void 0),
      UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.Oki),
      (this.Oki = void 0));
  }
}
exports.WeaponPreviewView = WeaponPreviewView;
// # sourceMappingURL=WeaponPreviewView.js.map
