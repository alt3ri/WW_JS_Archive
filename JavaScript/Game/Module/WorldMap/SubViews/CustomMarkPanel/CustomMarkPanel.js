"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomMarkPanel = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonAndTextItem_1 = require("../../../Common/Button/ButtonAndTextItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MarkIconOption_1 = require("./MarkIconOption"),
  CUSTOM_MARK_PANEL_WIDTH = 778,
  CUSTOM_MARK_PANEL_HEIGHT = 592;
class CustomMarkPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.wAt = void 0),
      (this.C2o = void 0),
      (this.g2o = void 0),
      (this.u2o = void 0),
      (this.f2o = !1),
      (this.Woa = !1),
      (this.p2o = 0),
      (this.v2o = () => {
        this.Woa ||
          (MapController_1.MapController.RequestTrackMapMark(
            this.u2o.MarkType,
            this.u2o.MarkId,
            !this.f2o,
          ),
          (this.Woa = !0),
          (this.f2o = !this.f2o),
          this.Zno(this.f2o),
          this.Close());
      }),
      (this.M2o = () => {
        if (!this.Woa) {
          switch (this.p2o) {
            case 0:
              MapController_1.MapController.RequestCreateCustomMark(
                this.u2o.TrackPosition,
                this.u2o.ConfigId,
              );
              break;
            case 1:
              MapController_1.MapController.RequestRemoveMapMarks(9, [
                this.u2o.MarkId,
              ]);
          }
          (this.Woa = !0), this.Close();
        }
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
      (this.wAt = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(7))),
      this.wAt.BindCallback(this.M2o),
      (this.C2o = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(8))),
      this.C2o.BindCallback(this.v2o),
      (this.g2o = []),
      this.E2o();
  }
  OnShowWorldMapSecondaryUi(t, e, i) {
    (this.p2o = e),
      (this.u2o = t),
      (this.Woa = !1),
      this.S2o(e),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      (this.GetText(3).text =
        i + "/" + ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize),
      this.RootItem.SetUIActive(!0),
      this.SelectOptionChecked(t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "CustomeMark"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CustomeMarkTip");
  }
  SelectOptionChecked(t) {
    if (0 !== this.g2o.length) {
      if (1 === this.p2o)
        for (const e of this.g2o)
          if (e.Config.MarkPic === t.IconPath) return void e.SetToggleChecked();
      this.g2o[0].SetToggleChecked();
    }
  }
  S2o(t) {
    let e = void 0;
    switch (this.p2o) {
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
    this.wAt.SetText(e), this.Zno(this.u2o.IsTracked);
  }
  OnCloseWorldMapSecondaryUi() {
    (this.Woa = !1),
      this.u2o &&
        0 === this.p2o &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemoveMapMark,
          9,
          this.u2o.MarkId,
        );
  }
  Zno(t) {
    this.f2o = t;
    (t =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.f2o
          ? "Text_InstanceDungeonEntranceCancelTrack_Text"
          : "Text_InstanceDungeonEntranceTrack_Text",
      ) ?? ""),
      this.C2o.SetText(t),
      (t = 0 === this.p2o);
    this.C2o.RefreshEnable(!t);
  }
  y2o(t, e) {
    1 === e &&
      (this.u2o.IsNewCustomMarkItem ||
        MapController_1.MapController.RequestMapMarkReplace(this.u2o.MarkId, t),
      this.u2o.SetConfigId(t),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1));
  }
  E2o() {
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetCustomMarks();
    if (t) {
      for (const s of t) {
        var e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), this.GetItem(4)),
          i = new MarkIconOption_1.MarkIconOption();
        i.Initialize(e, this.GetItem(4), s),
          0 === this.p2o && 0 === this.g2o.length && i.SetToggleChecked(),
          1 === this.p2o &&
            this.u2o.IconPath === s.MarkPic &&
            i.SetToggleChecked(),
          i.SetOnclick(this.y2o.bind(this, s.MarkId)),
          this.g2o.push(i);
      }
      this.GetItem(6).SetUIActive(!1);
    }
  }
}
(exports.CustomMarkPanel = CustomMarkPanel).PanelSize = new UE.Vector2D(
  CUSTOM_MARK_PANEL_WIDTH,
  CUSTOM_MARK_PANEL_HEIGHT,
);
//# sourceMappingURL=CustomMarkPanel.js.map
