"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorButtonData = void 0);
const InputEnums_1 = require("../../Input/InputEnums"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  visibleTagMap = new Map([[101, 852227396]]),
  hiddenTagMap = new Map([
    [101, [-1987419794, 855966206, 504239013]],
    [102, [729920684]],
  ]);
class BehaviorButtonData {
  constructor() {
    (this.ButtonType = 0),
      (this.ActionName = ""),
      (this.InputAction = InputEnums_1.EInputAction.None),
      (this.IsEnable = !1),
      (this.IsVisible = !1),
      (this.State = 0),
      (this.SkillIconPathList = void 0),
      (this.VisibleTagId = 0),
      (this.HiddenTagIds = []);
  }
  static Init() {}
  Refresh(t, s, i, e) {
    (this.ButtonType = t),
      (this.ActionName = InputEnums_1.EInputAction[s]),
      (this.InputAction = s),
      (this.IsEnable = !0),
      (this.IsVisible = !0),
      (this.State = 0),
      (this.HiddenTagIds = hiddenTagMap.get(t)),
      (this.VisibleTagId = visibleTagMap.get(t) ?? 0),
      (this.SkillIconPathList =
        ModelManager_1.ModelManager.SkillButtonUiModel.BehaviorIconPathMap.get(
          t,
        )),
      i && this.RefreshIsVisible(i, e);
  }
  RefreshIsVisible(t, s) {
    if (0 < this.VisibleTagId && this.gSo(t, this.VisibleTagId))
      this.IsVisible = !0;
    else if (101 !== this.ButtonType || s?.IsAim) {
      for (const i of this.HiddenTagIds)
        if (this.gSo(t, i)) return void (this.IsVisible = !1);
      this.IsVisible = !0;
    } else this.IsVisible = !1;
  }
  gSo(t, s) {
    return !!t && t.HasTag(s);
  }
}
exports.BehaviorButtonData = BehaviorButtonData;
//# sourceMappingURL=BehaviorButtonData.js.map
