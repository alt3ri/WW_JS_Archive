"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassWeaponView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WeaponController_1 = require("../../../../Module/Weapon/WeaponController"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  WeaponDetailTipsComponent_1 = require("../../../Weapon/WeaponDetailTipsComponent"),
  WeaponListComponent_1 = require("../../../Weapon/WeaponListComponent");
class BattlePassWeaponView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.q2i = void 0),
      (this.G2i = void 0),
      (this.N2i = void 0),
      (this.O2i = void 0),
      (this.Mya = 1),
      (this.k2i = () => {
        let e = this.G2i.GetCurSelectedData();
        var t,
          i = e.GetFullLevelWeaponData();
        void 0 !== i && ((t = 1 === this.Mya), (e = t ? i : e)),
          this.q2i.UpdateComponent(e),
          WeaponController_1.WeaponController.OnSelectedWeaponChange(
            e,
            this.N2i,
            this.O2i,
            !0,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  async OnBeforeStartAsync() {
    (this.q2i = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      (this.G2i = new WeaponListComponent_1.WeaponListComponent()),
      this.G2i.Init(this.GetScrollViewWithScrollbar(1)),
      this.G2i.SetWeaponChangeCallBack(this.k2i);
    var e = ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList(),
      e =
        (await Promise.all([
          this.q2i.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
          this.G2i.UpdateDataList(e),
        ]),
        this.q2i.SetCanShowEquip(!1),
        this.ExtraParams);
    (this.N2i = e.WeaponObserver), (this.O2i = e.WeaponScabbardObserver);
  }
  OnBeforeShow() {
    this.G2i?.SetCurSelect(0);
  }
  OnAfterHide() {
    this.G2i?.CancelSelect();
  }
  OnClickFullLevelToggle(e) {
    this.RefreshToggleState(e);
  }
  RefreshToggleState(t) {
    if (t !== this.Mya && ((this.Mya = t), this.IsShowOrShowing)) {
      let e = this.G2i.GetCurSelectedData();
      var i = e.GetFullLevelWeaponData();
      1 === t && i && (e = i),
        this.q2i.UpdateComponent(e),
        WeaponController_1.WeaponController.OnSelectedWeaponChange(
          e,
          this.N2i,
          this.O2i,
          !0,
        );
    }
  }
}
exports.BattlePassWeaponView = BattlePassWeaponView;
//# sourceMappingURL=BattlePassWeaponView.js.map
