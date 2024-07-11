"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponBreachSuccessView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const StarItem_1 = require("../../RoleUi/View/StarItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class WeaponBreachSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.StarLayout = void 0),
      (this.SuccessStarItem = void 0),
      (this.ANo = 0),
      (this.sAt = () => {
        return new StarItem_1.StarItem();
      }),
      (this.xUt = () => {
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
      (this.BtnBindInfo = [[1, this.xUt]]);
  }
  async OnBeforeStartAsync() {
    this.ANo = this.OpenParam;
    const e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
      this.ANo,
    );
    var t =
      ((this.StarLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.sAt,
      )),
      e.GetWeaponConfig());
    var t = t.BreachId;
    var i = e.GetBreachLevel();
    var a = i - 1;
    var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, i);
    var a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, a);
    var a =
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
    const i = e - 1;
    if (!(i < 0)) {
      const a = new Array(t);
      for (let e = 0; e < t; ++e) {
        const r = {
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
// # sourceMappingURL=WeaponBreachSuccessView.js.map
