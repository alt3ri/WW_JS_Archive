"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeInstanceEntrySelectItem =
    exports.RoguelikeInstanceEntrySelectView =
      void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeInstanceEntrySelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LeftLayout = void 0),
      (this.RightLayout = void 0),
      (this.TextChangeAnimationTimerHandle = void 0),
      (this.CurRate = 0),
      (this.Yao = () => {
        RoguelikeController_1.RoguelikeController.RoguelikePopularEntriesChangeRequest(
          this.OpenParam.vFn,
          Array.from(RoguelikeInstanceEntrySelectView.SelectIndexList),
        ).then(() => {
          this.CloseMe();
        });
      }),
      (this.Twn = (e) => {
        return (
          e.GetToggleState() === 1 ||
          ((e =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePopularEntrieArg(
              ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n,
              this.OpenParam.vFn,
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
      (this.Jao = (e, t, i) => {
        t
          ? RoguelikeInstanceEntrySelectView.SelectIndexList.add(e)
          : RoguelikeInstanceEntrySelectView.SelectIndexList.delete(e),
          this.RefreshBuffTxt();
      }),
      (this.zao = () => {
        const e = new RoguelikeInstanceEntrySelectItem();
        return (
          (e.OnSelectBuff = this.Jao), (e.CheckCanExecuteChange = this.Twn), e
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
      (this.BtnBindInfo = [[4, this.Yao]]);
  }
  async OnBeforeStartAsync() {
    (RoguelikeInstanceEntrySelectView.SelectIndexList = new Set(
      this.OpenParam.W8n,
    )),
      (this.LeftLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(0),
        this.zao,
      )),
      (this.RightLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.zao,
      ));
    const e = [];
    const t = [];
    for (const i of ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntries())
      i.Insts.includes(this.OpenParam.vFn) &&
        (i.Category === 0 ? t.push(i) : i.Category === 1 && e.push(i));
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
      const t =
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
            (t = t + e + 100) >= 500)
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
        ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n,
        this.OpenParam.vFn,
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
          this.OnSelectBuff(this.DataId, e === 1, this.GetExtendToggle(4));
      });
  }
  Refresh(e, t, i) {
    this.DataId = e.Id;
    const s = RoguelikeInstanceEntrySelectView.SelectIndexList.has(e.Id);
    this.GetExtendToggle(4)?.SetToggleState(s ? 1 : 0, !1),
      this.GetExtendToggle(4)?.CanExecuteChange.IsBound() ||
        this.GetExtendToggle(4)?.CanExecuteChange.Unbind(),
      this.GetExtendToggle(4)?.CanExecuteChange.Bind(
        () =>
          !this.CheckCanExecuteChange ||
          this.CheckCanExecuteChange(this.GetExtendToggle(4)),
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
      e.Category === 0
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "Roguelike_Instance_Entry_Buff_Number",
            Math.abs(e.Rate / 100).toString(),
          )
        : e.Category === 1 &&
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
    return this.GetExtendToggle(4).GetToggleState() === 1;
  }
  SetToggleInteractive(e) {
    this.GetExtendToggle(4).SetSelfInteractive(e);
  }
}
exports.RoguelikeInstanceEntrySelectItem = RoguelikeInstanceEntrySelectItem;
// # sourceMappingURL=RoguelikeInstanceEntrySelectView.js.map
