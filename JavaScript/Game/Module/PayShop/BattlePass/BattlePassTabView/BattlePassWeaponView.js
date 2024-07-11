"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassWeaponView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WeaponController_1 = require("../../../../Module/Weapon/WeaponController");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const WeaponDetailTipsComponent_1 = require("../../../Weapon/WeaponDetailTipsComponent");
const WeaponListComponent_1 = require("../../../Weapon/WeaponListComponent");
class BattlePassWeaponView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.qki = void 0),
      (this.Gki = void 0),
      (this.Nki = void 0),
      (this.Oki = void 0),
      (this.kki = () => {
        const e = this.Gki.GetCurSelectedData();
        this.qki.UpdateComponent(e),
          WeaponController_1.WeaponController.OnSelectedWeaponChange(
            e,
            this.Nki,
            this.Oki,
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
    (this.qki = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      (this.Gki = new WeaponListComponent_1.WeaponListComponent()),
      this.Gki.Init(this.GetScrollViewWithScrollbar(1)),
      this.Gki.SetWeaponChangeCallBack(this.kki);
    var e = ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList();
    var e =
      (await Promise.all([
        this.qki.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        this.Gki.UpdateDataList(e),
      ]),
      this.qki.SetCanShowEquip(!1),
      this.ExtraParams);
    (this.Nki = e.WeaponObserver), (this.Oki = e.WeaponScabbardObserver);
  }
  OnBeforeShow() {
    this.Gki?.SetCurSelect(0);
  }
  OnAfterHide() {
    this.Gki?.CancelSelect();
  }
}
exports.BattlePassWeaponView = BattlePassWeaponView;
// # sourceMappingURL=BattlePassWeaponView.js.map
