"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FocusItemText = void 0);
const UE = require("ue"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  GuideCountDownItem_1 = require("./GuideCountDownItem"),
  GuideDescribeNew_1 = require("./GuideDescribeNew");
class FocusItemText extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Xzt = 0),
      (this.$zt = !0),
      (this.iqt = void 0),
      (this.Yzt = void 0),
      (this.OQt = void 0),
      (this.Jzt = () => {
        this.Xzt = 1;
      }),
      (this.OQt = e),
      (this.Yzt = e.Owner);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UITexture],
    ];
  }
  OnStart() {
    var e = this.Yzt.TotalDuration,
      t = this.GetItem(8);
    0 < e
      ? ((this.iqt = new GuideCountDownItem_1.GuideCountDownItem(e)),
        this.iqt.Init(t),
        t.SetUIActive(!0))
      : t.SetUIActive(!1),
      this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
  }
  ShowText() {
    var e = this.GetText(7),
      e =
        (this.GetHorizontalLayout(3).OnRebuildLayoutDelegate.Bind(this.Jzt),
        new GuideDescribeNew_1.GuideDescribeNew(e)),
      t = this.Yzt.GetFocusViewConf(),
      i =
        ((this.$zt = t.TextInScreen),
        e.SetUpText(t.Content, ...t.Button),
        this.GetItem(1)),
      s = this.GetItem(2),
      r = this.GetItem(4),
      a = this.GetItem(5);
    if (
      (i.SetUIActive(!1),
      s.SetUIActive(!1),
      r.SetUIActive(!1),
      a.SetUIActive(!1),
      t.ShowArrow)
    )
      switch (t.ContentDirection) {
        case "D":
          i.SetUIActive(!0);
          break;
        case "U":
          s.SetUIActive(!0);
          break;
        case "L":
          a.SetUIActive(!0);
          break;
        case "R":
          r.SetUIActive(!0);
      }
    e = t.RoleHeadId;
    e
      ? ((t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
        this.SetTextureByPath(t.RoleHeadIconBig, this.GetTexture(11)),
        this.GetItem(10).SetUIActive(!0))
      : this.GetItem(10).SetUIActive(!1);
  }
  OnTick(e) {
    this.zzt(), this.Zzt();
  }
  zzt() {
    var e = this.OQt.RectItem,
      t = this.GetHorizontalLayout(3),
      i = this.Yzt.GetFocusViewConf(),
      s = t.RootUIComp.K2_GetComponentScale().X;
    let r = 0;
    var a = this.RootItem;
    switch (i.ContentDirection) {
      case "U":
        (r = e.Height + a.Height), (r *= 0.5), a.SetAnchorOffsetY(r);
        break;
      case "D":
        (r = e.Height + a.Height), (r *= 0.5), a.SetAnchorOffsetY(-r);
        break;
      case "L":
        (r = e.Width + t.RootUIComp.Width * s),
          (r *= 0.5),
          a.SetAnchorOffsetX(-r);
        break;
      case "R":
        (r = e.Width + t.RootUIComp.Width * s),
          (r *= 0.5),
          a.SetAnchorOffsetX(r);
        break;
      case "CT":
        var h =
          ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocusCenterTextPos();
        a.K2_SetWorldLocation(h, !1, void 0, !1);
    }
    i = this.GetText(7);
    i.GetWidth() > FocusItemText.eZt &&
      (i.SetWidth(FocusItemText.eZt), i.SetOverflowType(1));
  }
  Zzt() {
    if (!(!this.$zt || this.Xzt <= 0 || 0 < --this.Xzt)) {
      var r = this.GetHorizontalLayout(3).RootUIComp,
        a = r.K2_GetComponentLocation(),
        h = this.RootItem.K2_GetComponentLocation(),
        o = r.K2_GetComponentScale(),
        n = o.X,
        o = o.Y,
        c = UiLayer_1.UiLayer.UiRootItem,
        u = c.Width,
        U = c.Height,
        c = c.K2_GetComponentLocation(),
        u = u / 2,
        U = U / 2,
        _ = r.Width,
        x = r.Height;
      let e = c.X - u + (r.GetPivot().X * _ + FocusItemText.tZt) * n,
        t = c.X + u - ((1 - r.GetPivot().X) * _ + FocusItemText.tZt) * n,
        i = c.Y - U + (r.GetPivot().Y * x + FocusItemText.iZt) * o,
        s = c.Y + U - ((1 - r.GetPivot().Y) * x + FocusItemText.iZt) * o;
      e > t && ((e += t), (t = e - t), (e -= t)),
        i > s && ((i += s), (s = i - s), (i -= s)),
        (a.X = MathUtils_1.MathUtils.Clamp(h.X, e, t)),
        (a.Y = MathUtils_1.MathUtils.Clamp(a.Y, i, s)),
        r.K2_SetWorldLocation(a, !1, void 0, !1),
        this.GetVerticalLayout(0).SetEnable(!1);
    }
  }
  OnDurationChange(e) {
    this.iqt && this.iqt.OnDurationChange(e);
  }
  OnBaseViewCloseWhenFinish() {
    this.iqt?.SetActive(!1), this.GetItem(9).SetUIActive(!0);
  }
}
((exports.FocusItemText = FocusItemText).tZt = 80),
  (FocusItemText.iZt = 10),
  (FocusItemText.eZt = 1120);
//# sourceMappingURL=GuideFocusItemText.js.map
