"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineAttributePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PhantomTipsAttributeItem_1 = require("../../../Item/SpecialItem/PhantomTipsAttributeItem"),
  VisionRefineAttributeSelectItem_1 = require("./VisionRefineAttributeSelectItem");
class VisionRefineAttributePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Jdc = void 0),
      (this.Zdc = void 0),
      (this.emc = void 0),
      (this.tmc = void 0),
      (this.Nji = void 0),
      (this.imc = () => {
        this.Nji && this.Nji();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.imc]]);
  }
  async OnBeforeStartAsync() {
    (this.tmc = new VisionRefineAttributeSelectItem_1.AttributeSelectItem()),
      (this.Jdc = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem()),
      (this.Zdc = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem()),
      (this.emc = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem());
    var t = new Array();
    t.push(this.tmc.CreateThenShowByActorAsync(this.GetButton(2).GetOwner())),
      t.push(this.Jdc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
      t.push(this.Zdc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      t.push(this.emc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      await Promise.all(t);
  }
  RefreshItemNow(t) {
    var e;
    t.length < 2
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Calabash", 75, "声骸属性少于2")
      : ((e = t[0]),
        (t = t[1]),
        this.Jdc.RefreshUi(e),
        this.Zdc.RefreshUi(t),
        this.emc.RefreshUi(t));
  }
  RefreshItemSwitch(t) {
    this.tmc.RefreshUi(t);
  }
  BindClickCallBack(t) {
    this.Nji = t;
  }
}
exports.VisionRefineAttributePanel = VisionRefineAttributePanel;
//# sourceMappingURL=VisionRefineAttributePanel.js.map
