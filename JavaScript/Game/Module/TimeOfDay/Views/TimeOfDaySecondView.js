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
      (this.ELo = void 0),
      (this.SLo = void 0),
      (this.Sui = void 0),
      (this.TTn = void 0),
      (this.LTn = void 0),
      (this.yLo = () => {
        return new TimeOfDaySecondToggleItem_1.TimeOfDaySecondToggleItem();
      }),
      (this.ILo = (e, i, t) => {
        return new TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem(
          e,
        );
      }),
      (this.TLo = (e) => {
        this.ELo.IsVelocityMoveState() ||
          this.ELo.AttachToIndex(e.GetCurrentShowItemIndex(), !1);
      }),
      (this.LLo = () => {
        this.DLo();
      }),
      (this.$Ge = (e) => {
        "TimeOfDayLoadingView" === e &&
          (TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(!1),
          this.GetUiNiagara(4)?.ActivateSystem(!0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles,
          ),
          this.LTn) &&
          (this.LTn(), (this.LTn = void 0));
      }),
      (this.ELt = (i) => {
        if (
          !(
            i < 0 ||
            ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
              ?.ChangeDayIndex === i
          )
        ) {
          this.Sui.SelectGridProxy(i);
          for (let e = 0; e < this.SLo.length; e++)
            if (this.SLo[e].ChangeDayIndex === i) {
              ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt =
                this.SLo[e];
              break;
            }
          this.ELo.AttachToIndex(
            ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
              .Id,
            !0,
          );
          for (let e = -3; e < 3; e++)
            this.ELo.GetItemByShowIndex(e)
              ?.GetRootItem()
              .SetHierarchyIndex(e + 3);
          this.GetItem(7)
            .GetOwner()
            .GetComponentByClass(ue_1.UIInturnAnimController.StaticClass())
            .Play();
        }
      }),
      (this.q7e = () => {
        this.FNe();
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.L3e = () => {
        this.RLo(
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
          ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
            .SetTime,
        );
      }),
      (this.RLo = (e, i, t) => {
        var r =
            i - e <
            TimeOfDayDefine_1.TOD_MIN_ADJUST_MINUTE *
              TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE
              ? i + TimeOfDayDefine_1.TOD_SECOND_PER_DAY
              : i,
          t = ((this.LTn = t), this.ULo());
        TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(!0),
          TimeOfDayController_1.TimeOfDayController.AdjustTime(
            i,
            Protocol_1.Aki.Protocol.C4s.Proto_PlayerOperate,
            t,
          ),
          (this.TTn = TimerSystem_1.TimerSystem.Delay(() => {
            this.ALo(), (this.TTn = void 0);
          }, 1e3)),
          this.PLo(e, r, () => {});
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
        [3, this.L3e],
      ]);
  }
  async OnBeforeStartAsync() {
    this.Sui = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(8),
      this.yLo,
    );
    var e =
        ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayTimeChangePresets(),
      i = [],
      e =
        (i.push(this.Sui.RefreshByDataAsync(e)),
        this.Sui.SelectGridProxy(0),
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
      (this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner())),
      this.ELo?.SetControllerItem(i),
      this.ELo?.SetIfNeedFakeItem(!0),
      this.ELo.CreateItems(this.GetItem(5).GetOwner(), 0, this.ILo),
      this.GetItem(5).SetUIActive(!1),
      this.FNe(),
      this.ALo(),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(this.q7e, TIMEGAP));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ClickTimeItem,
      this.TLo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AdjustTimeInAnim,
        this.RLo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectTimeItem,
        this.LLo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectTimePreset,
        this.ELt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ClickTimeItem,
      this.TLo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AdjustTimeInAnim,
        this.RLo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectTimeItem,
        this.LLo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectTimePreset,
        this.ELt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  DLo() {
    var e = ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt;
    this.Sui.SelectGridProxy(e.ChangeDayIndex);
  }
  ALo() {
    this.SLo =
      ModelManager_1.ModelManager.TimeOfDayModel.GetTimeOfDayShowData();
    var e = this.SLo;
    this.ELo.ReloadView(e.length, e);
    for (let e = -3; e < 3; e++)
      this.ELo.GetItemByShowIndex(e)
        ?.GetRootItem()
        .SetHierarchyIndex(e + 3);
  }
  OnTick(e) {
    this.xLo();
  }
  xLo() {
    var e = this.GetUiNiagara(4);
    !this.ELo || this.ELo.MovingState()
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
      TimerSystem_1.TimerSystem.Has(this.TTn) &&
        TimerSystem_1.TimerSystem.Remove(this.TTn),
      (TimeOfDayAnimController_1.TimeOfDayAnimController.CallBack = () => {}),
      TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(!1),
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1),
      TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
      this.LTn && (this.LTn(), (this.LTn = void 0)),
      (TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve =
        void 0),
      this.ELo.Clear(),
      this.Sui?.ClearChildren();
  }
  ULo() {
    return ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt
      .ChangeDayIndex;
  }
  PLo(e, i, t) {
    TimeOfDayAnimController_1.TimeOfDayAnimController.PlayTimeAnimation(
      e,
      i,
      t,
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const i = Number(e[0]);
    if (0 !== i) {
      e = this.SLo?.findIndex((e) => e.SetTime === i);
      if (e && 0 <= e) {
        this.ELo?.AttachToIndex(e, !0);
        e = this.ELo?.GetItemByShowIndex(e)?.GetRootItem();
        if (e) return [e, e];
      }
    }
  }
}
exports.TimeOfDaySecondView = TimeOfDaySecondView;
//# sourceMappingURL=TimeOfDaySecondView.js.map
