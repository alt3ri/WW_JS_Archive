"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonFormationData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SkillButtonTypeFormationData_1 = require("./SkillButtonTypeFormationData"),
  LONG_PRESS_CONTROL_CAMERA_TIME = 0.3;
class SkillButtonFormationData {
  constructor() {
    (this.nva = new Map()),
      (this.VRn = !1),
      (this.KRn = void 0),
      (this.QRn = void 0);
  }
  Init() {}
  Clear() {
    for (const t of this.nva.values()) t.Clear();
  }
  GetSkillButtonTypeFormationData(t) {
    let i = this.nva.get(t);
    return (
      i ||
        ((i =
          new SkillButtonTypeFormationData_1.SkillButtonTypeFormationData()),
        this.nva.set(t, i)),
      i
    );
  }
  RefreshOnFollowerAimStateChange(t) {
    t !== this.VRn &&
      ((this.VRn = t)
        ? (this.KRn ||
            ((this.KRn = this.XRn("SP_IconT36")),
            (this.QRn = this.XRn("SP_IconT35"))),
          this.sva(4, this.KRn),
          this.sva(11, this.KRn),
          this.sva(7, this.QRn),
          this.ava(4, !0, LONG_PRESS_CONTROL_CAMERA_TIME),
          this.hva(11, !0))
        : (this.sva(4, void 0),
          this.sva(11, void 0),
          this.sva(7, void 0),
          this.ava(4, !1, 0),
          this.hva(11, !1)),
      ModelManager_1.ModelManager.SkillButtonUiModel?.RefreshVisibleByButtonType(
        11,
      ),
      ModelManager_1.ModelManager.SkillButtonUiModel?.RefreshEnableByButtonType(
        11,
      ));
  }
  sva(t, i) {
    var e = this.GetSkillButtonTypeFormationData(t);
    e.SkillIconPath !== i &&
      ((e.SkillIconPath = i),
      (e =
        ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData())) &&
      e.RefreshSkillTexturePath(t);
  }
  ava(t, i, e) {
    t = this.GetSkillButtonTypeFormationData(t);
    (t.IsLongPressControlCamera = i), (t.LongPressTime = e);
  }
  hva(t, i) {
    t = this.GetSkillButtonTypeFormationData(t);
    (t.IgnoreHiddenTag = i), (t.IgnoreDefaultHidden = i);
  }
  XRn(t) {
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
  }
}
exports.SkillButtonFormationData = SkillButtonFormationData;
//# sourceMappingURL=SkillButtonFormationData.js.map
