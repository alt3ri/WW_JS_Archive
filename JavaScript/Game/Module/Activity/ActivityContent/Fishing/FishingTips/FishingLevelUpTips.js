"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingLevelUpTips = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../FishingDefine"),
  TICK_TIME = 2e3;
class FishingLevelUpTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.ExpData = void 0),
      (this.Level = 0),
      (this.CurrentExp = 0),
      (this.DeltaAddExp = 0),
      (this.CurrentMaxExp = 0),
      (this.IsTick = !0),
      (this.AddText = void 0),
      (this.SpriteBar = void 0);
  }
  OnRegisterComponent() {
    (this.ExpData = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UIText],
        [1, UE.UIText],
        [2, UE.UISprite],
        [3, UE.UIText],
        [4, UE.UITexture],
      ]);
  }
  async OnBeforeStartAsync() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      FishingDefine_1.TIPS_ICON,
    );
    await this.SetTextureAsync(i, this.GetTexture(4));
  }
  OnStart() {
    (this.AddText = this.GetText(1)),
      (this.SpriteBar = this.GetSprite(2)),
      (this.Level = this.ExpData.LastLevel),
      (this.CurrentExp = this.ExpData.LastExp),
      (this.CurrentMaxExp = this.ExpData.GetMaxExpByLevel(this.Level)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.AddText,
        "Fishing_Experience",
        this.ExpData.AddExp,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Fishing_Level"),
      this.GetText(0).SetText(this.Level.toString());
  }
  OnTick(i) {
    this.IsTick &&
      (this.DeltaAddExp >= this.ExpData.AddExp
        ? (this.CloseMe(), (this.IsTick = !1))
        : this.oEt((this.ExpData.AddExp / TICK_TIME) * i));
  }
  oEt(i) {
    (this.DeltaAddExp += i),
      (this.CurrentExp = MathUtils_1.MathUtils.Clamp(
        this.CurrentExp + i,
        this.CurrentExp,
        this.CurrentMaxExp,
      )),
      this.SpriteBar.SetFillAmount(this.CurrentExp / this.CurrentMaxExp),
      this.CurrentExp >= this.CurrentMaxExp &&
        this.Level < this.ExpData.CurrentLevel &&
        ((this.Level += 1),
        (this.CurrentExp = 0),
        (this.CurrentMaxExp = this.ExpData.GetMaxExpByLevel(this.Level)),
        this.GetText(0).SetText(this.Level.toString()));
  }
}
exports.FishingLevelUpTips = FishingLevelUpTips;
//# sourceMappingURL=FishingLevelUpTips.js.map
