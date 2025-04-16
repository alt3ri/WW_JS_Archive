"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueRewardView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MapRoguePopupBase_1 = require("./Components/MapRoguePopupBase"),
  START_ANIM_EVENT = "InturnPlay";
class MapRogueRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Xr1 = 0),
      (this.BgItem = void 0),
      (this.RewardLayout = void 0),
      (this.OpData = void 0),
      (this.CurrentSelectIndex = -1),
      (this.Refresh = () => {
        this.OpData &&
          (0 <= this.CurrentSelectIndex &&
            this.RewardLayout.GetLayoutItemByKey(
              this.CurrentSelectIndex,
            )?.SetToggleState(!1, !0),
          this.GetButton(4).RootUIComp.SetUIActive(this.OpData.CanGiveUp),
          this.GetButton(4).SetSelfInteractive(!this.OpData.IsMax),
          this.GetButton(5).SetSelfInteractive(!1),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "RogueRes_Event_Rewards_3",
            this.OpData.CurrentSelectCount,
            this.OpData.MaxSelectCount,
          ),
          this.v4e());
      }),
      (this.$An = (t) => {
        START_ANIM_EVENT === t && this.v4e();
      }),
      (this.y7s = (t, i) => {
        (t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          t.ConfigId,
        )),
          (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            i.ConfigId,
          ));
        return t.QualityId !== i.QualityId ? i.QualityId - t.QualityId : 0;
      }),
      (this.d2t = () => {
        var t = new RewardItemToggle();
        return (
          (t.OnExtendToggleClicked = this.q3e),
          (t.OnCanExecuteChangeFunc = this.TKi),
          t
        );
      }),
      (this.Wfo = () => {
        this.OpData &&
          ((this.OpData.CloseViewFunc = void 0),
          (this.OpData.UpdateViewFunc = void 0)),
          this.CloseMe();
      }),
      (this.T2c = () => {
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(304);
        t.FunctionMap.set(2, () => {
          this.OpData.Select(Protocol_1.Aki.Protocol.Zc1.Proto_GiveUp);
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            t,
          );
      }),
      (this.tWt = () => {
        this.OpData.Select(this.CurrentSelectIndex);
      }),
      (this.q3e = (t, i) => {
        t ? this.Fp(i) : this.CurrentSelectIndex === i.Index && this.om1();
      }),
      (this.TKi = (t, i) => !!t || !this.OpData.IsMax);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.T2c],
        [5, this.tWt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.BgItem = new MapRoguePopupBase_1.MapRoguePopupBase()),
      await this.BgItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    (this.Xr1 = this.OpenParam),
      (this.RewardLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.d2t,
      )),
      (this.OpData = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
        this.Xr1,
      )),
      (this.OpData.CloseViewFunc = this.Wfo),
      (this.OpData.UpdateViewFunc = this.Refresh);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  v4e() {
    if (this.OpData) {
      var i = this.OpData.GetGainDataList(),
        e = [];
      for (let t = 0; t < i.length; t++) {
        var s = i[t].Ah1;
        s &&
          ((s = { Index: t, ConfigId: s.L8n, Count: s.m9n, IsSelect: s.k2s }),
          e.push(s));
      }
      this.RewardLayout.RefreshByData(e.sort(this.y7s), void 0, !0);
    }
  }
  om1() {
    (this.CurrentSelectIndex = -1), this.GetButton(5).SetSelfInteractive(!1);
  }
  Fp(t) {
    0 <= this.CurrentSelectIndex &&
      this.RewardLayout.GetLayoutItemByKey(
        this.CurrentSelectIndex,
      )?.SetToggleState(!1, !1),
      (this.CurrentSelectIndex = t.Index),
      this.GetButton(5).SetSelfInteractive(!t.IsSelect);
  }
}
exports.MapRogueRewardView = MapRogueRewardView;
class RewardItemToggle extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.Toggle = void 0),
      (this.OnExtendToggleClicked = void 0),
      (this.OnCanExecuteChangeFunc = void 0),
      (this.Lke = () =>
        !this.OnCanExecuteChangeFunc ||
        this.OnCanExecuteChangeFunc(
          1 === this.Toggle?.GetToggleState(),
          this.Data,
        )),
      (this.N8e = (t) => {
        this.OnExtendToggleClicked?.(t, this.Data);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.N8e]]);
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(0)),
      this.Toggle.CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.Toggle?.CanExecuteChange.Unbind(), (this.Toggle = void 0);
  }
  Refresh(t, i, e) {
    this.Data = t;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      t.ConfigId,
    );
    s &&
      (this.SetItemIcon(this.GetTexture(1), t.ConfigId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s.Name),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(5),
        s.AttributesDescription,
      ),
      this.GetText(6).SetText("x" + t.Count.toString()),
      (s = "T_RogueItemQualityBg" + s.QualityId),
      (s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s)),
      this.SetTextureShowUntilLoaded(s, this.GetTexture(4)),
      this.SetItemDone(t.IsSelect));
  }
  SetToggleState(t, i = !1) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(t, i);
  }
  SetItemDone(t) {
    this.GetText(6).SetUIActive(!t), this.GetItem(3).SetUIActive(t);
  }
  GetKey(t, i) {
    return this.Data.Index;
  }
}
//# sourceMappingURL=MapRogueRewardView.js.map
