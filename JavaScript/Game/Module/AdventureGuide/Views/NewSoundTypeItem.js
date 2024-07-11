"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundTypeItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AdventureDefine_1 = require("../AdventureDefine");
class NewSoundTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.E6e = AdventureDefine_1.EDungeonType.Mat),
      (this.y6e = void 0),
      (this.A4e = void 0),
      (this.R4e = void 0),
      (this.d4e = () => !this.A4e || this.A4e(this.E6e)),
      (this.I6e = (t) => {
        t === 1 && this.y6e(this.E6e, this.R4e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [0, UE.UISprite],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.I6e]]);
  }
  OnStart() {
    (this.R4e = this.GetExtendToggle(3)),
      this.R4e?.CanExecuteChange.Bind(this.d4e);
  }
  BindOnToggleFunc(t) {
    this.y6e = t;
  }
  BindCanToggleExecuteChange(t) {
    this.A4e = t;
  }
  Refresh(t, e, i) {
    this.E6e = t;
    const r =
      ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
        this.E6e,
      );
    var s = this.GetText(1);
    var s = (LguiUtil_1.LguiUtil.SetLocalTextNew(s, r.Text), this.GetText(2));
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, r.SubText),
      this.SetSpriteByPath(r.Icon, this.GetSprite(0), !1),
      this.R4e.SetToggleState(0, !1),
      this.GetItem(4).SetUIActive(
        void 0 !==
          ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(
            t,
          ),
      );
  }
  OnSelected(t) {
    t && this.SetSelectToggle(1);
  }
  SetSelectToggle(t = 1) {
    this.GetExtendToggle(3).SetToggleStateForce(t, !1, !0),
      this.y6e(this.E6e, this.R4e);
  }
  GetSelfToggle() {
    return this.GetExtendToggle(3);
  }
  GetButtonItem() {
    return this.GetExtendToggle(3)?.RootUIComp;
  }
}
exports.NewSoundTypeItem = NewSoundTypeItem;
// # sourceMappingURL=NewSoundTypeItem.js.map
