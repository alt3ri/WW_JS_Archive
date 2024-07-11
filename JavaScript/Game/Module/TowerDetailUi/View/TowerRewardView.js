"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRewardView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  TowerRewardItem_1 = require("./TowerRewardItem");
class TowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.T8e = void 0),
      (this.sbi = () => {
        return new TowerRewardItem_1.TowerRewardItem();
      }),
      (this.uRo = () => {
        this.Og();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    (this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.sbi,
    )),
      this.Og();
  }
  OnBeforeDestroy() {
    this.T8e = void 0;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.uRo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.uRo,
    );
  }
  Og() {
    var e =
        this.OpenParam ??
        ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
      r = ModelManager_1.ModelManager.TowerModel.GetDifficultyReward(e);
    r &&
      (r.sort((e, r) => {
        var t = e.IsReceived ? 1 : 0,
          i = r.IsReceived ? 1 : 0;
        return t != i ? t - i : e.Index - r.Index;
      }),
      this.T8e.RefreshByData(r),
      this.GetText(1).SetText(
        ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e) +
          "/" +
          ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e),
      ));
  }
}
exports.TowerRewardView = TowerRewardView;
//# sourceMappingURL=TowerRewardView.js.map
