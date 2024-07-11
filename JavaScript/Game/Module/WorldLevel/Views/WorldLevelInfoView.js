"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelInfoView = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  ShopUtils_1 = require("../../Shop/ShopUtils");
class WorldLevelInfoView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Zko = !1),
      (this.e2o = void 0),
      (this.t2o = void 0),
      (this.i2o = () => {
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "OnlineCantChangeLevel",
            )
          : (UiManager_1.UiManager.CloseView("WorldLevelInfoView"),
            UiManager_1.UiManager.IsViewShow("WorldLevelChangeConfirmView") ||
              UiManager_1.UiManager.OpenView("WorldLevelChangeConfirmView"));
      });
  }
  get CanShowInteractCd() {
    return this.Zko;
  }
  set CanShowInteractCd(e) {
    this.Zko !== e &&
      ((this.Zko = e),
      this.GetItem(8).SetUIActive(
        !this.Zko &&
          ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel >=
            this.e2o,
      ),
      this.GetItem(4).SetUIActive(this.Zko));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.i2o]]);
  }
  OnStart() {
    (this.t2o = ConfigManager_1.ConfigManager.WorldLevelConfig.GetCommonValue(
      "world_level_change_cd",
    )),
      (this.e2o = ConfigManager_1.ConfigManager.WorldLevelConfig.GetCommonValue(
        "world_level_change_conditon_level",
      )),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(8).SetUIActive(!0),
      this.Ubt(),
      this.zko(),
      this.o2o();
  }
  OnTick(e) {
    this.r2o();
  }
  Ubt() {
    this.GetText(0).SetText(
      ModelManager_1.ModelManager.WorldLevelModel.WorldLevelMultilingualText,
    );
  }
  zko() {
    var e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevelIntro");
    this.GetText(2).SetText(e);
  }
  o2o() {
    var e = this.n2o(),
      e = 0 < Math.max(this.t2o - e, 0);
    ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel < this.e2o || e
      ? this.GetItem(8).SetUIActive(!1)
      : this.r2o();
  }
  r2o() {
    var i = this.n2o(),
      i = Math.max(this.t2o - i, 0);
    if (((this.CanShowInteractCd = 0 < i), this.CanShowInteractCd))
      this.GetText(6).SetText(ShopUtils_1.ShopUtils.FormatTime(i));
    else {
      var i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
        t = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
      let e = "";
      i === t
        ? ((ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget =
            i - 1),
          (e =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "WorldLevelDown",
            )))
        : i < t &&
          ((ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget =
            i + 1),
          (e =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "WorldLevelRestore",
            ))),
        this.GetText(7).SetText(e);
    }
  }
  n2o() {
    return (
      TimeUtil_1.TimeUtil.GetServerTime() -
      ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp
    );
  }
}
exports.WorldLevelInfoView = WorldLevelInfoView;
//# sourceMappingURL=WorldLevelInfoView.js.map
