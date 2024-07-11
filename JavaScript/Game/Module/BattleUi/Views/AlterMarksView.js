"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlterMarksView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  SneakController_1 = require("../../../World/Controller/SneakController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  AlterMark_1 = require("./AlterMark"),
  AlterTime_1 = require("./AlterTime"),
  AlterTipMark_1 = require("./AlterTipMark"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  EavesdropMark_1 = require("./EavesdropMark"),
  StalkAlertMark_1 = require("./StalkAlertMark");
class AlterMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.bXe = new Map()),
      (this.qXe = new Map()),
      (this.GXe = new Map()),
      (this.lqn = new Map()),
      (this.NXe = new Map()),
      (this.OXe = !1),
      (this.kXe = 0),
      (this.FXe = 0),
      (this.VXe = 0),
      (this.HXe = void 0),
      (this.jXe = void 0),
      (this.WXe = void 0),
      (this.KXe = void 0),
      (this.QXe = !1),
      (this.XXe = (t, e, i) => {
        this.bXe.has(t) ||
          (this.NXe.has(t)
            ? 1 === this.NXe.get(t).Type && this.NXe.delete(t)
            : this.NXe.set(t, { Type: 0, OriginPosition: e, TrackActor: i }));
      }),
      (this.$Xe = (t) => {
        var e = this.bXe.get(t),
          i = this.NXe.has(t);
        (e || i) &&
          (i
            ? this.NXe.delete(t)
            : e &&
              this.NXe.set(t, {
                Type: 1,
                OriginPosition: void 0,
                TrackActor: void 0,
              }));
      }),
      (this.YXe = (t, e) => {
        this.GXe.has(t) ||
          ((e = new StalkAlertMark_1.StalkAlertMark(
            this.RootItem,
            e,
          )).InitEntityId(t),
          this.GXe.set(t, e));
      }),
      (this.JXe = (t) => {
        var e = this.GXe.get(t);
        e && (e.Destroy(), this.GXe.delete(t));
      }),
      (this._qn = (t, e) => {
        this.lqn.has(t) ||
          ((e = new EavesdropMark_1.EavesdropMark(e, t)).Initialize(
            UiLayer_1.UiLayer.WorldSpaceUiRootItem,
          ),
          this.lqn.set(t, e));
      }),
      (this.uqn = (t) => {
        var e = this.lqn.get(t);
        e && (e.Destroy(), this.lqn.delete(t));
      }),
      (this.cqn = (t) => {
        for (var [e, i] of this.lqn)
          e === t ? i.PlayFoundSeq() : i.PlayEndSeq();
      }),
      (this.zXe = (t, e) => {
        if (t) {
          this.OXe || this.ZXe();
          for (var [, i] of this.bXe) i.Destroy();
          for (var [, s] of this.GXe) s.Destroy();
          this.bXe.clear(),
            this.GXe.clear(),
            (this.OXe = !0),
            (this.kXe = e),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnChildQuestNodeFinish,
              this.Uxe,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnChildQuestNodeFinish,
                this.Uxe,
              );
        } else this.QXe || this.e$e(), (this.OXe = !1);
        this.jXe.SetUiActive(this.OXe), this.Zpe(t);
      }),
      (this.Uxe = () => {
        this.t$e();
      }),
      (this.lne = (t, e) => {
        this.HXe?.SetUIActive(e);
      }),
      (this.xie = () => {
        var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        this.i$e(t), this.KXe && this.o$e(t.EntityHandle);
      }),
      (this.r$e = () => {
        this.SetActive(!0);
      }),
      (this.n$e = () => {
        this.SetActive(!1);
      }),
      (this.Zpe = (t) => {
        for (var [, e] of this.qXe) e.Destroy();
        if ((this.qXe.clear(), t)) {
          if (this.OXe) {
            this.KXe
              ? (t =
                  ModelManager_1.ModelManager.SceneTeamModel
                    .GetCurrentEntity) !== this.KXe && this.o$e(t)
              : ((this.KXe =
                  ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
                EventSystem_1.EventSystem.AddWithTarget(
                  this.KXe.Entity,
                  EventDefine_1.EEventName.AiHateAddOrRemove,
                  this.s$e,
                ));
            for (const s of this.KXe.Entity.CheckGetComponent(
              158,
            ).GetAggroSet()) {
              var i =
                ModelManager_1.ModelManager.CreatureModel.GetEntityById(
                  s,
                ).Entity.CheckGetComponent(1).Owner;
              this.qXe.has(s) ||
                ((i = new AlterTipMark_1.AlterTipMark(this.RootItem, i, !0)),
                this.qXe.set(s, i),
                i.ChangeToError());
            }
          }
        } else
          this.KXe &&
            (EventSystem_1.EventSystem.RemoveWithTarget(
              this.KXe.Entity,
              EventDefine_1.EEventName.AiHateAddOrRemove,
              this.s$e,
            ),
            (this.KXe = void 0));
      }),
      (this.s$e = (t, e) => {
        var i = e.CharActorComp.Owner,
          e = e.CharActorComp.Entity.Id;
        !this.qXe.has(e) &&
          t &&
          this.OXe &&
          ((t = new AlterTipMark_1.AlterTipMark(this.RootItem, i, !0)),
          this.qXe.set(e, t),
          t.ChangeToError());
      }),
      (this.a$e = (t) => {
        t = this.GXe.get(t);
        t &&
          (t.SetAlertIcon(
            "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComIconSign.SP_ComIconSign",
          ),
          t.StopUpdateAlertValue(),
          t.ActivateAlertEffect());
      }),
      (this.h$e = () => {
        for (var [, t] of this.GXe) t.Destroy();
        this.GXe.clear();
      });
  }
  Initialize(t, e) {
    super.Initialize(t),
      this.e$e(),
      this.l$e(),
      this.mqn(),
      this.ProcessPendingMarkInfo(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSneakFoundChange,
        this.zXe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SneakStart,
        this.r$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SneakEnd,
        this.n$e,
      ),
      (ModelManager_1.ModelManager.AlertMarkModel.AlertMarkInit = !0);
    CommonParamById_1.configCommonParamById.GetBoolConfig("ShowSneakMask") &&
      ((t = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD)),
      LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
        "UiItem_Sneakzhezhao",
        t,
      ).then(
        (t) => {
          (this.HXe = t.GetComponentByClass(UE.UIItem.StaticClass())),
            this.HXe.SetHierarchyIndex(0),
            this.HXe.SetUIActive(!1);
        },
        () => {},
      )),
      (this.jXe = new AlterTime_1.AlterTime()),
      this.jXe.CreateByResourceIdAsync("UiItem_Sneakshijian", this.RootItem);
    t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    this.i$e(t), this.SetActive(!1);
  }
  i$e(t) {
    this.WXe && this.WXe.EndTask();
    t = t?.GameplayTagComponent;
    t
      ? (this.WXe = t.ListenForTagAddOrRemove(
          2019420593,
          this.lne,
          AlterMarksView._$e,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 32, "获取当前角色BaseTagComponent失败");
  }
  Reset() {
    super.Reset(),
      this.ZXe(),
      this.u$e(),
      this.dqn(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSneakFoundChange,
        this.zXe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SneakStart,
        this.r$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SneakEnd,
        this.n$e,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChildQuestNodeFinish,
        this.Uxe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChildQuestNodeFinish,
          this.Uxe,
        ),
      this.KXe &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.KXe.Entity,
          EventDefine_1.EEventName.AiHateAddOrRemove,
          this.s$e,
        ),
        (this.KXe = void 0));
    for (var [, t] of this.bXe) t.Destroy();
    this.bXe.clear();
    for (var [, e] of this.GXe) e.Destroy();
    this.GXe.clear();
  }
  Update(t) {
    this.c$e();
    for (var [, e] of this.bXe) e.Update();
    for (var [, i] of this.qXe) i.Update();
    for (var [, s] of this.lqn) s.Update();
    for (var [, n] of this.GXe) n.CheckShowUiCondition() && n.Update();
    this.OXe &&
      ((this.VXe =
        TimeUtil_1.TimeUtil.GetServerTimeStamp() /
        TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.FXe =
        (this.kXe - this.VXe) * TimeUtil_1.TimeUtil.InverseMillisecond),
      this.FXe < 0 ? this.t$e() : this.jXe.SetCountdownText(this.FXe));
  }
  c$e() {
    for (var [t, e] of this.NXe) {
      var i;
      0 === e.Type
        ? ((i = new AlterMark_1.AlterMark(
            this.RootItem,
            e.OriginPosition || Vector_1.Vector.Create(),
            e.TrackActor,
          )),
          this.bXe.set(t, i),
          this.YXe(t, e.TrackActor))
        : ((i = this.bXe.get(t)) && (i.Destroy(), this.bXe.delete(t)),
          this.JXe(t));
    }
    this.NXe.clear();
  }
  t$e() {
    this.OXe && ((this.OXe = !1), this.jXe.SetUiActive(this.OXe));
  }
  mqn() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AddEavesdropMark,
      this._qn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEavesdropMark,
        this.uqn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEavesdropFound,
        this.cqn,
      );
  }
  dqn() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddEavesdropMark,
      this._qn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEavesdropMark,
        this.uqn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEavesdropFound,
        this.cqn,
      );
  }
  l$e() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AddStalkAlertMark,
      this.YXe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveStalkAlertMark,
        this.JXe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStalkFound,
        this.a$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStalkFailed,
        this.h$e,
      );
  }
  u$e() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddStalkAlertMark,
      this.YXe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveStalkAlertMark,
        this.JXe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStalkFound,
        this.a$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStalkFailed,
        this.h$e,
      );
  }
  e$e() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AddAlterMark,
      this.XXe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveAlterMark,
        this.$Xe,
      ),
      (this.QXe = !0);
  }
  ZXe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddAlterMark,
      this.XXe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveAlterMark,
        this.$Xe,
      ),
      (this.QXe = !1);
  }
  o$e(t) {
    EventSystem_1.EventSystem.HasWithTarget(
      this.KXe.Entity,
      EventDefine_1.EEventName.AiHateAddOrRemove,
      this.s$e,
    ) &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.KXe.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.s$e,
      ),
      (this.KXe = t),
      EventSystem_1.EventSystem.AddWithTarget(
        this.KXe.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.s$e,
      ));
  }
  ProcessPendingMarkInfo() {
    if (
      0 !== ModelManager_1.ModelManager.AlertMarkModel.PendingMarkInfos.size
    ) {
      for (var [t, [e, i]] of ModelManager_1.ModelManager.AlertMarkModel
        .PendingMarkInfos)
        switch (i) {
          case 2:
            this.YXe(t, e);
            break;
          case 3:
            this._qn(t, e);
        }
      ModelManager_1.ModelManager.AlertMarkModel?.PendingMarkInfos.clear();
    }
  }
  OnBattleHudVisibleChanged(t) {
    SneakController_1.SneakController.IsSneaking && this.SetActive(t);
  }
}
(exports.AlterMarksView = AlterMarksView)._$e = void 0;
//# sourceMappingURL=AlterMarksView.js.map
