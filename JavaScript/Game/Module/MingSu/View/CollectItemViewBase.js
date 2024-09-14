"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectItemViewBase = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class CollectItemViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.PoolConfigId = 0),
      (this.CollectItemConfigId = 0),
      (this.CurrentShowLevel = 0),
      (this.OAr = () => {
        this.OnUpdateDragonPoolView();
      }),
      (this.kAr = () => {
        this.OnSubmitItemLevelUp();
      }),
      (this.QUn = () => {
        this.OnSubmitItemLevelMax();
      }),
      (this.AGn = () => {
        this.OnLevelMaxSequenceFinished();
      }),
      (this.kGn = () => {
        this.OnLevelUpSequenceFinished();
      }),
      (this.XUn = () => {
        this.OnSubmitItemLevelUpSequencePlayFail();
      }),
      (this.qdi = (e, t) => {
        e === this.CollectItemConfigId && this.OnCollectItemCountChanged(t);
      }),
      (this.$Ge = (e) => {
        "CompositeRewardView" === e && this.OnCloseRewardView();
      });
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.MingSuModel;
    (this.PoolConfigId = e.GetCurrentDragonPoolId()),
      (this.CollectItemConfigId = e.GetCollectItemConfigId()),
      (this.CurrentShowLevel =
        e.GetTargetDragonPoolLevelById(this.PoolConfigId) + 1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
        this.XUn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdateDragonPoolView,
        this.OAr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
        this.AGn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
        this.kGn,
      ),
      (ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId =
        ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
      this.OnBegined();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseView,
      this.$Ge,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
        this.XUn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdateDragonPoolView,
        this.OAr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
        this.AGn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
        this.kGn,
      ),
      this.OnEnded();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSubmitItemLevelUp,
      this.kAr,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemLevelMax,
        this.QUn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSubmitItemLevelUp,
      this.kAr,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemLevelMax,
        this.QUn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      );
  }
  OnBegined() {}
  OnEnded() {}
  OnUpdateDragonPoolView() {}
  OnSubmitItemLevelUp() {}
  OnSubmitItemLevelMax() {}
  OnLevelMaxSequenceFinished() {}
  OnLevelUpSequenceFinished() {}
  OnSubmitItemLevelUpSequencePlayFail() {}
  OnCloseRewardView() {}
  OnCollectItemCountChanged(e) {}
}
exports.CollectItemViewBase = CollectItemViewBase;
//# sourceMappingURL=CollectItemViewBase.js.map
