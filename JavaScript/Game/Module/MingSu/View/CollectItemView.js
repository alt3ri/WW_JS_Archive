"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectItemView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MingSuController_1 = require("../MingSuController"),
  CollectItemViewBase_1 = require("./CollectItemViewBase"),
  CollectSmallItemGrid_1 = require("./CollectSmallItemGrid");
class CollectItemView extends CollectItemViewBase_1.CollectItemViewBase {
  constructor() {
    super(...arguments),
      (this.aPi = 0),
      (this.Nbi = void 0),
      (this.GAr = void 0),
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
      (this.EVt = () => {
        this.CurrentShowLevel--, this.bl();
      }),
      (this.IVt = () => {
        this.CurrentShowLevel++, this.bl();
      }),
      (this.ZWi = () => {
        var e, t;
        this.Kbi
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当点击交付按钮时，在播放等级提升动画，不做任何响应",
              ["PoolConfigId", this.PoolConfigId],
            )
          : ((t = (e =
              ModelManager_1.ModelManager
                .MingSuModel).GetTargetDragonPoolLevelById(this.PoolConfigId)),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "NPC",
                8,
                "[CollectionItemDisplay]当点击交付按钮时",
                ["CurrentShowLevel", this.CurrentShowLevel],
                ["dragonPoolLevel", t],
                ["PoolConfigId", this.PoolConfigId],
              ),
            this.CurrentShowLevel === t + 1
              ? e.CheckUp(this.PoolConfigId)
                ? ((e.MingSuLastLevel = e.GetTargetDragonPoolLevelById(
                    this.PoolConfigId,
                  )),
                  e.CanLevelUp(this.PoolConfigId) &&
                    (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "NPC",
                        8,
                        "[CollectionItemDisplay]提交声匣之后，等级提升会播放等级提升Sequence，IsInLevelUpDisplay设置为true",
                      ),
                    (this.Kbi = !0)),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "NPC",
                      8,
                      "[CollectionItemDisplay]提交声匣之后，隐藏界面并发送给服务端",
                      ["PoolConfigId", this.PoolConfigId],
                    ),
                  MingSuController_1.MingSuController.SendHandInMingSuRequest(
                    this.PoolConfigId,
                  ))
                : (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "NPC",
                      8,
                      "[CollectionItemDisplay]当点击交付按钮时,当前经验无法升级，不会播放提交道具表现",
                    ),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnSubmitItemFail,
                  ))
              : this.NAr());
      }),
      (this.tqi = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.CollectItemConfigId,
        );
      }),
      (this.Vgt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.EVt],
        [1, this.IVt],
        [7, this.ZWi],
        [11, this.tqi],
        [12, this.Vgt],
      ]);
  }
  OnBegined() {
    var e = this.GetItem(5);
    (this.Nbi = new GenericLayout_1.GenericLayout(
      e.GetOwner().GetComponentByClass(UE.UILayoutBase.StaticClass()),
      this.d2t,
    )),
      (this.GAr = this.GetSprite(2)),
      this.bl();
  }
  OnEnded() {
    (this.Nbi = void 0), (this.GAr = void 0);
  }
  OnUpdateDragonPoolView() {
    this.NAr();
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
  OnLevelUpSequenceFinished() {
    this.SetActive(!0),
      (this.Kbi = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
  OnLevelMaxSequenceFinished() {
    this.CloseMe();
  }
  OnSubmitItemLevelUpSequencePlayFail() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "NPC",
        8,
        "[CollectionItemDisplay]当交付等级提升Sequence播放失败时，重新显示提交道具界面",
      ),
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
  OnCloseRewardView() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "NPC",
        8,
        "[CollectionItemDisplay]当关闭了交付奖励结算界面时，重新显示提交道具界面",
      ),
      (this.Kbi = !1),
      this.SetActive(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
  NAr() {
    var e =
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
          this.PoolConfigId,
        ),
      t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
        this.PoolConfigId,
      );
    (this.CurrentShowLevel = Math.min(e, t + 1)), this.bl();
  }
  bl() {
    this.oqi(this.CurrentShowLevel),
      this.rqi(),
      this.K0i(),
      this.jqe(),
      this.sqi(),
      this.M3e(),
      this.Jbi();
  }
  oqi(e) {
    var t = this.GetText(3),
      i =
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
          this.PoolConfigId,
        ),
      i = Math.min(i, e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "MingSuLevelText", i),
      (this.CurrentShowLevel = i),
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
  K0i() {
    var i = ModelManager_1.ModelManager.MingSuModel,
      s = i.GetTargetDragonPoolLevelById(this.PoolConfigId),
      h = i.GetTargetDragonPoolMaxLevelById(this.PoolConfigId),
      o = this.GetText(4),
      n = i.GetTargetDragonPoolActiveById(this.PoolConfigId);
    if (
      this.CurrentShowLevel === s + 1 ||
      (this.CurrentShowLevel === s && this.CurrentShowLevel === h)
    ) {
      let e = s;
      (this.aPi = 1), 2 === n && (this.aPi = 0), s === h && --e;
      var h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, e);
      let t = 0;
      var n =
        (t =
          2 === n ? h : i.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) /
        h;
      this.GAr.SetFillAmount(n), o.SetText(t + "/" + h);
    } else
      this.CurrentShowLevel <= s
        ? ((this.aPi = 0),
          (n = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          o.SetText(n + "/" + n),
          this.GAr.SetFillAmount(1))
        : this.CurrentShowLevel > s + 1 &&
          ((this.aPi = 2),
          (h = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          o.SetText("0/" + h),
          this.GAr.SetFillAmount(0));
  }
  jqe() {
    var e =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelRewardById(
        this.PoolConfigId,
        this.CurrentShowLevel - 1,
      );
    this.Nbi.RefreshByData(e);
  }
  sqi() {
    var e = this.GetText(6);
    2 ===
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
        this.PoolConfigId,
      ) && (this.aPi = 3),
      1 === this.aPi
        ? e.SetUIActive(!1)
        : 0 === this.aPi
          ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
            e.SetUIActive(!0))
          : 2 === this.aPi
            ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuNotDoneTips"),
              e.SetUIActive(!0))
            : 3 === this.aPi &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
              e.SetUIActive(!0));
  }
  M3e() {
    var e = this.GetText(8),
      t =
        2 ===
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
          this.PoolConfigId,
        );
    this.GetItem(9).SetUIActive(!t),
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
      this.CollectItemConfigId,
    );
    this.GetText(10).SetText(e.toString());
  }
}
exports.CollectItemView = CollectItemView;
//# sourceMappingURL=CollectItemView.js.map
