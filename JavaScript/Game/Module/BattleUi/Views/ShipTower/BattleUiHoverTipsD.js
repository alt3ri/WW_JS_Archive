"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiHoverTipsD = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView");
class BattleUiHoverTipsD extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Hmt = !1),
      (this.TDe = void 0),
      (this.SPe = void 0),
      (this.LAe = void 0),
      (this.xKt = void 0),
      (this.EndShow = () => {
        this.TDe &&
          (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
          this.SPe?.StopCurrentSequence(),
          this.SPe?.PlayLevelSequenceByName("Close");
      }),
      (this.eRe = () => {
        this.TDe &&
          (this.EndShow(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BattleUiToggleShipTowerBuffInfo,
          ));
      });
  }
  Initialize(t) {
    super.Initialize(t);
  }
  async InitializeAsync() {
    var t = this.GetItem(1);
    (this.xKt = new BattleUiInfoItem()),
      await this.xKt.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    this.RootItem?.SetAnchorHAlign(2),
      this.RootItem?.SetAnchorVAlign(1),
      this.RootItem?.SetAnchorOffsetX(0),
      this.RootItem?.SetAnchorOffsetY(0),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent((t) => {
        "Close" === t && this.SetActive(!1);
      });
  }
  CreateAndShow(t, e) {
    this.Hmt
      ? (this.UpdateInfo(e), this.SetActive(!0), this.Wmt())
      : this.NewByResourceId(t, "UiItem_HoverTipsD").finally(() => {
          (this.Hmt = !0), this.UpdateInfo(e), this.Wmt();
        });
  }
  OnShowBattleChildView() {
    this.SPe.StopCurrentSequence(), this.SPe.PlaySequencePurely("Start");
  }
  UpdateInfo(t) {
    (this.LAe = t),
      this.Hmt &&
        (this.xKt?.Refresh(this.LAe), this.LAe.DescTitleKey) &&
        this.GetText(2)?.ShowTextNew(this.LAe.DescTitleKey);
  }
  Wmt() {
    this.TDe = TimerSystem_1.TimerSystem.Delay(this.eRe, 8e3);
  }
  OnBeforeDestroy() {
    this.eRe();
  }
}
exports.BattleUiHoverTipsD = BattleUiHoverTipsD;
class BattleUiInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.DOt = void 0),
      (this.AZs = void 0),
      (this.Bqe = () => new BattleUiDescInfoItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var t = new SmallItemGrid_1.SmallItemGrid();
    await t.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.DOt = t),
      (this.AZs = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.Bqe,
      ));
  }
  Refresh(t) {
    this.DOt?.Apply(t.ItemInfo),
      this.DOt?.SetToggleInteractive(!1),
      this.AZs.RefreshByData(t.DescInfoList);
    var e = this.GetText(0),
      e =
        (t.SubTitleKey
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.SubTitleKey)
          : e?.SetText(""),
        this.GetText(4));
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.TitleKey),
      t.TitleColor && e?.SetColor(t.TitleColor);
  }
}
class BattleUiDescInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIItem],
    ];
  }
  Refresh(t, e, i) {
    var s,
      r = this.GetText(2),
      h = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, t.DescKey),
      r?.SetChangeColor(!!t.DescUseChangeColor, r.changeColor),
      this.GetItem(4).SetUIActive(!!t.IsShowState),
      t.IsShowState &&
        ((r = !!t.IsUnlock),
        (s = UE.Color.FromHex(r ? "adfb5aff" : "adadadff")),
        h?.SetColor(s),
        this.GetSprite(0).SetUIActive(r),
        this.GetSprite(3).SetUIActive(!r),
        t.StateTitleKey) &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, t.StateTitleKey);
  }
}
//# sourceMappingURL=BattleUiHoverTipsD.js.map
