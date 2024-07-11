"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashCollectDetailItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashCollectStageItem_1 = require("./CalabashCollectStageItem");
class CalabashCollectDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.X0t = 0),
      (this.Pe = void 0),
      (this.$0t = void 0),
      (this.Y0t = []),
      (this.J0t = void 0),
      (this.z0t = void 0),
      (this.Z0t = void 0),
      (this.eft = 0),
      (this.OnLookOverBtnClick = void 0),
      (this.OnMonsterSkinBtnClickCallBack = void 0),
      (this.tft = () => {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
          "MonsterDetectView",
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            this.X0t,
          )?.MonsterProbeId,
        );
      }),
      (this.ift = () => {
        const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(163);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        );
      }),
      (this.oft = () => {
        let e, t;
        this.Z0t &&
          (this.eft++,
          this.eft >= this.Z0t.length && (this.eft = 0),
          this.OnMonsterSkinBtnClickCallBack) &&
          ((e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
              this.Z0t[this.eft],
            ).MonsterId),
          (t =
            this.eft === 0
              ? !this.Pe.UnlockData
              : this.eft > 0 &&
                !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(
                  this.Z0t[this.eft],
                )),
          this.OnMonsterSkinBtnClickCallBack(e, t),
          this.GetButton(11).RootUIComp.SetUIActive(!t));
      }),
      (this.rft = (e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
          e,
        );
      }),
      (this.nft = () => {
        const e = new VisionFetterSuitItem_1.VisionFetterSuitItem();
        return (e.OnItemClick = this.rft), e;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIHorizontalLayout],
      [9, UE.UIText],
      [10, UE.UIButtonComponent],
      [11, UE.UIButtonComponent],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [10, this.tft],
        [7, this.ift],
        [11, this.OnLookOverBtnClick],
        [15, this.oft],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.z0t = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetItem(12),
    )),
      this.z0t.BindSequenceCloseEvent((e) => {
        e === "Start" &&
          (this.GetItem(14)?.SetUIActive(!1),
          this.GetItem(13)?.SetUIActive(!1));
      });
    const t = [];
    for (let e = 3; e <= 6; e++) {
      const i = new CalabashCollectStageItem_1.CalabashCollectStageItem();
      this.Y0t.push(i),
        t.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
    }
    await Promise.all(t),
      (this.J0t = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(8),
        this.nft,
      ));
  }
  Update(e) {
    (this.Pe = e), (this.X0t = this.Pe?.DevelopRewardData.MonsterId ?? 0);
    e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
        this.X0t,
      );
    (this.$0t =
      ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e[0])),
      this.Refresh();
  }
  UpdateSkinInfo(e) {
    this.X0t = e;
    e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
        this.X0t,
      );
    (this.$0t =
      ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e[0])),
      this.eft ? this.RefreshTitleBySkinId() : this.RefreshTitle();
  }
  Refresh() {
    this.RefreshTitle(),
      this.RefreshStage(),
      this.RefreshSuit(),
      this.RefreshDesc(),
      this.RefreshInfoItem(),
      this.RefreshSkinBtn();
  }
  RefreshTitle() {
    let e;
    let t;
    let i = this.Pe;
    i.UnlockData &&
      ((e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          this.X0t,
        ).MonsterNumber),
      (t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
            this.X0t,
          )[0].Rarity,
        ).Desc),
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.SkillName)),
      this.GetText(0)?.SetText(e + i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t));
  }
  RefreshTitleBySkinId() {
    let e, t;
    this.Pe.UnlockData &&
      ((e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          this.X0t,
        ).MonsterNumber),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.$0t.MonsterName,
      )),
      this.GetText(0)?.SetText(e + t));
  }
  RefreshStage() {
    const i =
      ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardInfoData(
        this.X0t,
      );
    if (i && i.length === this.Y0t.length) {
      const e = i.length;
      let t = -1;
      for (let e = 0; e < this.Y0t.length; e++) {
        const s = i[e];
        this.Y0t[e].Refresh(s, !1, e), s.IsUnlock && (t = e);
      }
      this.GetTexture(2)?.SetFillAmount(t / (e - 1));
    }
  }
  RefreshSuit() {
    const e = [];
    for (const t of this.$0t.FetterGroup)
      e.push(
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t),
      );
    this.J0t?.RefreshByData(e);
  }
  RefreshDesc() {
    const e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
        this.$0t.SkillId,
      );
    StringUtils_1.StringUtils.IsEmpty(e.SimplyDescription)
      ? this.GetText(9).SetText("")
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(9),
          e.SimplyDescription,
        );
  }
  RefreshInfoItem() {
    this.GetItem(12).SetUIActive(this.Pe.UnlockData),
      this.GetButton(11).RootUIComp.SetUIActive(this.Pe.UnlockData);
  }
  RefreshSkinBtn() {
    const e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
        this.Pe.DevelopRewardData.MonsterId,
      );
    e
      ? (this.GetButton(15).RootUIComp.SetUIActive(e.length > 1),
        (this.Z0t = e),
        (this.eft = 0))
      : this.GetButton(15).RootUIComp.SetUIActive(!1);
  }
  RefreshDetailState() {
    const e = ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState();
    this.GetItem(14)?.SetUIActive(!e), this.GetItem(13)?.SetUIActive(!e);
  }
  PlayDetailShowSequence() {
    this.z0t?.PlayLevelSequenceByName("Start", !0);
  }
  PlayDetailHideSequence() {
    this.GetItem(14)?.SetUIActive(!0),
      this.GetItem(13)?.SetUIActive(!0),
      this.z0t?.PlayLevelSequenceByName("Close", !0);
  }
}
exports.CalabashCollectDetailItem = CalabashCollectDetailItem;
// # sourceMappingURL=CalabashCollectDetailItem.js.map
