"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionNewQualityView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  GameModeController_1 = require("../../../../World/Controller/GameModeController"),
  CalabashController_1 = require("../../../Calabash/CalabashController"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionNewQualityView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.GMt = 0),
      (this.NMt = void 0),
      (this.sft = void 0),
      (this.eGe = void 0),
      (this.jji = void 0),
      (this.sGe = () => new QualityStarItem()),
      (this.FMt = () => {
        var e;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 28, "跳转到鸣域终端收集页签", [
            "目标幻象Id",
            this.NMt.PhantomItem.MonsterId,
          ]),
          this.CloseViewOrShowNextData(),
          0 === this.jji.SkinId
            ? CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
                this.NMt.PhantomItem.MonsterId,
              )
            : ((e =
                ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinMonsterIdMapByMonsterId(
                  this.NMt.PhantomItem.MonsterId,
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
      (this.BtnBindInfo = [[2, this.FMt]]);
  }
  OnBeforeCreate() {
    (this.jji = this.OpenParam),
      (this.NMt =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          this.jji.MonsterItemId,
        ));
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.sGe,
    )),
      (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(1).GetOwner()),
      this.GetText(4).SetUIActive(
        !GameModeController_1.GameModeController.IsInInstance(),
      ),
      this.GetButton(2).RootUIComp.SetRaycastTarget(
        !GameModeController_1.GameModeController.IsInInstance(),
      ),
      this.jXs();
  }
  OnBeforeShow() {
    this.Og();
  }
  Refresh() {
    (this.jji =
      ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.shift()),
      (this.NMt =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          this.jji.MonsterItemId,
        )),
      this.Og();
  }
  jXs() {
    this.GetText(0)?.SetUIActive(!1), this.GetText(9)?.SetUIActive(!1);
  }
  Og() {
    this.jXs(), this.WXs()?.SetUIActive(!0);
    var e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          this.NMt.PhantomItem.MonsterId,
        ),
      e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
        e.MonsterInfoId,
      ),
      e =
        ((this.GMt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd),
        this.WXs().ShowTextNew(e.Name),
        {
          Data: this.NMt.PhantomItem.ItemId,
          Type: 4,
          ItemConfigId: this.NMt.PhantomItem.ItemId,
          IconPath: e.Icon,
        });
    this.sft.Apply(e),
      this.aqe(),
      this.HMt(),
      this.FXs(),
      this.QXs(),
      this.KXs();
  }
  WXs() {
    var e = 0 === this.jji.SkinId ? 0 : 9;
    return this.GetText(e);
  }
  KXs() {
    var e = 0 === this.jji.SkinId;
    this.GetItem(7)?.SetUIActive(e);
  }
  QXs() {
    var e = 0 !== this.jji.SkinId;
    this.GetItem(8)?.SetUIActive(e);
  }
  HMt() {
    var e;
    0 === this.jji.SkinId &&
      ((e = this.jji.UnlockQuality),
      (e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
          e,
        ).DropColor),
      this.WXs().SetColor(UE.Color.FromHex(e)));
  }
  aqe() {
    var e = 0 === this.jji.SkinId,
      i =
        (this.eGe?.SetActive(e),
        this.GetItem(5)?.SetUIActive(e),
        this.jji.UnlockQuality),
      t = new Array();
    for (let e = 0; e < i - 1; e++) t.push(e);
    this.eGe?.RefreshByData(t);
  }
  FXs() {
    var e =
      0 === this.jji.SkinId ? "UnLockNewVisionQuality" : "UnLockNewVisionSkin";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e);
  }
  CloseViewOrShowNextData() {
    0 <
    ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.length
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 28, "刷新下个声骸数据"),
        this.Refresh(),
        this.UiViewSequence?.PlaySequence("Start"))
      : this.CloseMe();
  }
  OnTick(e) {
    this.GMt <= 0 ||
      ((this.GMt -= e), this.GMt <= 0 && this.CloseViewOrShowNextData());
  }
}
exports.VisionNewQualityView = VisionNewQualityView;
class QualityStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(e, i, t) {}
}
//# sourceMappingURL=VisionNewQualityView.js.map
