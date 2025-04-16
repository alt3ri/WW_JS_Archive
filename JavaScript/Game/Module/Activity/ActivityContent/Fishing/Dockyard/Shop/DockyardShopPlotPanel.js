"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardShopPlotPanel = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem"),
  Time_1 = require("../../../../../../../Core/Common/Time"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  COOLDOWN_TIME = 5e3;
class DockyardShopPlotPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Kh_ = ""), (this.EntityId = 0), (this.$h_ = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Xh_() {
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingNpcPerform(
      this.Kh_,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Content);
  }
  Yh_(e) {
    var i,
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(
        this.EntityId,
      ),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
    t &&
      ((i = t?.Entity?.GetComponent(184)),
      (t = t?.Entity?.GetComponent(43)),
      i?.PlayPerformMontage(2, { MontagePath: t?.GetMontageResPathByName(e) }));
  }
  XZi(e) {
    AudioSystem_1.AudioSystem.PostEvent(e);
  }
  zh_() {
    var e = Time_1.Time.ServerTimeStamp;
    e - this.$h_ < COOLDOWN_TIME ||
      ((this.$h_ = e),
      (e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingNpcPerform(
        this.Kh_,
      )),
      this.Yh_(e.MontagePath),
      this.XZi(e.AudioEvent));
  }
  bl() {
    this.Xh_(), this.zh_();
  }
  ShowPanel(e) {
    (this.Kh_ = e), this.bl(), this.SetActive(!0);
  }
  HidePanel() {
    this.SetActive(!1);
  }
}
exports.DockyardShopPlotPanel = DockyardShopPlotPanel;
//# sourceMappingURL=DockyardShopPlotPanel.js.map
