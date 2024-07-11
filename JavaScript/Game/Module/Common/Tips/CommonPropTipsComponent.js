"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonPropTipsButtonData = exports.CommonPropTipsComponent = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiResourceManager_1 = require("../../../Ui/LguiResourceManager");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const GenericLayoutAdd_1 = require("../../Util/GenericLayoutAdd");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ButtonItem_1 = require("../Button/ButtonItem");
const LevelSequencePlayer_1 = require("../LevelSequencePlayer");
class CommonPropTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.QBt = void 0),
      (this.GetWayLayout = void 0),
      (this.ConfigId = 0),
      (this.DoubleButtonItemList = []),
      (this.OneButtonItem = void 0),
      (this.IsOpenGetWay = !1),
      (this.XBt = () => {
        (this.IsOpenGetWay = !this.IsOpenGetWay),
          this.GetLayoutBase(5)
            .GetRootComponent()
            .SetUIActive(this.IsOpenGetWay),
          this.GetExtendToggle(4).SetToggleState(this.IsOpenGetWay ? 1 : 0, !1);
      }),
      (this.sGe = (t, e, i) => {
        const s = t;
        var t = new ButtonItem_1.ButtonItem(e);
        var e = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(s);
        return (
          e &&
            (t.SetData(s),
            t.SetEnableClick(e.Type === 2),
            t.SetFunction((t) => {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(s);
            }),
            t.SetButtonAllowEventBubbleUp(!0),
            (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              e.Description,
            )),
            t.SetText(e)),
          { Key: i, Value: t }
        );
      }),
      (this.$Bt = LguiResourceManager_1.LguiResourceManager.InvalidId),
      this.CreateThenShowByActor(t.GetOwner()),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIExtendToggle],
      [5, UE.UILayoutBase],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UISprite],
      [12, UE.UIText],
      [13, UE.UISprite],
      [14, UE.UIText],
      [15, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.XBt]]);
  }
  OnStart() {
    (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.GetWayLayout = new GenericLayoutAdd_1.GenericLayoutAdd(
        this.GetLayoutBase(5),
        this.sGe,
      )),
      this.GetItem(15).SetUIActive(!0),
      this.YBt(!1),
      this.SetBottomState(!1, !1),
      (this.OneButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(8)));
    const i = this.GetItem(7).GetAttachUIChildren();
    for (let t = 0, e = i.Num(); t < e; ++t) {
      const s = new ButtonItem_1.ButtonItem(i.Get(t));
      this.DoubleButtonItemList.push(s);
    }
    this.SetOwnTextState(!1);
  }
  YBt(t) {
    this.GetExtendToggle(4).RootUIComp.SetUIActive(t),
      this.GetLayoutBase(5).GetRootComponent().SetUIActive(!1),
      (this.IsOpenGetWay = !1),
      this.GetExtendToggle(4).SetToggleState(this.IsOpenGetWay ? 1 : 0, !1);
  }
  JBt(t) {
    this.GetWayLayout.AddItemToLayout(t, 1);
  }
  LoadDebugText() {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      (this.QBt
        ? LguiUtil_1.LguiUtil.SetLocalText(
            this.QBt,
            "CommonTipsDebugItemId",
            this.ConfigId,
          )
        : (LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.$Bt),
          (this.$Bt =
            LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
              "UiItem_DebugText_Prefab",
              this.RootItem,
              (t) => {
                (this.$Bt =
                  LguiResourceManager_1.LguiResourceManager.InvalidId),
                  (this.QBt = t.GetComponentByClass(UE.UIText.StaticClass())),
                  LguiUtil_1.LguiUtil.SetLocalText(
                    this.QBt,
                    "CommonTipsDebugItemId",
                    this.ConfigId,
                  );
              },
            ))));
  }
  OnBeforeDestroy() {
    this.EPe.Clear(),
      (this.EPe = void 0),
      this.GetWayLayout.ClearChildren(),
      (this.GetWayLayout = void 0),
      this.OneButtonItem.Destroy(),
      (this.OneButtonItem = void 0);
    for (const t of this.DoubleButtonItemList) t.Destroy();
    (this.DoubleButtonItemList = []),
      LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.$Bt),
      this.QBt &&
        (ActorSystem_1.ActorSystem.Put(this.QBt.GetOwner()),
        (this.QBt = void 0));
  }
  UpdateComponent(t, e = !1) {
    this.ConfigId = t;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    const i =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.TypeDescription),
      this.GetText(3));
    t.AttributesDescription
      ? (i.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.AttributesDescription))
      : i.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.BgDescription),
      this.SetItemIcon(this.GetTexture(1), this.ConfigId),
      this.SetItemQualityIcon(
        this.GetSprite(11),
        this.ConfigId,
        void 0,
        "TipsSprite",
      ),
      this.LoadDebugText(),
      e && (this.GetWayLayout.ClearChildren(), t.ItemAccess.length > 0)
        ? (this.JBt(t.ItemAccess), this.YBt(!0))
        : this.YBt(!1);
  }
  SetBottomState(t, e) {
    let i;
    const s = this.GetItem(6);
    t
      ? (s.SetUIActive(!0),
        (t = this.GetItem(8)),
        (i = this.GetItem(7)),
        t.SetUIActive(e),
        i.SetUIActive(!e))
      : s.SetUIActive(!1);
  }
  SetOwnTextState(t) {
    const e = this.GetText(14);
    t
      ? ((t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.ConfigId,
        )),
        LguiUtil_1.LguiUtil.SetLocalText(e, "ItemTipsHaveNum", t),
        e.SetUIActive(!0))
      : e.SetUIActive(!1);
  }
  GetDoubleLeftButton() {
    return this.DoubleButtonItemList[0];
  }
  GetDoubleRightButton() {
    return this.DoubleButtonItemList[1];
  }
  GetOneButton() {
    return this.OneButtonItem;
  }
  SetOneButtonEnable(t) {
    this.OneButtonItem.SetEnableClick(t);
  }
  GetConfigId() {
    return this.ConfigId;
  }
  PlayStartSequence() {
    this.EPe.PlayLevelSequenceByName("Start");
  }
  StopStartSequence() {
    this.EPe.StopSequenceByKey("Start");
  }
}
exports.CommonPropTipsComponent = CommonPropTipsComponent;
class CommonPropTipsButtonData {
  constructor() {
    (this.Content = ""),
      (this.NeedInteractionGroup = !1),
      (this.ClickFunction = void 0);
  }
}
exports.CommonPropTipsButtonData = CommonPropTipsButtonData;
// # sourceMappingURL=CommonPropTipsComponent.js.map
