"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerBuffSelectViewLevelItem =
    exports.BabelTowerBuffSelectView =
      void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  BabelTowerBuffSelectItem_1 = require("./BabelTowerBuffSelectItem"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerBuffSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.vVt = void 0),
      (this.GLl = void 0),
      (this.wcc = void 0),
      (this.Yal = []),
      (this.nAc = 0),
      (this.L3e = () => {
        for (const t of this.wcc.CurrentSelectBuffList) {
          var e = this.Rcc(t);
          if (2 === e || 1 === e)
            return (
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "BabelTowerBuffCannotChose",
              ),
              void this.Og(t)
            );
        }
        this.wcc?.OnConfirmCallBack?.(this.wcc?.CurrentSelectBuffList),
          this.CloseMe();
      }),
      (this.sGe = () => {
        var e = new BabelTowerBuffSelectItem_1.BabelTowerBuffSelectItem();
        return (
          (e.CanClickCallBack = this.Acc),
          (e.OnClickToggleCallBack = this.zal),
          (e.OnCancelClickToggleCallBack = this.Pcc),
          this.Yal.push(e),
          e
        );
      }),
      (this.j1a = () => {
        return new BabelTowerBuffSelectViewLevelItem();
      }),
      (this.Acc = (e) =>
        !(
          this.wcc.CurrentSelectBuffList.length >=
            this.wcc.MaxSelectBuffCount &&
          (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            "BabelTowerBuffMax",
          ),
          this.Og(e),
          1)
        )),
      (this.zal = (e) => {
        this.wcc?.CurrentSelectBuffList.push(e), this.Og(e);
      }),
      (this.Pcc = (t) => {
        var i = this.wcc?.CurrentSelectBuffList;
        if (0 < (i?.length ?? 0))
          for (let e = 0; e < i.length; e++)
            if (i[e] === t) {
              this.wcc?.CurrentSelectBuffList.splice(e, 1);
              break;
            }
        this.Og(t);
      }),
      (this.I1c = () => {
        for (const i of this.Yal) i.BuffId === this.nAc && i.RefreshState(0);
        for (const r of this.GLl.GetLayoutItemList()) r.RefreshState(0);
        if (
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
            this.wcc.LevelId,
          ).IsDifficult
        ) {
          var e,
            t = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
          for (const s of this.wcc.AllBuffList)
            t.GetBuffIsLock(s.Id)
              ? (s.State = 1)
              : 0 < (e = t.GetBuffIsUse(s.Id)) && e !== this.wcc.LevelId
                ? (s.State = 2)
                : (s.State = 0);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText],
      [3, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIVerticalLayout],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.L3e]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BabelTowerRefreshLevelInfo,
      this.I1c,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BabelTowerRefreshLevelInfo,
      this.I1c,
    );
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        this.sGe,
      )),
      (this.GLl = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(9),
        this.j1a,
      ));
  }
  OnStart() {
    (this.wcc = this.OpenParam),
      this.GetItem(4).SetUIActive(!0),
      this.GetItem(5).SetUIActive(!1),
      this.vVt?.RefreshByData(this.wcc.AllBuffList, !1, () => {
        var e = this.wcc?.CurrentSelectBuffList ?? [];
        for (const t of this.Yal)
          e.includes(t.BuffId) ? t.SetToggleState(1) : t.SetToggleState(0);
      }),
      this.GetLoopScrollViewComponent(1)
        .Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
        ?.Play();
  }
  Og(e) {
    (this.nAc = e),
      this.GetItem(4).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!0);
    var t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(e),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.NameText),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.DesText),
        []),
      r = this.Rcc(e);
    for (const o of t.DifficultPreLevel) {
      var s = { LevelId: o, BuffId: e, State: r };
      i.push(s);
    }
    2 === r
      ? this.GetText(7).SetUIActive(!1)
      : 1 === r
        ? this.GetText(7).SetUIActive(!0)
        : 0 === r &&
          ((t = t.DifficultPreLevel.length),
          this.GetText(7).SetUIActive(0 < t)),
      this.GLl?.RefreshByData(i);
  }
  Rcc(e) {
    for (const t of this.wcc.AllBuffList) if (t.Id === e) return t.State;
    return 0;
  }
}
exports.BabelTowerBuffSelectView = BabelTowerBuffSelectView;
class BabelTowerBuffSelectViewLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.gQl = !1),
      (this.xcc = 0),
      (this.eHr = 0),
      (this.Ykt = () => {
        this.gQl
          ? ((ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle =
              this.xcc),
            ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
              this.xcc,
            ).IsDifficult
              ? UiManager_1.UiManager.IsViewHide("BabelTowerHardLevelChoseView")
                ? UiManager_1.UiManager.NormalResetToView(
                    "BabelTowerHardLevelChoseView",
                  )
                : UiManager_1.UiManager.NormalResetToView(
                    "BabelTowerMainView",
                    () => {
                      UiManager_1.UiManager.OpenView(
                        "BabelTowerHardLevelChoseView",
                      );
                    },
                  )
              : UiManager_1.UiManager.IsViewHide(
                    "BabelTowerNormalLevelChoseView",
                  )
                ? UiManager_1.UiManager.NormalResetToView(
                    "BabelTowerNormalLevelChoseView",
                  )
                : UiManager_1.UiManager.NormalResetToView(
                    "BabelTowerMainView",
                    () => {
                      UiManager_1.UiManager.OpenView(
                        "BabelTowerNormalLevelChoseView",
                      );
                    },
                  ))
          : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "BabelTowerLevelUnlock",
            );
      }),
      (this.sAc = () => {
        var e =
          BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetBuffUseLevel(
            this.eHr,
          );
        0 < e && UiManager_1.UiManager.OpenView("BabelTowerResetView", e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [5, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.Ykt],
        [4, this.sAc],
      ]);
  }
  Refresh(e, t, i) {
    var r = BabelTowerController_1.BabelTowerController.GetBabelTowerData(),
      s = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
      o =
        ((this.xcc = e.LevelId),
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
          e.LevelId,
        )),
      o = o.IsDifficult
        ? MathUtils_1.MathUtils.LongToNumber(
            r.HardLevelDataMap.get(e.LevelId)?.yzs ?? 0,
          )
        : MathUtils_1.MathUtils.LongToNumber(
            r.NormalLevelDataMap.get(e.LevelId)?.yzs ?? 0,
          );
    (this.gQl = !o || o <= s),
      (this.eHr = e.BuffId),
      this.RefreshState(e.State);
  }
  RefreshState(e) {
    var t;
    2 === e
      ? (this.GetItem(0).SetUIActive(!0),
        this.GetItem(2).SetUIActive(!1),
        this.GetItem(3).SetUIActive(!1),
        this.GetButton(4).RootUIComp.SetUIActive(!0),
        this.GetButton(5).SetSelfInteractive(!1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          "BabelTowerBuffUse",
        ))
      : 1 === e
        ? (this.GetItem(0).SetUIActive(!0),
          this.GetItem(2).SetUIActive(!1),
          this.GetItem(3).SetUIActive(!0),
          this.GetButton(5).SetSelfInteractive(!0),
          this.GetButton(4).RootUIComp.SetUIActive(!1),
          (t =
            ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
              this.xcc,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameText))
        : 0 === e &&
          (this.GetItem(0).SetUIActive(!0),
          this.GetItem(2).SetUIActive(!0),
          this.GetItem(3).SetUIActive(!1),
          this.GetButton(4).RootUIComp.SetUIActive(!1),
          this.GetButton(5).SetSelfInteractive(!1),
          (t =
            ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
              this.xcc,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameText));
  }
}
exports.BabelTowerBuffSelectViewLevelItem = BabelTowerBuffSelectViewLevelItem;
//# sourceMappingURL=BabelTowerBuffSelectView.js.map
