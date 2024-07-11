"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraMappingData = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimationManager");
class UiCameraMappingData {
  constructor(t, i) {
    (this.WDe = t.ViewName), (this.Lo = t), (this.IsChildView = i);
  }
  GetUiCameraMappingConfig() {
    return this.Lo;
  }
  GetSourceHandleName() {
    var t, i, e;
    if (this.Lo)
      return (
        (i = this.Lo.BodyTargetType),
        (t = this.Lo.DefaultUiCameraSettingsName),
        0 === i ||
        !(i =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetBodyKey(
            i,
          )) ||
        !(e = this.Lo.BodyCameraSettingsNameMap) ||
        ((e = e.get(i)), StringUtils_1.StringUtils.IsEmpty(e))
          ? t
          : e
      );
  }
  CanPushCameraHandle() {
    var t;
    return (
      !!this.Lo &&
      "None" !== (t = this.Lo.DefaultUiCameraSettingsName) &&
      !StringUtils_1.StringUtils.IsEmpty(t)
    );
  }
  GetToBlendName(t) {
    var i = this.Lo.UiCameraBlendNameMap;
    return !i || ((i = i.get(t)), StringUtils_1.StringUtils.IsEmpty(i))
      ? this.Lo.DefaultCameraBlendName
      : i;
  }
  GetUiCameraDelayTime() {
    return this.Lo.UiCameraDelayTime;
  }
  GetViewName() {
    return this.WDe;
  }
}
exports.UiCameraMappingData = UiCameraMappingData;
//# sourceMappingURL=UiCameraMappingData.js.map
