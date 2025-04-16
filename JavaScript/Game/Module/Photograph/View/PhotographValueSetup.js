"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographValueSetup = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController");
class PhotographValueSetup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RKi = 0),
      (this.UKi = void 0),
      (this.SPe = void 0),
      (this.pQi = (e, t = 0) => {
        var i;
        this.UKi.IsReverseSet
          ? ((i = this.UKi.ValueRange),
            (i = MathUtils_1.MathUtils.RangeClamp(e, i[0], i[1], i[1], i[0])),
            PhotographController_1.PhotographController.SetPhotographOption(
              this.UKi.ValueType,
              i,
            ))
          : PhotographController_1.PhotographController.SetPhotographOption(
              this.UKi.ValueType,
              e,
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
    this.GetSlider(1).OnValueChangeCb.Bind(this.pQi),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    this.GetSlider(1).OnValueChangeCb.Unbind(), (this.SPe = void 0);
  }
  OnBeforeShow() {
    this.SPe?.PlayLevelSequenceByName("Start01");
  }
  Initialize(e) {
    (this.RKi = e), this.Refresh();
  }
  Refresh() {
    if (
      ((this.UKi =
        ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(
          this.RKi,
        )),
      0 !== this.UKi.Type)
    ) {
      var t = this.UKi.Name,
        i = this.GetText(0),
        i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), this.GetSlider(1)),
        t = this.UKi.ValueRange;
      i.SetMinValue(t[0], !1, !1), i.SetMaxValue(t[1], !1, !1);
      let e = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(
        this.RKi,
      );
      this.UKi.IsReverseSet &&
        (e = MathUtils_1.MathUtils.RangeClamp(
          e ?? t[2],
          t[0],
          t[1],
          t[1],
          t[0],
        )),
        i.SetValue(e ?? t[2], !1);
    }
  }
  SetEnable(e) {
    this.SetActive(e);
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
