"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomMarkPanel = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonAndTextItem_1 = require("../../../Common/Button/ButtonAndTextItem");
const MapController_1 = require("../../../Map/Controller/MapController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const MarkIconOption_1 = require("./MarkIconOption");
const CUSTOM_MARK_PANEL_WIDTH = 778;
const CUSTOM_MARK_PANEL_HEIGHT = 592;
class CustomMarkPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.UUt = void 0),
      (this.pko = void 0),
      (this.vko = void 0),
      (this.dko = void 0),
      (this.Mko = !1),
      (this.Sko = 0),
      (this.Eko = () => {
        MapController_1.MapController.RequestTrackMapMark(
          this.dko.MarkType,
          this.dko.MarkId,
          !this.Mko,
        ),
          (this.Mko = !this.Mko),
          this.ono(this.Mko),
          this.Close();
      }),
      (this.yko = () => {
        switch (this.Sko) {
          case 0:
            MapController_1.MapController.RequestCreateCustomMark(
              this.dko.TrackPosition,
              this.dko.ConfigId,
            );
            break;
          case 1:
            MapController_1.MapController.RequestRemoveMapMark(
              9,
              this.dko.MarkId,
            );
        }
        this.Close();
      });
  }
  GetResourceId() {
    return "UiItem_CustomMarkPanel_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoB;
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.UUt = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(7))),
      this.UUt.BindCallback(this.yko),
      (this.pko = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(8))),
      this.pko.BindCallback(this.Eko),
      (this.vko = []),
      this.Iko();
  }
  OnShowWorldMapSecondaryUi(t, e, i) {
    (this.Sko = e),
      (this.dko = t),
      this.Tko(e),
      this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
      (this.GetText(3).text =
        i + "/" + ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize),
      this.RootItem.SetUIActive(!0),
      this.SelectOptionChecked(t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "CustomeMark"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CustomeMarkTip");
  }
  SelectOptionChecked(t) {
    if (this.vko.length !== 0) {
      if (this.Sko === 1)
        for (const e of this.vko)
          if (e.Config.MarkPic === t.IconPath) return void e.SetToggleChecked();
      this.vko[0].SetToggleChecked();
    }
  }
  Tko(t) {
    let e = void 0;
    switch (this.Sko) {
      case 0:
        e =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_Add_Text",
          ) ?? "";
        break;
      case 1:
        e =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "HotKeyText_DeleteTips_Name",
          ) ?? "";
    }
    this.UUt.SetText(e), this.ono(this.dko.IsTracked);
  }
  OnCloseWorldMapSecondaryUi() {
    this.dko &&
      this.Sko === 0 &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveMapMark,
        9,
        this.dko.MarkId,
      );
  }
  ono(t) {
    this.Mko = t;
    (t =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.Mko
          ? "Text_InstanceDungeonEntranceCancelTrack_Text"
          : "Text_InstanceDungeonEntranceTrack_Text",
      ) ?? ""),
      this.pko.SetText(t),
      (t = this.Sko === 0);
    this.pko.RefreshEnable(!t);
  }
  Lko(t, e) {
    e === 1 &&
      (this.dko.IsNewCustomMarkItem ||
        MapController_1.MapController.RequestMapMarkReplace(this.dko.MarkId, t),
      this.dko.SetConfigId(t),
      this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1));
  }
  Iko() {
    const t = ConfigManager_1.ConfigManager.WorldMapConfig.GetCustomMarks();
    if (t) {
      for (const s of t) {
        const e = LguiUtil_1.LguiUtil.CopyItem(
          this.GetItem(6),
          this.GetItem(4),
        );
        const i = new MarkIconOption_1.MarkIconOption();
        i.Initialize(e, this.GetItem(4), s),
          this.Sko === 0 && this.vko.length === 0 && i.SetToggleChecked(),
          this.Sko === 1 &&
            this.dko.IconPath === s.MarkPic &&
            i.SetToggleChecked(),
          i.SetOnclick(this.Lko.bind(this, s.MarkId)),
          this.vko.push(i);
      }
      this.GetItem(6).SetUIActive(!1);
    }
  }
}
(exports.CustomMarkPanel = CustomMarkPanel).PanelSize = new UE.Vector2D(
  CUSTOM_MARK_PANEL_WIDTH,
  CUSTOM_MARK_PANEL_HEIGHT,
);
// # sourceMappingURL=CustomMarkPanel.js.map
