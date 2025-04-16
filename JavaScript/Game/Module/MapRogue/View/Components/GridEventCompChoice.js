"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridEventChoice = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class GridEventChoice extends UiPanelBase_1.UiPanelBase {
  constructor(i, t = 2) {
    super(),
      (this.StepId = i),
      (this.StepType = t),
      (this.CanInteractCallback = void 0),
      (this.ExecuteStep = void 0),
      (this.ToggleLayout = void 0),
      (this.ToggleDataMap = new Map()),
      (this.FinishItem = void 0),
      (this.Fr1 = () => {
        var i = new GridEventChoiceToggle();
        return (
          (i.OnExtendToggleStateChanged = this.Jgt),
          (i.OnCanExecuteChangeFunc = this.TKi),
          i
        );
      }),
      (this.Jgt = (i, t) => {
        i &&
          ((i = this.ToggleDataMap.get(t)),
          this.FinishItem.Refresh(i),
          this.ToggleLayout.GetRootUiItem()?.SetUIActive(!1),
          this.FinishItem.SetActive(!0),
          this.ExecuteStep?.(this.StepId, t));
      }),
      (this.TKi = (i, t) => !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIText],
      [5, UE.UIVerticalLayout],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.FinishItem = new GridEventChoiceFinish()),
      await this.FinishItem.CreateByActorAsync(this.GetItem(7).GetOwner());
  }
  OnStart() {
    this.ToggleLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(5),
      this.Fr1,
    );
  }
  async Refresh(s) {
    var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(
      this.StepId,
    );
    if (i) {
      var e = !StringUtils_1.StringUtils.IsEmpty(i.TitleKey),
        r = !StringUtils_1.StringUtils.IsEmpty(i.TextKey),
        e =
          (this.GetItem(0).SetUIActive(e || r),
          this.RDt(i.TitleKey, i.TagColor),
          this.GetText(4)),
        h =
          (r && LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.TextKey),
          e.SetUIActive(r),
          this.ToggleDataMap.clear(),
          []);
      let t = -1;
      for (let i = 0; i < s.length; i++) {
        var n,
          o,
          a = s[i],
          U = a.v9n,
          l =
            ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(
              U,
            );
        l &&
          (a.br1 && (t = i),
          (o = !(n = 0 < (a.cv1?.s5n ?? 0)) || a.cv1.lMs >= a.cv1.j6n),
          (o = {
            Id: U,
            Icon: l.Icon,
            TitleId: l.TitleKey,
            DescId: l.TextKey,
            IsDisabled: !o,
            ProgressId: n ? l.ProcessText : void 0,
            ProgressParams: n
              ? [a.cv1.lMs.toString(), a.cv1.j6n.toString()]
              : void 0,
          }),
          h.push(o),
          this.ToggleDataMap.set(U, o));
      }
      if (0 <= t) for (let i = 0; i < h.length; i++) h[i].IsDisabled = t !== i;
      await this.ToggleLayout.RefreshByDataAsync(h),
        this.SetActive(!0),
        this.CanInteractCallback?.(this.StepId, this.StepType);
    }
  }
  RDt(i, t) {
    var s = this.GetText(2),
      e = this.GetSprite(3),
      r = this.GetItem(1);
    StringUtils_1.StringUtils.IsEmpty(i)
      ? r.SetUIActive(!1)
      : (LguiUtil_1.LguiUtil.SetLocalTextNew(s, i),
        t && ((s = UE.Color.FromHex(t)), e.SetColor(s)),
        r.SetUIActive(!0));
  }
}
exports.GridEventChoice = GridEventChoice;
class GridEventChoiceToggle extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.LVi = 0),
      (this.OnExtendToggleStateChanged = void 0),
      (this.OnCanExecuteChangeFunc = void 0),
      (this.N8e = () => {
        this.OnExtendToggleStateChanged?.(
          this.GetExtendToggle(0).GetToggleState(),
          this.LVi,
        );
      }),
      (this.Lke = () =>
        !this.OnCanExecuteChangeFunc ||
        this.OnCanExecuteChangeFunc(
          this.GetExtendToggle(0).GetToggleState(),
          this.LVi,
        ));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIExtendToggleSpriteTransition],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.N8e]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
  }
  Refresh(i, t, s) {
    this.LVi = i.Id;
    var e = this.GetText(5),
      r = this.GetText(3),
      h = this.GetText(4),
      n = i.IsDisabled ? 2 : 0;
    this.GetExtendToggle(0).SetToggleState(n);
    const o = this.GetSprite(1);
    this.SetSpriteByPath(i.Icon, o, !1, void 0, () => {
      this.GetUiExtendToggleSpriteTransition(2).SetAllStateSprite(
        o.GetSprite(),
      );
    }),
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, i.TitleId),
      h.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(i.DescId)),
      i.DescId &&
        (i.DescParams
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(h, i.DescId, ...i.DescParams)
          : LguiUtil_1.LguiUtil.SetLocalTextNew(h, i.DescId)),
      e.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(i.ProgressId)),
      i.ProgressId &&
        (i.ProgressParams
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              e,
              i.ProgressId,
              ...i.ProgressParams,
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.ProgressId));
    n =
      !StringUtils_1.StringUtils.IsEmpty(i.DescId) ||
      !StringUtils_1.StringUtils.IsEmpty(i.ProgressId);
    this.GetItem(6).SetUIActive(n);
  }
}
class GridEventChoiceFinish extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIExtendToggleSpriteTransition],
      [3, UE.UIItem],
    ];
  }
  Refresh(i) {
    var t = this.GetText(0);
    if (!StringUtils_1.StringUtils.IsEmpty(i.Icon)) {
      const s = this.GetSprite(1);
      this.SetSpriteByPath(i.Icon, s, !1, void 0, () => {
        this.GetUiExtendToggleSpriteTransition(2).SetAllStateSprite(
          s.GetSprite(),
        );
      });
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, i.TitleId);
  }
}
//# sourceMappingURL=GridEventCompChoice.js.map
