"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformSystemUiState = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
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
      (this.ser = void 0),
      (this.Wer = IComponent_1.ENpcUiInteractType.AntiqueShop),
      (this.Ker = void 0),
      (this.Qer = []),
      (this.mWo = !1),
      (this.dWo = void 0),
      (this.gvo = 0),
      (this.Xer = -0),
      (this.$er = -0),
      (this.Yer = -0),
      (this.Jer = -0),
      (this.ConfigId = 0),
      (this.zer = ""),
      (this.Zer = void 0),
      (this.etr = void 0),
      (this.ttr = void 0),
      (this.itr = void 0),
      (this.otr = ""),
      (this.rtr = void 0),
      (this.ntr = ""),
      (this.ShopSuccessMontage = void 0),
      (this.str = ""),
      (this.VDn = ""),
      (this.Wqn = !1),
      (this.atr = new Map()),
      (this.UKe = (t) => {
        this.dWo
          ? this.dWo === t &&
            ((this.mWo = !0),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OpenView,
              this.UKe,
            ),
            this.itr?.IsValid()) &&
            (this.Wer === IComponent_1.ENpcUiInteractType.AntiqueShop ||
            this.Wer === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop
              ? this.ser.Play(this.itr)
              : this.ser.PlayOnce(this.itr))
          : EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OpenView,
              this.UKe,
            );
      }),
      (this.$Ge = (t) => {
        this.dWo
          ? this.dWo === t && (this.htr(), this.StateMachine.Switch(1))
          : this.kre();
      }),
      (this.ltr = (t) => {
        this.dWo &&
          ((this.itr = t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[NpcPerformSystemUiState]当打开界面时,播放进入界面的动作 EnterMontage",
              ["EntityId", this.Owner.Id],
              ["ViewName", this.dWo],
            ),
          this.mWo) &&
          this.ser.Play(this.itr);
      }),
      (this._tr = (t) => {
        this.dWo && (this.rtr = t);
      }),
      (this.utr = (t) => {
        this.dWo && (this.ShopSuccessMontage = t);
      }),
      (this.xmi = (t, e) => {
        this.dWo &&
          t === this.gvo &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[NpcPerformSystemUiState]当购买成功时播放提交成功动作 ShopSuccessMontage",
              ["EntityId", this.Owner.Id],
            ),
          this.ctr(this.etr, this.dWo, !0),
          this.mtr());
      }),
      (this.dtr = () => {
        this.dWo &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品成功时,播放提交成功剧情 EnterFlow,播放提交成功动作 ShopSuccessMontage",
              ["EntityId", this.Owner.Id],
              ["FlowId", this.Zer?.FlowId],
            ),
          this.ctr(this.etr, this.dWo, !0),
          this.mtr());
      }),
      (this.Ctr = () => {
        this.dWo &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品失败时,播放提交物品失败剧情 ShopFailedFlow",
              ["EntityId", this.Owner.Id],
              ["FlowId", this.ttr?.FlowId],
            ),
          this.ctr(this.ttr, this.dWo, !0));
      }),
      (this.YBi = () => {
        this.Wer !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
        this.Wer !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品升级成功时,Npc类型不是ChengXiaoShanShop或AntiqueShop,播放失败",
              ["NpcUiInteractType", this.Wer],
            )
          : StringUtils_1.StringUtils.IsEmpty(this.str) || "Empty" === this.otr
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "NPC",
                  8,
                  "[CollectionItemDisplay]当提交物品升级成功时,UpgradeSequencePath为空或者StandByMontagePath为“Empth”,播放失败",
                  ["NpcUiInteractType", this.Wer],
                ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
              ))
            : (this.Ker ||
                (this.Ker = new NpcPerformSequence_1.NpcPerformSequence()),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "NPC",
                  8,
                  "[CollectionItemDisplay]当提交物品升级成功时,开始加载对应Sequence",
                  ["NpcUiInteractType", this.Wer],
                  ["UpgradeSequencePath", this.str],
                ),
              this.Ker.Load(this.str, () => {
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    8,
                    "[CollectionItemDisplay]当提交物品升级成功时,开始播放对应Sequence",
                    ["NpcUiInteractType", this.Wer],
                    ["FinishDeliverySequence", this.str],
                    ["ShowNpcWhilePlayingSequence", this.Wqn],
                  ),
                  this.Wqn || this.gtr(),
                  this.Ker.Play(() => {
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "NPC",
                        8,
                        "[CollectionItemDisplay]当提交物品升级成功时,Sequence播放完成",
                        ["NpcUiInteractType", this.Wer],
                        ["FinishDeliverySequence", this.str],
                      ),
                      this.ser?.PlayFromLoop(this.itr),
                      this.SetNpcAndChildEnable(),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName
                          .OnAntiqueShopUpgradeSequenceFinished,
                      );
                  });
              }));
      }),
      (this.HDn = () => {
        if (
          this.Wer !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
          this.Wer !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop
        )
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]当提交物品等级升至满级时,Npc类型不是ChengXiaoShanShop,播放失败",
              ["NpcUiInteractType", this.Wer],
            );
        else {
          let t = this.str;
          this.Wer === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop &&
            (t = this.VDn),
            StringUtils_1.StringUtils.IsEmpty(t) || "Empty" === this.otr
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    8,
                    "[CollectionItemDisplay]当提交物品等级升至满级时,FinishDeliverySequence为空或者StandByMontagePath为“Empth”,播放失败",
                    ["NpcUiInteractType", this.Wer],
                    ["FinishDeliverySequence", t],
                    ["StandByMontagePath", this.otr],
                  ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
                ))
              : (this.Ker ||
                  (this.Ker = new NpcPerformSequence_1.NpcPerformSequence()),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    8,
                    "[CollectionItemDisplay]当提交物品等级升至满级时,开始加载对应Sequence",
                    ["NpcUiInteractType", this.Wer],
                    ["FinishDeliverySequence", t],
                    ["ShowNpcWhilePlayingSequence", this.Wqn],
                  ),
                this.Ker.Load(t, () => {
                  this.Wqn || this.gtr(),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "NPC",
                        8,
                        "[CollectionItemDisplay]当提交物品等级升至满级时,开始播放对应Sequence",
                        ["NpcUiInteractType", this.Wer],
                        ["FinishDeliverySequence", t],
                      ),
                    this.Ker.Play(() => {
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "NPC",
                          8,
                          "[CollectionItemDisplay]当提交物品等级升至满级时,Sequence播放完成",
                          ["NpcUiInteractType", this.Wer],
                          ["FinishDeliverySequence", t],
                        ),
                        this.ser?.PlayFromLoop(this.itr),
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
  get NpcMontageController() {
    return this.ser;
  }
  set NpcMontageController(t) {
    this.ser = t;
  }
  get SystemUiViewName() {
    return this.dWo;
  }
  set SystemUiViewName(t) {
    this.dWo = t;
  }
  get BoardId() {
    return this.gvo;
  }
  set BoardId(t) {
    this.gvo = t;
  }
  OnCreate(t) {
    if (t?.ShowOnUiInteract) {
      switch (((this.Wer = t.ShowOnUiInteract.Type), t.ShowOnUiInteract.Type)) {
        case IComponent_1.ENpcUiInteractType.Shop:
          (this.zer = t.ShowOnUiInteract.EnterMontage),
            (this.Zer = t.ShowOnUiInteract.EnterFlow),
            (this.etr = t.ShowOnUiInteract.ShopSuccessFlow),
            (this.ttr = t.ShowOnUiInteract.ShopFailedFlow),
            (this.otr = t.ShowOnUiInteract.StandByMontage),
            (this.ntr = t.ShowOnUiInteract.ShopSuccessMontage),
            (this.Wqn = !1);
          break;
        case IComponent_1.ENpcUiInteractType.AntiqueShop:
          (this.zer = t.ShowOnUiInteract.EnterMontage),
            (this.Zer = t.ShowOnUiInteract.EnterFlow),
            (this.etr = t.ShowOnUiInteract.ShopSuccessFlow),
            (this.ttr = t.ShowOnUiInteract.ShopFailedFlow),
            (this.otr = t.ShowOnUiInteract.StandByMontage),
            (this.ntr = t.ShowOnUiInteract.ShopSuccessMontage),
            (this.str = t.ShowOnUiInteract.UpgradeSequence),
            (this.Wqn = !1);
          break;
        case IComponent_1.ENpcUiInteractType.ChengXiaoShanShop:
          (this.zer = t.ShowOnUiInteract.EnterMontage),
            (this.Zer = t.ShowOnUiInteract.EnterFlow),
            (this.etr = t.ShowOnUiInteract.ShopSuccessFlow),
            (this.ttr = t.ShowOnUiInteract.ShopFailedFlow),
            (this.otr = t.ShowOnUiInteract.StandByMontage),
            (this.ntr = t.ShowOnUiInteract.ShopSuccessMontage),
            (this.str = t.ShowOnUiInteract.UpgradeSequence),
            (this.VDn = t.ShowOnUiInteract.FinishDeliverySequence),
            (this.Wqn = t.ShowOnUiInteract.ShowNpcWhilePlayingSequence ?? !1);
      }
      (this.ConfigId = this.Owner.Entity.GetComponent(0).GetPbDataId()),
        this.atr.set("MingSuView", 3);
    }
  }
  OnEnter(t) {
    this.dWo &&
      ((this.itr = void 0),
      (this.rtr = void 0),
      (this.ShopSuccessMontage = void 0),
      UiManager_1.UiManager.IsViewShow(this.dWo)
        ? (this.mWo = !0)
        : ((this.mWo = !1),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OpenView,
            this.UKe,
          )),
      this.Ore(),
      this.ftr(!0),
      StringUtils_1.StringUtils.IsEmpty(this.zer) ||
        "Empty" === this.zer ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.zer,
          UE.AnimMontage,
          this.ltr,
        ),
      StringUtils_1.StringUtils.IsEmpty(this.otr) ||
        "Empty" === this.otr ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.otr,
          UE.AnimMontage,
          this._tr,
        ),
      StringUtils_1.StringUtils.IsEmpty(this.ntr) ||
        "Empty" === this.ntr ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.ntr,
          UE.AnimMontage,
          this.utr,
        ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          8,
          "[NpcPerformSystemUiState]当打开界面时,播放进入界面的D级剧情 EnterFlow",
          ["EntityId", this.Owner.Id],
          ["ViewName", this.dWo],
          ["FlowId", this.Zer?.FlowId],
        ),
      this.ctr(this.Zer, this.dWo, !1),
      (this.$er = Time_1.Time.WorldTimeSeconds),
      (this.Xer = STAND_BY_MONTAGE_CD),
      (this.Jer = Time_1.Time.WorldTimeSeconds),
      (this.Yer = 0));
  }
  OnUpdate(t) {
    (this.Wer !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
      this.Wer !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) ||
      this.ptr();
  }
  OnExit(t) {
    this.ftr(!1), this.SetNpcAndChildEnable();
  }
  OnDestroy() {
    this.Ker && (this.Ker.Destroy(), (this.Ker = void 0)),
      (this.ser = void 0),
      (this.Qer.length = 0);
  }
  htr() {
    (this.Wer !== IComponent_1.ENpcUiInteractType.AntiqueShop &&
      this.Wer !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) ||
      !this.itr ||
      this.ser.PlayFromEnd(this.itr),
      this.SetNpcAndChildEnable(),
      (this.mWo = !1),
      (this.dWo = void 0),
      (this.itr = void 0),
      (this.rtr = void 0),
      (this.ShopSuccessMontage = void 0),
      (this.$er = 0),
      (this.Xer = 0),
      (this.Yer = 0),
      (this.Jer = 0),
      this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BoughtItem,
        this.xmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemSuccess,
        this.dtr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemFail,
        this.Ctr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemLevelUp,
        this.YBi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubmitItemLevelMax,
        this.HDn,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseView,
      this.$Ge,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BoughtItem,
        this.xmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemSuccess,
        this.dtr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemFail,
        this.Ctr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemLevelUp,
        this.YBi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubmitItemLevelMax,
        this.HDn,
      );
  }
  gtr() {
    if (this.Ker) {
      const s = this.Owner.Entity.Disable("播放Sequence隐藏Npc");
      this.Qer.push({ HandleId: s, EntityHandle: this.Owner });
      var t = this.Owner?.Entity.GetComponent(0);
      if (t?.Valid) {
        t = t.GetBaseInfo().ChildEntityIds;
        if (t && !(t.length < 1)) {
          var e = ModelManager_1.ModelManager.CreatureModel;
          for (const h of t) {
            var i = e.GetEntityByPbDataId(h);
            if (i?.Valid) {
              const s = i.Entity.Disable("播放Sequence隐藏子实体");
              this.Qer.push({ HandleId: s, EntityHandle: i });
            }
          }
        }
      }
    }
  }
  ftr(t) {
    var e = this.Owner?.Entity?.GetComponent(1);
    e?.SkeletalMesh?.IsValid() && (e.SkeletalMesh.ForcedLodModel = t ? 1 : 0);
  }
  SetNpcAndChildEnable() {
    for (const t of this.Qer)
      t.EntityHandle.Entity.Enable(
        t.HandleId,
        "NpcPerformSystemUiState.SetNpcAndChildEnable",
      );
    this.Qer.length = 0;
  }
  ctr(t, e, i) {
    t &&
      ((e = { ViewName: e, Position: this.atr.get(e) ?? 2, TextWidth: 700 }),
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
        t.FlowListName,
        t.FlowId,
        t.StateId,
        e,
        i,
      ));
  }
  ptr() {
    this.rtr &&
      this.$er &&
      Time_1.Time.WorldTimeSeconds > this.$er + this.Xer &&
      (this.ser.PlayOnce(this.rtr),
      (this.$er = Time_1.Time.WorldTimeSeconds),
      (this.Xer = this.rtr.SequenceLength + STAND_BY_MONTAGE_CD));
  }
  mtr() {
    this.ShopSuccessMontage &&
      this.mWo &&
      Time_1.Time.WorldTimeSeconds > this.Jer + this.Yer &&
      (this.ser.PlayOnce(this.ShopSuccessMontage),
      (this.Jer = Time_1.Time.WorldTimeSeconds),
      (this.Yer = this.ShopSuccessMontage.SequenceLength),
      (this.$er = Time_1.Time.WorldTimeSeconds),
      (this.Xer =
        this.ShopSuccessMontage.SequenceLength + STAND_BY_MONTAGE_CD));
  }
}
exports.NpcPerformSystemUiState = NpcPerformSystemUiState;
//# sourceMappingURL=NpcPerformSystemUiState.js.map
