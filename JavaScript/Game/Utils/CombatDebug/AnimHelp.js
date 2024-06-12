
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AnimHelp=void 0;const CombatDebugScript_1=require("./CombatDebugScript");class AnimHelp extends CombatDebugScript_1.CombatScriptSet{constructor(){super(),this.ResetAnimInstanceCmd=new CombatDebugScript_1.CombatScriptUnit("AnimHelp.ResetAnimInstanceCmd",`
const entityId = 15;
EventSystem.EmitWithTarget(EntitySystem.Get(entityId), EEventName.CharChangeMeshAnim);`,"重置动画蓝图",""),this.GetAnimInstanceCmd=new CombatDebugScript_1.CombatScriptUnit("AnimHelp.GetAnimInstanceCmd",`
const entityId = 15;
const animInstance = EntitySystem.Get(entityId).GetComponentByEnum(EComponent.CharacterAnimationComponent).MainAnimInstance;
animInstance.GetName();

//以下是测试代码，删除【// + 中文】进行测试
//布尔值修改 animInstance.bComponentStart = false;
//旋转值修改 animInstance.LowerBodyRotator = new UE.Rotator(90,90,90);
//向量值修改 animInstance.XXXXX = new UE.Vector(0,0,0);
        `,"获取动画蓝图实例","获取动画蓝图实例后，可进行动画蓝图变量的实时参数"),this.Introduction=`
        /** Welcome to use AnimHelp
        *
        *  你可以在这里找部分动画功能相关的调试指令
        *
        *  如下指令将获取到运行时实体编号为13的实体
        *  EntitySystem.Get(13)
        *  然后你最近修改了这个实体的动画蓝图，
        *  虽然引擎初始化了它，但脚本层没有，所以它没有任何的脚本相关数据更新
        *  你可以尝试将它重新走一遍脚本的初始化
        *  输入下列指令:
        *  EventSystem.EmitWithTarget(EntitySystem.Get(13), EEventName.CharChangeMeshAnim);
        *  如果不是很方便你也可以输入
        *  AnimHelp.ResetAnimInstanceCmd
        *  点击【执行】代码将会执行指令
        *  点击【解析命令】将会把短句的指令完整替换到具体指令，以方便修改。
        *
        *
        *
        *
        *
        *
        */;`,this.CombatScriptUnits.push(this.ResetAnimInstanceCmd,this.GetAnimInstanceCmd);for(const t of this.CombatScriptUnits)this.Introduction+=t.ToString()}}exports.AnimHelp=AnimHelp;
//# sourceMappingURL=AnimHelp.js.map