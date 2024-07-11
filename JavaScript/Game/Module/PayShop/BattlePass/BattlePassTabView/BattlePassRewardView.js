"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassRewardView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  BattlePassBackgroundPanel_1 = require("./BattlePassBackgroundPanel"),
  BattlePassRewardGridItem_1 = require("./BattlePassRewardGridItem");
class BattlePassRewardView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.p2i = !1),
      (this.v2i = !1),
      (this.M2i = void 0),
      (this.E2i = void 0),
      (this.vVt = void 0),
      (this.S2i = () => {
        UiManager_1.UiManager.OpenView("BattlePassPayView", this.ExtraParams);
      }),
      (this.y2i = () => {
        var e = {
          WeaponDataList:
            ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList(),
          SelectedIndex: 0,
          WeaponObservers: this.ExtraParams,
        };
        UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
      }),
      (this.I2i = () => {
        return new BattlePassRewardGridItem_1.BattlePassRewardGridItem();
      }),
      (this.T2i = () => {
        this.GetItem(2).SetUIActive(
          ModelManager_1.ModelManager.BattlePassModel.PayType ===
            Protocol_1.Aki.Protocol.yNs.Proto_NoPaid,
        );
      }),
      (this.L2i = () => {
        var e;
        this.p2i &&
          ((this.p2i = !1),
          (e =
            ModelManager_1.ModelManager.BattlePassModel.GetCurrentShowLevel()),
          this.vVt.ScrollToGridIndex(e - 1));
      }),
      (this.D2i = (e) => {
        e ? this.vVt.RefreshGridProxy(e) : this.vVt.RefreshAllGridProxies(),
          this.R2i();
      }),
      (this.Esi = () => {
        (this.p2i = !0),
          this.vVt.RefreshByData(
            ModelManager_1.ModelManager.BattlePassModel.RewardDataList,
          );
      }),
      (this.R2i = () => {
        var e = this.vVt.NCi,
          e = this.vVt.TryGetCachedData(e);
        e &&
          ((e = e.Level - 1),
          0 !==
            (e =
              ModelManager_1.ModelManager.BattlePassModel.GetNextStageLevel(
                e,
              ))) &&
          this.E2i.Refresh(
            ModelManager_1.ModelManager.BattlePassModel.GetRewardData(e),
            !1,
            0,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.S2i],
        [6, this.y2i],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.E2i = new BattlePassRewardGridItem_1.BattlePassRewardGridItem()),
      (this.M2i = new BattlePassBackgroundPanel_1.BattlePassBackgroundPanel());
    var e = { IsRewardPanel: !0, WeaponObservers: this.ExtraParams };
    await Promise.all([
      this.E2i.OnlyCreateByActorAsync(this.GetItem(4).GetOwner()),
      this.M2i.OnlyCreateByActorAsync(this.GetItem(0).GetOwner(), e),
    ]),
      this.AddChild(this.E2i),
      this.AddChild(this.M2i);
  }
  OnStart() {
    (this.v2i = !0),
      this.GetItem(2).SetUIActive(
        ModelManager_1.ModelManager.BattlePassModel.PayType ===
          Protocol_1.Aki.Protocol.yNs.Proto_NoPaid,
      ),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(3),
        this.GetItem(5).GetOwner(),
        this.I2i,
      )),
      this.vVt.BindOnScrollValueChanged(this.R2i),
      this.vVt.BindLateUpdate(this.L2i);
  }
  OnBeforeShow() {
    this.Esi();
  }
  OnAfterShow() {
    this.UiViewSequence?.PlaySequence(this.v2i ? "Start" : "Switch"),
      (this.v2i = !1);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GetBattlePassRewardEvent,
      this.D2i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
        this.Esi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattlePassFirstUnlockAnime,
        this.T2i,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GetBattlePassRewardEvent,
      this.D2i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
        this.Esi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattlePassFirstUnlockAnime,
        this.T2i,
      );
  }
  OnBeforeDestroy() {
    this.vVt && (this.vVt.ClearGridProxies(), (this.vVt = void 0));
  }
}
exports.BattlePassRewardView = BattlePassRewardView;
//# sourceMappingURL=BattlePassRewardView.js.map
