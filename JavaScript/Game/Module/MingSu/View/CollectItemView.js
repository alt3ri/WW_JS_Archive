"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectItemView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MingSuController_1 = require("../MingSuController");
const CollectItemViewBase_1 = require("./CollectItemViewBase");
const CollectSmallItemGrid_1 = require("./CollectSmallItemGrid");
class CollectItemView extends CollectItemViewBase_1.CollectItemViewBase {
  constructor() {
    super(...arguments),
      (this.aAi = 0),
      (this.NBi = void 0),
      (this.hAr = void 0),
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
      (this.S5t = () => {
        this.CurrentShowLevel--, this.bl();
      }),
      (this.I5t = () => {
        this.CurrentShowLevel++, this.bl();
      }),
      (this.tWi = () => {
        let e, t;
        this.KBi
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
                    (this.KBi = !0)),
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
              : this.lAr());
      }),
      (this.tbi = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.CollectItemConfigId,
        );
      }),
      (this.ACt = () => {
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
        [0, this.S5t],
        [1, this.I5t],
        [7, this.tWi],
        [11, this.tbi],
        [12, this.ACt],
      ]);
  }
  OnBegined() {
    const e = this.GetItem(5);
    (this.NBi = new GenericLayout_1.GenericLayout(
      e.GetOwner().GetComponentByClass(UE.UILayoutBase.StaticClass()),
      this.mkt,
    )),
      (this.hAr = this.GetSprite(2)),
      this.bl();
  }
  OnEnded() {
    (this.NBi = void 0), (this.hAr = void 0);
  }
  OnUpdateDragonPoolView() {
    this.lAr();
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
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "NPC",
        8,
        "[CollectionItemDisplay]当关闭了交付奖励结算界面时，重新显示提交道具界面",
      ),
      (this.KBi = !1),
      this.SetActive(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.HangPlotViewHud,
        !1,
      );
  }
  lAr() {
    const e =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
        this.PoolConfigId,
      );
    const t =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
        this.PoolConfigId,
      );
    (this.CurrentShowLevel = Math.min(e, t + 1)), this.bl();
  }
  bl() {
    this.obi(this.CurrentShowLevel),
      this.rbi(),
      this.Kgi(),
      this.jqe(),
      this.sbi(),
      this.rFe(),
      this.JBi();
  }
  obi(e) {
    const t = this.GetText(3);
    var i =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
        this.PoolConfigId,
      );
    var i = Math.min(i, e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "MingSuLevelText", i),
      (this.CurrentShowLevel = i),
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
  Kgi() {
    const i = ModelManager_1.ModelManager.MingSuModel;
    const s = i.GetTargetDragonPoolLevelById(this.PoolConfigId);
    var h = i.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    const o = this.GetText(4);
    var r = i.GetTargetDragonPoolActiveById(this.PoolConfigId);
    if (
      this.CurrentShowLevel === s + 1 ||
      (this.CurrentShowLevel === s && this.CurrentShowLevel === h)
    ) {
      let e = s;
      (this.aAi = 1), r === 2 && (this.aAi = 0), s === h && --e;
      var h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, e);
      let t = 0;
      var r =
        (t =
          r === 2 ? h : i.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) /
        h;
      this.hAr.SetFillAmount(r), o.SetText(t + "/" + h);
    } else
      this.CurrentShowLevel <= s
        ? ((this.aAi = 0),
          (r = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          o.SetText(r + "/" + r),
          this.hAr.SetFillAmount(1))
        : this.CurrentShowLevel > s + 1 &&
          ((this.aAi = 2),
          (h = i.GetTargetDragonPoolLevelNeedCoreById(
            this.PoolConfigId,
            this.CurrentShowLevel - 1,
          )),
          o.SetText("0/" + h),
          this.hAr.SetFillAmount(0));
  }
  jqe() {
    const e =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelRewardById(
        this.PoolConfigId,
        this.CurrentShowLevel - 1,
      );
    this.NBi.RefreshByData(e);
  }
  sbi() {
    const e = this.GetText(6);
    ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
      this.PoolConfigId,
    ) === 2 && (this.aAi = 3),
      this.aAi === 1
        ? e.SetUIActive(!1)
        : this.aAi === 0
          ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
            e.SetUIActive(!0))
          : this.aAi === 2
            ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuNotDoneTips"),
              e.SetUIActive(!0))
            : this.aAi === 3 &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips"),
              e.SetUIActive(!0));
  }
  rFe() {
    const e = this.GetText(8);
    let t =
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
        this.PoolConfigId,
      ) === 2;
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
  JBi() {
    const e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.CollectItemConfigId,
    );
    this.GetText(10).SetText(e.toString());
  }
}
exports.CollectItemView = CollectItemView;
// # sourceMappingURL=CollectItemView.js.map
