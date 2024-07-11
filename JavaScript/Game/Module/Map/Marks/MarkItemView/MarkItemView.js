"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MarkChildIconComponent_1 = require("./Components/MarkChildIconComponent");
const MarkNameComponent_1 = require("./Components/MarkNameComponent");
const MarkOutOfBoundComponent_1 = require("./Components/MarkOutOfBoundComponent");
const MarkRangeImageComponent_1 = require("./Components/MarkRangeImageComponent");
const MarkSelectComponent_1 = require("./Components/MarkSelectComponent");
const MarkTrackComponent_1 = require("./Components/MarkTrackComponent");
const MarkVerticalPointerComponent_1 = require("./Components/MarkVerticalPointerComponent");
const POINTER_RANGE = 2e3;
class MarkItemView extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Holder = void 0),
      (this.IsSelectedInternal = !1),
      (this.IsShowIcon = !0),
      (this.pDi = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.OutOfBoundComponentInternal = void 0),
      (this.SelectComponentInternal = void 0),
      (this.TrackComponentInternal = void 0),
      (this.RangeComponentInternal = void 0),
      (this.NameComponentInternal = void 0),
      (this.VerticalPointerComponentInternal = void 0),
      (this.ChildIconComponentInternal = void 0),
      (this.vDi = void 0),
      (this.MDi = void 0),
      (this.SDi = void 0),
      (this.EDi = void 0),
      (this.yDi = !1),
      (this.IDi = void 0),
      (this.TDi = void 0),
      (this.LDi = void 0),
      (this.DDi = void 0),
      (this.RDi = void 0),
      (this.UDi = void 0),
      (this.ADi = void 0),
      (this.PDi = !1),
      (this.xDi = !1),
      (this.wDi = void 0),
      (this.BDi = 0),
      (this.OnLevelSequenceStart = (t) => {
        this.Holder.OnLevelSequenceStart(t);
      }),
      (this.OnLevelSequenceStop = (t) => {
        this.Holder.OnLevelSequenceStop(t),
          t === "HideView" &&
            ((t = this.Holder.IsCanShowView),
            this.SetUiActive(t),
            this.SDi?.SetAlpha(1));
      }),
      (this.Holder = t),
      (this.pDi = new UE.Vector());
  }
  get LoadingPromise() {
    return this.vDi;
  }
  get IsSelected() {
    return this.IsSelectedInternal;
  }
  set IsSelected(t) {
    this.IsSelectedInternal !== t &&
      ((this.IsSelectedInternal = t), this.OnSelectedStateChange(t));
  }
  async GetNameComponentAsync() {
    return (
      this.NameComponentInternal ||
        (this.NameComponentInternal =
          new MarkNameComponent_1.MarkNameComponent()),
      this.IDi ||
        ((this.IDi = this.NameComponentInternal.CreateThenShowByResourceIdAsync(
          "UiItem_MarkMapName_Prefab",
          this.SDi,
          !0,
        )),
        this.AddChild(this.NameComponentInternal)),
      await this.IDi,
      this.NameComponentInternal
    );
  }
  async GetRangeComponentAsync() {
    return (
      this.RangeComponentInternal ||
        (this.RangeComponentInternal =
          new MarkRangeImageComponent_1.MarkRangeImageComponent()),
      this.TDi ||
        ((this.TDi =
          this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkArea_Prefab",
            this.SDi,
            !0,
          )),
        this.AddChild(this.RangeComponentInternal)),
      await this.TDi,
      this.RangeComponentInternal
    );
  }
  async GetOutOfBoundComponentAsync() {
    return (
      this.OutOfBoundComponentInternal ||
        (this.OutOfBoundComponentInternal =
          new MarkOutOfBoundComponent_1.MarkOutOfBoundComponent()),
      this.LDi ||
        ((this.LDi =
          this.OutOfBoundComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkOut_Prefab",
            this.SDi,
            !0,
          )),
        this.AddChild(this.OutOfBoundComponentInternal)),
      await this.LDi,
      this.OutOfBoundComponentInternal
    );
  }
  async GetSelectComponentAsync() {
    return (
      this.SelectComponentInternal ||
        (this.SelectComponentInternal =
          new MarkSelectComponent_1.MarkSelectComponent()),
      this.DDi ||
        ((this.DDi =
          this.SelectComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkChoose_Prefab",
            this.SDi,
            !0,
          )),
        this.AddChild(this.SelectComponentInternal)),
      await this.DDi,
      this.SelectComponentInternal
    );
  }
  async GetTrackComponentAsync() {
    return (
      this.TrackComponentInternal ||
        ((this.TrackComponentInternal =
          new MarkTrackComponent_1.MarkTrackComponent()),
        (this.TrackComponentInternal.MapType = this.Holder.MapType)),
      this.RDi ||
        ((this.RDi =
          this.TrackComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkTrackNia_Prefab",
            this.SDi,
            !0,
          )),
        this.AddChild(this.TrackComponentInternal)),
      await this.RDi,
      this.TrackComponentInternal
    );
  }
  async GetVerticalPointerComponentAsync() {
    return (
      this.VerticalPointerComponentInternal ||
        (this.VerticalPointerComponentInternal =
          new MarkVerticalPointerComponent_1.MarkVerticalPointerComponent()),
      this.UDi ||
        ((this.UDi =
          this.VerticalPointerComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkArrow_Prefab",
            this.SDi,
            !0,
          )),
        this.AddChild(this.VerticalPointerComponentInternal)),
      await this.UDi,
      this.VerticalPointerComponentInternal
    );
  }
  async GetChildIconComponentAsync() {
    return (
      this.ChildIconComponentInternal ||
        (this.ChildIconComponentInternal =
          new MarkChildIconComponent_1.MarkChildIconComponent()),
      this.ADi ||
        ((this.ADi =
          this.ChildIconComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkChildNode_Prefab",
            this.SDi,
            !0,
          )),
        this.AddChild(this.ChildIconComponentInternal)),
      await this.ADi,
      this.ChildIconComponentInternal
    );
  }
  async InitializeMarkItemViewAsync() {
    (this.vDi = this.CreateThenShowByResourceIdAsync(
      "UiItem_WorldMapMark_Prefab",
      this.Holder.ViewRoot,
      !0,
    )),
      await this.vDi,
      this.bDi(this.yDi);
  }
  OnSelectedStateChange(t) {}
  OnInitialize() {}
  GetIconItem() {
    return this.GetSprite(1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      this.RootActor.SetActorLabel(
        `MarkId:${this.Holder.MarkId},ShowPriority:` + this.Holder.ShowPriority,
      ),
      (this.SDi = this.GetItem(0)),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceStartEvent(
        this.OnLevelSequenceStart,
      ),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.OnLevelSequenceStop),
      this.GetSprite(1).SetUIActive(!1);
    const t = new UE.Vector(this.Holder.ConfigScale);
    this.GetSprite(1).SetUIItemScale(t),
      this.SetScale(this.Holder.MarkScale),
      this.OnInitialize(),
      void 0 !== this.EDi && (this.EDi(), (this.EDi = void 0)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemViewCreate,
        this,
      );
  }
  OnBeforeDestroy() {
    (this.OutOfBoundComponentInternal = void 0),
      (this.SelectComponentInternal = void 0),
      (this.TrackComponentInternal = void 0),
      (this.RangeComponentInternal = void 0),
      (this.NameComponentInternal = void 0),
      (this.VerticalPointerComponentInternal = void 0),
      (this.ChildIconComponentInternal = void 0),
      this.LevelSequencePlayer?.Clear(),
      (this.LevelSequencePlayer = void 0),
      (this.vDi = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemViewDestroy,
        this,
      ),
      (this.Holder = void 0);
  }
  SetScale(t) {
    const i = 1 / this.Holder.LogicWorldScale;
    this.pDi.Set(t * i, t * i, t * i),
      this.RootItem.SetUIRelativeScale3D(this.pDi);
  }
  OnUpdate(t, i = !1, e = !1) {
    if (void 0 === this.Holder)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          35,
          "Holder is undefined",
          ["ComponentState", this.IsDestroyOrDestroying],
          ["isCreating", this.IsCreating],
        );
    else if (((this.yDi = e), this.IsCreating || this.IsDestroyOrDestroying))
      this.EDi = () => {
        this.OnUpdate(t, i, e);
      };
    else {
      this.bDi(this.yDi);
      let s = this.Holder.IsCanShowView;
      if ((this.SetUiActive(s), s)) {
        this.Holder.MapType === 2 &&
          ((s = CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapMarkSelectedAdditionScale",
          )),
          (s = this.IsSelected ? s : 0),
          this.SetScale(this.Holder.MarkScale + s));
        s = this.Holder.IsOutOfBound;
        (this.PDi === s && void 0 !== this.PDi) ||
          ((this.PDi = s),
          this.PDi
            ? this.GetOutOfBoundComponentAsync().then((t) => {
                t.SetActive(!0);
              })
            : this.OutOfBoundComponentInternal?.SetActive(!1)),
          (s = this.Holder.IsTracked && !i),
          (this.xDi === s && void 0 !== this.xDi) ||
            ((this.xDi = s),
            this.xDi
              ? this.GetTrackComponentAsync().then((t) => {
                  t.SetActive(!0);
                })
              : this.TrackComponentInternal?.SetActive(!1)),
          (s = this.IsSelected),
          (this.wDi === s && void 0 !== this.wDi) ||
            (this.IsSelected
              ? this.GetSelectComponentAsync().then((t) => {
                  t.SetActive(!0);
                })
              : this.SelectComponentInternal?.SetActive(!1),
            (this.wDi = s));
        const h = this.qDi(this.Holder.WorldPosition, t);
        this.BDi !== h &&
          ((this.BDi = h),
          this.GetVerticalPointerComponentAsync().then((t) => {
            switch (h) {
              case 0:
                t.HideSelf();
                break;
              case 1:
                t.ShowUp();
                break;
              case 2:
                t.ShowDown();
            }
          }));
      }
    }
  }
  bDi(t) {
    if (void 0 === this.Holder)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          35,
          "Holder is undefined",
          ["ComponentState", this.IsDestroyOrDestroying],
          ["isCreating", this.IsCreating],
        );
    else {
      if (t) {
        if (this.Holder.NeedPlayShowOrHideSeq) {
          switch (this.Holder.NeedPlayShowOrHideSeq) {
            case "ShowView":
              this.PlayInShowScaleRangeSequence();
              break;
            case "HideView":
              this.PlayOutShowScaleRangeSequence();
          }
          this.Holder.NeedPlayShowOrHideSeq = void 0;
        }
      } else
        (this.Holder.NeedPlayShowOrHideSeq = void 0),
          this.Holder.OnLevelSequenceStop("HideView");
      this.yDi = !1;
    }
  }
  SetOutOfBoundDirection(e) {
    this.GetOutOfBoundComponentAsync().then((t) => {
      var i = this.Holder.UiPosition;
      var i = Vector2D_1.Vector2D.Create(i.X, i.Y);
      i.SubtractionEqual(e), t.SetOutOfBoundDirection(i);
    });
  }
  OnStartTrack() {}
  OnEndTrack() {}
  OnIconPathChanged(t) {
    const i = this.GetSprite(1);
    this.LoadIcon(i, t);
  }
  LoadIcon(t, i) {
    t &&
      !StringUtils_1.StringUtils.IsEmpty(i) &&
      this.SetSpriteByPath(i, t, !1, void 0, () => {
        t.SetUIActive(this.IsShowIcon);
      });
  }
  async LoadIconAsync(t, i) {
    await this.vDi;
    const e = new CustomPromise_1.CustomPromise();
    (this.MDi = e.Promise),
      t && !StringUtils_1.StringUtils.IsEmpty(i)
        ? this.SetSpriteByPath(i, t, !1, void 0, () => {
            t.SetUIActive(this.IsShowIcon), e.SetResult();
          })
        : (e.SetResult(),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Map",
              50,
              "标记设置失败,检查传入的参数是否有空值",
            )),
      await this.MDi;
  }
  GetInteractiveFlag() {
    return this.Holder?.IsCanShowView ?? !1;
  }
  GetMarkPriorityKey(t, i = 0) {
    let e = 0;
    switch (t) {
      case 9:
        e = 1e3;
        break;
      case 11:
        e = 3e3;
        break;
      case 12:
        e = 2e3;
        break;
      default:
        e = i;
    }
    return e;
  }
  qDi(t, i) {
    return this.Holder.MapType === 2 ||
      ((t = t.Z - i.Z), Math.abs(t) < POINTER_RANGE)
      ? 0
      : t < 0
        ? 1
        : 2;
  }
  PlayInShowScaleRangeSequence() {
    this.LevelSequencePlayer.StopCurrentSequence(),
      this.LevelSequencePlayer.PlayLevelSequenceByName("ShowView");
  }
  PlayOutShowScaleRangeSequence() {
    this.LevelSequencePlayer.StopCurrentSequence(),
      this.LevelSequencePlayer.PlayLevelSequenceByName("HideView");
  }
  async PlayUnlockSequence() {}
}
exports.MarkItemView = MarkItemView;
// # sourceMappingURL=MarkItemView.js.map
