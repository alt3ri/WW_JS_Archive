"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoShareBtnItem = void 0);
const UE = require("ue"),
  SharePlatformById_1 = require("../../../../Core/Define/ConfigQuery/SharePlatformById"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PhotoShareBtnItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.pKi = 0),
      (this.vKi = void 0),
      (this.L6e = 0),
      (this.NTt = void 0),
      (this.aTn = 1),
      (this.FWt = () => {
        var t = TimeUtil_1.TimeUtil.GetServerTime();
        t - this.L6e < this.aTn
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "CannotShare",
            )
          : ((this.L6e = t),
            this.NTt?.(
              SharePlatformById_1.configSharePlatformById.GetConfig(this.pKi)
                .ShareId,
            ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    (this.aTn = ConfigManager_1.ConfigManager.CommonConfig.GetShareGap()
      ? ConfigManager_1.ConfigManager.CommonConfig.GetShareGap()
      : 1),
      this.GetRootActor()
        .GetComponentByClass(UE.UIButtonComponent.StaticClass())
        .OnPointUpCallBack.Bind(this.FWt),
      (this.vKi = this.GetSprite(0)
        .GetOwner()
        .GetComponentByClass(UE.UISpriteTransition.StaticClass()));
  }
  SetClickCallBack(t) {
    this.NTt = t;
  }
  Refresh(t, i, r) {
    this.Update(t), this.RefreshPanel();
  }
  Update(t) {
    this.pKi = t;
  }
  RefreshPanel() {
    var t = SharePlatformById_1.configSharePlatformById.GetConfig(this.pKi);
    t &&
      this.SetSpriteByPath(t.Icon, this.GetSprite(0), !1, void 0, (t) => {
        this.vKi?.SetAllTransitionSprite(this.GetSprite(0).GetSprite());
      });
  }
  OnBeforeDestroy() {
    this.vKi = void 0;
  }
}
exports.PhotoShareBtnItem = PhotoShareBtnItem;
//# sourceMappingURL=PhotoShareBtnItem.js.map
