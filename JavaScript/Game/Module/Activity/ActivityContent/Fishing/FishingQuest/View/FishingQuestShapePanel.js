"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQuestShapePanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../../FishingDefine"),
  FishingQuestShapePanelItem_1 = require("./FishingQuestShapePanelItem");
class FishingQuestShapePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Kc_ = 0),
      (this.$c_ = 0),
      (this.zq_ = 0),
      (this.Jq_ = 0),
      (this.Zq_ = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    var e = this.GetItem(1);
    (this.Kc_ = e.Width),
      (this.$c_ = e.Height),
      (this.zq_ = e.GetAnchorOffsetX()),
      (this.Jq_ = e.GetAnchorOffsetY()),
      e.SetUIActive(!1);
  }
  RefreshPanel(e, i = !0) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e),
      s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShapeConfig(
        t.Shap,
      ).FillState;
    let h = -1,
      a = -1,
      r = -1,
      n = -1;
    for (let t = 0, e = s.length; t < e; t++)
      for (let e = 0, i = s[t].ArrayInt.length; e < i; e++)
        1 === s[t].ArrayInt[e] &&
          ((h = -1 === h ? t : Math.min(h, t)),
          (a = -1 === a ? t : Math.max(a, t)),
          (r = -1 === r ? e : Math.min(r, e)),
          (n = -1 === n ? e : Math.max(n, e)));
    e = this.Zq_;
    for (const f of e) f.SetUiActive(!1);
    this.eO_(s, h, r);
    var l = (n - r + 1) * this.Kc_,
      o = (a - h + 1) * this.$c_,
      g = this.GetTexture(2),
      u = (g.SetWidth(l), g.SetHeight(o), this.GetItem(0)),
      _ = (u.SetWidth(l), u.SetHeight(o), t.Sprite);
    for (const p of e) p.SetGirdSprite(t.Category, _);
    this.SetTextureByPath(t.Pic, g),
      this.$A_(i),
      this.GetItem(3).SetUIActive(!i),
      (this.GetItem(4).useChangeColor = i);
  }
  $A_(e) {
    e
      ? this.GetTexture(2).SetCustomMaterialScalarParameter(
          FishingDefine_1.materialProgressName,
          1,
        )
      : this.GetTexture(2).SetCustomMaterialScalarParameter(
          FishingDefine_1.materialProgressName,
          0,
        );
  }
  eO_(s, h, a) {
    let r = 0;
    for (let t = 0, e = s.length; t < e; t++)
      for (let e = 0, i = s[t].ArrayInt.length; e < i; e++)
        1 === s[t].ArrayInt[e] && this.tO_(r++, t - h, e - a);
  }
  tO_(e, i, t) {
    let s = void 0;
    (t = this.zq_ + t * this.Kc_), (i = this.Jq_ - i * this.$c_);
    this.Zq_.length > e
      ? (s = this.Zq_[e]).SetUiActive(!0)
      : ((e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(0))),
        (s =
          new FishingQuestShapePanelItem_1.FishingQuestShapePanelItem()).CreateThenShowByActorAsync(
          e.GetOwner(),
        ),
        this.Zq_.push(s)),
      s.GetRootItem().SetAnchorOffsetX(t),
      s.GetRootItem().SetAnchorOffsetY(i);
  }
}
exports.FishingQuestShapePanel = FishingQuestShapePanel;
//# sourceMappingURL=FishingQuestShapePanel.js.map
