"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewInfo = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiLayerType_1 = require("./UiLayerType");
class UiViewInfo {
  constructor(
    e,
    i,
    t,
    o,
    s,
    a,
    h,
    n,
    R,
    r,
    V,
    w,
    l,
    c,
    u,
    p,
    y,
    f,
    g,
    C,
    _,
    S,
    U,
    I,
    M = "",
  ) {
    (this.Name = e),
      (this.Type = i),
      (this.Ctor = t),
      (this.Path = o),
      (this.PcPath = s),
      (this.BeObstructView = a),
      (this.AudioEvent = h),
      (this.OpenAudioEvent = n),
      (this.LoopAudioEvent = R),
      (this.CloseAudioEvent = r),
      (this.TimeDilation = V),
      (this.ShowCursorType = w),
      (this.CanOpenViewByShortcutKey = l),
      (this.IsShortKeysExitView = c),
      (this.SourceType = u),
      (this.LoadAsync = p),
      (this.NeedGc = y),
      (this.IsFullScreen = f),
      (this.SortIndex = g),
      (this.CommonPopBg = C),
      (this.CommonPopBgKey = _),
      (this.ScenePathInternal = S),
      (this.IsPermanent = U),
      (this.SkipAnimActions = I),
      (this.ScenePointTag = M),
      (this.CF_ = UiLayerType_1.ELayerType.Normal),
      (this.CF_ = this.Type);
  }
  SetContainerLayerType(e) {
    e
      ? ((this.CF_ = e), this.Type < e && (this.Type = e))
      : ((e = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
          this.Name,
        )),
        (e = UiLayerType_1.ELayerType[e.Type]),
        (this.CF_ = e));
  }
  GetContainerLayerType() {
    return this.CF_;
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
  ["SkinRootView", "WeaponRootView"],
  ["VisionRecoveryResultView", "CalabashRootView"],
  ["VisionRecoveryBatchResultView", "CalabashRootView"],
  ["VisionRefineResultView", "CalabashRootView"],
  ["GachaScanView", "DrawMainView"],
  ["RogueAttributeDetailView", "WeeklyRogueInfo"],
]);
//# sourceMappingURL=UiViewInfo.js.map
