"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MingSuController_1 = require("../MingSuController");
const MingSuDefine_1 = require("../MingSuDefine");
const CollectItemViewBase_1 = require("./CollectItemViewBase");
const CollectSmallItemGrid_1 = require("./CollectSmallItemGrid");
class MingSuView extends CollectItemViewBase_1.CollectItemViewBase {
  constructor() {
    super(...arguments),
      (this.NBi = void 0),
      (this.kBi = 0),
      (this.FBi = void 0),
      (this.VBi = void 0),
      (this.KBi = !1),
      (this.mkt = () => {
        const e = new CollectSmallItemGrid_1.CollectSmallItemGrid();
        return (
          e.BindOnExtendToggleRelease(this.QBi),
          e.BindOnCanExecuteChange(() => !1),
          e
        );
      }),
      (this.QBi = (e) => {
        e.MediumItemGrid.IsHover &&
          ((e = e.Data),
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            e.ItemInfo.Id,
          ));
      }),
      (this.zBi = () => {
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
      (this.ZBi = () => {
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
      (this.ebi = () => {
        let e, t;
        this.KBi ||
          ((t = (e =
            ModelManager_1.ModelManager
              .MingSuModel).GetTargetDragonPoolLevelById(this.PoolConfigId)),
          this.CurrentShowLevel === t + 1
            ? e.CheckUp(this.PoolConfigId)
              ? ((e.MingSuLastLevel = e.GetTargetDragonPoolLevelById(
                  this.PoolConfigId,
                )),
                e.CanLevelUp(this.PoolConfigId) && (this.KBi = !0),
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
            : this.$Bi());
      }),
      (this.tbi = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          MingSuDefine_1.MING_SU_ITEM_CONFIG_ID,
        );
      }),
      (this.ACt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("MingSuTi", 8, "创建鸣素体界面!!!!"),
      this.ibi();
  }
  OnBegined() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {}), this.h7e();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequencePurely("Show");
  }
  OnEnded() {
    this.FBi &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.FBi),
      (this.FBi = void 0)),
      (this.VBi = void 0);
  }
  ibi() {
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
        [0, this.zBi],
        [1, this.ZBi],
        [8, this.ebi],
        [12, this.tbi],
        [13, this.ACt],
      ]);
  }
  h7e() {
    (this.VBi = this.GetSprite(2)), this.pO();
  }
  obi(e) {
    const t = this.GetText(3);
    const i =
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
  rbi() {
    const e = this.GetButton(0);
    const t = this.GetButton(1);
    (this.CurrentShowLevel === 1
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
  nbi() {
    const i = ModelManager_1.ModelManager.MingSuModel;
    const s = i.GetTargetDragonPoolLevelById(this.PoolConfigId);
    var h = i.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    const r = this.GetText(4);
    if (
      this.CurrentShowLevel === s + 1 ||
      (this.CurrentShowLevel === s && this.CurrentShowLevel === h)
    ) {
      let e = s;
      (this.kBi = 1),
        i.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2 &&
          (this.kBi = 0),
        s === h && --e;
      var h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, e);
      let t = 0;
      var n = i.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2;
      var n =
        (t = n ? h : i.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) / h;
      this.VBi.SetFillAmount(n), r.SetText(t + "/" + h);
    } else
      this.CurrentShowLevel <= s
        ? ((this.kBi = 0),
          (n = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          r.SetText(n + "/" + n),
          this.VBi.SetFillAmount(1))
        : this.CurrentShowLevel > s + 1 &&
          ((this.kBi = 2),
          (h = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          r.SetText("0/" + h),
          this.VBi.SetFillAmount(0));
  }
  jqe() {
    const e =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelRewardById(
        this.PoolConfigId,
        this.CurrentShowLevel - 1,
      );
    const t = this.GetScrollViewWithScrollbar(5);
    this.NBi ||
      (this.NBi = new GenericLayout_1.GenericLayout(
        t.GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()),
        this.mkt,
      )),
      this.NBi.RefreshByData(e);
  }
  sbi() {
    const e = this.GetText(7);
    ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
      this.PoolConfigId,
    ) === 2 && (this.kBi = 3),
      this.kBi === 1
        ? e.SetUIActive(!1)
        : this.kBi === 0
          ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
            e.SetUIActive(!0))
          : this.kBi === 2
            ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuNotDoneTips"),
              e.SetUIActive(!0))
            : this.kBi === 3 &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
              e.SetUIActive(!0));
  }
  abi() {
    const e = this.GetText(9);
    let t =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
        this.PoolConfigId,
      ) === 2;
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
  JBi() {
    const e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      MingSuDefine_1.MING_SU_ITEM_CONFIG_ID,
    );
    this.GetText(11).SetText(e.toString());
  }
  $Bi() {
    const e =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
        this.PoolConfigId,
      );
    const t =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
        this.PoolConfigId,
      );
    (this.CurrentShowLevel = t === e ? t : t + 1), this.pO();
  }
  pO() {
    this.obi(this.CurrentShowLevel),
      this.rbi(),
      this.nbi(),
      this.jqe(),
      this.sbi(),
      this.abi(),
      this.JBi();
  }
  OnUpdateDragonPoolView() {
    this.$Bi();
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
    (this.KBi = !1),
      this.SetActive(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
  OnCollectItemCountChanged(e) {
    this.JBi();
  }
  OnCloseRewardView() {
    this.SetActive(!0),
      (this.KBi = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
}
exports.MingSuView = MingSuView;
// # sourceMappingURL=MingSuView.js.map
