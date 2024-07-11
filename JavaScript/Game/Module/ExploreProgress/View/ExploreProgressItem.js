"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  HelpController_1 = require("../../Help/HelpController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.jHs = void 0),
      (this.WHs = () => {
        this.jHs &&
          UiManager_1.UiManager.OpenView("ExploreMissionView", this.jHs.AreaId);
      }),
      (this.KHs = () => {
        var e = this.jHs?.GetPhantomSkillHelpId();
        e && HelpController_1.HelpController.OpenHelpById(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.WHs],
        [6, this.KHs],
      ]);
  }
  Refresh(i) {
    var s = (this.jHs = i).GetProgress();
    if (
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.GetNameId()),
      this.GetSprite(2).SetFillAmount(s / 100),
      i.IsPercent()
        ? this.GetText(1).SetText(Math.floor(s).toString() + "%")
        : this.GetText(1).SetText(
            i.GetCurrentCount() + "/" + i.GetTotalCount(),
          ),
      this.GetItem(3).SetUIActive(6 === i.ExploreType),
      i.IsCompleted())
    )
      this.GetItem(5).SetUIActive(!1);
    else {
      (s = i.HasPhantomSkill()),
        (s = (this.GetItem(5).SetUIActive(s), this.GetText(7)));
      let e = void 0;
      (e = i.GetIsPhantomSkillUnlock()
        ? (s.SetChangeColor(!1), i.GetUnlockTextId())
        : (s.SetChangeColor(!0, s.changeColor), i.GetLockTextId())) &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(s, e);
    }
  }
}
exports.ExploreProgressItem = ExploreProgressItem;
//# sourceMappingURL=ExploreProgressItem.js.map
