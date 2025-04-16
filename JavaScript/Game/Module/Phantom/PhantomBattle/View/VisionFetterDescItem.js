"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionFetterDescItem = exports.VisionFetterDescData = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionFetterDescData {
  constructor() {
    (this.Key = 0), (this.Value = 0);
  }
}
exports.VisionFetterDescData = VisionFetterDescData;
class VisionFetterDescItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  Clear() {
    this.OnClear();
  }
  OnClear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Update(e) {
    var t = e.Value;
    this.Dke(t), this.P5e(t, e.Key);
  }
  P5e(e, t) {
    (e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
        e,
      )),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name));
    this.GetText(0).SetText(e ?? ""),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "VisionFetterDetailViewName",
        e,
        t.toString(),
      );
  }
  Dke(e) {
    e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      e.EffectDescription,
      ...e.EffectDescriptionParam,
    );
  }
}
exports.VisionFetterDescItem = VisionFetterDescItem;
//# sourceMappingURL=VisionFetterDescItem.js.map
