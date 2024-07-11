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
      (this.RKi = 0),
      (this.UKi = void 0),
      (this.pQi = (t, e = 0) => {
        var i;
        this.UKi.IsReverseSet
          ? ((i = this.UKi.ValueRange),
            (i = MathUtils_1.MathUtils.RangeClamp(t, i[0], i[1], i[1], i[0])),
            PhotographController_1.PhotographController.SetPhotographOption(
              this.UKi.ValueType,
              i,
            ))
          : PhotographController_1.PhotographController.SetPhotographOption(
              this.UKi.ValueType,
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
    this.GetSlider(1).OnValueChangeCb.Bind(this.pQi);
  }
  OnBeforeDestroy() {
    this.GetSlider(1).OnValueChangeCb.Unbind();
  }
  Initialize(t) {
    (this.RKi = t), this.Refresh();
  }
  Refresh() {
    if (
      ((this.UKi =
        ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(
          this.RKi,
        )),
      0 !== this.UKi.Type)
    ) {
      var e = this.UKi.Name,
        i = this.GetText(0),
        i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, e), this.GetSlider(1)),
        e = this.UKi.ValueRange;
      i.SetMinValue(e[0], !1, !1), i.SetMaxValue(e[1], !1, !1);
      let t = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(
        this.RKi,
      );
      this.UKi.IsReverseSet &&
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
    return this.RKi;
  }
  GetSetupConfig() {
    return this.UKi;
  }
}
exports.PhotographValueSetup = PhotographValueSetup;
//# sourceMappingURL=PhotographValueSetup.js.map
