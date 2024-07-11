"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stack_1 = require("../../../Core/Container/Stack"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MenuController_1 = require("../Menu/MenuController"),
  AdviceController_1 = require("./AdviceController"),
  AdviceCreateActor_1 = require("./AdviceCreateActor"),
  AdviceData_1 = require("./AdviceData"),
  AdviceMotionActor_1 = require("./AdviceMotionActor");
class AdviceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSentenceWordMap = new Map()),
      (this.CurrentPreSentenceWordMap = new Map()),
      (this.CurrentPreSelectWordId = 0),
      (this.CurrentSelectWordId = 0),
      (this.CurrentPreSelectSentenceIndex = 0),
      (this.CurrentConjunctionId = 0),
      (this.CurrentChangeWordType = 0),
      (this.CurrentLineModel = 0),
      (this.CurrentSentenceSelectIndex = 0),
      (this.E8e = 0),
      (this.PreSelectSortTypeId = 0),
      (this.PreSelectSortWordId = 0),
      (this.CurrentSelectSortWordId = 0),
      (this.CurrentSelectSortTypeId = 0),
      (this.CurrentWordMap = new Map()),
      (this.CurrentSelectWordIndex = 0),
      (this.PreSelectExpressionId = 0),
      (this.CurrentExpressionId = 0),
      (this.CurrentSelectRoleId = 0),
      (this.PreSelectRoleId = 0),
      (this.CurrentSelectMotionId = 0),
      (this.PreSelectMotionId = 0),
      (this.PreSelectAdviceItemId = 0),
      (this.AdviceViewShowId = void 0),
      (this.y8e = new Set()),
      (this.I8e = new Map()),
      (this.T8e = void 0),
      (this.L8e = !1),
      (this.D8e = 0),
      (this.R8e = void 0),
      (this.U8e = !1),
      (this.A8e = new Stack_1.Stack()),
      (this.P8e = new Map()),
      (this.x8e = void 0);
  }
  GetAdviceCreateActor() {
    return (
      this.x8e ||
        ((this.x8e = new AdviceCreateActor_1.AdviceCreateActor()),
        this.x8e.Init()),
      this.x8e.RefreshPosition(),
      this.x8e
    );
  }
  OnAdviceCreateActorDestroy() {
    this.x8e = void 0;
  }
  GetAdviceMotionActor(e) {
    e = this.P8e.get(e);
    return e || this.A8e.Pop() || new AdviceMotionActor_1.AdviceMotionActor();
  }
  AddPlayingMotionEntity(e, t) {
    this.P8e.set(e, t);
  }
  RemovePlayingMotionEntity(e) {
    this.P8e.delete(e);
  }
  RecycleMotionActor(e) {
    this.A8e.Push(e);
  }
  RemoveMotionActor(e) {
    this.A8e.Delete(e);
  }
  PhraseAdviceData(e) {
    this.y8e.clear(),
      e.Ags.forEach((e) => {
        e = MathUtils_1.MathUtils.LongToBigInt(e);
        this.y8e.add(e);
      }),
      this.I8e.clear(),
      e.Dgs.forEach((e) => {
        var t = new AdviceData_1.AdviceData();
        t.Phrase(e), this.I8e.set(t.GetAdviceBigId(), t);
      }),
      (this.L8e = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnReceiveAdviceData,
      );
  }
  PhraseAdviceCreateData(e) {
    var t = new AdviceData_1.AdviceData();
    t.Phrase(e.Lgs),
      this.I8e.set(t.GetAdviceBigId(), t),
      (this.L8e = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCreateAdviceSuccess,
      );
  }
  OnAdviceUpdateNotify(e) {
    this.y8e.clear(),
      e.Ags.forEach((e) => {
        e = MathUtils_1.MathUtils.LongToBigInt(e);
        this.y8e.add(e);
      }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAdviceVoteNotify,
      );
  }
  OnRequestVote(e, t) {
    this.y8e.delete(e),
      t === Protocol_1.Aki.Protocol.$Bs.Proto_Up && this.y8e.add(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAdviceVoteNotify,
      );
  }
  OnAdviceVoteUpdate(e, t) {
    e = this.I8e.get(e);
    e && e.PhraseUpDownData(t.Tgs);
  }
  OnModifyAdvice(e, t) {
    var i = MathUtils_1.MathUtils.LongToBigInt(e),
      i = this.I8e.get(i);
    i && i.PhraseData(t),
      (this.L8e = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnModifyAdviceSuccess,
        e,
      );
  }
  OnDeleteAdvice(e) {
    e = MathUtils_1.MathUtils.LongToBigInt(e);
    this.I8e.delete(e),
      (this.L8e = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnDeleteAdviceSuccess,
      );
  }
  GetAdviceArray() {
    return (
      this.L8e && ((this.T8e = Array.from(this.I8e.values())), (this.L8e = !1)),
      this.T8e
    );
  }
  GetUpVoteIds() {
    return Array.from(this.y8e);
  }
  GetIfCanCreateAdvice(e) {
    var t,
      i,
      r = this.CurrentSentenceWordMap,
      n = this.CurrentConjunctionId,
      o = this.CurrentWordMap;
    for ([t, i] of r.entries())
      if ((0 !== e || 1 !== t) && 0 < i) {
        var a = o.get(t);
        if (!a || a <= 0) return !1;
      }
    return !(1 === e && (!n || n <= 0));
  }
  SetCurrentEntityId(e) {
    (this.D8e = e), (this.R8e = void 0);
    var e = EntitySystem_1.EntitySystem.Get(e);
    e && ((e = e.GetComponent(0)), (this.R8e = e.GetAdviceInfo()));
  }
  GetCurrentEntityAdviceData() {
    return this.R8e;
  }
  GetCurrentEntityId() {
    return this.D8e;
  }
  ResetWordData() {
    this.CurrentWordMap.clear(),
      this.CurrentSentenceWordMap.clear(),
      (this.CurrentConjunctionId = 0),
      (this.CurrentSelectMotionId = 0),
      (this.CurrentSelectSortWordId = 0),
      (this.CurrentSelectSortTypeId = 0),
      (this.CurrentSelectWordIndex = 0),
      (this.CurrentExpressionId = 0),
      (this.CurrentSelectRoleId = 0),
      (this.CurrentLineModel = 0),
      (this.PreSelectRoleId =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
          0,
        )?.GetRoleId() ?? 0),
      (this.CurrentSelectMotionId = 0),
      (this.PreSelectMotionId =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId());
    var e =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs(),
      t = Number(
        MathUtils_1.MathUtils.GetRandomRange(0, e.length - 1).toFixed(),
      );
    this.CurrentSentenceWordMap.set(0, e[t].Id),
      this.RandomSecondSentenceWord();
  }
  SetAdviceShowSetting(e) {
    this.U8e = e;
    e = this.U8e ? 1 : 0;
    MenuController_1.MenuController.SetTargetConfig(59, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMenuSetting,
        59,
      );
  }
  GetAdviceShowSetting() {
    return this.U8e;
  }
  GetCreateAdvicePreConditionState() {
    var e;
    return this.w8e()
      ? ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Advice", 28, "IsInInstance"),
          !1)
        : ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
          ? AdviceController_1.AdviceController.CheckIfStandAndInValidActor()
            ? !(
                (e =
                  ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
                    185,
                  )).HasTag(1996802261) ||
                (!e.HasTag(248240472) &&
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Advice", 28, "行为状态.动作状态.站立Tag"),
                  1))
              )
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Advice", 28, "CheckIfStandAndInValidActor"),
              !1)
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Advice", 28, "IsMyWorld"),
            !1)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Advice", 28, "CheckIfSystemOpen"),
        !1);
  }
  GetCreateConditionState() {
    return AdviceController_1.AdviceController.CheckBehindAdviceActor()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Advice", 28, "CheckBehindAdviceActor"),
        !1)
      : AdviceController_1.AdviceController.CheckInInValidArea()
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Advice", 28, "CheckInInValidArea"),
          !1)
        : !this.CheckIfMaxAdvice();
  }
  CheckIfMaxAdvice() {
    var e =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "AdviceCreateLimit",
      ) ?? 0;
    return (
      ModelManager_1.ModelManager.AdviceModel.GetAdviceArray().length >= e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Advice", 28, "AdviceCreateLimit"),
      !0)
    );
  }
  GetCreatePreConditionFailText() {
    var e;
    return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
      ? "CannotPutAdviceInInstanceDungeon"
      : this.w8e()
        ? ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
          ? AdviceController_1.AdviceController.CheckIfStandAndInValidActor()
            ? (e =
                ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
                  185,
                )).HasTag(1996802261)
              ? "AdviceCannotOpenOnBattle"
              : e.HasTag(248240472)
                ? "CurrentStateCannotPutAdvice"
                : "AdviceJustCanPutWhenStand"
            : "CurrentStateCannotPutAdvice"
          : "CannotPutAdviceWhenInOtherWorld"
        : "FunctionDisable";
  }
  GetCreateConditionFailText() {
    var e;
    return AdviceController_1.AdviceController.CheckBehindAdviceActor()
      ? "AdviceTooClose"
      : AdviceController_1.AdviceController.CheckInInValidArea()
        ? "AdviceAreaCannotPut"
        : ((e =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "AdviceCreateLimit",
            ) ?? 0),
          ModelManager_1.ModelManager.AdviceModel.GetAdviceArray().length >= e
            ? "OverCreateAdviceMax"
            : "CurrentStateCannotPutAdvice");
  }
  w8e() {
    return !(
      !ModelManager_1.ModelManager.FunctionModel.IsOpen(10048) ||
      !ModelManager_1.ModelManager.FunctionModel.IsOpen(10050)
    );
  }
  OnChangeSentence(e) {
    ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.set(e, 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectAdviceWord,
      );
  }
  GetMotionSelectData() {
    const t = new Array();
    var e = ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId,
      i =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId(),
      i = new AdviceData_1.AdviceMotionSelectData(i);
    return (
      t.push(i),
      0 < e &&
        ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfigsByRoleId(
          e,
        ).forEach((e) => {
          e = new AdviceData_1.AdviceMotionSelectData(e.Id);
          t.push(e);
        }),
      t
    );
  }
  GetAdviceSelectData(e) {
    var t = new Array();
    if (0 === e) {
      const i = new AdviceData_1.AdviceSelectItemData(0);
      t.push(i);
    } else {
      e = new AdviceData_1.AdviceSelectItemData(0);
      t.push(e),
        (e = new AdviceData_1.AdviceSelectItemData(1)),
        t.push(e),
        (e = new AdviceData_1.AdviceSelectItemData(2)),
        t.push(e);
    }
    let i = new AdviceData_1.AdviceSelectItemData(3);
    return (
      t.push(i),
      (i = new AdviceData_1.AdviceSelectItemData(4)),
      t.push(i),
      (i = new AdviceData_1.AdviceSelectItemData(5)),
      t.push(i),
      (i = new AdviceData_1.AdviceSelectItemData(6)),
      t.push(i),
      t
    );
  }
  RandomSecondSentenceWord() {
    var e =
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
    let t = Number(
      MathUtils_1.MathUtils.GetRandomRange(0, e.length - 1).toFixed(),
    );
    for (
      var i =
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(0);
      t === i;

    )
      t = Number(
        MathUtils_1.MathUtils.GetRandomRange(0, e.length - 1).toFixed(),
      );
    (this.E8e = t),
      ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.set(
        1,
        e[this.E8e].Id,
      );
  }
  GetFirstLineText() {
    var e = new Array(),
      t = new AdviceData_1.AdviceContentData(),
      t =
        (t.SetData(
          this.CurrentSentenceWordMap.get(0),
          this.CurrentWordMap.get(0),
          Protocol_1.Aki.Protocol.FBs.Proto_Sentence,
        ),
        e.push(t),
        new AdviceData_1.AdviceData());
    return t.PhraseShowText(e, 0), t.GetAdviceShowText();
  }
  GetSecondLineText() {
    var e = new Array();
    let t = new AdviceData_1.AdviceContentData();
    t.SetData(
      this.CurrentConjunctionId,
      0,
      Protocol_1.Aki.Protocol.FBs.Proto_Conjunction,
    ),
      e.push(t),
      (t = new AdviceData_1.AdviceContentData()).SetData(
        this.CurrentSentenceWordMap.get(1),
        this.CurrentWordMap.get(1),
        Protocol_1.Aki.Protocol.FBs.Proto_Sentence,
      ),
      e.push(t);
    var i = new AdviceData_1.AdviceData();
    return i.PhraseShowText(e, 1), i.GetAdviceShowText();
  }
  GetCurrentShowText() {
    var t = new Array();
    if (0 === this.CurrentLineModel) {
      const e = new AdviceData_1.AdviceContentData();
      e.SetData(
        this.CurrentSentenceWordMap.get(0),
        this.CurrentWordMap.get(0),
        Protocol_1.Aki.Protocol.FBs.Proto_Sentence,
      ),
        t.push(e);
    } else {
      let e = new AdviceData_1.AdviceContentData();
      e.SetData(
        this.CurrentSentenceWordMap.get(0),
        this.CurrentWordMap.get(0),
        Protocol_1.Aki.Protocol.FBs.Proto_Sentence,
      ),
        t.push(e),
        (e = new AdviceData_1.AdviceContentData()).SetData(
          this.CurrentConjunctionId,
          0,
          Protocol_1.Aki.Protocol.FBs.Proto_Conjunction,
        ),
        t.push(e),
        (e = new AdviceData_1.AdviceContentData()).SetData(
          this.CurrentSentenceWordMap.get(1),
          this.CurrentWordMap.get(1),
          Protocol_1.Aki.Protocol.FBs.Proto_Sentence,
        ),
        t.push(e);
    }
    const e = new AdviceData_1.AdviceData();
    return e.PhraseShowText(t), e.GetAdviceShowText();
  }
  GetCreateAdviceContent() {
    var e,
      t,
      i,
      r,
      n = new Array(),
      o = ModelManager_1.ModelManager.AdviceModel,
      a = o.CurrentSentenceWordMap,
      s = o.CurrentConjunctionId,
      d = o.CurrentWordMap;
    let c = 0;
    for ([e, t] of a.entries())
      t <= 0 ||
        (0 === this.CurrentLineModel && 1 === e) ||
        (0 < (r = d.get(e)) &&
          (c++,
          (i = new AdviceData_1.AdviceContentData()).SetData(
            t,
            r,
            Protocol_1.Aki.Protocol.FBs.Proto_Sentence,
          ),
          n.push(i)),
        1 === c &&
          0 !== this.CurrentLineModel &&
          0 < s &&
          ((r = new AdviceData_1.AdviceContentData()).SetData(
            s,
            0,
            Protocol_1.Aki.Protocol.FBs.Proto_Conjunction,
          ),
          n.push(r)));
    return (
      0 < o.CurrentExpressionId &&
        ((a = new AdviceData_1.AdviceContentData()).SetData(
          o.CurrentExpressionId,
          0,
          Protocol_1.Aki.Protocol.FBs.Proto_Expression,
        ),
        n.push(a)),
      0 < o.CurrentSelectMotionId &&
        ((a = new AdviceData_1.AdviceContentData()).SetData(
          o.CurrentSelectMotionId,
          0,
          Protocol_1.Aki.Protocol.FBs.y3n,
        ),
        n.push(a)),
      n
    );
  }
}
exports.AdviceModel = AdviceModel;
//# sourceMappingURL=AdviceModel.js.map
