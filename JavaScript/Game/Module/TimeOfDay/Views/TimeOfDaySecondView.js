"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDaySecondView = void 0);
const UE = require("ue"),
  ue_1 = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  TimeOfDayAnimController_1 = require("../TimeOfDayAnimController"),
  TimeOfDayController_1 = require("../TimeOfDayController"),
  TimeOfDayDefine_1 = require("../TimeOfDayDefine"),
  TimeOfDaySecondCircleAttachItem_1 = require("./TimeOfDaySecondCircleAttachItem"),
  TimeOfDaySecondToggleItem_1 = require("./TimeOfDaySecondToggleItem"),
  TIMEGAP = 1e3;
class TimeOfDaySecondView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.IRe = void 0),
      (this.ITo = void 0),
      (this.TTo = void 0),
      (this.E_i = void 0),
      (this.rIn = void 0),
      (this.nIn = void 0),
      (this.LTo = () => {
        return new TimeOfDaySecondToggleItem_1.TimeOfDaySecondToggleItem();
      }),
      (this.DTo = (e, i, t) => {
        return new TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem(
          e,
        );
      }),
      (this.RTo = (e) => {
        this.ITo.IsVelocityMoveState() ||
          this.ITo.AttachToIndex(e.GetCurrentShowItemIndex(), !1);
      }),
      (this.UTo = () => {
        this.ATo();
      }),
      (this.$Ge = (e) => {
        "TimeOfDayLoadingView" === e &&
          (TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(!1),
          this.GetUiNiagara(4)?.ActivateSystem(!0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles,
          ),
          this.nIn) &&
          (this.nIn(), (this.nIn = void 0));
      }),
      (this.gTt = (i) => {
        if (
          !(
            i < 0 ||
            ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
              ?.ChangeDayIndex === i
          )
        ) {
          this.E_i.SelectGridProxy(i);
          for (let e = 0; e < this.TTo.length; e++)
            if (this.TTo[e].ChangeDayIndex === i) {
              ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt =
                this.TTo[e];
              break;
            }
          this.ITo.AttachToIndex(
            ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
              .Id,
            !0,
          );
          for (let e = -3; e < 3; e++)
            this.ITo.GetItemByShowIndex(e)
              ?.GetRootItem()
              .SetHierarchyIndex(e + 3);
          this.GetItem(7)
            .GetOwner()
            .GetComponentByClass(ue_1.UIInturnAnimController.StaticClass())
            .Play();
        }
      }),
      (this.E9e = () => {
        this.FNe();
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this._Fe = () => {
        this.PTo(
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
          ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
            .SetTime,
        );
      }),
      (this.PTo = (e, i, t) => {
        var r =
            i - e <
            TimeOfDayDefine_1.TOD_MIN_ADJUST_MINUTE *
              TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE
              ? i + TimeOfDayDefine_1.TOD_SECOND_PER_DAY
              : i,
          t = ((this.nIn = t), this.xTo());
        TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(!0),
          TimeOfDayController_1.TimeOfDayController.AdjustTime(
            i,
            Protocol_1.Aki.Protocol.pOs.Proto_PlayerOperate,
            t,
          ),
          (this.rIn = TimerSystem_1.TimerSystem.Delay(() => {
            this.wTo(), (this.rIn = void 0);
          }, 1e3)),
          this.BTo(e, r, () => {});
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UINiagara],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIHorizontalLayout],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.Awe],
        [3, this._Fe],
      ]);
  }
  async OnBeforeStartAsync() {
    this.E_i = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(8),
      this.LTo,
    );
    var e =
        ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayTimeChangePresets(),
      i = [],
      e =
        (i.push(this.E_i.RefreshByDataAsync(e)),
        this.E_i.SelectGridProxy(0),
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "TimeOfDaySecondMiddleOffsetCurve",
        ));
    if (e) {
      const t = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (e) => {
        (TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve =
          e),
          t.SetResult();
      }),
        i.push(t.Promise);
    }
    await Promise.all(i);
  }
  OnStart() {
    var e = this.GetItem(6),
      i = this.GetItem(7);
    this.GetUiNiagara(4).SetUIActive(!1),
      (this.ITo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner())),
      this.ITo?.SetControllerItem(i),
      this.ITo?.SetIfNeedFakeItem(!0),
      this.ITo.CreateItems(this.GetItem(5).GetOwner(), 0, this.DTo),
      this.GetItem(5).SetUIActive(!1),
      this.FNe(),
      this.wTo(),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(this.E9e, TIMEGAP));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ClickTimeItem,
      this.RTo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AdjustTimeInAnim,
        this.PTo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectTimeItem,
        this.UTo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectTimePreset,
        this.gTt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ClickTimeItem,
      this.RTo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AdjustTimeInAnim,
        this.PTo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectTimeItem,
        this.UTo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectTimePreset,
        this.gTt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  ATo() {
    var e = ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt;
    this.E_i.SelectGridProxy(e.ChangeDayIndex);
  }
  wTo() {
    this.TTo =
      ModelManager_1.ModelManager.TimeOfDayModel.GetTimeOfDayShowData();
    var e = this.TTo;
    this.ITo.ReloadView(e.length, e);
    for (let e = -3; e < 3; e++)
      this.ITo.GetItemByShowIndex(e)
        ?.GetRootItem()
        .SetHierarchyIndex(e + 3);
  }
  OnTick(e) {
    this.bTo();
  }
  bTo() {
    var e = this.GetUiNiagara(4);
    !this.ITo || this.ITo.MovingState()
      ? e.IsUIActiveSelf() && this.GetUiNiagara(4).SetUIActive(!1)
      : e.IsUIActiveSelf() || this.GetUiNiagara(4).SetUIActive(!0);
  }
  FNe() {
    var e =
      ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString;
    this.GetText(1).SetText(e);
  }
  OnBeforeDestroy() {
    TimerSystem_1.TimerSystem.Has(this.IRe) &&
      TimerSystem_1.TimerSystem.Remove(this.IRe),
      TimerSystem_1.TimerSystem.Has(this.rIn) &&
        TimerSystem_1.TimerSystem.Remove(this.rIn),
      (TimeOfDayAnimController_1.TimeOfDayAnimController.CallBack = () => {}),
      TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(!1),
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1),
      TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
      this.nIn && (this.nIn(), (this.nIn = void 0)),
      (TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve =
        void 0),
      this.ITo.Clear(),
      this.E_i?.ClearChildren();
  }
  xTo() {
    return ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
      .ChangeDayIndex;
  }
  BTo(e, i, t) {
    TimeOfDayAnimController_1.TimeOfDayAnimController.PlayTimeAnimation(
      e,
      i,
      t,
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const i = Number(e[0]);
    if (0 !== i) {
      e = this.TTo?.findIndex((e) => e.SetTime === i);
      if (e && 0 <= e) {
        this.ITo?.AttachToIndex(e, !0);
        e = this.ITo?.GetItemByShowIndex(e)?.GetRootItem();
        if (e) return [e, e];
      }
    }
  }
}
exports.TimeOfDaySecondView = TimeOfDaySecondView;
//# sourceMappingURL=TimeOfDaySecondView.js.map
