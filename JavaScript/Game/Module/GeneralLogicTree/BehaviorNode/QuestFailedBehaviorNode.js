"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestFailedBehaviorNode = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const BehaviorNodeBase_1 = require("./BehaviorNodeBase");
const TICK_INTERVAL_TIME = 500;
const STALK_FAILED_DELAY_TIME = 1e3;
class QuestFailedBehaviorNode extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor(e) {
    super(e),
      (this.DXt = void 0),
      (this.ae = -0),
      (this.Cfe = -0),
      (this.CanGiveUp = void 0),
      (this.RXt = void 0),
      (this.UXt = !1),
      (this.IRe = void 0),
      (this.AXt = !1),
      (this.PXt = void 0),
      (this.GiveUpText = void 0),
      (this.xXt = []),
      (this.iut = !1),
      (this.r6 = () => {
        const e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
        (e < this.ae || e >= this.Cfe) && this.wXt();
      }),
      (this.Zpe = (e) => {
        let t;
        this.BXt(!e),
          e !== this.RXt &&
            this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid &&
            ((this.RXt = e) ||
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnSneakFoundChange,
                this.RXt,
                0,
              ),
            (t =
              ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
                this.TreeIncId,
              )),
            (t = Protocol_1.Aki.Protocol.yKn.create({
              T5n: t,
              L5n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
              Jkn: this.NodeId,
              D5n: e,
            })),
            Net_1.Net.Call(13483, t, (e) => {
              switch (e.uvs) {
                case Protocol_1.Aki.Protocol.lkn.Sys:
                case Protocol_1.Aki.Protocol.lkn.Proto_ErrNotInSneak:
                case Protocol_1.Aki.Protocol.lkn.Proto_ErrBehaviorTreeNotFound:
                  break;
                default:
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.uvs,
                    13776,
                  );
              }
            }));
      }),
      (this.a$e = (e) => {
        var e = EntitySystem_1.EntitySystem.Get(e);
        e?.Valid &&
          ((e = e.GetComponent(0).GetPbDataId()), this.xXt.includes(e)) &&
          TimerSystem_1.TimerSystem.Delay(() => {
            this.iut ||
              ((this.iut = !0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnStalkFailed,
              ),
              this.bXt());
          }, STALK_FAILED_DELAY_TIME);
      }),
      (this.bXt = () => {
        var e =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
            this.TreeIncId,
          );
        var e = Protocol_1.Aki.Protocol.xKn.create({
          T5n: e,
          L5n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
          Jkn: this.NodeId,
        });
        Net_1.Net.Call(18784, e, (e) => {
          e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.uvs,
              7359,
            );
        });
      }),
      (this.wXt = () => {
        let e;
        this.UXt ||
          ((this.UXt = !0),
          this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid &&
            ((e =
              ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
                this.TreeIncId,
              )),
            (e = Protocol_1.Aki.Protocol.gKn.create({
              T5n: e,
              L5n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
              Jkn: this.NodeId,
            })),
            Net_1.Net.Call(15815, e, (e) => {
              e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.uvs,
                  10737,
                );
            })));
      }),
      (this.NodeType = "QuestFailed");
  }
  get NeedSecondaryConfirm() {
    return this.PXt;
  }
  OnCreate(e) {
    return !(
      !e ||
      e.Type !== "QuestFailed" ||
      ((this.PXt = e.FailedCondition?.FailedTeleport?.IsConfirm),
      (this.DXt = e.FailedCondition?.TimeRange),
      this.DXt &&
        (this.qXt(),
        (this.IRe = TimerSystem_1.TimerSystem.Forever(
          this.r6,
          TICK_INTERVAL_TIME,
        ))),
      e.FailedCondition?.SneakPlayCondition && this.GXt(),
      e.FailedCondition?.EntityAlert?.EntityIds &&
        e.FailedCondition?.EntityAlert?.EntityIds.length > 0 &&
        ((this.xXt = e.FailedCondition.EntityAlert.EntityIds), this.NXt()),
      (this.CanGiveUp = e.FailedCondition?.CanGiveUp),
      (this.GiveUpText = e.FailedCondition?.TidGiveUpText),
      (this.UXt = !1))
    );
  }
  OnNodeDeActive(e) {
    TimerSystem_1.TimerSystem.Has(this.IRe) &&
      TimerSystem_1.TimerSystem.Remove(this.IRe),
      this.AXt && this.BXt(!1),
      this.OXt(),
      this.kXt(),
      super.OnNodeDeActive(e);
  }
  qXt() {
    (this.ae =
      this.DXt.StartTime.Hours * TimeUtil_1.TimeUtil.Hour +
      this.DXt.StartTime.Minutes * TimeUtil_1.TimeUtil.Minute),
      (this.Cfe =
        this.DXt.EndTime.Hours * TimeUtil_1.TimeUtil.Hour +
        this.DXt.EndTime.Minutes * TimeUtil_1.TimeUtil.Minute);
  }
  GXt() {
    let e;
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBattleStateChanged,
      this.Zpe,
    ),
      this.BXt(!0),
      (this.AXt = !0),
      Net_1.Net.Register(16339, (e) => {
        e = Number(MathUtils_1.MathUtils.LongToBigInt(e.jCs));
        (this.RXt = e !== 0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSneakFoundChange,
            this.RXt,
            e,
          );
      }),
      this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid &&
        (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakStart),
        (e =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
            this.TreeIncId,
          )),
        (e = Protocol_1.Aki.Protocol.TKn.create({
          T5n: e,
          L5n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
        })),
        Net_1.Net.Call(10374, e, (e) => {
          e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.uvs,
              24487,
            );
        }));
  }
  OXt() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakEnd),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
        ),
      this.AXt && (Net_1.Net.UnRegister(16339), (this.AXt = !1));
  }
  NXt() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnStalkFound,
      this.a$e,
    );
  }
  kXt() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnStalkFound,
      this.a$e,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStalkFound,
        this.a$e,
      );
  }
  BXt(e) {
    const t =
      Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(157);
    t?.Valid &&
      (e
        ? t.AddBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, {
            InstigatorId: t.CreatureDataId,
            Reason: "QuestFailedBehaviorNode",
          })
        : t.RemoveBuff(
            CharacterBuffIds_1.buffId.StealthIgnoreHateBuff,
            -1,
            "QuestFailedBehaviorNode",
          ));
  }
}
exports.QuestFailedBehaviorNode = QuestFailedBehaviorNode;
// # sourceMappingURL=QuestFailedBehaviorNode.js.map
