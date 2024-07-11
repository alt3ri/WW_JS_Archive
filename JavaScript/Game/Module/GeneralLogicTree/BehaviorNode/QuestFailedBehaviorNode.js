"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestFailedBehaviorNode = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  BehaviorNodeBase_1 = require("./BehaviorNodeBase"),
  TICK_INTERVAL_TIME = 500,
  STALK_FAILED_DELAY_TIME = 1e3;
class QuestFailedBehaviorNode extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor(e) {
    super(e),
      (this.D$t = void 0),
      (this.ae = -0),
      (this.Cfe = -0),
      (this.CanGiveUp = void 0),
      (this.R$t = void 0),
      (this.U$t = !1),
      (this.IRe = void 0),
      (this.A$t = !1),
      (this.P$t = void 0),
      (this.dya = void 0),
      (this.GiveUpText = void 0),
      (this.x$t = []),
      (this.pct = !1),
      (this.r6 = () => {
        var e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
        (e < this.ae || e >= this.Cfe) && this.w$t();
      }),
      (this.Zpe = (e) => {
        var t;
        this.B$t(!e),
          e !== this.R$t &&
            this.BtType !== Protocol_1.Aki.Protocol.tps.Proto_BtTypeInvalid &&
            ((this.R$t = e) ||
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnSneakFoundChange,
                this.R$t,
                0,
              ),
            (t =
              ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
                this.TreeIncId,
              )),
            (t = Protocol_1.Aki.Protocol.fJn.create({
              n9n: t,
              s9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
              L5n: this.NodeId,
              a9n: e,
            })),
            Net_1.Net.Call(10379, t, (e) => {
              switch (e.DEs) {
                case Protocol_1.Aki.Protocol.O4n.NRs:
                case Protocol_1.Aki.Protocol.O4n.Proto_ErrNotInSneak:
                case Protocol_1.Aki.Protocol.O4n.Proto_ErrBehaviorTreeNotFound:
                  break;
                default:
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.DEs,
                    8916,
                  );
              }
            }));
      }),
      (this.vYe = (e) => {
        var e = EntitySystem_1.EntitySystem.Get(e);
        e?.Valid &&
          ((e = e.GetComponent(0).GetPbDataId()), this.x$t.includes(e)) &&
          TimerSystem_1.TimerSystem.Delay(() => {
            this.pct ||
              ((this.pct = !0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnStalkFailed,
              ),
              this.b$t());
          }, STALK_FAILED_DELAY_TIME);
      }),
      (this.b$t = () => {
        var e =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
              this.TreeIncId,
            ),
          e = Protocol_1.Aki.Protocol.RJn.create({
            n9n: e,
            s9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
            L5n: this.NodeId,
          });
        Net_1.Net.Call(3255, e, (e) => {
          e.DEs !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.DEs,
              8940,
            );
        });
      }),
      (this.w$t = () => {
        var e;
        this.U$t ||
          ((this.U$t = !0),
          this.BtType !== Protocol_1.Aki.Protocol.tps.Proto_BtTypeInvalid &&
            ((e =
              ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
                this.TreeIncId,
              )),
            (e = Protocol_1.Aki.Protocol._Jn.create({
              n9n: e,
              s9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
              L5n: this.NodeId,
            })),
            Net_1.Net.Call(25031, e, (e) => {
              e.DEs !== Protocol_1.Aki.Protocol.O4n.NRs &&
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.DEs,
                  14806,
                );
            })));
      }),
      (this.NodeType = "QuestFailed");
  }
  get NeedSecondaryConfirm() {
    return this.P$t;
  }
  get NowTransitionType() {
    return this.dya;
  }
  OnCreate(e) {
    return !(
      !e ||
      "QuestFailed" !== e.Type ||
      ((this.P$t = e.FailedCondition?.FailedTeleport?.IsConfirm),
      (this.dya = e.FailedCondition?.FailedTeleport?.TransitionOption?.Type),
      (this.D$t = e.FailedCondition?.TimeRange),
      this.D$t &&
        (this.q$t(),
        (this.IRe = TimerSystem_1.TimerSystem.Forever(
          this.r6,
          TICK_INTERVAL_TIME,
        ))),
      e.FailedCondition?.SneakPlayCondition && this.G$t(),
      e.FailedCondition?.EntityAlert?.EntityIds &&
        0 < e.FailedCondition?.EntityAlert?.EntityIds.length &&
        ((this.x$t = e.FailedCondition.EntityAlert.EntityIds), this.N$t()),
      (this.CanGiveUp = e.FailedCondition?.CanGiveUp),
      (this.GiveUpText = e.FailedCondition?.TidGiveUpText),
      (this.U$t = !1))
    );
  }
  OnNodeDeActive(e) {
    TimerSystem_1.TimerSystem.Has(this.IRe) &&
      TimerSystem_1.TimerSystem.Remove(this.IRe),
      this.A$t && this.B$t(!1),
      this.O$t(),
      this.k$t(),
      super.OnNodeDeActive(e);
  }
  q$t() {
    (this.ae =
      this.D$t.StartTime.Hours * TimeUtil_1.TimeUtil.Hour +
      this.D$t.StartTime.Minutes * TimeUtil_1.TimeUtil.Minute),
      (this.Cfe =
        this.D$t.EndTime.Hours * TimeUtil_1.TimeUtil.Hour +
        this.D$t.EndTime.Minutes * TimeUtil_1.TimeUtil.Minute);
  }
  G$t() {
    var e;
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBattleStateChanged,
      this.Zpe,
    ),
      this.B$t(!0),
      (this.A$t = !0),
      Net_1.Net.Register(29380, (e) => {
        e = Number(MathUtils_1.MathUtils.LongToBigInt(e.sps));
        (this.R$t = 0 !== e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSneakFoundChange,
            this.R$t,
            e,
          );
      }),
      this.BtType !== Protocol_1.Aki.Protocol.tps.Proto_BtTypeInvalid &&
        (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakStart),
        (e =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
            this.TreeIncId,
          )),
        (e = Protocol_1.Aki.Protocol.pJn.create({
          n9n: e,
          s9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
        })),
        Net_1.Net.Call(15969, e, (e) => {
          e.DEs !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.DEs,
              27983,
            );
        }));
  }
  O$t() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakEnd),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
        ),
      this.A$t && (Net_1.Net.UnRegister(29380), (this.A$t = !1));
  }
  N$t() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnStalkFound,
      this.vYe,
    );
  }
  k$t() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnStalkFound,
      this.vYe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStalkFound,
        this.vYe,
      );
  }
  B$t(e) {
    var t =
      Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(159);
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
  IsFadeInScreen() {
    return this.dya === IAction_1.ETeleportTransitionType.FadeInScreen;
  }
}
exports.QuestFailedBehaviorNode = QuestFailedBehaviorNode;
//# sourceMappingURL=QuestFailedBehaviorNode.js.map
