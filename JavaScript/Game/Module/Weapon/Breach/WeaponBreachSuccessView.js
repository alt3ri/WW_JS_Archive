"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponBreachSuccessView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  StarItem_1 = require("../../RoleUi/View/StarItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class WeaponBreachSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.StarLayout = void 0),
      (this.SuccessStarItem = void 0),
      (this.DOo = 0),
      (this.vke = () => {
        return new StarItem_1.StarItem();
      }),
      (this.qAt = () => {
        UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.qAt]]);
  }
  async OnBeforeStartAsync() {
    this.DOo = this.OpenParam;
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.DOo,
      ),
      t =
        ((this.StarLayout = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(0),
          this.vke,
        )),
        e.GetWeaponConfig()),
      t = t.BreachId,
      i = e.GetBreachLevel(),
      a = i - 1,
      i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, i),
      a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, a),
      a =
        (this.GetText(2).SetText(a.LevelLimit.toString()),
        this.GetText(3).SetText(i.LevelLimit.toString()),
        ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(t));
    await this.UpdateStar(e.GetBreachLevel(), a);
  }
  OnAfterPlayStartSequence() {
    this.SuccessStarItem?.PlayActiveSequence(),
      this.UiViewSequence.PlaySequencePurely("Loop");
  }
  async UpdateStar(e, t) {
    var i = e - 1;
    if (!(i < 0)) {
      var a = new Array(t);
      for (let e = 0; e < t; ++e) {
        var r = {
          StarOnActive: e < i,
          StarOffActive: e >= i,
          StarNextActive: !1,
          StarLoopActive: !1,
          PlayLoopSequence: !1,
          PlayActivateSequence: !1,
        };
        a[e] = r;
      }
      await this.StarLayout.RefreshByDataAsync(a),
        (this.SuccessStarItem = this.StarLayout.GetLayoutItemByIndex(i));
    }
  }
}
exports.WeaponBreachSuccessView = WeaponBreachSuccessView;
//# sourceMappingURL=WeaponBreachSuccessView.js.map
