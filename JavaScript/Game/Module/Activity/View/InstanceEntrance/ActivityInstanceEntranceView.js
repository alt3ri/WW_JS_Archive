"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityInstanceEntranceView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  HelpController_1 = require("../../../Help/HelpController"),
  InstanceDungeonDefine_1 = require("../../../InstanceDungeon/Define/InstanceDungeonDefine"),
  DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView"),
  ActivityInstanceEntranceDynItem_1 = require("./ActivityInstanceEntranceDynItem"),
  ActivityInstanceEntranceInfoItem_1 = require("./ActivityInstanceEntranceInfoItem"),
  ActivityInstanceEntranceScoreItem_1 = require("./ActivityInstanceEntranceScoreItem"),
  ActivityInstanceEntranceScrollItem_1 = require("./ActivityInstanceEntranceScrollItem");
class ActivityInstanceEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.C0t = void 0),
      (this.OBl = void 0),
      (this.wth = void 0),
      (this.NBl = void 0),
      (this.FBl = 0),
      (this.mli = void 0),
      (this.Cli = void 0),
      (this.Lli = (t, e, i) => {
        return new ActivityInstanceEntranceScrollItem_1.ActivityInstanceEntranceScrollItem();
      }),
      (this.yli = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.vMl = () => {
        this.OBl?.RefreshDropDownItem(this.C0t),
          this.OBl?.RefreshRecommendLevelItem(this.C0t);
      }),
      (this.VBl = (t) => {
        (this.FBl = t),
          this.HBl(),
          this.FDc(),
          this.OBl?.RefreshView(this.C0t),
          this.UiViewSequence.PlaySequence("Xz");
      }),
      (this.jBl = (t) => {
        (this.FBl = t),
          this.Esi(),
          this.OBl?.RefreshView(this.C0t),
          this.Fth(this.C0t),
          this.UiViewSequence.PlaySequence("Xz");
      }),
      (this.NDc = () => {
        HelpController_1.HelpController.OpenHelpById(
          InstanceDungeonDefine_1.DUNGEON_ARCHIVE_HELP_ID,
        );
      }),
      (this.xli = () => {
        this.UiViewSequence.PlaySequencePurely("Close01", !0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
      [3, UE.UITexture],
      [2, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.C0t = this.OpenParam),
      (this.wth = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(6))),
      await this.wth.CreateCaptionStateItem(this.NDc),
      this.VDc(
        this.C0t.GetActivityEntranceSelectItemData()?.GetCurrentSelectData(),
      ),
      this.WBl(this.C0t.GetActivityEntranceCaptionItemData());
    var t = [];
    (this.OBl =
      new ActivityInstanceEntranceInfoItem_1.ActivityInstanceEntranceInfoItem()),
      t.push(
        this.OBl.CreateThenShowByResourceIdAsync(
          "UiItem_InstanceDungeon_RightInfo",
          this.GetItem(5),
        ),
      ),
      (this.mli =
        new ActivityInstanceEntranceDynItem_1.ActivityInstanceEntranceDynItem()),
      (this.Cli = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(1),
        this.mli,
        this.Lli,
      )),
      t.push(this.Cli.Init()),
      this.C0t.GetActivityEntrancePointData() &&
        ((this.NBl =
          new ActivityInstanceEntranceScoreItem_1.ActivityInstanceEntranceScoreItem()),
        t.push(
          this.NBl.CreateThenShowByResourceIdAsync(
            "UiItem_CheckpointsLScoreB",
            this.GetItem(8),
          ),
        )),
      await Promise.all(t),
      this.OBl.RefreshView(this.C0t),
      this.QBl(this.C0t.GetActivityEntrancePointData()),
      this.Fth(this.C0t);
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("Close01", this.yli);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshActivityEntranceScroller,
      this.jBl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshActivityEntranceItemContent,
        this.VBl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel,
        this.vMl,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshActivityEntranceScroller,
      this.jBl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshActivityEntranceItemContent,
        this.VBl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel,
        this.vMl,
      );
  }
  OnBeforeShow() {
    this.Esi();
  }
  OnAfterShow() {
    this.FDc();
  }
  FDc() {
    var t =
      this.C0t.GetActivityEntranceSelectItemData()
        ?.GetCurrentSelectData()
        ?.GetInstanceDungeonId() ?? 0;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.CheckAndShowDungeonArchiveExpireTips(
      t,
    );
  }
  WBl(t) {
    var e;
    this.wth.SetCloseCallBack(this.xli),
      t
        ? (this.wth?.SetUiActive(!0),
          this.wth?.SetTitleByTextIdAndArgNew(t.GetName()),
          (e = t.GetTitleSpritePath()) && "" !== e
            ? (this.wth.SetTitleIconVisible(!0), this.wth.SetTitleIcon(e))
            : this.wth.SetTitleIconVisible(!1),
          (e = t.GetHelpId()),
          this.wth.SetHelpBtnActive(0 !== e),
          this.wth.SetHelpCallBack(() => {
            var t = this.C0t.GetActivityEntranceCaptionItemData().GetHelpId();
            HelpController_1.HelpController.OpenHelpById(t);
          }))
        : this.wth?.SetUiActive(!1);
  }
  VDc(t) {
    var e = t?.GetInstanceDungeonId() ?? 0,
      i =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(
          e,
        );
    this.wth.SetCaptionStateActive(i && void 0 !== t),
      this.wth.SetCaptionChangeColor(!1),
      i &&
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.HasDungeonArchive(
          e,
        )
          ? (this.wth.SetCaptionStateTip("instance_HaveRecord"),
            this.wth.SetCaptionChangeColor(!0))
          : ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonSupportAndWithoutArchive(
              e,
            ) && this.wth.SetCaptionStateTip("instance_Record_leave"));
  }
  Fth(t) {
    t &&
    t.GetActivityEntranceSelectItemData() &&
    (t = t
      .GetActivityEntranceSelectItemData()
      .GetCurrentSelectData()
      ?.GetBgPath()) &&
    "" !== t
      ? this.SetTextureByPath(t, this.GetTexture(3))
      : this.GetTexture(3)?.SetUIActive(!1);
  }
  QBl(t) {
    t && (this.NBl?.SetActive(!0), this.NBl?.RefreshView(t));
  }
  Esi() {
    var t =
      this.C0t.GetActivityEntranceSelectItemData().GetShowDataBySelectElement(
        this.FBl,
        0,
      );
    for (const e of t)
      e.GetSelectState() && e.GetSelectCallBack()?.(e.GetSelectDataIndex());
    this.Cli.RefreshByData(t);
  }
  HBl() {
    var e =
      this.C0t.GetActivityEntranceSelectItemData().GetShowDataBySelectElement(
        this.FBl,
        0,
      );
    for (let t = 0; t < this.Cli.GetScrollItemCount(); t++)
      this.Cli?.GetScrollItemFromIndex(t)?.Update(e[t], t);
  }
  OnBeforeDestroy() {
    this.Cli && (this.Cli.ClearChildren(), (this.Cli = void 0));
  }
}
exports.ActivityInstanceEntranceView = ActivityInstanceEntranceView;
//# sourceMappingURL=ActivityInstanceEntranceView.js.map
