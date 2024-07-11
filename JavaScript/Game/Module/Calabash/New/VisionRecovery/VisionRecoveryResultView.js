"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoveryResultView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ItemController_1 = require("../../../Item/ItemController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
const VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
class VisionRecoveryResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.qpt = void 0),
      (this.Gpt = void 0),
      (this.Npt = []),
      (this.Opt = () => {
        this.CloseMe();
      }),
      (this.kpt = (e, i) => {
        void 0 !== i &&
          ItemController_1.ItemController.OpenItemTipsByItemUid(
            i.GetUniqueId(),
            i.GetConfigId(),
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.Opt]]);
  }
  async OnBeforeStartAsync() {
    const e = this.OpenParam;
    void 0 === e
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Calabash",
          59,
          "VisionRecoveryResultView responseData为空",
        )
      : ((this.qpt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(
          void 0,
          !1,
        )),
        await this.qpt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        (this.Gpt = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
          this.kpt,
          !1,
        )),
        await this.Gpt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
        this.Fpt(e.cUs),
        this.Vpt(e._gs),
        await this.Hpt(e.uUs),
        this.jpt(e.uUs));
  }
  Fpt(e) {
    e =
      ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItem(
        e,
      );
    this.qpt.RefreshUi(e);
  }
  Vpt(e) {
    e =
      ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(
        e,
      );
    e.length <= 0
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Calabash", 59, "VisionRecoveryResultView 主奖励为空")
      : this.Gpt.RefreshUi(e[0]);
  }
  async Hpt(e) {
    const i = this.GetItem(2);
    if (e.length <= 0) i.SetUIActive(!1);
    else {
      const t =
        ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(
          e,
        );
      if (t.length <= 0)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Calabash",
            59,
            "VisionRecoveryResultView 次奖励转换失败，返回空",
          ),
          i.SetUIActive(!1);
      else {
        i.SetUIActive(!0);
        const s = this.GetItem(3);
        const r = this.GetItem(4);
        const o = new Array();
        t.forEach(() => {
          const e = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
            this.kpt,
            !1,
          );
          const i = LguiUtil_1.LguiUtil.CopyItem(r, s);
          o.push(e.CreateThenShowByActorAsync(i.GetOwner())), this.Npt.push(e);
        }),
          await Promise.all(o),
          this.Npt.forEach((e, i) => {
            e.RefreshUi(t[i]);
          }),
          r.SetUIActive(!1);
      }
    }
  }
  jpt(e) {
    e.length <= 0 ||
      this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
        switch (e.length) {
          case 1:
            this.UiViewSequence.PlaySequence("RewardA");
            break;
          case 2:
            this.UiViewSequence.PlaySequence("RewardB");
            break;
          case 3:
            this.UiViewSequence.PlaySequence("RewardC");
            break;
          default:
            this.UiViewSequence.PlaySequence("RewardD");
        }
      });
  }
}
exports.VisionRecoveryResultView = VisionRecoveryResultView;
// # sourceMappingURL=VisionRecoveryResultView.js.map
