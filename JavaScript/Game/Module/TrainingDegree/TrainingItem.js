"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrainingItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class TrainingItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UISprite],
    ];
  }
  SetData(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.NameId),
      this.GetSprite(1).SetFillAmount(e.FillAmount);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      e.Icon,
    );
    var i = (this.SetSpriteByPath(i, this.GetSprite(3), !1), this.GetText(2));
    const t = this.GetSprite(4);
    const s = e.TipsId;
    let r = void 0 !== s && s !== "";
    i.SetUIActive(r),
      t.SetUIActive(r),
      r &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(i, s),
        (r = UE.Color.FromHex(e.BgColor)),
        t.SetColor(r));
  }
}
exports.TrainingItem = TrainingItem;
// # sourceMappingURL=TrainingItem.js.map
