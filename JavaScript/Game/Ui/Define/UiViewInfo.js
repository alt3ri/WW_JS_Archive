"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewInfo = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class UiViewInfo {
  constructor(
    e,
    i,
    o,
    t,
    s,
    a,
    h,
    n,
    R,
    l,
    w,
    V,
    r,
    c,
    M,
    g,
    u,
    p,
    f,
    S,
    v,
    W,
    _,
    d = "",
  ) {
    (this.Name = e),
      (this.Type = i),
      (this.Ctor = o),
      (this.Path = t),
      (this.PcPath = s),
      (this.BeObstructView = a),
      (this.AudioEvent = h),
      (this.OpenAudioEvent = n),
      (this.CloseAudioEvent = R),
      (this.TimeDilation = l),
      (this.ShowCursorType = w),
      (this.CanOpenViewByShortcutKey = V),
      (this.IsShortKeysExitView = r),
      (this.SourceType = c),
      (this.LoadAsync = M),
      (this.NeedGc = g),
      (this.IsFullScreen = u),
      (this.SortIndex = p),
      (this.CommonPopBg = f),
      (this.CommonPopBgKey = S),
      (this.ScenePathInternal = v),
      (this.IsPermanent = W),
      (this.SkipAnimActions = _),
      (this.ScenePointTag = d);
  }
  get UiPath() {
    return !ModelManager_1.ModelManager.PlatformModel?.IsMobile() && this.PcPath
      ? this.PcPath
      : this.Path;
  }
  get ScenePath() {
    var e = UiViewInfo.icr.get(this.Name);
    return e
      ? ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e).ScenePath
      : this.ScenePathInternal;
  }
}
(exports.UiViewInfo = UiViewInfo).icr = new Map([
  ["RoleBreachView", "RoleRootView"],
  ["RoleSkillView", "RoleRootView"],
  ["RoleBreachSuccessView", "RoleRootView"],
  ["RoleElementView", "RoleRootView"],
  ["RoleAttributeDetailView", "RoleRootView"],
  ["RoleLevelUpView", "RoleRootView"],
  ["RoleFavorInfoView", "RoleRootView"],
  ["RoleSelectionView", "RoleRootView"],
  ["PhantomBattleFettersView", "RoleRootView"],
  ["WeaponReplaceView", "WeaponRootView"],
  ["WeaponBreachSuccessView", "WeaponRootView"],
  ["WeaponResonanceSuccessView", "WeaponRootView"],
  ["VisionRecoveryResultView", "CalabashRootView"],
  ["GachaScanView", "DrawMainView"],
]);
//# sourceMappingURL=UiViewInfo.js.map
