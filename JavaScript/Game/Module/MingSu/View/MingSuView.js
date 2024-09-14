"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MingSuController_1 = require("../MingSuController"),
  MingSuDefine_1 = require("../MingSuDefine"),
  CollectItemViewBase_1 = require("./CollectItemViewBase"),
  CollectSmallItemGrid_1 = require("./CollectSmallItemGrid");
class MingSuView extends CollectItemViewBase_1.CollectItemViewBase {
  constructor() {
    super(...arguments),
      (this.Nbi = void 0),
      (this.kbi = 0),
      (this.Fbi = void 0),
      (this.Vbi = void 0),
      (this.Kbi = !1),
      (this.d2t = () => {
        var e = new CollectSmallItemGrid_1.CollectSmallItemGrid();
        return (
          e.BindOnExtendToggleRelease(this.Qbi),
          e.BindOnCanExecuteChange(() => !1),
          e
        );
      }),
      (this.Qbi = (e) => {
        e.MediumItemGrid.IsHover &&
          ((e = e.Data),
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            e.ItemInfo.Id,
          ));
      }),
      (this.zbi = () => {
        --this.CurrentShowLevel,
          this.pO(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "MingSuTi",
              8,
              "当前等级: " +
                this.CurrentShowLevel.toString() +
                " left " +
                ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
                  this.PoolConfigId,
                ).toString(),
            );
      }),
      (this.Zbi = () => {
        (this.CurrentShowLevel += 1),
          this.pO(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "MingSuTi",
              8,
              "当前等级: " +
                this.CurrentShowLevel.toString() +
                " right " +
                ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
                  this.PoolConfigId,
                ).toString(),
            );
      }),
      (this.eqi = () => {
        var e, t;
        this.Kbi ||
          ((t = (e =
            ModelManager_1.ModelManager
              .MingSuModel).GetTargetDragonPoolLevelById(this.PoolConfigId)),
          this.CurrentShowLevel === t + 1
            ? e.CheckUp(this.PoolConfigId)
              ? ((e.MingSuLastLevel = e.GetTargetDragonPoolLevelById(
                  this.PoolConfigId,
                )),
                e.CanLevelUp(this.PoolConfigId) && (this.Kbi = !0),
                MingSuController_1.MingSuController.SendHandInMingSuRequest(
                  this.PoolConfigId,
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("MingSuTi", 8, "可以升级"))
              : (EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnSubmitItemFail,
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("MingSuTi", 8, "不可升级!!!!"))
            : this.$bi());
      }),
      (this.tqi = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          MingSuDefine_1.MING_SU_ITEM_CONFIG_ID,
        );
      }),
      (this.Vgt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("MingSuTi", 8, "创建鸣素体界面!!!!"),
      this.iqi();
  }
  OnBegined() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {}), this.SHe();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequencePurely("Show");
  }
  OnEnded() {
    this.Fbi &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Fbi),
      (this.Fbi = void 0)),
      (this.Vbi = void 0);
  }
  iqi() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIButtonComponent],
      [13, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.zbi],
        [1, this.Zbi],
        [8, this.eqi],
        [12, this.tqi],
        [13, this.Vgt],
      ]);
  }
  SHe() {
    (this.Vbi = this.GetSprite(2)), this.pO();
  }
  oqi(e) {
    var t = this.GetText(3),
      i =
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
          this.PoolConfigId,
        );
    let s = e;
    s > i && (s = i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "MingSuLevelText", s),
      (this.CurrentShowLevel = s),
      (ModelManager_1.ModelManager.MingSuModel.CurrentPreviewLevel =
        this.CurrentShowLevel);
  }
  rqi() {
    var e = this.GetButton(0),
      t = this.GetButton(1);
    (1 === this.CurrentShowLevel
      ? (e.SetSelfInteractive(!1), t)
      : (this.CurrentShowLevel ===
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
          this.PoolConfigId,
        )
          ? t.SetSelfInteractive(!1)
          : t.SetSelfInteractive(!0),
        e)
    ).SetSelfInteractive(!0);
  }
  nqi() {
    var i = ModelManager_1.ModelManager.MingSuModel,
      s = i.GetTargetDragonPoolLevelById(this.PoolConfigId),
      h = i.GetTargetDragonPoolMaxLevelById(this.PoolConfigId),
      n = this.GetText(4);
    if (
      this.CurrentShowLevel === s + 1 ||
      (this.CurrentShowLevel === s && this.CurrentShowLevel === h)
    ) {
      let e = s;
      (this.kbi = 1),
        2 === i.GetTargetDragonPoolActiveById(this.PoolConfigId) &&
          (this.kbi = 0),
        s === h && --e;
      var h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, e);
      let t = 0;
      var r = 2 === i.GetTargetDragonPoolActiveById(this.PoolConfigId),
        r =
          (t = r ? h : i.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) /
          h;
      this.Vbi.SetFillAmount(r), n.SetText(t + "/" + h);
    } else
      this.CurrentShowLevel <= s
        ? ((this.kbi = 0),
          (r = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          n.SetText(r + "/" + r),
          this.Vbi.SetFillAmount(1))
        : this.CurrentShowLevel > s + 1 &&
          ((this.kbi = 2),
          (h = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          n.SetText("0/" + h),
          this.Vbi.SetFillAmount(0));
  }
  jqe() {
    var e =
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelRewardById(
          this.PoolConfigId,
          this.CurrentShowLevel - 1,
        ),
      t = this.GetScrollViewWithScrollbar(5);
    this.Nbi ||
      (this.Nbi = new GenericLayout_1.GenericLayout(
        t.GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()),
        this.d2t,
      )),
      this.Nbi.RefreshByData(e);
  }
  sqi() {
    var e = this.GetText(7);
    2 ===
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
        this.PoolConfigId,
      ) && (this.kbi = 3),
      1 === this.kbi
        ? e.SetUIActive(!1)
        : 0 === this.kbi
          ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
            e.SetUIActive(!0))
          : 2 === this.kbi
            ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuNotDoneTips"),
              e.SetUIActive(!0))
            : 3 === this.kbi &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
              e.SetUIActive(!0));
  }
  aqi() {
    var e = this.GetText(9),
      t =
        2 ===
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
          this.PoolConfigId,
        );
    this.GetItem(10).SetUIActive(!t),
      t ||
        ((t =
          ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
            this.PoolConfigId,
          )),
        this.CurrentShowLevel === t + 1
          ? LguiUtil_1.LguiUtil.SetLocalText(e, "MingSuTi_Text3")
          : LguiUtil_1.LguiUtil.SetLocalText(e, "MingSuTi_Text4"));
  }
  Jbi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      MingSuDefine_1.MING_SU_ITEM_CONFIG_ID,
    );
    this.GetText(11).SetText(e.toString());
  }
  $bi() {
    var e =
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
          this.PoolConfigId,
        ),
      t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
        this.PoolConfigId,
      );
    (this.CurrentShowLevel = t === e ? t : t + 1), this.pO();
  }
  pO() {
    this.oqi(this.CurrentShowLevel),
      this.rqi(),
      this.nqi(),
      this.jqe(),
      this.sqi(),
      this.aqi(),
      this.Jbi();
  }
  OnUpdateDragonPoolView() {
    this.$bi();
  }
  OnSubmitItemLevelUp() {
    this.SetActive(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !0,
      );
  }
  OnSubmitItemLevelMax() {
    this.SetActive(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !0,
      );
  }
  OnSubmitItemLevelUpSequencePlayFail() {
    (this.Kbi = !1),
      this.SetActive(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
  OnCollectItemCountChanged(e) {
    this.Jbi();
  }
  OnLevelMaxSequenceFinished() {
    this.SetActive(!0),
      (this.Kbi = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
  OnLevelUpSequenceFinished() {
    this.SetActive(!0),
      (this.Kbi = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
}
exports.MingSuView = MingSuView;
//# sourceMappingURL=MingSuView.js.map
