"use strict";
var CharacterCustomValueComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, r) {
      var a,
        n = arguments.length,
        i =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, o))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(t, e, o, r);
      else
        for (var u = t.length - 1; 0 <= u; u--)
          (a = t[u]) &&
            (i = (n < 3 ? a(i) : 3 < n ? a(e, o, i) : a(e, o)) || i);
      return 3 < n && i && Object.defineProperty(e, o, i), i;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterCustomValueComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ConditionFormula_1 = require("../../../../Utils/Trigger/ConditionFormula");
let CharacterCustomValueComponent =
  (CharacterCustomValueComponent_1 = class CharacterCustomValueComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.H4_ = void 0),
        (this.nK_ = new Map()),
        (this.$4_ = (t, e) => {
          if (t) {
            this.H4_ = t;
            t = new Array();
            DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(
              this.H4_,
              t,
            );
            for (const a of t) {
              var o,
                r = a[0];
              void 0 === r
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Battle",
                    20,
                    "[自定义值]配置错误 key是空的",
                    ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                  )
                : void 0 === (o = a[1])
                  ? Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Battle",
                      20,
                      "[自定义值]配置错误 value是空的",
                      ["Key", r],
                      ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                    )
                  : (this.nK_.set(r, o),
                    0 === o.NumSource && 0 === o.ReturnType
                      ? this.Yre.set(r, o.NumberValue.Get(0))
                      : 0 === o.VecSource && 1 === o.ReturnType
                        ? this.Yre.set(
                            r,
                            Vector_1.Vector.Create(o.VectorValue.Get(0)),
                          )
                        : 0 === o.RotSource &&
                          2 === o.ReturnType &&
                          this.Yre.set(
                            r,
                            Rotator_1.Rotator.Create(o.RotatorValue.Get(0)),
                          ));
            }
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                20,
                "[自定义值]加载配置完成，设置固定值",
                ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                ["固定值", this.Yre],
              );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                20,
                "[自定义值]DT_CharacterFightInfo中的路径配置的表路径找不到资源",
                ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                ["Path", e],
              );
        }),
        (this.Yre = new Map());
    }
    OnStart() {
      var t = this.Entity.GetComponent(3),
        t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          t.Actor.GetClass(),
        ),
        t = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t),
        t =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            t,
          )?.CustomParamTable?.ToAssetPathName();
      return (
        t
          ? (ResourceSystem_1.ResourceSystem.LoadAsync(
              t,
              UE.DataTable,
              this.$4_,
            ),
            this.W4_())
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              20,
              "[自定义值]DT_CharacterFightInfo中的路径配置的表路径为空",
              ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
            ),
        !0
      );
    }
    W4_() {
      0 < CharacterCustomValueComponent_1.Q4_.size ||
        (CharacterCustomValueComponent_1.Q4_.set("MClamp", (t, e, o) =>
          MathCommon_1.MathCommon.Clamp(t, e, o),
        ),
        CharacterCustomValueComponent_1.Q4_.set("MMax", (...t) =>
          Math.max(...t),
        ),
        CharacterCustomValueComponent_1.Q4_.set("MMin", (...t) =>
          Math.min(...t),
        ),
        CharacterCustomValueComponent_1.Q4_.set("VAdd", (t, e) => {
          var o = Vector_1.Vector.Create();
          return t.Addition(e, o), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VSub", (t, e) => {
          var o = Vector_1.Vector.Create();
          return t.Subtraction(e, o), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VMulti", (t, e) => {
          var o = Vector_1.Vector.Create();
          return t.Multiply(e, o), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VDiv", (t, e) => {
          var o = Vector_1.Vector.Create();
          return t.Division(e, o), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VDotProduct", (t, e) =>
          Vector_1.Vector.DotProduct(t, e),
        ),
        CharacterCustomValueComponent_1.Q4_.set("VCrossProduct", (t, e) => {
          var o = Vector_1.Vector.Create();
          return Vector_1.Vector.CrossProduct(t, e, o), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VNormal", (t) => {
          var e = Vector_1.Vector.Create();
          return t.GetSafeNormal(e), e;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VDist", (t, e) =>
          Vector_1.Vector.Dist(t, e),
        ),
        CharacterCustomValueComponent_1.Q4_.set("VDistXY", (t, e) =>
          Vector_1.Vector.DistXY(t, e),
        ),
        CharacterCustomValueComponent_1.Q4_.set("VDistSquared", (t, e) =>
          Vector_1.Vector.DistSquared(t, e),
        ),
        CharacterCustomValueComponent_1.Q4_.set("VDistSquaredXY", (t, e) =>
          Vector_1.Vector.DistSquaredXY(t, e),
        ),
        CharacterCustomValueComponent_1.Q4_.set(
          "VGetClampedToSize",
          (t, e, o) => {
            var r = Vector_1.Vector.Create();
            return t.GetClampedToSize(e, o, r), r;
          },
        ),
        CharacterCustomValueComponent_1.Q4_.set(
          "VGetClampedToSize2D",
          (t, e, o) => {
            var r = Vector_1.Vector.Create();
            return t.GetClampedToSize2D(e, o, r), r;
          },
        ),
        CharacterCustomValueComponent_1.Q4_.set("VMax", (t) => t.GetMax()),
        CharacterCustomValueComponent_1.Q4_.set("VMin", (t) => t.GetMin()),
        CharacterCustomValueComponent_1.Q4_.set("VAbsMax", (t) =>
          t.GetAbsMax(),
        ),
        CharacterCustomValueComponent_1.Q4_.set("VAbsMin", (t) =>
          t.GetAbsMin(),
        ),
        CharacterCustomValueComponent_1.Q4_.set("VRotation", (t) => {
          var e = Rotator_1.Rotator.Create();
          return t.Rotation(e), e;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VSetX", (t, e) => {
          t = Vector_1.Vector.Create(t);
          return (t.X = e), t;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VSetY", (t, e) => {
          t = Vector_1.Vector.Create(t);
          return (t.Y = e), t;
        }),
        CharacterCustomValueComponent_1.Q4_.set("VSetZ", (t, e) => {
          t = Vector_1.Vector.Create(t);
          return (t.Z = e), t;
        }),
        CharacterCustomValueComponent_1.Q4_.set(
          "VRotateAngleAxis",
          (t, e, o) => {
            var r = Vector_1.Vector.Create();
            return t.RotateAngleAxis(e, o, r), r;
          },
        ),
        CharacterCustomValueComponent_1.Q4_.set("RAdd", (t, e) => {
          var o = Rotator_1.Rotator.Create();
          return o.FromUeRotator(t), o.AdditionEqual(e), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("RSub", (t, e) => {
          var o = Rotator_1.Rotator.Create();
          return o.FromUeRotator(t), o.SubtractionEqual(e), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("RMulti", (t, e) => {
          var o = Rotator_1.Rotator.Create();
          return o.FromUeRotator(t), o.MultiplyEqual(e), o;
        }),
        CharacterCustomValueComponent_1.Q4_.set("RVector", (t) => {
          var e = Vector_1.Vector.Create();
          return t.Vector(e), e;
        }),
        CharacterCustomValueComponent_1.Q4_.set(
          "IsNull",
          (t) => void 0 === this.Yre.get(t),
        ));
    }
    GetBlackboard(t, e = void 0) {
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        var o = this.nK_.get(t);
        if (!o)
          return void 0 !== e
            ? e
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Battle",
                  20,
                  "[自定义值]AN配置的key在DT表中找不到对应的行",
                  ["Key", t],
                  ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                )
              );
        if (0 === o.ReturnType && 0 === o.NumSource)
          return o.NumberValue.Get(0);
        if (1 === o.ReturnType && 0 === o.VecSource)
          return Vector_1.Vector.Create(o.VectorValue.Get(0));
        if (2 === o.ReturnType && 0 === o.RotSource)
          return Rotator_1.Rotator.Create(o.RotatorValue.Get(0));
      }
      o = this.Yre.get(t);
      if (void 0 === o) {
        if (void 0 !== e) return e;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 20, "[自定义值]Blackboard值获取不到", [
            "Key",
            t,
          ]);
      }
      return o;
    }
    UpdateCustomValue(r) {
      var a = this.nK_.get(r);
      if (a) {
        let o = void 0;
        if (
          (0 === a.ReturnType && 0 === a.NumSource) ||
          (1 === a.ReturnType && 0 === a.VecSource) ||
          (2 === a.ReturnType && 0 === a.RotSource)
        )
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "[自定义值]固定值不能更新值",
              ["Key", r],
              ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
            );
        else if (
          (0 === a.ReturnType && 1 === a.NumSource) ||
          (1 === a.ReturnType && 1 === a.VecSource) ||
          (2 === a.ReturnType && 1 === a.RotSource)
        ) {
          var t = a.FormulaList.Num();
          for (let e = 0; e < t; e++) {
            var n = a.FormulaList.Get(e);
            let t = !0;
            if (!StringUtils_1.StringUtils.IsEmpty(n.Condition))
              try {
                var i = new ConditionFormula_1.Formula(
                  n.Condition,
                ).SetBuiltinFunctions(CharacterCustomValueComponent_1.Q4_);
                (t = i.Evaluate(Object.fromEntries(this.Yre.entries()))),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      20,
                      "[自定义值]条件表达式计算结果",
                      ["Key", r],
                      ["表达式序号", e],
                      ["Value", t],
                    );
              } catch (t) {
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Battle",
                    20,
                    "[自定义值]条件表达式计算出现异常",
                    ["Key", r],
                    ["表达式序号", e],
                    ["表达式", n.Condition],
                    ["Value", t instanceof Error ? t.message : t],
                  );
              }
            if (t) {
              try {
                var u = new ConditionFormula_1.Formula(
                  n.Value,
                ).SetBuiltinFunctions(CharacterCustomValueComponent_1.Q4_);
                if (
                  void 0 ===
                  (o = u.Evaluate(Object.fromEntries(this.Yre.entries())))
                )
                  return void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Battle",
                      20,
                      "[自定义值]取值失败",
                      ["Key", r],
                      ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                    )
                  );
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    20,
                    "[自定义值]表达式计算结果",
                    ["Key", r],
                    ["表达式序号", e],
                    ["Value", o],
                  ),
                  this.Yre.set(r, o);
              } catch (t) {
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Battle",
                    20,
                    "[自定义值]表达式计算出现异常",
                    ["Key", r],
                    ["表达式序号", e],
                    ["表达式", n.Value],
                    ["Value", t instanceof Error ? t.message : t],
                  );
              }
              if (!n.IsContinueFormula) break;
            }
          }
        } else {
          if (1 === a.ReturnType) {
            if (3 === a.VecSource)
              (o = Vector_1.Vector.Create(
                this.Entity.GetComponent(1)?.ActorLocationProxy,
              )),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    20,
                    "[自定义值]使用者位置 计算结果",
                    ["Key", r],
                    ["Value", o],
                  );
            else if (2 === a.VecSource) {
              var e = this.Entity.GetComponent(39)?.SkillTarget;
              if (!e?.Valid)
                return (
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      20,
                      "[自定义值]技能目标不存在",
                      ["Key", r],
                      ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                    ),
                  void this.Yre.set(r, void 0)
                );
              (o = Vector_1.Vector.Create(
                e.Entity.GetComponent(1)?.ActorLocationProxy,
              )),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    20,
                    "[自定义值]技能目标位置 计算结果",
                    ["Key", r],
                    ["Value", o],
                  );
            } else if (4 === a.VecSource) {
              e = this.Entity.GetComponent(39)?.SkillTarget;
              if (!e?.Valid)
                return (
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      20,
                      "[自定义值]技能目标不存在",
                      ["Key", r],
                      ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                    ),
                  void this.Yre.set(r, void 0)
                );
              var e = e.Entity.GetComponent(1).ActorLocationProxy,
                C = this.Entity.GetComponent(1).ActorLocationProxy,
                _ = Vector_1.Vector.Create();
              e.Subtraction(C, _),
                _.Normalize(),
                (o = _),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    20,
                    "[自定义值]技能目标位置 计算结果",
                    ["Key", r],
                    ["Value", o],
                  );
            } else if (5 === a.VecSource) {
              e = this.Entity.GetComponent(39)?.SkillTarget;
              if (!e?.Valid)
                return (
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      20,
                      "[自定义值]技能目标不存在",
                      ["Key", r],
                      ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                    ),
                  void this.Yre.set(r, void 0)
                );
              (C = e.Entity.GetComponent(1).ActorLocationProxy),
                (_ = this.Entity.GetComponent(1).ActorLocationProxy),
                (e = Vector_1.Vector.Create());
              C.Subtraction(_, e),
                (e.Z = 0),
                e.Normalize(),
                (o = e),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    20,
                    "[自定义值]技能目标位置 计算结果",
                    ["Key", r],
                    ["Value", o],
                  );
            }
          } else if (2 === a.ReturnType)
            if (3 === a.RotSource)
              (o = Rotator_1.Rotator.Create(
                this.Entity.GetComponent(1)?.ActorRotationProxy,
              )),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    20,
                    "[自定义值]使用者朝向 计算结果",
                    ["Key", r],
                    ["Value", o],
                  );
            else if (2 === a.RotSource) {
              C = this.Entity.GetComponent(39)?.SkillTarget;
              if (!C?.Valid)
                return (
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      20,
                      "[自定义值]技能目标不存在",
                      ["Key", r],
                      ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
                    ),
                  void this.Yre.set(r, void 0)
                );
              (o = Rotator_1.Rotator.Create(
                C.Entity.GetComponent(1)?.ActorRotationProxy,
              )),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    20,
                    "[自定义值]技能目标朝向 计算结果",
                    ["Key", r],
                    ["Value", o],
                  );
            }
          o
            ? this.Yre.set(r, o)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                20,
                "[自定义值]取值失败",
                ["Key", r],
                ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
              );
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "[自定义值]AN配置的key在DT表中找不到对应的行",
            ["Key", r],
            ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()],
          );
    }
  });
(CharacterCustomValueComponent.Q4_ = new Map()),
  (CharacterCustomValueComponent = CharacterCustomValueComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(275)],
      CharacterCustomValueComponent,
    )),
  (exports.CharacterCustomValueComponent = CharacterCustomValueComponent);
//# sourceMappingURL=CharacterCustomValueComponent.js.map
