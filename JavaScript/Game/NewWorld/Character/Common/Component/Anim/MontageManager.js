"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MontageManager = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../../Core/Container/Queue"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../CharacterNameDefines"),
  MONTAGE_BLEND_TIME = 0.5,
  LOADING_ID = -2;
class MontageManager {
  constructor() {
    (this.hJ = 1),
      (this.oRe = void 0),
      (this.sDe = void 0),
      (this.j7l = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.oj_ = void 0),
      (this.nj_ = void 0),
      (this.ej_ = void 0),
      (this.sj_ = void 0),
      (this.aj_ = void 0),
      (this.hj_ = !1),
      (this.JR1 = void 0),
      (this.lj_ = new Queue_1.Queue()),
      (this._j_ = (e, t) => {
        this.cj_.Montage_IsActive(e) ||
          (e === this.sj_ &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "BasePerform",
                26,
                "[Montage] 实体播放蒙太奇结束",
                ["pbDataId", this.sDe.PbDataId],
                ["handle", this.hJ],
                ["bInterrupted", t],
                ["path", this.aj_],
              ),
            this.cj_.OnMontageEnded.Remove(this._j_.bind(this)),
            this.uj_(t)));
      });
  }
  get cj_() {
    return this.oRe.MainAnimInstance;
  }
  Init(e) {
    (this.oRe = e),
      (this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        e.Entity.Id,
      ));
  }
  ClearObject() {
    return this.Clear(), !0;
  }
  Clear() {
    (this.oRe = void 0),
      (this.sDe = void 0),
      this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l),
      (this.j7l = ResourceSystem_1.ResourceSystem.InvalidId),
      this.oj_?.Remove(),
      (this.oj_ = void 0),
      (this.sj_ = void 0),
      (this.aj_ = void 0),
      (this.nj_ = void 0),
      (this.ej_ = void 0),
      this.lj_.Clear();
  }
  IsMontagePlaying(e) {
    return void 0 !== e
      ? this.hJ === e
      : this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId ||
          ObjectUtils_1.ObjectUtils.IsValid(this.sj_);
  }
  PlayMontage(a) {
    if (this.hj_)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BasePerform", 26, "[Montage] 播放蒙太奇嵌套"),
        -1
      );
    this.hj_ = !0;
    let r = void 0,
      o = void 0;
    this.sj_ &&
      ((a.MontagePath !== this.aj_ && a.MontageAsset !== this.sj_) ||
        ((e = this.cj_.Montage_GetCurrentSection(this.sj_)),
        (o = this.sj_),
        a.InSectionToStartMontageAt
          ? e.op_Equality(a.InSectionToStartMontageAt) &&
            (r = this.cj_.Montage_GetPosition(this.sj_))
          : e.op_Equality(
              CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
            ) || (r = this.cj_.Montage_GetPosition(this.sj_))),
      (this.JR1 = this.sj_)),
      this.uj_();
    const n = this.hJ;
    if (
      (a.OnStartCallback?.(n),
      (this.ej_ = a.OnEndCallback),
      (this.nj_ = a.OnPlayCallback),
      StringUtils_1.StringUtils.IsEmpty(a.MontagePath) &&
        !ObjectUtils_1.ObjectUtils.IsValid(a.MontageAsset))
    ) {
      for (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BasePerform",
            26,
            "[Montage] 实体播放蒙太奇路径和资产都为空",
            ["pbDataId", this.sDe.PbDataId],
          ),
          this.uj_(),
          this.hj_ = !1;
        !this.lj_.Empty;

      )
        this.lj_.Pop()?.();
      return -1;
    }
    this.aj_ =
      a.MontagePath ?? UE.KismetSystemLibrary.GetPathName(a.MontageAsset);
    var e = (e) => {
      if (
        ((this.j7l = ResourceSystem_1.ResourceSystem.InvalidId),
        this.JR1 && this.cj_.Montage_Stop(MONTAGE_BLEND_TIME, this.JR1),
        e && ObjectUtils_1.ObjectUtils.IsValid(e) && this.dj_(e))
      ) {
        this.sj_ = e;
        let t = r;
        if (void 0 === t && a.InSectionToStartMontageAt) {
          var i = e.CompositeSections,
            s = i.Num();
          for (let e = 0; e < s; e++) {
            var h = i.Get(e);
            if (h.SectionName.op_Equality(a.InSectionToStartMontageAt)) {
              t = h.SegmentBeginTime;
              break;
            }
          }
          void 0 === t &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BasePerform",
              26,
              "[Montage] PlayMontage找不到片段",
              ["montage", e.GetName()],
              ["section", a.InSectionToStartMontageAt],
            );
        }
        this.cj_.Montage_Play(this.sj_, void 0, void 0, t, !a.KeepOtherMontage),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BasePerform",
              26,
              "[Montage] 实体播放蒙太奇",
              ["pbDataId", this.sDe.PbDataId],
              ["handle", n],
              ["startTime", t],
              ["isLoop", a.IsLoop],
              ["path", this.aj_],
            ),
          this.mj_(a.Duration),
          this.fj_(a.IsLoop),
          o || this.cj_.OnMontageEnded.Add(this._j_.bind(this)),
          this.nj_?.(this.sj_);
      } else this.uj_();
    };
    for (
      a.MontageAsset || o
        ? e(a.MontageAsset ?? o)
        : ((this.j7l = LOADING_ID),
          (e = ResourceSystem_1.ResourceSystem.LoadAsync(
            a.MontagePath,
            UE.AnimMontage,
            e,
          )),
          this.j7l === LOADING_ID && (this.j7l = e)),
        this.hj_ = !1;
      !this.lj_.Empty;

    )
      this.lj_.Pop()?.();
    return n === this.hJ ? n : -1;
  }
  StopMontage(e) {
    if ((void 0 === e.HandleId || this.hJ === e.HandleId) && this.aj_) {
      if (e.Montage) {
        if (this.sj_ !== e.Montage) return;
        if (UE.KismetSystemLibrary.GetPathName(e.Montage) !== this.aj_) return;
      }
      var t = e.Delay ?? 0;
      if (t > TimerSystem_1.MIN_TIME && t < TimerSystem_1.MAX_TIME)
        this.mj_(t, e.Method, t);
      else if (this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId)
        this.uj_();
      else {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "BasePerform",
            26,
            "[Montage] 实体停止蒙太奇",
            ["id", this.sDe.PbDataId],
            ["handle", this.hJ],
            ["method", e.Method],
            ["path", this.aj_],
          );
        var s = this.sj_.CompositeSections,
          h = s.Num();
        let t = !1,
          i = !1;
        for (let e = 0; e < h; e++) {
          var a = s.Get(e);
          !i &&
            a.SectionName.op_Equality(
              CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME,
            ) &&
            (i = !0),
            !t &&
              a.SectionName.op_Equality(
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              ) &&
              (t = !0);
        }
        var r,
          o = e.BlendOutTime ?? MONTAGE_BLEND_TIME;
        switch (e.Method ?? 0) {
          case 0:
            this.cj_.Montage_Stop(o, this.sj_);
            break;
          case 1:
            t
              ? (this.cj_.Montage_SetNextSection(
                  CharacterNameDefines_1.CharacterNameDefines.START_SECTION,
                  CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                  this.sj_,
                ),
                this.cj_.Montage_SetNextSection(
                  CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                  CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                  this.sj_,
                ))
              : i
                ? this.cj_.Montage_SetNextSection(
                    CharacterNameDefines_1.CharacterNameDefines
                      .DEFAULT_SECTION_NAME,
                    CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION,
                    this.sj_,
                  )
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "BasePerform",
                      26,
                      "[Montage] 蒙太奇既没有Default也没有End片段，直接混出",
                      ["pbDataId", this.sDe.PbDataId],
                      ["path", this.aj_],
                    ),
                  this.cj_.Montage_Stop(o, this.sj_));
            break;
          case 4:
            t
              ? this.cj_.Montage_SetNextSection(
                  CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                  CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                  this.sj_,
                )
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "BasePerform",
                    26,
                    "[Montage] 蒙太奇没有End片段，直接混出",
                    ["pbDataId", this.sDe.PbDataId],
                    ["path", this.aj_],
                  ),
                this.cj_.Montage_Stop(o, this.sj_));
            break;
          case 2:
            t
              ? this.cj_.Montage_JumpToSection(
                  CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                  this.sj_,
                )
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "BasePerform",
                    26,
                    "[Montage] 蒙太奇没有End片段，直接混出",
                    ["pbDataId", this.sDe.PbDataId],
                    ["path", this.aj_],
                  ),
                this.cj_.Montage_Stop(o, this.sj_));
            break;
          case 3:
            t
              ? ((r = this.cj_.Montage_GetPosition(this.sj_)),
                o < (r = this.sj_.SequenceLength - r) &&
                  this.cj_.Montage_SetPlayRate(this.sj_, r / o),
                this.oRe.MainAnimInstance.Montage_SetNextSection(
                  CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                  CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                  this.sj_,
                ))
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "BasePerform",
                    26,
                    "[Montage] 蒙太奇没有End片段，直接混出",
                    ["pbDataId", this.sDe.PbDataId],
                    ["path", this.aj_],
                  ),
                this.cj_.Montage_Stop(o, this.sj_));
        }
        e.ImmediatelyCallback && this.uj_();
      }
    }
  }
  ClearCallback(e) {
    (void 0 !== e && this.hJ !== e) ||
      ((this.nj_ = void 0), (this.ej_ = void 0));
  }
  mj_(e = 0, t = 2, i) {
    this.oj_?.Remove(),
      (this.oj_ = void 0),
      e > TimerSystem_1.MIN_TIME &&
        e < TimerSystem_1.MAX_TIME &&
        (this.oj_ = TimerSystem_1.TimerSystem.Delay(() => {
          (this.oj_ = void 0), this.StopMontage({ Method: t, BlendOutTime: i });
        }, e));
  }
  fj_(e) {
    if (void 0 !== e) {
      let t = !1,
        i = !1;
      for (let e = 0; e < this.sj_.CompositeSections.Num(); e++) {
        var s = this.sj_.CompositeSections.Get(e);
        if (
          s.SectionName.op_Equality(
            CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
          )
        ) {
          t = !0;
          break;
        }
        if (
          s.SectionName.op_Equality(
            CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME,
          )
        ) {
          i = !0;
          break;
        }
      }
      t || i
        ? e
          ? t
            ? this.cj_.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                this.sj_,
              )
            : i &&
              this.cj_.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines
                  .DEFAULT_SECTION_NAME,
                CharacterNameDefines_1.CharacterNameDefines
                  .DEFAULT_SECTION_NAME,
                this.sj_,
              )
          : t
            ? this.cj_.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                this.sj_,
              )
            : i &&
              this.cj_.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines
                  .DEFAULT_SECTION_NAME,
                CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION,
                this.sj_,
              )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BasePerform",
            26,
            "[Montage] 蒙太奇片段不合法",
            ["montage", this.sj_.GetName()],
            ["pbDataId", this.sDe.PbDataId],
          );
    }
  }
  uj_(e = !0) {
    const t = this.hJ,
      i =
        (this.hJ++,
        this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId &&
          ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l),
        this.sj_),
      s =
        ((this.j7l = ResourceSystem_1.ResourceSystem.InvalidId),
        this.oj_?.Remove(),
        (this.oj_ = void 0),
        (this.sj_ = void 0),
        (this.aj_ = void 0),
        this.nj_),
      h = this.ej_;
    (this.nj_ = void 0),
      (this.ej_ = void 0),
      i ||
        (this.hj_
          ? this.lj_.Push(() => {
              s?.(void 0);
            })
          : s?.(void 0)),
      this.hj_
        ? this.lj_.Push(() => {
            h?.(i, e),
              EventSystem_1.EventSystem.EmitWithTarget(
                this.sDe,
                EventDefine_1.EEventName.PerformMontageStop,
                t,
              );
          })
        : (h?.(i, e),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.sDe,
            EventDefine_1.EEventName.PerformMontageStop,
            t,
          ));
  }
  dj_(t) {
    var i = t.SlotAnimTracks,
      s = i.Num();
    for (let e = 0; e < s; e++)
      if (
        !i
          .Get(e)
          .SlotName.op_Equality(
            CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SLOT,
          )
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BasePerform",
              26,
              "[Montage] 非DefaultSlot蒙太奇",
              ["montage", t.GetName()],
              ["pbDataId", this.sDe.PbDataId],
            ),
          !1
        );
    return !0;
  }
}
exports.MontageManager = MontageManager;
//# sourceMappingURL=MontageManager.js.map
