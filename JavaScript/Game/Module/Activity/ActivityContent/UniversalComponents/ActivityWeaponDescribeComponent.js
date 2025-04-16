"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityWeaponDescribeComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout"),
  WeaponTrialData_1 = require("../../../Weapon/Data/WeaponTrialData");
class ActivityWeaponDescribeComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Gke = void 0),
      (this.$be = void 0),
      (this.Zul = () => {
        this.Gke?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UITexture],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[6, this.Zul]]);
  }
  OnStart() {
    (this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
      this.GetHorizontalLayout(2),
    )),
      this.GetTexture(3)?.SetUIActive(!1),
      this.GetSprite(5)?.SetUIActive(!0),
      this.SetLookButtonVisible(!1);
  }
  Refresh(e, i = !1) {
    e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e);
    e &&
      (this.GetText(0).ShowTextNew(e.WeaponName),
      this.GetItem(1).SetUIActive(i),
      this.vWt(e.WeaponType),
      this.n4e(e.QualityId));
  }
  n4e(e) {
    this.$be.RebuildLayout(e);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "SP_WeaponAttributeQualityBg" + e,
    );
    e && this.SetSpriteByPath(e, this.GetSprite(4), !1);
  }
  vWt(e) {
    for (const i of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
      if (e === i.Value) {
        this.SetSpriteByPath(i.Icon, this.GetSprite(5), !1);
        break;
      }
  }
  BindButtonFunction(e) {
    this.Gke = e;
  }
  SetLookButtonVisible(e) {
    this.GetButton(6)?.RootUIComp.SetUIActive(e);
  }
  BindWeaponPreviewFunction(n, r = 0) {
    this.BindButtonFunction(() => {
      if (0 !== n.length) {
        var e = [];
        for (const a of n) {
          var i = new WeaponTrialData_1.WeaponTrialData();
          i.SetTrialId(a), e.push(i);
        }
        var t = { WeaponDataList: e, SelectedIndex: r };
        UiManager_1.UiManager.OpenView("WeaponPreviewView", t);
      }
    });
  }
}
exports.ActivityWeaponDescribeComponent = ActivityWeaponDescribeComponent;
//# sourceMappingURL=ActivityWeaponDescribeComponent.js.map
