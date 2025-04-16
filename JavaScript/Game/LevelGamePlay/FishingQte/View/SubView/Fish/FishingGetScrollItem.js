"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingGetScrollItem = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer"),
  ListSliderControl_1 = require("../../../../../Module/ItemHint/Views/ListSliderControl"),
  LguiUtil_1 = require("../../../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  MAX_LIST_COUNT = 7,
  ITEM_INTERVAL_TIME = 200,
  ITEM_SILDER_TIME = 200,
  SPECIAL_QUALITY_ID = 5;
class FishingGetScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ListSlideControl = void 0),
      (this.wOt = () => MAX_LIST_COUNT),
      (this.r0i = () =>
        !ModelManager_1.ModelManager.FishingQteModel.IsTempGetDataEmpty()),
      (this.s0i = () => ITEM_INTERVAL_TIME),
      (this.HDe = () => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "FishingQteGetListItemShowTime",
    );
    (this.ListSlideControl = new ListSliderControl_1.ListSliderControl(
      FishingGetItem,
      this.GetItem(1),
      this.wOt,
      this.r0i,
      this.s0i,
      this.HDe,
      1,
      e,
      ITEM_SILDER_TIME,
      1,
    )),
      this.ListSlideControl.DisEnableParentLayout();
  }
  OnTick(e) {
    this.ListSlideControl?.Tick(e);
  }
}
exports.FishingGetScrollItem = FishingGetScrollItem;
class FishingGetItem extends ListSliderControl_1.SliderItem {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.Data = void 0),
      (this.TagItem = void 0),
      (this.K3t = (e) => {
        "Start" === e
          ? this.FinishPlayStart()
          : "Close" === e && this.FinishPlayEnd();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(3);
    (this.TagItem = new FishingGetTagItem()),
      await this.TagItem.CreateByActorAsync(e.GetOwner());
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.K3t);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer &&
      (this.LevelSequencePlayer.Clear(), (this.LevelSequencePlayer = void 0));
  }
  PlayStart() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  PlayEnd() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
  }
  OnActiveStatusChange(e) {}
  async AsyncLoadUiResource() {
    (this.Data =
      ModelManager_1.ModelManager.FishingQteModel.ShiftTempGetData()),
      this.Data && (await this.Refresh(this.Data));
  }
  async Refresh(e) {
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
        e.ItemId,
      ),
      i =
        (this.BGt(e.Quality),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name),
        await this.SetTextureAsync(i.Icon, this.GetTexture(1)),
        ModelManager_1.ModelManager.FishingQteModel.GetTempGetDataTag(e.IncId)),
      e = 0 !== i;
    this.TagItem.SetActive(e), e && this.TagItem.RefreshTag(i);
  }
  BGt(e) {
    var i =
      ConfigManager_1.ConfigManager.FishingConfig.GetFishingQualityConfig(e);
    const t = this.GetSprite(0);
    t.SetUIActive(!1),
      this.SetSpriteByPath(i.TexBg, t, !1, void 0, (e) => {
        t.SetUIActive(!0);
      });
    (i = UE.Color.FromHex(i.TxtColor)),
      this.GetText(2).SetColor(i),
      (i = e === SPECIAL_QUALITY_ID);
    this.GetItem(4).SetUIActive(i), this.GetItem(5).SetUIActive(!i);
  }
}
class FishingGetTagItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  RefreshTag(e) {
    let i = void 0,
      t = void 0,
      s = void 0;
    switch (e) {
      case 2:
        (i = "Reward_Tag_Extra"),
          (t = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Extra_Bg_Color",
          )),
          (s = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Extra_Text_Color",
          ));
        break;
      case 1:
        (i = "Reward_Tag_Magnification"),
          (t = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Magnification_Bg_Color",
          )),
          (s = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Magnification_Text_Color",
          ));
    }
    i && this.GetText(1).ShowTextNew(i),
      s && this.GetText(1).SetColor(UE.Color.FromHex(s)),
      t && this.GetSprite(0).SetColor(UE.Color.FromHex(t));
  }
}
//# sourceMappingURL=FishingGetScrollItem.js.map
