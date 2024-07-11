"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Stack_1 = require("../../../Core/Container/Stack");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const MenuController_1 = require("../Menu/MenuController");
const AdviceController_1 = require("./AdviceController");
const AdviceCreateActor_1 = require("./AdviceCreateActor");
const AdviceData_1 = require("./AdviceData");
const AdviceMotionActor_1 = require("./AdviceMotionActor");
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
        const t = new AdviceData_1.AdviceData();
        t.Phrase(e), this.I8e.set(t.GetAdviceBigId(), t);
      }),
      (this.L8e = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnReceiveAdviceData,
      );
  }
  PhraseAdviceCreateData(e) {
    const t = new AdviceData_1.AdviceData();
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
    var i = MathUtils_1.MathUtils.LongToBigInt(e);
    var i = this.I8e.get(i);
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
    let t;
    let i;
    const r = this.CurrentSentenceWordMap;
    const n = this.CurrentConjunctionId;
    const o = this.CurrentWordMap;
    for ([t, i] of r.entries())
      if ((e !== 0 || t !== 1) && i > 0) {
        const a = o.get(t);
        if (!a || a <= 0) return !1;
      }
    return !(e === 1 && (!n || n <= 0));
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
    const e =
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
    const t = Number(
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
    let e;
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
    const e =
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
    let e;
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
    let e;
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
    const e = ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId;
    var i =
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId();
    var i = new AdviceData_1.AdviceMotionSelectData(i);
    return (
      t.push(i),
      e > 0 &&
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
    const t = new Array();
    if (e === 0) {
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
    const e =
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
    let t = Number(
      MathUtils_1.MathUtils.GetRandomRange(0, e.length - 1).toFixed(),
    );
    for (
      let i =
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
    const e = new Array();
    var t = new AdviceData_1.AdviceContentData();
    var t =
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
    const e = new Array();
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
    const i = new AdviceData_1.AdviceData();
    return i.PhraseShowText(e, 1), i.GetAdviceShowText();
  }
  GetCurrentShowText() {
    const t = new Array();
    if (this.CurrentLineModel === 0) {
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
    let e;
    let t;
    let i;
    let r;
    const n = new Array();
    const o = ModelManager_1.ModelManager.AdviceModel;
    let a = o.CurrentSentenceWordMap;
    const s = o.CurrentConjunctionId;
    const d = o.CurrentWordMap;
    let c = 0;
    for ([e, t] of a.entries())
      t <= 0 ||
        (this.CurrentLineModel === 0 && e === 1) ||
        ((r = d.get(e)) > 0 &&
          (c++,
          (i = new AdviceData_1.AdviceContentData()).SetData(
            t,
            r,
            Protocol_1.Aki.Protocol.FBs.Proto_Sentence,
          ),
          n.push(i)),
        c === 1 &&
          this.CurrentLineModel !== 0 &&
          s > 0 &&
          ((r = new AdviceData_1.AdviceContentData()).SetData(
            s,
            0,
            Protocol_1.Aki.Protocol.FBs.Proto_Conjunction,
          ),
          n.push(r)));
    return (
      o.CurrentExpressionId > 0 &&
        ((a = new AdviceData_1.AdviceContentData()).SetData(
          o.CurrentExpressionId,
          0,
          Protocol_1.Aki.Protocol.FBs.Proto_Expression,
        ),
        n.push(a)),
      o.CurrentSelectMotionId > 0 &&
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
// # sourceMappingURL=AdviceModel.js.map
