"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceController = exports.INFO_ADVICE_ITEM_TYPE = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  AdviceData_1 = require("./AdviceData"),
  PROFILE_KEY = ((exports.INFO_ADVICE_ITEM_TYPE = 20), "Advice");
class AdviceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetFriendInitData,
      AdviceController.RequestAdviceData,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemUse,
        this.e9e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OriginWorldLevelUp,
        AdviceController.t9e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerLevelChanged,
        this.x2e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetFriendInitData,
      AdviceController.RequestAdviceData,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemUse,
        this.e9e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OriginWorldLevelUp,
        AdviceController.t9e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerLevelChanged,
        this.x2e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21402, AdviceController.i9e),
      Net_1.Net.Register(22288, AdviceController.o9e),
      Net_1.Net.Register(26315, AdviceController.r9e),
      Net_1.Net.Register(15927, AdviceController.n9e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21402),
      Net_1.Net.UnRegister(22288),
      Net_1.Net.UnRegister(15927),
      Net_1.Net.UnRegister(26315);
  }
  static OpenAdviceConjunctionSelectView() {
    var e = ModelManager_1.ModelManager.AdviceModel;
    (e.CurrentChangeWordType = 1),
      (e.CurrentSelectWordId = e.CurrentConjunctionId),
      UiManager_1.UiManager.OpenView("AdviceWordView");
  }
  static OpenAdviceWordSelectView(e) {
    var r,
      t = ModelManager_1.ModelManager.AdviceModel,
      o = t.CurrentWordMap.get(e);
    void 0 !== o && 0 < o
      ? ((r = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordType(o)),
        (t.CurrentSelectSortTypeId = r),
        (t.CurrentSelectSortWordId = o))
      : ((r =
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs()[0]
            .Id),
        (t.CurrentSelectSortTypeId = r),
        (t.CurrentSelectSortWordId = -1)),
      (t.CurrentSelectWordIndex = e),
      UiManager_1.UiManager.OpenView("AdviceSortWordView");
  }
  static OpenAdviceSentenceSelectView() {
    const e = ModelManager_1.ModelManager.AdviceModel;
    if (0 === e.CurrentLineModel) {
      const e = ModelManager_1.ModelManager.AdviceModel;
      e.CurrentChangeWordType = 0;
      var r = e.CurrentSentenceWordMap.get(0);
      (e.CurrentSelectWordId = r),
        (e.CurrentPreSelectSentenceIndex = 0),
        UiManager_1.UiManager.OpenView("AdviceWordView");
    } else UiManager_1.UiManager.OpenView("AdviceMutiSentenceSelectView");
  }
  static OpenAdviceExpressionView() {
    UiManager_1.UiManager.OpenView("AdviceExpressionView");
  }
  static OpenAdviceCreateView() {
    var e;
    ModelManager_1.ModelManager.AdviceModel.GetCreateAdvicePreConditionState()
      ? (ModelManager_1.ModelManager.AdviceModel.ResetWordData(),
        UiManager_1.UiManager.OpenView("AdviceCreateView"))
      : ((e =
          ModelManager_1.ModelManager.AdviceModel.GetCreatePreConditionFailText()),
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          e,
        ));
  }
  static OpenAdviceView() {
    (ModelManager_1.ModelManager.AdviceModel.AdviceViewShowId = void 0),
      UiManager_1.UiManager.OpenView("AdviceView");
  }
  static async OpenAdviceInfoView(e) {
    if (AdviceController.s9e()) return !1;
    {
      ModelManager_1.ModelManager.AdviceModel.SetCurrentEntityId(e),
        this.a9e(e);
      var e = await UiManager_1.UiManager.OpenViewAsync("AdviceInfoView"),
        r =
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshAdviceInfoView,
          ),
          ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData()),
        t =
          ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData(),
        o = new LogReportDefine_1.AdviceWatchLogData(),
        r =
          ((o.l_advice_id = r.GetAdviceBigId().toString()),
          r.GetAdviceContentData());
      const n = new Array();
      r.forEach((e) => {
        var r = new AdviceData_1.LogAdviceData();
        r.Phrase(e), n.push(r);
      }),
        (o.o_content = n),
        (o.i_creator_id = t.GetPlayerId()),
        (o.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
        (o.i_father_area_id =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.Father);
      r =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy;
      return (
        (o.f_pos_x = r.X),
        (o.f_pos_y = r.Y),
        (o.f_pos_z = r.Z),
        (o.i_expression =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
        (o.i_motion = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
        LogReportController_1.LogReportController.LogReport(o),
        void 0 !== e
      );
    }
  }
  static s9e() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e?.Valid && e.Entity.GetComponent(190).HasTag(1996802261))
      return (
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "BattleCannotOpenAdvice",
        ),
        !0
      );
    return !1;
  }
  static a9e(e) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    0 < r.GetComponent(0).GetAdviceInfo().GetAdviceData().GetAdviceMotionId() &&
      ModelManager_1.ModelManager.AdviceModel.GetAdviceMotionActor(
        e,
      ).PlayMotion(e),
      r.GetComponent(130)?.DoInteract();
  }
  static RequestCreateAdvice(e, r, t, o) {
    const n = new Protocol_1.Aki.Protocol.NXn();
    (n.l8n = { X: e.X, Y: e.Y, Z: e.Z }),
      (n._8n = { Pitch: r.Pitch, Yaw: r.Yaw, Roll: r.Roll }),
      (n.u8n = new Array()),
      t.forEach((e) => {
        n.u8n.push(e.ConvertToPb());
      }),
      Net_1.Net.Call(22259, n, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28388,
            )
          : (o && o(),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "HasPublishAdvice",
            ),
            ModelManager_1.ModelManager.AdviceModel.PhraseAdviceCreateData(e));
      });
  }
  static RequestModifyAdvice(r, t) {
    const o = new Protocol_1.Aki.Protocol.VXn();
    (o.s5n = r),
      (o.u8n = new Array()),
      t.forEach((e) => {
        o.u8n.push(e.ConvertToPb());
      }),
      Net_1.Net.Call(23684, o, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28552,
            )
          : ModelManager_1.ModelManager.AdviceModel.OnModifyAdvice(r, t);
      });
  }
  static RequestDeleteAdvice(r) {
    var e = new Protocol_1.Aki.Protocol.HXn();
    (e.s5n = r),
      Net_1.Net.Call(19001, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              23456,
            )
          : ModelManager_1.ModelManager.AdviceModel.OnDeleteAdvice(r);
      });
  }
  static RequestVote(e, r, t) {
    var o = new Protocol_1.Aki.Protocol.WXn();
    (o.s5n = e),
      (o.h5n = t),
      Net_1.Net.Call(15967, o, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16399,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAdviceVoteNotify,
            ))
          : ModelManager_1.ModelManager.AdviceModel.OnRequestVote(r, t);
      });
  }
  static RequestSetAdviceShowState(e) {
    const r = new Protocol_1.Aki.Protocol.xXn();
    (r.q5n = e),
      Net_1.Net.Call(26943, r, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              17142,
            )
          : ModelManager_1.ModelManager.AdviceModel.SetAdviceShowSetting(r.q5n);
      });
  }
  static CheckInInValidArea() {
    return !!ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCannotPutArea().includes(
      ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId,
    );
  }
  static CheckBehindAdviceActor() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllEntities(),
      r = ModelManager_1.ModelManager.FunctionModel.PlayerId,
      t =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCannotPutDistance();
    for (const a of e.values()) {
      var o = a.Entity.GetComponent(0);
      if (o && o.GetAdviceInfo()?.GetPlayerId() === r) {
        var o = Global_1.Global.BaseCharacter,
          n = a.Entity.GetComponent(1)?.Owner;
        if (o && a && n) {
          (n = n.K2_GetActorLocation()), (o = o.K2_GetActorLocation());
          if (UE.KismetMathLibrary.Vector_Distance(n, o) <= t) return !0;
        }
      }
    }
    return !1;
  }
  static CheckIfStandAndInValidActor() {
    var e = Vector_1.Vector.Create(),
      r = Vector_1.Vector.Create(),
      t = Global_1.Global.BaseCharacter.CharacterActorComponent,
      o = t.ActorLocationProxy,
      n =
        (e.DeepCopy(o),
        (e.Z += t.DefaultHalfHeight),
        r.DeepCopy(o),
        (r.Z -= t.DefaultHalfHeight + 300),
        ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()),
      o =
        ((n.WorldContextObject = t.Actor),
        (n.Radius = t.DefaultRadius),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, r),
        n.ActorsToIgnore.Empty(),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          t.Actor.CapsuleComponent,
          n,
          PROFILE_KEY,
          PROFILE_KEY,
        ));
    if (!o)
      return (
        ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(), !1
      );
    var a = n.HitResult.GetHitCount();
    for (let e = 0; e < a; ++e) {
      var i = n.HitResult.Actors.Get(e);
      if (!this.h9e(i))
        return (
          ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(), !1
        );
    }
    return ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(), !0;
  }
  static h9e(e) {
    if (
      e &&
      UE.KuroStaticLibrary.IsImplementInterface(
        e.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      )
    ) {
      var r = e.GetEntityId();
      const t = EntitySystem_1.EntitySystem.Get(r);
      return t?.Valid ? !1 : !0;
    }
    const t =
      ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
    return !t?.Valid;
  }
}
((exports.AdviceController = AdviceController).t9e = () => {
  UiManager_1.UiManager.IsViewShow("AdviceInfoView") &&
    UiManager_1.UiManager.CloseView("AdviceInfoView");
}),
  (AdviceController.x2e = (e, r, t, o, n, a, i) => {
    UiManager_1.UiManager.IsViewShow("AdviceInfoView") &&
      UiManager_1.UiManager.CloseView("AdviceInfoView");
  }),
  (AdviceController.e9e = (e, r) => {
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    0 < e.Parameters.size &&
      void 0 !== (e = e.Parameters.get(exports.INFO_ADVICE_ITEM_TYPE)) &&
      0 !== e &&
      AdviceController.OpenAdviceCreateView();
  }),
  (AdviceController._Mo = () => {
    ModelManager_1.ModelManager.AdviceModel.ResetVoteIds();
  }),
  (AdviceController.RequestAdviceData = () => {
    var e = new Protocol_1.Aki.Protocol.GXn();
    Net_1.Net.Call(26307, e, (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            22096,
          )
        : ModelManager_1.ModelManager.AdviceModel.PhraseAdviceData(e);
    });
  }),
  (AdviceController.i9e = (e) => {
    var r = MathUtils_1.MathUtils.LongToBigInt(e.s5n),
      r = Number(r),
      r = EntitySystem_1.EntitySystem.Get(r);
    r && r.GetComponent(0).GetAdviceInfo().PhraseContent(e.u8n);
  }),
  (AdviceController.o9e = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    r?.Valid &&
      ((r = r.Entity.GetComponent(0)).GetAdviceInfo().PhraseVote(e.XMs),
      ModelManager_1.ModelManager.AdviceModel.OnAdviceVoteUpdate(
        r.GetAdviceInfo().GetAdviceData().GetAdviceBigId(),
        e,
      ));
  }),
  (AdviceController.r9e = (e) => {
    ModelManager_1.ModelManager.AdviceModel.OnAdviceUpdateNotify(e);
  }),
  (AdviceController.n9e = (e) => {
    ModelManager_1.ModelManager.AdviceModel.SetAdviceShowSetting(e.q5n);
  });
//# sourceMappingURL=AdviceController.js.map
