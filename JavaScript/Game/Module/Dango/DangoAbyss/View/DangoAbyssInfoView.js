"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssInfoView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  DangoAbyssBattleTreasureItem_1 = require("./DangoAbyssBattleTreasureItem"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine");
class DangoAbyssInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.iGc = void 0),
      (this.rGc = void 0),
      (this.iYe = void 0),
      (this.oGc = void 0),
      (this.qsi = void 0),
      (this.SGe = void 0),
      (this.GOe = void 0),
      (this.su1 = () => {
        this.N2c();
      }),
      (this.Vtl = () => {
        this.sSt();
      }),
      (this.AMo = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAbyssRoomInfoUpdate,
      this.su1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAbyssRoomInfoUpdate,
      this.su1,
    );
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.AMo);
    var e = [];
    (this.iGc = new SpriteTextItem()),
      e.push(this.iGc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
      (this.rGc = new SpriteTextItem()),
      e.push(this.rGc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())),
      (this.iYe = new SpriteTextItem()),
      e.push(this.iYe.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      (this.oGc = new SpriteTextItem()),
      e.push(this.oGc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
      (this.qsi = new RewardInfoItem()),
      e.push(this.qsi.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      (this.SGe = new DescItem()),
      e.push(this.SGe.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())),
      await Promise.all(e),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.Vtl, 1e3));
  }
  N2c() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress();
    this.sqe(e);
  }
  OnBeforeShow() {
    this.F2c(), this.Q2c(), this.sSt(), this.N2c(), this.Nft(), this.Iwn();
  }
  F2c() {
    var e =
      ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceReviveTipTips();
    this.rGc?.SetDesc(e);
  }
  Q2c() {
    var e =
      ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceFloorDetailProgressText();
    this.oGc?.SetDesc(e);
  }
  sSt() {
    var e =
      ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceRemainTimeText();
    this.iYe?.SetDesc(e);
  }
  Nft() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssName();
    "" !== e && this.iGc?.SetDesc(e);
  }
  Iwn() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentRouteDesc();
    this.SGe?.SetDesc(e);
  }
  sqe(e) {
    this.qsi?.RefreshByProgress(e);
  }
  OnBeforeDestroy() {
    this.GOe &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
}
exports.DangoAbyssInfoView = DangoAbyssInfoView;
class SpriteTextItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  SetTitle(e) {
    this.GetText(1)?.SetText(e);
  }
  SetDesc(e) {
    this.GetText(2)?.SetText(e);
  }
}
class RewardInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RewardTimeMap = new Map()),
      (this.FullTime = 0),
      (this.q2c = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UISliderComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.FullTime =
      ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTotalScore()),
      (this.RewardTimeMap =
        ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTreasureMap()),
      (this.q2c =
        new DangoAbyssBattleTreasureItem_1.DangoAbyssBattleTreasureRoot()),
      await this.q2c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      this.q2c.InitItem(this.GetItem(3), this.GetItem(4)),
      await this.q2c.Init(this.RewardTimeMap, this.FullTime);
  }
  SetTitle(e) {
    this.GetText(1)?.SetText(e);
  }
  SetProgress(e) {
    this.GetSlider(2)?.SetValue(e);
  }
  RefreshByProgress(e) {
    this.SetProgress(e), this.sqe(e);
  }
  sqe(e) {
    this.q2c?.RefreshRewardItem(100 * e);
  }
}
class DescItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  OnStart() {}
  SetTitle(e) {
    this.GetText(1)?.SetText(e);
  }
  SetDesc(e) {
    this.GetText(3)?.SetText(e);
  }
}
//# sourceMappingURL=DangoAbyssInfoView.js.map
