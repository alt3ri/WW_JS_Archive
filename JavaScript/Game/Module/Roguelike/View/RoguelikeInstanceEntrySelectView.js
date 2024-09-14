"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeInstanceEntrySelectItem =
    exports.RoguelikeInstanceEntrySelectView =
      void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeInstanceEntrySelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LeftLayout = void 0),
      (this.RightLayout = void 0),
      (this.TextChangeAnimationTimerHandle = void 0),
      (this.CurRate = 0),
      (this.Qho = () => {
        RoguelikeController_1.RoguelikeController.RoguelikePopularEntriesChangeRequest(
          this.OpenParam.r6n,
          Array.from(RoguelikeInstanceEntrySelectView.SelectIndexList),
        ).then(() => {
          this.CloseMe();
        });
      }),
      (this.Jbn = (e) => {
        return (
          1 === e.GetToggleState() ||
          ((e =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePopularEntrieArg(
              ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.UHn,
              this.OpenParam.r6n,
            ).Slot),
          !(
            RoguelikeInstanceEntrySelectView.SelectIndexList.size >= e &&
            (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Roguelike_Instance_Entry_Select_MAX_COUNT",
            ),
            1)
          ))
        );
      }),
      (this.Xho = (e, t, i) => {
        t
          ? RoguelikeInstanceEntrySelectView.SelectIndexList.add(e)
          : RoguelikeInstanceEntrySelectView.SelectIndexList.delete(e),
          this.RefreshBuffTxt();
      }),
      (this.$ho = () => {
        var e = new RoguelikeInstanceEntrySelectItem();
        return (
          (e.OnSelectBuff = this.Xho), (e.CheckCanExecuteChange = this.Jbn), e
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIVerticalLayout],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.Qho]]);
  }
  async OnBeforeStartAsync() {
    (RoguelikeInstanceEntrySelectView.SelectIndexList = new Set(
      this.OpenParam.BHn,
    )),
      (this.LeftLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(0),
        this.$ho,
      )),
      (this.RightLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.$ho,
      ));
    var e = [],
      t = [];
    for (const i of ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntries())
      i.Insts.includes(this.OpenParam.r6n) &&
        (0 === i.Category ? t.push(i) : 1 === i.Category && e.push(i));
    await this.LeftLayout.RefreshByDataAsync(e),
      await this.RightLayout.RefreshByDataAsync(t),
      this.RefreshBuffTxt(!0);
  }
  OnBeforeDestroy() {
    (RoguelikeInstanceEntrySelectView.SelectIndexList = void 0),
      this.TextChangeAnimationTimerHandle &&
        TimerSystem_1.TimerSystem.Remove(this.TextChangeAnimationTimerHandle);
  }
  RefreshBuffTxt(e = !1) {
    let i = RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE;
    const s = RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE / 100;
    for (const r of RoguelikeInstanceEntrySelectView.SelectIndexList) {
      var t =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntriesById(
          r,
        );
      t && (i += t.Rate);
    }
    if (((i /= 100), e)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "Rogue_Entry_Multiple",
        i,
      ),
        (this.CurRate = i);
      let e = UE.Color.FromHex("6e6a62");
      i > s
        ? (e = UE.Color.FromHex("c25757"))
        : i < s && (e = UE.Color.FromHex("36cd33")),
        this.GetText(2)?.SetColor(e);
    } else {
      this.TextChangeAnimationTimerHandle &&
        TimerSystem_1.TimerSystem.Remove(this.TextChangeAnimationTimerHandle);
      let t = 0;
      this.TextChangeAnimationTimerHandle = TimerSystem_1.TimerSystem.Forever(
        (e) => {
          if (
            (this.CurRate < i
              ? (this.CurRate += 1)
              : this.CurRate > i && --this.CurRate,
            this.GetText(2)?.SetText(`x${this.CurRate}%`),
            500 <= (t = t + e + 100))
          ) {
            let e = UE.Color.FromHex("6e6a62");
            i > s
              ? (e = UE.Color.FromHex("c25757"))
              : i < s && (e = UE.Color.FromHex("36cd33")),
              (this.CurRate = i),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(2),
                "Rogue_Entry_Multiple",
                i,
              ),
              this.GetText(2)?.SetColor(e),
              TimerSystem_1.TimerSystem.Remove(
                this.TextChangeAnimationTimerHandle,
              );
          }
        },
        100,
        5,
      );
    }
    var e =
      ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRoguePopularEntrieArg(
        ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.UHn,
        this.OpenParam.r6n,
      );
    e &&
      ((e = e.Slot),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "Roguelike_Instance_Entry_Select_Buff_Number",
        RoguelikeInstanceEntrySelectView.SelectIndexList.size,
        e,
      ));
  }
}
(exports.RoguelikeInstanceEntrySelectView =
  RoguelikeInstanceEntrySelectView).SelectIndexList = void 0;
class RoguelikeInstanceEntrySelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnSelectBuff = void 0),
      (this.CheckCanExecuteChange = void 0),
      (this.DataId = 0),
      (this.OnToggleStateChange = (e) => {
        this.OnSelectBuff &&
          this.OnSelectBuff(this.DataId, 1 === e, this.GetExtendToggle(4));
      });
  }
  Refresh(e, t, i) {
    this.DataId = e.Id;
    var s = RoguelikeInstanceEntrySelectView.SelectIndexList.has(e.Id);
    this.GetExtendToggle(4)?.SetToggleState(s ? 1 : 0, !1),
      this.GetExtendToggle(4)?.CanExecuteChange.IsBound() ||
        this.GetExtendToggle(4)?.CanExecuteChange.Unbind(),
      this.GetExtendToggle(4)?.CanExecuteChange.Bind(
        () =>
          !this.CheckCanExecuteChange ||
          this.CheckCanExecuteChange(this.GetExtendToggle(4)),
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
      0 === e.Category
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "Roguelike_Instance_Entry_Buff_Number",
            Math.abs(e.Rate / 100).toString(),
          )
        : 1 === e.Category &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "Roguelike_Instance_Entry_DeBuff_Number",
            Math.abs(e.Rate / 100).toString(),
          ),
      this.SetTextureByPath(e.Icon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        e.Describe,
        ...e.DescriptionParam,
      );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIExtendToggle],
    ];
  }
  OnStart() {
    this.GetExtendToggle(4)?.OnStateChange.Add(this.OnToggleStateChange);
  }
  IsToggleSelected() {
    return 1 === this.GetExtendToggle(4).GetToggleState();
  }
  SetToggleInteractive(e) {
    this.GetExtendToggle(4).SetSelfInteractive(e);
  }
}
exports.RoguelikeInstanceEntrySelectItem = RoguelikeInstanceEntrySelectItem;
//# sourceMappingURL=RoguelikeInstanceEntrySelectView.js.map
