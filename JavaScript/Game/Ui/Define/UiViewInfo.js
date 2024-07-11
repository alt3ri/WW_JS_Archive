"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewInfo = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
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
    w,
    V,
    l,
    r,
    c,
    u,
    p,
    f,
    g,
    I,
    M,
    S,
    v,
    C,
    W = "",
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
      (this.TimeDilation = w),
      (this.ShowCursorType = V),
      (this.CanOpenViewByShortcutKey = l),
      (this.IsShortKeysExitView = r),
      (this.SourceType = c),
      (this.LoadAsync = u),
      (this.NeedGc = p),
      (this.IsFullScreen = f),
      (this.SortIndex = g),
      (this.CommonPopBg = I),
      (this.CommonPopBgKey = M),
      (this.ScenePathInternal = S),
      (this.IsPermanent = v),
      (this.SkipAnimActions = C),
      (this.ScenePointTag = W);
  }
  get UiPath() {
    return !Info_1.Info.IsInTouch() && this.PcPath ? this.PcPath : this.Path;
  }
  get ScenePath() {
    var e = UiViewInfo.Zcr.get(this.Name);
    return e
      ? ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e).ScenePath
      : this.ScenePathInternal;
  }
}
(exports.UiViewInfo = UiViewInfo).Zcr = new Map([
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
