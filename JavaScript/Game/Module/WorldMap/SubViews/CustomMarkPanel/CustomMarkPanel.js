"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomMarkPanel = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUiLayoutB_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutB"),
  MarkIconOption_1 = require("./MarkIconOption"),
  CUSTOM_MARK_PANEL_WIDTH = 778,
  CUSTOM_MARK_PANEL_HEIGHT = 592;
class CustomMarkPanel extends WorldMapSecondaryUiLayoutB_1.WorldMapSecondaryUiLayoutB {
  constructor() {
    super(...arguments),
      (this.g2o = void 0),
      (this.u2o = void 0),
      (this.f2o = !1),
      (this.Woa = !1),
      (this.p2o = 0),
      (this.OnRightConfirmBtnClick = () => {
        if (!this.Woa)
          switch (this.p2o) {
            case 0:
              MapController_1.MapController.RequestCreateCustomMark(
                this.u2o.TrackPosition,
                this.u2o.ConfigId,
              ),
                (this.Woa = !0),
                this.Close();
              break;
            case 1:
              var t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
                this.Map,
                this.u2o,
              );
              t &&
                MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(this.u2o, t, () => {
                  this.Close();
                });
          }
      }),
      (this.OnLeftConfirmBtnClick = () => {
        this.Woa ||
          (this.CheckAndShowCrossMapTips(this.u2o),
          MapController_1.MapController.RequestTrackMapMark({
            MarkType: this.u2o.MarkType,
            MarkId: this.u2o.MarkId,
            Track: !this.f2o,
          }),
          (this.Woa = !0),
          (this.f2o = !this.f2o),
          this.Close());
      }),
      (this.OnDelBtnClick = () => {
        this.Woa ||
          (1 === this.p2o &&
            MapController_1.MapController.RequestRemoveMapMarks(9, [
              this.u2o.MarkId,
            ]),
          (this.Woa = !0),
          this.Close());
      });
  }
  GetResourceId() {
    return "UiItem_CustomMarkPanel_Prefab";
  }
  OnStart() {
    super.OnStart(), (this.g2o = []), this.E2o();
  }
  OnShowWorldMapSecondaryUi(t, i) {
    (this.p2o = i),
      (this.u2o = t),
      (this.Woa = !1),
      this.QQl(),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1);
    i = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9);
    (this.GetText(3).text =
      i + "/" + ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize),
      this.RootItem.SetUIActive(!0),
      this.RightConfirmBtn.SetUiActive(!0),
      this.LeftConfirmBtn.SetUiActive(!0),
      this.MiddleCenterBtn.SetUiActive(!1),
      this.SelectOptionChecked(t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "CustomeMark"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CustomeMarkTip");
  }
  SelectOptionChecked(t) {
    if (0 !== this.g2o.length) {
      if (1 === this.p2o)
        for (const i of this.g2o)
          if (i.Config.MarkPic === t.IconPath) return void i.SetToggleChecked();
      this.g2o[0].SetToggleChecked();
    }
  }
  QQl() {
    switch (this.p2o) {
      case 0:
        var t =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_Add_Text",
          ) ?? "";
        this.RightConfirmBtn.SetText(t), this.RightConfirmBtn.RefreshEnable(!0);
        break;
      case 1:
        var t =
            ControllerHolder_1.ControllerHolder.TeleportController.CheckCanTeleport(),
          i = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
            this.Map,
            this.u2o,
          );
        this.RightConfirmBtn.RefreshEnable(t && void 0 !== i),
          this.RightConfirmBtn.RefreshTextNew("MapMarkQuickTransfer_Text");
    }
    var e = 0 === this.p2o;
    this.SetDelBtnActive(!e),
      this.LeftConfirmBtn.RefreshEnable(!e),
      this.Zno(this.u2o.IsTracked);
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
    t =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.f2o
          ? "Text_InstanceDungeonEntranceCancelTrack_Text"
          : "Text_InstanceDungeonEntranceTrack_Text",
      ) ?? "";
    this.LeftConfirmBtn.SetText(t);
  }
  y2o(t, i) {
    1 === i &&
      (this.u2o.IsNewCustomMarkItem ||
        MapController_1.MapController.RequestMapMarkReplace(this.u2o.MarkId, t),
      this.u2o.SetConfigId(t),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1));
  }
  E2o() {
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetCustomMarks();
    if (t) {
      for (const s of t) {
        var i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), this.GetItem(4)),
          e = new MarkIconOption_1.MarkIconOption();
        e.Initialize(i, this.GetItem(4), s),
          0 === this.p2o && 0 === this.g2o.length && e.SetToggleChecked(),
          1 === this.p2o &&
            this.u2o.IconPath === s.MarkPic &&
            e.SetToggleChecked(),
          e.SetOnclick(this.y2o.bind(this, s.MarkId)),
          this.g2o.push(e);
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
