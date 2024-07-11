"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashCollectDetailItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CalabashCollectStageItem_1 = require("./CalabashCollectStageItem");
class CalabashCollectDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.spt = 0),
      (this.Pe = void 0),
      (this.apt = void 0),
      (this.hpt = []),
      (this.lpt = void 0),
      (this._pt = void 0),
      (this.upt = void 0),
      (this.cpt = 0),
      (this.OnLookOverBtnClick = void 0),
      (this.OnMonsterSkinBtnClickCallBack = void 0),
      (this.mpt = () => {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
          "MonsterDetectView",
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            this.spt,
          )?.MonsterProbeId,
        );
      }),
      (this.dpt = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(163);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        );
      }),
      (this.Cpt = () => {
        var e, t;
        this.upt &&
          (this.cpt++,
          this.cpt >= this.upt.length && (this.cpt = 0),
          this.OnMonsterSkinBtnClickCallBack) &&
          ((e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
              this.upt[this.cpt],
            ).MonsterId),
          (t =
            0 === this.cpt
              ? !this.Pe.UnlockData
              : 0 < this.cpt &&
                !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(
                  this.upt[this.cpt],
                )),
          this.OnMonsterSkinBtnClickCallBack(e, t),
          this.GetButton(11).RootUIComp.SetUIActive(!t));
      }),
      (this.gpt = (e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
          e,
        );
      }),
      (this.fpt = () => {
        var e = new VisionFetterSuitItem_1.VisionFetterSuitItem();
        return (e.OnItemClick = this.gpt), e;
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
        [10, this.mpt],
        [7, this.dpt],
        [11, this.OnLookOverBtnClick],
        [15, this.Cpt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this._pt = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetItem(12),
    )),
      this._pt.BindSequenceCloseEvent((e) => {
        "Start" === e &&
          (this.GetItem(14)?.SetUIActive(!1),
          this.GetItem(13)?.SetUIActive(!1));
      });
    var t = [];
    for (let e = 3; e <= 6; e++) {
      var i = new CalabashCollectStageItem_1.CalabashCollectStageItem();
      this.hpt.push(i),
        t.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
    }
    await Promise.all(t),
      (this.lpt = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(8),
        this.fpt,
      ));
  }
  Update(e) {
    (this.Pe = e), (this.spt = this.Pe?.DevelopRewardData.MonsterId ?? 0);
    e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
        this.spt,
      );
    (this.apt =
      ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e[0])),
      this.Refresh();
  }
  UpdateSkinInfo(e) {
    this.spt = e;
    e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
        this.spt,
      );
    (this.apt =
      ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e[0])),
      this.cpt ? this.RefreshTitleBySkinId() : this.RefreshTitle();
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
    var e,
      t,
      i = this.Pe;
    i.UnlockData &&
      ((e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          this.spt,
        ).MonsterNumber),
      (t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
            this.spt,
          )[0].Rarity,
        ).Desc),
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.SkillName)),
      this.GetText(0)?.SetText(e + i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t));
  }
  RefreshTitleBySkinId() {
    var e, t;
    this.Pe.UnlockData &&
      ((e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          this.spt,
        ).MonsterNumber),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.apt.MonsterName,
      )),
      this.GetText(0)?.SetText(e + t));
  }
  RefreshStage() {
    var i =
      ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardInfoData(
        this.spt,
      );
    if (i && i.length === this.hpt.length) {
      var e = i.length;
      let t = -1;
      for (let e = 0; e < this.hpt.length; e++) {
        var s = i[e];
        this.hpt[e].Refresh(s, !1, e), s.IsUnlock && (t = e);
      }
      this.GetTexture(2)?.SetFillAmount(t / (e - 1));
    }
  }
  RefreshSuit() {
    var e = [];
    for (const t of this.apt.FetterGroup)
      e.push(
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t),
      );
    this.lpt?.RefreshByData(e);
  }
  RefreshDesc() {
    var e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
        this.apt.SkillId,
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
    var e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
        this.Pe.DevelopRewardData.MonsterId,
      );
    e
      ? (this.GetButton(15).RootUIComp.SetUIActive(1 < e.length),
        (this.upt = e),
        (this.cpt = 0))
      : this.GetButton(15).RootUIComp.SetUIActive(!1);
  }
  RefreshDetailState() {
    var e = ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState();
    this.GetItem(14)?.SetUIActive(!e), this.GetItem(13)?.SetUIActive(!e);
  }
  PlayDetailShowSequence() {
    this._pt?.PlayLevelSequenceByName("Start", !0);
  }
  PlayDetailHideSequence() {
    this.GetItem(14)?.SetUIActive(!0),
      this.GetItem(13)?.SetUIActive(!0),
      this._pt?.PlayLevelSequenceByName("Close", !0);
  }
}
exports.CalabashCollectDetailItem = CalabashCollectDetailItem;
//# sourceMappingURL=CalabashCollectDetailItem.js.map
