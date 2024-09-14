"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformSystemUiState = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  NpcPerformSequence_1 = require("./NpcPerformSequence/NpcPerformSequence"),
  STAND_BY_MONTAGE_CD = 20;
class NpcPerformSystemUiState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.Htr = IComponent_1.ENpcUiInteractType.AntiqueShop),
      (this.jtr = void 0),
      (this.Wtr = []),
      (this._Ko = !1),
      (this.uKo = void 0),
      (this.mMo = 0),
      (this.Ktr = -0),
      (this.Qtr = -0),
      (this.Xtr = -0),
      (this.$tr = -0),
      (this.ConfigId = 0),
      (this.Ytr = ""),
      (this.Jtr = void 0),
      (this.ztr = void 0),
      (this.Ztr = void 0),
      (this.eir = void 0),
      (this.tir = ""),
      (this.iir = void 0),
      (this.oir = ""),
      (this.ShopSuccessMontage = void 0),
      (this.rir = ""),
      (this.$Un = ""),
      (this.oNn = !1),
      (this._va = void 0),
      (this.uva = void 0),
      (this.rHs = 0),
      (this.oHs = 0),
      (this.nir = new Map()),
      (this.FQe = (t) => {
        this.uKo
          ? this.uKo === t &&
            ((this._Ko = !0),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OpenView,
              this.FQe,
            ),
            this.eir?.IsValid()) &&
            (this.Htr === IComponent_1.ENpcUiInteractType.AntiqueShop ||
            this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop
              ? this._va.Play(this.eir)
              : this._va.PlayOnce(this.eir))
          : EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OpenView,
              this.FQe,
            );
      }),
      (this.$Ge = (t) => {
        this.uKo
          ? this.uKo === t && (this.sir(), this.StateMachine.Switch(1))
          : this.kre();
      }),
      (this.air = (t, i) => {
        this.uKo &&
          ((this.eir = t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[NpcPerformSystemUiState]当打开界面时,播放进入界面的动作 EnterMontage",
              ["EntityId", this.Owner.Id],
              ["ViewName", this.uKo],
            ),
          this._Ko) &&
          this._va.Play(this.eir);
      }),
      (this.hir = (t, i) => {
        this.uKo && (this.iir = t);
      }),
      (this.lir = (t, i) => {
        this.uKo && (this.ShopSuccessMontage = t);
      }),
      (this.xdi = (t, i) => {
        this.uKo &&
          t === this.mMo &&
          ((t = ModelManager_1.ModelManager.PlotModel).IsInPlot &&
          "LevelD" === t.PlotConfig.PlotLevel
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "NPC",
                8,
                "[NpcPerformSystemUiState]当前正在播放D级剧情，不会再播放购买成功的D级剧情",
                ["EntityId", this.Owner.Id],
              )
            : (t = Time_1.Time.WorldTime) < this.oHs
              ? Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "NPC",
                  8,
                  "[NpcPerformSystemUiState]处于冷却间隔中，无法再次播放购买成功D级剧情",
                  ["worldTime", t],
                  ["CanPlayBuySuccessTimeStamp", this.oHs],
                  ["BuySuccessNpcDialogueTimeInterval", this.rHs],
                )
              : ((this.oHs = t + this.rHs),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    8,
                    "[NpcPerformSystemUiState]当购买成功时播放提交成功动作 ShopSuccessMontage",
                    ["EntityId", this.Owner.Id],
                    ["worldTime", t],
                    ["BuySuccessNpcDialogueTimeInterval", this.rHs],
                    ["CanPlayBuySuccessTimeStamp", this.oHs],
                  ),
                this._ir(this.ztr, this.uKo, !0),
                this.uir()));
      }),
      (this.cir = () => {
        this.uKo &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品成功时,播放提交成功剧情 EnterFlow,播放提交成功动作 ShopSuccessMontage",
              ["EntityId", this.Owner.Id],
              ["FlowId", this.Jtr?.FlowId],
            ),
          this._ir(this.ztr, this.uKo, !0),
          this.uir());
      }),
      (this.mir = () => {
        this.uKo &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品失败时,播放提交物品失败剧情 ShopFailedFlow",
              ["EntityId", this.Owner.Id],
              ["FlowId", this.Ztr?.FlowId],
            ),
          this._ir(this.Ztr, this.uKo, !0));
      }),
      (this.Ybi = () => {
        this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
        this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品升级成功时,Npc类型不是ChengXiaoShanShop或AntiqueShop,播放失败",
              ["NpcUiInteractType", this.Htr],
            )
          : StringUtils_1.StringUtils.IsEmpty(this.rir) || "Empty" === this.tir
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "NPC",
                  8,
                  "[CollectionItemDisplay]当提交物品升级成功时,UpgradeSequencePath为空或者StandByMontagePath为“Empth”,播放失败",
                  ["NpcUiInteractType", this.Htr],
                ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
              ))
            : (this.jtr ||
                (this.jtr = new NpcPerformSequence_1.NpcPerformSequence()),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "NPC",
                  8,
                  "[CollectionItemDisplay]当提交物品升级成功时,开始加载对应Sequence",
                  ["NpcUiInteractType", this.Htr],
                  ["UpgradeSequencePath", this.rir],
                ),
              this.jtr.Load(this.rir, () => {
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    8,
                    "[CollectionItemDisplay]当提交物品升级成功时,开始播放对应Sequence",
                    ["NpcUiInteractType", this.Htr],
                    ["FinishDeliverySequence", this.rir],
                    ["ShowNpcWhilePlayingSequence", this.oNn],
                  ),
                  this.oNn || this.Cir(),
                  this.jtr.Play(() => {
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "NPC",
                        8,
                        "[CollectionItemDisplay]当提交物品升级成功时,Sequence播放完成",
                        ["NpcUiInteractType", this.Htr],
                        ["FinishDeliverySequence", this.rir],
                      ),
                      this._va?.PlayFromLoop(this.eir),
                      this.SetNpcAndChildEnable(),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName
                          .OnAntiqueShopUpgradeSequenceFinished,
                      );
                  });
              }));
      }),
      (this.YUn = () => {
        if (
          this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
          this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop
        )
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品等级升至满级时,Npc类型不是ChengXiaoShanShop,播放失败",
              ["NpcUiInteractType", this.Htr],
            );
        else {
          let t = this.rir;
          this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop &&
            (t = this.$Un),
            StringUtils_1.StringUtils.IsEmpty(t) || "Empty" === this.tir
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    8,
                    "[CollectionItemDisplay]当提交物品等级升至满级时,FinishDeliverySequence为空或者StandByMontagePath为“Empth”,播放失败",
                    ["NpcUiInteractType", this.Htr],
                    ["FinishDeliverySequence", t],
                    ["StandByMontagePath", this.tir],
                  ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
                ))
              : (this.jtr ||
                  (this.jtr = new NpcPerformSequence_1.NpcPerformSequence()),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    8,
                    "[CollectionItemDisplay]当提交物品等级升至满级时,开始加载对应Sequence",
                    ["NpcUiInteractType", this.Htr],
                    ["FinishDeliverySequence", t],
                    ["ShowNpcWhilePlayingSequence", this.oNn],
                  ),
                this.jtr.Load(t, () => {
                  this.oNn || this.Cir(),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "NPC",
                        8,
                        "[CollectionItemDisplay]当提交物品等级升至满级时,开始播放对应Sequence",
                        ["NpcUiInteractType", this.Htr],
                        ["FinishDeliverySequence", t],
                      ),
                    this.jtr.Play(() => {
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "NPC",
                          8,
                          "[CollectionItemDisplay]当提交物品等级升至满级时,Sequence播放完成",
                          ["NpcUiInteractType", this.Htr],
                          ["FinishDeliverySequence", t],
                        ),
                        this._va?.PlayFromLoop(this.eir),
                        this.SetNpcAndChildEnable(),
                        EventSystem_1.EventSystem.Emit(
                          EventDefine_1.EEventName
                            .OnAntiqueShopLevelMaxSequenceFinished,
                        );
                    });
                }));
        }
      });
  }
  get SystemUiViewName() {
    return this.uKo;
  }
  set SystemUiViewName(t) {
    this.uKo = t;
  }
  get BoardId() {
    return this.mMo;
  }
  set BoardId(t) {
    this.mMo = t;
  }
  OnCreate(t) {
    if (t?.ShowOnUiInteract) {
      switch (((this.Htr = t.ShowOnUiInteract.Type), t.ShowOnUiInteract.Type)) {
        case IComponent_1.ENpcUiInteractType.Shop:
          (this.Ytr = t.ShowOnUiInteract.EnterMontage),
            (this.Jtr = t.ShowOnUiInteract.EnterFlow),
            (this.ztr = t.ShowOnUiInteract.ShopSuccessFlow),
            (this.Ztr = t.ShowOnUiInteract.ShopFailedFlow),
            (this.tir = t.ShowOnUiInteract.StandByMontage),
            (this.oir = t.ShowOnUiInteract.ShopSuccessMontage),
            (this.oNn = !1);
          break;
        case IComponent_1.ENpcUiInteractType.AntiqueShop:
          (this.Ytr = t.ShowOnUiInteract.EnterMontage),
            (this.Jtr = t.ShowOnUiInteract.EnterFlow),
            (this.ztr = t.ShowOnUiInteract.ShopSuccessFlow),
            (this.Ztr = t.ShowOnUiInteract.ShopFailedFlow),
            (this.tir = t.ShowOnUiInteract.StandByMontage),
            (this.oir = t.ShowOnUiInteract.ShopSuccessMontage),
            (this.rir = t.ShowOnUiInteract.UpgradeSequence),
            (this.oNn = !1);
          break;
        case IComponent_1.ENpcUiInteractType.ChengXiaoShanShop:
          (this.Ytr = t.ShowOnUiInteract.EnterMontage),
            (this.Jtr = t.ShowOnUiInteract.EnterFlow),
            (this.ztr = t.ShowOnUiInteract.ShopSuccessFlow),
            (this.Ztr = t.ShowOnUiInteract.ShopFailedFlow),
            (this.tir = t.ShowOnUiInteract.StandByMontage),
            (this.oir = t.ShowOnUiInteract.ShopSuccessMontage),
            (this.rir = t.ShowOnUiInteract.UpgradeSequence),
            (this.$Un = t.ShowOnUiInteract.FinishDeliverySequence),
            (this.oNn = t.ShowOnUiInteract.ShowNpcWhilePlayingSequence ?? !1);
      }
      (this.ConfigId = this.Owner.Entity.GetComponent(0).GetPbDataId()),
        this.nir.set("MingSuView", 3);
    }
  }
  OnEnter(t) {
    this.uKo &&
      ((this._va = this.Owner?.Entity?.GetComponent(171)),
      (this.eir = void 0),
      (this.iir = void 0),
      (this.ShopSuccessMontage = void 0),
      (this.rHs =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "BuySuccessNpcDialogueTimeInterval",
        ) ?? 0),
      UiManager_1.UiManager.IsViewShow(this.uKo)
        ? (this._Ko = !0)
        : ((this._Ko = !1),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OpenView,
            this.FQe,
          )),
      this.Ore(),
      this.gir(!0),
      StringUtils_1.StringUtils.IsEmpty(this.Ytr) ||
        "Empty" === this.Ytr ||
        (this.uva = this._va?.LoadAsync(this.Ytr, this.air)),
      StringUtils_1.StringUtils.IsEmpty(this.tir) ||
        "Empty" === this.tir ||
        this._va?.LoadAsync(this.tir, this.hir),
      StringUtils_1.StringUtils.IsEmpty(this.oir) ||
        "Empty" === this.oir ||
        this._va?.LoadAsync(this.oir, this.lir),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          8,
          "[NpcPerformSystemUiState]当打开界面时,播放进入界面的D级剧情 EnterFlow",
          ["EntityId", this.Owner.Id],
          ["ViewName", this.uKo],
          ["FlowId", this.Jtr?.FlowId],
        ),
      this._ir(this.Jtr, this.uKo, !1),
      (this.Qtr = Time_1.Time.WorldTimeSeconds),
      (this.Ktr = STAND_BY_MONTAGE_CD),
      (this.$tr = Time_1.Time.WorldTimeSeconds),
      (this.Xtr = 0));
  }
  OnUpdate(t) {
    this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
      this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop &&
      this.fir();
  }
  OnExit(t) {
    this.gir(!1), this.SetNpcAndChildEnable();
  }
  CanChangeFrom(t) {
    return 8 !== t;
  }
  OnDestroy() {
    this.jtr && (this.jtr.Destroy(), (this.jtr = void 0)),
      (this.uva = void 0),
      (this._va = void 0),
      (this.Wtr.length = 0);
  }
  sir() {
    (this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
      this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) ||
      !this.eir ||
      this._va.PlayFromEnd(this.eir),
      this.SetNpcAndChildEnable(),
      (this._Ko = !1),
      (this.uKo = void 0),
      (this.eir = void 0),
      (this.iir = void 0),
      (this.ShopSuccessMontage = void 0),
      (this.Qtr = 0),
      (this.Ktr = 0),
      (this.Xtr = 0),
      (this.$tr = 0),
      this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BoughtItem,
        this.xdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemSuccess,
        this.cir,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemFail,
        this.mir,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemLevelUp,
        this.Ybi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemLevelMax,
        this.YUn,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseView,
      this.$Ge,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BoughtItem,
        this.xdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemSuccess,
        this.cir,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemFail,
        this.mir,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemLevelUp,
        this.Ybi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemLevelMax,
        this.YUn,
      );
  }
  Cir() {
    if (this.jtr) {
      const s = this.Owner.Entity.Disable("播放Sequence隐藏Npc");
      this.Wtr.push({ HandleId: s, EntityHandle: this.Owner });
      var t = this.Owner?.Entity.GetComponent(0);
      if (t?.Valid) {
        t = t.GetBaseInfo().ChildEntityIds;
        if (t && !(t.length < 1)) {
          var i = ModelManager_1.ModelManager.CreatureModel;
          for (const h of t) {
            var e = i.GetEntityByPbDataId(h);
            if (e?.Valid) {
              const s = e.Entity.Disable("播放Sequence隐藏子实体");
              this.Wtr.push({ HandleId: s, EntityHandle: e });
            }
          }
        }
      }
    }
  }
  gir(t) {
    var i = this.Owner?.Entity?.GetComponent(1);
    i?.SkeletalMesh?.IsValid() && (i.SkeletalMesh.ForcedLodModel = t ? 1 : 0);
  }
  SetNpcAndChildEnable() {
    for (const t of this.Wtr)
      t.EntityHandle.Entity.Enable(
        t.HandleId,
        "NpcPerformSystemUiState.SetNpcAndChildEnable",
      );
    this.Wtr.length = 0;
  }
  _ir(t, i, e) {
    t &&
      ((i = { ViewName: i, Position: this.nir.get(i) ?? 2, TextWidth: 700 }),
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
        t.FlowListName,
        t.FlowId,
        t.StateId,
        i,
        e,
      ));
  }
  fir() {
    this.iir &&
      this.Qtr &&
      Time_1.Time.WorldTimeSeconds > this.Qtr + this.Ktr &&
      (this._va.PlayOnce(this.iir),
      (this.Qtr = Time_1.Time.WorldTimeSeconds),
      (this.Ktr = this.iir.SequenceLength + STAND_BY_MONTAGE_CD));
  }
  uir() {
    (void 0 !== this.uva && this._va && !this._va.IsPlayingMontage(this.uva)) ||
      (this.ShopSuccessMontage &&
        this._Ko &&
        Time_1.Time.WorldTimeSeconds > this.$tr + this.Xtr &&
        (this._va.PlayOnce(this.ShopSuccessMontage),
        (this.$tr = Time_1.Time.WorldTimeSeconds),
        (this.Xtr = this.ShopSuccessMontage.SequenceLength),
        (this.Qtr = Time_1.Time.WorldTimeSeconds),
        (this.Ktr =
          this.ShopSuccessMontage.SequenceLength + STAND_BY_MONTAGE_CD)));
  }
}
exports.NpcPerformSystemUiState = NpcPerformSystemUiState;
//# sourceMappingURL=NpcPerformSystemUiState.js.map
