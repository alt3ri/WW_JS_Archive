"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuNpcMarkItemView = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class MingSuNpcMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, i, r) {
    var a = this.MarkConfig;
    let n = !1;
    1 === a.RelativeType &&
      5 === a.RelativeSubType &&
      ((a = a.RelativeId),
      (a =
        ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(
          a,
        ).GetDarkCoastDeliveryGuardState()),
      (n = 4 === a)) &&
      ((a =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_ComIconFinish",
        )),
      this.SetSpriteByPath(a, this.GetSprite(4), !1)),
      this.GetSprite(4).SetUIActive(n);
  }
}
exports.MingSuNpcMarkItemView = MingSuNpcMarkItemView;
//# sourceMappingURL=MingSuNpcMarkItemView.js.map
