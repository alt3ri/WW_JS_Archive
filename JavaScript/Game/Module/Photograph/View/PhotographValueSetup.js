"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographValueSetup = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController");
class PhotographValueSetup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.AWi = 0),
      (this.PWi = void 0),
      (this.MKi = (t, e = 0) => {
        var i;
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
      0 !== this.PWi.Type)
    ) {
      var e = this.PWi.Name,
        i = this.GetText(0),
        i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, e), this.GetSlider(1)),
        e = this.PWi.ValueRange;
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
//# sourceMappingURL=PhotographValueSetup.js.map
