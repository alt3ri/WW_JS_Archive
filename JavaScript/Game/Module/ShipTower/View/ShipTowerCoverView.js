"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerCoverView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerCoverItem_1 = require("./ShipTowerCoverItem");
class ShipTowerCoverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.L8e = void 0),
      (this.YGl = void 0),
      (this.ryc = !1),
      (this.JGt = (e, i) => {
        (this.ryc = i) && e.SureCoverChallenge(), this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.L8e = new ShipTowerCoverItem_1.ShipTowerCoverItem()),
      (this.L8e.ConfirmCallback = this.JGt),
      await this.L8e.Init(this.GetItem(0)),
      (this.YGl = new ShipTowerCoverItem_1.ShipTowerCoverItem()),
      (this.YGl.ConfirmCallback = this.JGt),
      await this.YGl.Init(this.GetItem(1));
    var e = this.GetText(2),
      i = ShipTowerDefine_1.shipTowerTextKey.CoverTitle,
      t = this.OpenParam.StageData.TitleKey,
      t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t),
      i = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(i, t);
    e.SetText(i);
  }
  OnBeforeShow() {
    var e = this.OpenParam.StageData;
    this.L8e.UpdateData(e, !1), this.YGl.UpdateData(e, !0);
  }
  OnBeforeDestroy() {
    var e;
    this.ryc ||
      ((e = this.OpenParam.StageData).UpdateToEdit(),
      ModelManager_1.ModelManager.ShipTowerModel.SetChallengeStageDataNull(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShipTowerStageUpdate,
        e.Id,
      ));
  }
}
exports.ShipTowerCoverView = ShipTowerCoverView;
//# sourceMappingURL=ShipTowerCoverView.js.map
