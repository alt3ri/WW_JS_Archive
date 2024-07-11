"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRewardView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TowerRewardItem_1 = require("./TowerRewardItem");
class TowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.u6e = void 0),
      (this.sBi = () => {
        return new TowerRewardItem_1.TowerRewardItem();
      }),
      (this.dDo = () => {
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
    (this.u6e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.sBi,
    )),
      this.Og();
  }
  OnBeforeDestroy() {
    this.u6e = void 0;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.dDo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.dDo,
    );
  }
  Og() {
    const e = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
    const r = ModelManager_1.ModelManager.TowerModel.GetDifficultyReward(e);
    r &&
      (r.sort((e, r) => {
        const t = e.IsReceived ? 1 : 0;
        const i = r.IsReceived ? 1 : 0;
        return t != i ? t - i : e.Index - r.Index;
      }),
      this.u6e.RefreshByData(r),
      this.GetText(1).SetText(
        ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e) +
          "/" +
          ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e),
      ));
  }
}
exports.TowerRewardView = TowerRewardView;
// # sourceMappingURL=TowerRewardView.js.map
