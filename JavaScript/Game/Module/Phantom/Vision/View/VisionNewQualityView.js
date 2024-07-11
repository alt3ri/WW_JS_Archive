"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionNewQualityView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const GameModeController_1 = require("../../../../World/Controller/GameModeController");
const CalabashController_1 = require("../../../Calabash/CalabashController");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionNewQualityView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Tvt = 0),
      (this.Lvt = void 0),
      (this.Xgt = void 0),
      (this.eGe = void 0),
      (this.KHi = void 0),
      (this.sGe = () => new QualityStarItem()),
      (this.Uvt = () => {
        let e;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 28, "跳转到鸣域终端收集页签", [
            "目标幻象Id",
            this.Lvt.PhantomItem.MonsterId,
          ]),
          this.CloseViewOrShowNextData(),
          this.KHi.SkinId === 0
            ? CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
                this.Lvt.PhantomItem.MonsterId,
              )
            : ((e =
                ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinMonsterIdMapByMonsterId(
                  this.Lvt.PhantomItem.MonsterId,
                )),
              CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
                e,
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.Uvt]]);
  }
  OnBeforeCreate() {
    (this.KHi = this.OpenParam),
      (this.Lvt =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          this.KHi.MonsterItemId,
        ));
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.sGe,
    )),
      (this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
      this.Xgt.Initialize(this.GetItem(1).GetOwner()),
      this.GetText(4).SetUIActive(
        !GameModeController_1.GameModeController.IsInInstance(),
      ),
      this.GetButton(2).RootUIComp.SetRaycastTarget(
        !GameModeController_1.GameModeController.IsInInstance(),
      ),
      this.O8s();
  }
  OnBeforeShow() {
    this.Og();
  }
  Refresh() {
    (this.KHi =
      ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.shift()),
      (this.Lvt =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          this.KHi.MonsterItemId,
        )),
      this.Og();
  }
  O8s() {
    this.GetText(0)?.SetUIActive(!1), this.GetText(9)?.SetUIActive(!1);
  }
  Og() {
    this.O8s(), this.N8s()?.SetUIActive(!0);
    var e =
      ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
        this.Lvt.PhantomItem.MonsterId,
      );
    var e =
      ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
        e.MonsterInfoId,
      );
    var e =
      ((this.Tvt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd),
      this.N8s().ShowTextNew(e.Name),
      {
        Data: this.Lvt.PhantomItem.ItemId,
        Type: 4,
        ItemConfigId: this.Lvt.PhantomItem.ItemId,
        IconPath: e.Icon,
      });
    this.Xgt.Apply(e),
      this.aqe(),
      this.Pvt(),
      this.C6s(),
      this.k8s(),
      this.F8s();
  }
  N8s() {
    const e = this.KHi.SkinId === 0 ? 0 : 9;
    return this.GetText(e);
  }
  F8s() {
    const e = this.KHi.SkinId === 0;
    this.GetItem(7)?.SetUIActive(e);
  }
  k8s() {
    const e = this.KHi.SkinId !== 0;
    this.GetItem(8)?.SetUIActive(e);
  }
  Pvt() {
    let e;
    this.KHi.SkinId === 0 &&
      ((e = this.KHi.UnlockQuality),
      (e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
          e,
        ).DropColor),
      this.N8s().SetColor(UE.Color.FromHex(e)));
  }
  aqe() {
    const e = this.KHi.SkinId === 0;
    const i =
      (this.eGe?.SetActive(e),
      this.GetItem(5)?.SetUIActive(e),
      this.KHi.UnlockQuality);
    const t = new Array();
    for (let e = 0; e < i - 1; e++) t.push(e);
    this.eGe?.RefreshByData(t);
  }
  C6s() {
    const e =
      this.KHi.SkinId === 0 ? "UnLockNewVisionQuality" : "UnLockNewVisionSkin";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e);
  }
  CloseViewOrShowNextData() {
    ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList
      .length > 0
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 28, "刷新下个声骸数据"),
        this.Refresh(),
        this.UiViewSequence?.PlaySequence("Start"))
      : this.CloseMe();
  }
  OnTick(e) {
    this.Tvt <= 0 ||
      ((this.Tvt -= e), this.Tvt <= 0 && this.CloseViewOrShowNextData());
  }
}
exports.VisionNewQualityView = VisionNewQualityView;
class QualityStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(e, i, t) {}
}
// # sourceMappingURL=VisionNewQualityView.js.map
