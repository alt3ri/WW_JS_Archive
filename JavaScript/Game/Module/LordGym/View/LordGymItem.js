"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class LordGymItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super(),
      (this.syi = -1),
      (this._5e = void 0),
      (this.ayi = void 0),
      (this.hyi = void 0),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.lyi = () => {
        this._5e && this._5e(this.syi);
      }),
      (this.Lke = () => !this.ayi || this.ayi(this.syi)),
      (this._5e = e),
      (this.ayi = i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.lyi]]);
  }
  OnStart() {
    (this.hyi = this.GetExtendToggle(0)),
      this.hyi.CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    (this._5e = void 0), (this.syi = -1);
  }
  Refresh(e, i, t) {
    this.RefreshByLordId(e), this.hyi.SetToggleState(i ? 1 : 0, !1);
  }
  Clear() {}
  OnSelected(e) {
    this.hyi.SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.hyi.SetToggleState(0, e);
  }
  GetKey(e, i) {
    return this.syi;
  }
  RefreshByLordId(e) {
    (this.syi = e),
      this.GetItem(3).SetUIActive(
        !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(
          this.syi,
        ) ||
          !ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.syi),
      );
    e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(this.syi);
    this.GetItem(4).SetUIActive(
      !ModelManager_1.ModelManager.ExchangeRewardModel.GetRewardIfCanExchange(
        e.RewardId,
      ),
    ),
      this.SetSpriteByPath(e.IconPath, this.GetSprite(2), !1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.GymTitle);
  }
}
exports.LordGymItem = LordGymItem;
//# sourceMappingURL=LordGymItem.js.map
