"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardTipsPanel = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer"),
  SimpleGenericLayout_1 = require("../../../../../Util/Layout/SimpleGenericLayout"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardTipsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Id = 0),
      (this.StarLayout = void 0),
      (this.$pt = void 0),
      (this.SellClick = void 0),
      (this.LockState = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UILayoutBase],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIText],
      [6, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UITexture],
      [13, UE.UIText],
    ];
  }
  OnStart() {
    (this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem)),
      (this.StarLayout = new SimpleGenericLayout_1.SimpleGenericLayout(
        this.GetLayoutBase(5),
      )),
      this.GetItem(1)?.SetUIActive(!1),
      this.GetItem(0)?.SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  BGt(e, i) {
    this.GetLayoutBase(5).RootUIComp.SetUIActive(e),
      e && this.StarLayout.RebuildLayout(i);
  }
  YYl(e, i, t) {
    if ((this.GetItem(7).SetUIActive(e), e)) {
      this.GetText(9).SetText(i + "cm");
      (i = this.GetTexture(8)),
        (t = DockyardPanelUtil_1.DockyardPanelUtil.GetTexturePathByCup(t));
      const e = !StringUtils_1.StringUtils.IsBlank(t);
      i.SetUIActive(e), e && this.SetTextureByPath(t, i);
    }
  }
  iFi(e) {
    var i = 0 < e;
    this.GetItem(10).SetUIActive(i),
      i && this.GetText(11).SetText(e.toString()),
      this.SetItemIcon(
        this.GetTexture(12),
        FishingDefine_1.FISHING_CURRENCY_ITEMID,
      );
  }
  Refresh(e) {
    this.Id = e.IncId;
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
        e.ItemId,
      ),
      t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTagConfig(
        i.Tech[0],
      ),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), i.Desc),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Name),
        UE.Color.FromHex(t.Color)),
      t = (this.GetSprite(4).SetColor(t), 1 === i.Type);
    this.BGt(t, e.Quality), this.YYl(t, e.Size, e.Cup), this.iFi(e.Price);
  }
  SetPanelVisible(e, i = !0) {
    this.LockState || (e ? this.yQ_(i) : this.SQ_(i));
  }
  yQ_(e = !0) {
    e &&
      (this.$pt.StopCurrentSequenceByName("Hide", !1, !0),
      this.$pt.PlaySequencePurely("Show")),
      this.GetItem(0).SetUIActive(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingDockyardItemTipsShown,
        !0,
      );
  }
  SQ_(e = !0) {
    e &&
      (this.$pt.StopCurrentSequenceByName("Show", !1, !0),
      this.$pt.PlaySequencePurely("Hide")),
      this.GetItem(0).SetUIActive(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingDockyardItemTipsShown,
        !1,
      );
  }
}
exports.DockyardTipsPanel = DockyardTipsPanel;
//# sourceMappingURL=DockyardTipsPanel.js.map
