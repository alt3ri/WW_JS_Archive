"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ObtainFragmentView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  FragmentMemoryData_1 = require("./FragmentMemoryData");
class ObtainFragmentView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Jwn = void 0),
      (this.tWt = () => {
        var e =
          ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetFragmentMemoryPreNeedItemId();
        let i = 1;
        0 <
        (i =
          0 < e
            ? ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                e,
              )
            : i)
          ? this.CloseMe(() => {
              var e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
              (e.FragmentMemoryTopicData = this.Jwn.GetTopicData()),
                (e.CurrentSelectId = this.Jwn.GetId()),
                (ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
                  "Start02"),
                UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e);
            })
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Condition_13000069_Description",
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.tWt]]);
  }
  OnBeforeShow() {
    var e = this.ChildPopView.PopItem,
      e =
        (e &&
          ((e = e).SetCaptionTitleVisible(!1),
          e.SetCaptionTitleIconVisible(!1)),
        this.OpenParam);
    (this.Jwn =
      ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectDataById(e)),
      (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId = 0),
      this.Og();
  }
  Og() {
    this.zwn(), this.P5e(), this.u3e();
  }
  Zwn() {
    return this.Jwn.GetThemeBg();
  }
  zwn() {
    this.SetTextureByPath(this.Zwn(), this.GetTexture(0));
  }
  eBn() {
    return this.Jwn.GetTitle();
  }
  P5e() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.eBn());
  }
  ke() {
    return this.Jwn.GetTimeText();
  }
  u3e() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "FragmentMemoryCollectTime",
      this.ke(),
    );
  }
}
exports.ObtainFragmentView = ObtainFragmentView;
//# sourceMappingURL=ObtainFragmentView.js.map
