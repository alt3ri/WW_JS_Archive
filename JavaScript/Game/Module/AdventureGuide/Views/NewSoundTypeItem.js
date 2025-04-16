"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundTypeItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.q8e = 4),
      (this.md_ = void 0),
      (this.G8e = void 0),
      (this.W5e = void 0),
      (this.H5e = void 0),
      (this.D4l = !1),
      (this.A5e = () => !this.W5e || this.W5e(this.q8e)),
      (this.N8e = (t) => {
        1 === t && this.G8e(this.q8e, this.H5e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [0, UE.UISprite],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.N8e]]);
  }
  OnStart() {
    (this.H5e = this.GetExtendToggle(3)),
      this.H5e?.CanExecuteChange.Bind(this.A5e);
  }
  BindOnToggleFunc(i) {
    this.G8e = (t, e) => {
      i(t, e),
        this.GetRedDotState() &&
          (ModelManager_1.ModelManager.AdventureGuideModel.RecordAllDetectionBySecondary(
            this.q8e,
          ),
          this.RefreshRedDotState(),
          this.md_) &&
          ("NewSoundAreaView" === this.md_
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate,
              )
            : "DisposableChallengeView" === this.md_ &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RedDotAdventureChallengeTabUpdate,
              ));
    };
  }
  BindCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  Refresh(t, e, i) {
    (this.q8e = t.TypeId), (this.md_ = t.FromTabViewName);
    var t =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
          this.q8e,
        ),
      s = this.GetText(1),
      s = (LguiUtil_1.LguiUtil.SetLocalTextNew(s, t.Text), this.GetText(2));
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(s, t.SubText),
      this.SetSpriteByPath(t.Icon, this.GetSprite(0), !1),
      this.H5e.SetToggleState(0, !1),
      this.GetItem(4).SetUIActive(
        void 0 !==
          ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(
            this.q8e,
          ),
      ),
      this.RefreshRedDotState();
  }
  RefreshRedDotState() {
    (this.D4l =
      ModelManager_1.ModelManager.AdventureGuideModel.CheckRedDotSecondary(
        this.q8e,
      )),
      this.GetItem(5)?.SetUIActive(this.D4l);
  }
  GetRedDotState() {
    return this.D4l;
  }
  OnSelected(t) {
    t && this.SetSelectToggle(1);
  }
  SetSelectToggle(t = 1) {
    this.GetExtendToggle(3).SetToggleStateForce(t, !1, !0),
      this.G8e(this.q8e, this.H5e);
  }
  GetSelfToggle() {
    return this.GetExtendToggle(3);
  }
  GetButtonItem() {
    return this.GetExtendToggle(3)?.RootUIComp;
  }
}
exports.NewSoundTypeItem = NewSoundTypeItem;
//# sourceMappingURL=NewSoundTypeItem.js.map
