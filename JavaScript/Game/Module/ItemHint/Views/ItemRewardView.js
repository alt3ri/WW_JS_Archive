"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemRewardView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const CommonItemDropGrid_1 = require("../../Common/CommonItemDropGrid");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemHintController_1 = require("../ItemHintController");
const MAX_LENGTH = 3;
class ItemRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.tGe = void 0),
      (this.iGe = void 0),
      (this.oGe = -1),
      (this.rGe = void 0),
      (this.nGe = []),
      (this.sGe = (e, i, t) => {
        const r = new CommonItemDropGrid_1.CommonItemDropGrid();
        return (
          r.Initialize(i.GetOwner()),
          this.nGe.push(r.AsyncRefreshByItemInfo(e.ItemId, e.ItemCount)),
          { Key: t, Value: r }
        );
      }),
      (this.TickDelta = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [0, UE.UILayoutBase],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    this.aGe(), this.sqe();
  }
  aGe() {
    let e;
    (this.oGe = 0),
      (this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetLayoutBase(0),
        this.sGe,
        this.GetItem(1),
      )),
      this.agi(!0),
      ModelManager_1.ModelManager.ItemHintModel.IsItemRewardListEmpty ||
        ((this.tGe =
          ModelManager_1.ModelManager.ItemHintModel.ShiftItemRewardListFirst()),
        (this.rGe = ItemHintController_1.ItemHintController.CombineAllShowItems(
          this.tGe.ItemReward,
          !0,
        )),
        (this.iGe =
          ItemHintController_1.ItemHintController.GetFirstShowBgDropGroup(
            this.tGe.ItemReward,
          )),
        (e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          this.tGe.ItemReward.$Fn,
        ).Title),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(2),
          StringUtils_1.StringUtils.IsEmpty(e) ? "MiddleRequirementDefault" : e,
        ));
  }
  sqe() {
    let e;
    (this.nGe = []),
      this.rGe.length <= 0
        ? ((this.oGe = 0), this.CloseMe())
        : (this.SetUiActive(!1),
          (e = Math.min(this.rGe.length, MAX_LENGTH)),
          (e = this.rGe.splice(0, e)),
          this.eGe.RebuildLayoutByDataNew(e),
          Promise.all(this.nGe).then(() => {
            this.SetUiActive(!0);
          }));
  }
  OnBeforeDestroy() {
    this.agi(!1), this.eGe.ClearChildren(), (this.tGe = void 0);
  }
  agi(e) {
    this.Info.Name !== "ItemRewardView" &&
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(e);
  }
  OnAfterPlayStartSequence() {
    this.SetResetTime();
  }
  SetResetTime() {
    const e = this.iGe.ShowTime;
    e < TimerSystem_1.MIN_TIME &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "ItemHint",
        9,
        "ItemRewardView ShowTime 小于100",
        ["DropGroupId", this.iGe.Id],
        ["ShowTime", e],
      ),
      (this.oGe = e);
  }
  OnTick(e) {
    this.oGe <= 0 ||
      ((this.TickDelta += e),
      this.TickDelta >= this.oGe &&
        ((this.TickDelta = 0),
        (this.oGe = 0),
        this.SetResetTime(),
        this.sqe()));
  }
}
exports.ItemRewardView = ItemRewardView;
// # sourceMappingURL=ItemRewardView.js.map
