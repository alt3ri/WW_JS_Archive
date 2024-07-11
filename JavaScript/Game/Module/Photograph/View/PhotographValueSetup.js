"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographValueSetup = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
class PhotographValueSetup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.AWi = 0),
      (this.PWi = void 0),
      (this.MKi = (t, e = 0) => {
        let i;
        this.PWi.IsReverseSet
          ? ((i = this.PWi.ValueRange),
            (i = MathUtils_1.MathUtils.RangeClamp(t, i[0], i[1], i[1], i[0])),
            PhotographController_1.PhotographController.SetPhotographOption(
              this.PWi.ValueType,
              i,
            ))
          : PhotographController_1.PhotographController.SetPhotographOption(
              this.PWi.ValueType,
              t,
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISliderComponent],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetSlider(1).OnValueChangeCb.Bind(this.MKi);
  }
  OnBeforeDestroy() {
    this.GetSlider(1).OnValueChangeCb.Unbind();
  }
  Initialize(t) {
    (this.AWi = t), this.Refresh();
  }
  Refresh() {
    if (
      ((this.PWi =
        ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(
          this.AWi,
        )),
      this.PWi.Type !== 0)
    ) {
      var e = this.PWi.Name;
      var i = this.GetText(0);
      var i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, e), this.GetSlider(1));
      var e = this.PWi.ValueRange;
      i.SetMinValue(e[0], !1, !1), i.SetMaxValue(e[1], !1, !1);
      let t = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(
        this.AWi,
      );
      this.PWi.IsReverseSet &&
        (t = MathUtils_1.MathUtils.RangeClamp(
          t ?? e[2],
          e[0],
          e[1],
          e[1],
          e[0],
        )),
        i.SetValue(t ?? e[2], !1);
    }
  }
  SetEnable(t) {
    this.SetActive(t);
  }
  GetSetupId() {
    return this.AWi;
  }
  GetSetupConfig() {
    return this.PWi;
  }
}
exports.PhotographValueSetup = PhotographValueSetup;
// # sourceMappingURL=PhotographValueSetup.js.map
