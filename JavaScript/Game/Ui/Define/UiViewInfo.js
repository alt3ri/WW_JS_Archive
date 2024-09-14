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
    R,
    n,
    w,
    V,
    l,
    r,
    c,
    u,
    p,
    f,
    g,
    v,
    C,
    I,
    M,
    S,
    W = "",
  ) {
    (this.Name = e),
      (this.Type = i),
      (this.Ctor = o),
      (this.Path = t),
      (this.PcPath = s),
      (this.BeObstructView = a),
      (this.AudioEvent = h),
      (this.OpenAudioEvent = R),
      (this.CloseAudioEvent = n),
      (this.TimeDilation = w),
      (this.ShowCursorType = V),
      (this.CanOpenViewByShortcutKey = l),
      (this.IsShortKeysExitView = r),
      (this.SourceType = c),
      (this.LoadAsync = u),
      (this.NeedGc = p),
      (this.IsFullScreen = f),
      (this.SortIndex = g),
      (this.CommonPopBg = v),
      (this.CommonPopBgKey = C),
      (this.ScenePathInternal = I),
      (this.IsPermanent = M),
      (this.SkipAnimActions = S),
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
  ["VisionRecoveryBatchResultView", "CalabashRootView"],
  ["GachaScanView", "DrawMainView"],
]);
//# sourceMappingURL=UiViewInfo.js.map
