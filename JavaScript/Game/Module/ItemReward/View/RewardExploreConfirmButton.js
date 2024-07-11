"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreConfirmButton = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreConfirmButton extends UiPanelBase_1.UiPanelBase {
  constructor(i, t) {
    super(),
      (this.gfi = void 0),
      (this.ffi = void 0),
      (this.pfi = void 0),
      (this.$js = void 0),
      (this.Xjs = void 0),
      (this.vfi = () => {
        --this.ffi,
          this.ffi <= 0 &&
            (this.Mfi(),
            this.gfi.OnTimeDownOnCallback && this.gfi.OnTimeDownOnCallback(),
            this.gfi.IsTimeDownCloseView) &&
            UiManager_1.UiManager.CloseView("ExploreRewardView");
        var i = this.gfi.DescriptionTextId,
          t = this.GetText(2);
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, i, this.ffi);
      }),
      (this.Yjs = () => {
        var i, t, e;
        --this.$js,
          this.$js <= 0
            ? (this.Jjs(),
              this.Sfi(this.gfi.ButtonTextId),
              this.GetButton(3)?.SetSelfInteractive(!0))
            : ((i = this.GetText(0)),
              (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                this.gfi.ButtonTextId,
              )),
              (e =
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "OnClickCd",
                )),
              (e = StringUtils_1.StringUtils.Format(e, this.$js.toString())),
              i?.SetText(t + e));
      }),
      (this.UFe = () => {
        var i,
          t,
          e,
          s = this.gfi.OnClickedCallback,
          s = (s && s(this.Efi), this.gfi?.ClickCd);
        s &&
          0 < s &&
          (this.zjs(s),
          this.GetButton(3)?.SetSelfInteractive(!1),
          (i = this.GetText(0)),
          (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            this.gfi.ButtonTextId,
          )),
          (e =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew("OnClickCd")),
          (e = StringUtils_1.StringUtils.Format(
            e,
            (s / TimeUtil_1.TimeUtil.InverseMillisecond).toString(),
          )),
          i?.SetText(t + e)),
          this.gfi.IsClickedCloseView &&
            UiManager_1.UiManager.CloseView("ExploreRewardView");
      }),
      (this.Efi = t),
      this.CreateThenShowByActor(i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.UFe]]);
  }
  OnBeforeDestroy() {
    this.Mfi(), (this.gfi = void 0);
  }
  Refresh(i) {
    (this.gfi = i), this.Sfi(i.ButtonTextId);
    i = !StringUtils_1.StringUtils.IsEmpty(i.DescriptionTextId);
    this.yfi(i), i && this.Ifi();
  }
  Sfi(i) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
  }
  yfi(i) {
    this.GetItem(1).SetUIActive(i);
  }
  Ifi() {
    var i = this.gfi.DescriptionTextId,
      t = this.gfi.DescriptionArgs,
      e = this.gfi.TimeDown,
      s = this.GetText(2);
    e && 0 < e
      ? (LguiUtil_1.LguiUtil.SetLocalTextNew(
          s,
          i,
          e / TimeUtil_1.TimeUtil.InverseMillisecond,
        ),
        this.Tfi(e))
      : LguiUtil_1.LguiUtil.SetLocalTextNew(s, i, ...t);
  }
  Tfi(i) {
    (this.ffi = i / TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.pfi = TimerSystem_1.TimerSystem.Forever(this.vfi, 1e3));
  }
  Mfi() {
    this.pfi &&
      TimerSystem_1.TimerSystem.Has(this.pfi) &&
      (TimerSystem_1.TimerSystem.Remove(this.pfi), (this.pfi = void 0));
  }
  zjs(i) {
    (this.$js = i / TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.Xjs = TimerSystem_1.TimerSystem.Forever(this.Yjs, 1e3));
  }
  Jjs() {
    this.Xjs &&
      TimerSystem_1.TimerSystem.Has(this.Xjs) &&
      (TimerSystem_1.TimerSystem.Remove(this.Xjs), (this.Xjs = void 0));
  }
}
exports.RewardExploreConfirmButton = RewardExploreConfirmButton;
//# sourceMappingURL=RewardExploreConfirmButton.js.map
