"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeModeRowView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ChangeModeRowView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ChangeKeyModeRowData = void 0),
      (this.fPi = void 0),
      (this.sui = (i) => {
        this.ChangeKeyModeRowData && 1 === i && this.fPi && this.fPi(this);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.GetExtendToggle(0)?.OnStateChange.Add(this.sui);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0)?.OnStateChange.Clear(),
      (this.fPi = void 0),
      (this.ChangeKeyModeRowData = void 0);
  }
  Refresh(i) {
    (this.ChangeKeyModeRowData = i), this.Wzs(), this.ufo();
  }
  Wzs() {
    var i;
    this.ChangeKeyModeRowData &&
      ((i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        this.ChangeKeyModeRowData.SpriteResourceId,
      )),
      this.SetSpriteByPath(i, this.GetSprite(1), !1));
  }
  ufo() {
    var i, e;
    this.ChangeKeyModeRowData &&
      ((i = this.GetText(2)),
      (e = this.GetText(3)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        i,
        this.ChangeKeyModeRowData.DescriptionA,
        this.ChangeKeyModeRowData.DescriptionParametersA,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        e,
        this.ChangeKeyModeRowData.DescriptionB,
        this.ChangeKeyModeRowData.DescriptionParametersB,
      ));
  }
  BindOnSelected(i) {
    this.fPi = i;
  }
  SetSelected(i) {
    i
      ? this.GetExtendToggle(0)?.SetToggleState(1, !1)
      : this.GetExtendToggle(0)?.SetToggleState(0, !1);
  }
}
exports.ChangeModeRowView = ChangeModeRowView;
//# sourceMappingURL=ChangeModeRowView.js.map
