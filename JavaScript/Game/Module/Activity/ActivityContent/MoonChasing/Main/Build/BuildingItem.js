"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class BuildingItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.BuildingId = e),
      (this.$pt = void 0),
      (this.ODn = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBuildingTipsInfoView(
          this.BuildingId,
        );
      }),
      (this.yca = (e) => {
        "Close" === e &&
          ((e =
            ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
              this.BuildingId,
            ).IsBuild),
          this.SetTipsActive(!1),
          this.GetItem(9).SetUIActive(e),
          this.GetTexture(0).SetUIActive(e));
      }),
      (this.BNe = () => {
        this.esi();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISpriteTransition],
      [2, UE.UISpriteTransition],
      [3, UE.UISpriteTransition],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.ODn]]);
  }
  OnStart() {
    (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.$pt.BindSequenceCloseEvent(this.yca);
  }
  OnBeforeShow() {
    this.AddEventListener(), this.Refresh();
  }
  OnBeforeHide() {
    this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot,
      this.BNe,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot,
      this.BNe,
    );
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetButton(6).GetRootComponent();
    if (void 0 !== t) return [t, t];
  }
  SetTipsActive(e) {
    this.GetItem(7)?.SetUIActive(e);
  }
  SetExhibitionMode(e) {
    var t =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
        this.BuildingId,
      ).IsBuild;
    this.SetTipsActive(!e),
      this.GetTexture(0).SetUIActive(!(e && !t)),
      this.GetItem(9).SetUIActive(!e);
  }
  SetBuildingItemActive(e) {
    var t =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
        this.BuildingId,
      ).IsBuild;
    this.BNe(),
      e
        ? (this.$pt.StopSequenceByKey(t ? "Close" : "Close01", !1),
          this.SetTipsActive(!0),
          this.GetTexture(0).SetUIActive(!0),
          this.GetItem(9).SetUIActive(!0),
          this.$pt.PlayLevelSequenceByName(t ? "Start" : "Start01"))
        : this.$pt.PlayLevelSequenceByName(t ? "Close" : "Close01"),
      this.SetInteractive(e);
  }
  SetInteractive(e) {
    this.GetButton(6)?.SetSelfInteractive(e);
  }
  yma() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          this.BuildingId,
        ),
      t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
        this.BuildingId,
      );
    e.IsUnlock &&
      (e.IsBuild
        ? this.SetTextureByPath(t.BuildingTexture, this.GetTexture(0))
        : ((e =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "T_BuildItemBUnlock",
            )),
          this.SetTextureByPath(e, this.GetTexture(0))));
  }
  Ima() {
    var e =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
        this.BuildingId,
      );
    let t = void 0;
    t = e.IsMax
      ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_TogPointMaxNor",
        )
      : e.IsUnlock
        ? 0 === e.Level
          ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_TogPointUnLock",
            )
          : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_TogPointNor",
            )
        : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_TogPointNorLock",
          );
    e = this.GetUiSpriteTransition(3);
    this.SetSpriteTransitionByPath(t, e, 0);
  }
  Tma() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          this.BuildingId,
        ),
      t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
        this.BuildingId,
      ),
      i = this.GetUiSpriteTransition(1);
    i.RootUIComp.SetUIActive(e.IsUnlock);
    let r = void 0;
    (r = e.IsMax
      ? UE.Color.FromHex("#ecb138")
      : e.IsUnlock
        ? 0 === e.Level
          ? UE.Color.FromHex("#595854")
          : UE.Color.FromHex("#b49570")
        : UE.Color.FromHex("#ffffff")),
      this.SetSpriteTransitionByPath(t.TipsSprite, i),
      (i.TransitionInfo.NormalTransition.Color = r);
  }
  bBa() {
    var e =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
        this.BuildingId,
      );
    this.GetUiSpriteTransition(2).RootUIComp.SetUIActive(!e.IsUnlock);
  }
  Dma() {
    var e =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
        this.BuildingId,
      );
    this.GetItem(4)?.SetUIActive(e.IsAvailableLevelUp);
  }
  esi() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          this.BuildingId,
        ),
      e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.CheckBuildingRedDotState(
          e,
        );
    this.GetItem(5)?.SetUIActive(e);
  }
  qWe() {
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
        this.BuildingId,
      ),
      t = this.GetText(8);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Name);
  }
  Refresh() {
    this.yma(),
      this.Tma(),
      this.bBa(),
      this.Ima(),
      this.Dma(),
      this.esi(),
      this.qWe();
  }
}
exports.BuildingItem = BuildingItem;
//# sourceMappingURL=BuildingItem.js.map
