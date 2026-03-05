/**
 * Easing functions taken from https://easings.net/
 * Each function takes x in [0, 1] and returns the eased value (usually in [0, 1] unless it's something like bounce which bounces out of the given range for a bit).
 */
export type EasingFn = (x: number) => number;

function linear(x: number): number {
	return x;
}

function inSine(x: number): number {
	return 1 - math.cos((x * math.pi) / 2);
}

function outSine(x: number): number {
	return math.sin((x * math.pi) / 2);
}

function inOutSine(x: number): number {
	return -(math.cos(math.pi * x) - 1) / 2;
}

function inQuad(x: number): number {
	return x * x;
}

function outQuad(x: number): number {
	return 1 - (1 - x) * (1 - x);
}

function inOutQuad(x: number): number {
	return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
}

function inCubic(x: number): number {
	return x * x * x;
}

function outCubic(x: number): number {
	return 1 - (1 - x) ** 3;
}

function inOutCubic(x: number): number {
	return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

function inQuart(x: number): number {
	return x * x * x * x;
}

function outQuart(x: number): number {
	return 1 - (1 - x) ** 4;
}

function inOutQuart(x: number): number {
	return x < 0.5 ? 8 * x * x * x * x : 1 - (-2 * x + 2) ** 4 / 2;
}

function inQuint(x: number): number {
	return x * x * x * x * x;
}

function outQuint(x: number): number {
	return 1 - (1 - x) ** 5;
}

function inOutQuint(x: number): number {
	return x < 0.5 ? 16 * x * x * x * x * x : 1 - (-2 * x + 2) ** 5 / 2;
}

function inExpo(x: number): number {
	return x === 0 ? 0 : math.pow(2, 10 * x - 10);
}

function outExpo(x: number): number {
	return x === 1 ? 1 : 1 - math.pow(2, -10 * x);
}

function inOutExpo(x: number): number {
	if (x === 0) return 0;
	if (x === 1) return 1;
	return x < 0.5 ? math.pow(2, 20 * x - 10) / 2 : (2 - math.pow(2, -20 * x + 10)) / 2;
}

function inCirc(x: number): number {
	return 1 - math.sqrt(1 - x * x);
}

function outCirc(x: number): number {
	return math.sqrt(1 - (x - 1) * (x - 1));
}

function inOutCirc(x: number): number {
	return x < 0.5
		? (1 - math.sqrt(1 - (2 * x) ** 2)) / 2
		: (math.sqrt(1 - (-2 * x + 2) ** 2) + 1) / 2;
}

const c1 = 1.70158;
const c3 = c1 + 1;

function inBack(x: number): number {
	return c3 * x * x * x - c1 * x * x;
}

function outBack(x: number): number {
	return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
}

function inOutBack(x: number): number {
	const c2 = c1 * 1.525;
	return x < 0.5
		? ((2 * x) ** 2 * ((c2 + 1) * 2 * x - c2)) / 2
		: ((2 * x - 2) ** 2 * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

const c4 = (2 * math.pi) / 3;

function inElastic(x: number): number {
	if (x === 0) return 0;
	if (x === 1) return 1;
	return -math.pow(2, 10 * x - 10) * math.sin((x * 10 - 10.75) * c4);
}

function outElastic(x: number): number {
	if (x === 0) return 0;
	if (x === 1) return 1;
	return math.pow(2, -10 * x) * math.sin((x * 10 - 0.75) * c4) + 1;
}

function inOutElastic(x: number): number {
	if (x === 0) return 0;
	if (x === 1) return 1;
	return x < 0.5
		? -(math.pow(2, 20 * x - 10) * math.sin((20 * x - 11.125) * ((2 * math.pi) / 4.5))) / 2
		: math.pow(2, -20 * x + 10) * math.sin((20 * x - 11.125) * ((2 * math.pi) / 4.5)) / 2 + 1;
}

const n1 = 7.5625;
const d1 = 2.75;

function outBounce(x: number): number {
	if (x < 1 / d1) return n1 * x * x;
	if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
	if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
	return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

function inBounce(x: number): number {
	return 1 - outBounce(1 - x);
}

function inOutBounce(x: number): number {
	return x < 0.5 ? (1 - outBounce(1 - 2 * x)) / 2 : (1 + outBounce(2 * x - 1)) / 2;
}

/** All easing names from easings.net. Use with Easings.apply(). */
export enum EasingType {
	Linear,
	EaseInSine,
	EaseOutSine,
	EaseInOutSine,
	EaseInQuad,
	EaseOutQuad,
	EaseInOutQuad,
	EaseInCubic,
	EaseOutCubic,
	EaseInOutCubic,
	EaseInQuart,
	EaseOutQuart,
	EaseInOutQuart,
	EaseInQuint,
	EaseOutQuint,
	EaseInOutQuint,
	EaseInExpo,
	EaseOutExpo,
	EaseInOutExpo,
	EaseInCirc,
	EaseOutCirc,
	EaseInOutCirc,
	EaseInBack,
	EaseOutBack,
	EaseInOutBack,
	EaseInElastic,
	EaseOutElastic,
	EaseInOutElastic,
	EaseInBounce,
	EaseOutBounce,
	EaseInOutBounce,
}

const easingMap: Record<EasingType, EasingFn> = {
	[EasingType.Linear]: linear,
	[EasingType.EaseInSine]: inSine,
	[EasingType.EaseOutSine]: outSine,
	[EasingType.EaseInOutSine]: inOutSine,
	[EasingType.EaseInQuad]: inQuad,
	[EasingType.EaseOutQuad]: outQuad,
	[EasingType.EaseInOutQuad]: inOutQuad,
	[EasingType.EaseInCubic]: inCubic,
	[EasingType.EaseOutCubic]: outCubic,
	[EasingType.EaseInOutCubic]: inOutCubic,
	[EasingType.EaseInQuart]: inQuart,
	[EasingType.EaseOutQuart]: outQuart,
	[EasingType.EaseInOutQuart]: inOutQuart,
	[EasingType.EaseInQuint]: inQuint,
	[EasingType.EaseOutQuint]: outQuint,
	[EasingType.EaseInOutQuint]: inOutQuint,
	[EasingType.EaseInExpo]: inExpo,
	[EasingType.EaseOutExpo]: outExpo,
	[EasingType.EaseInOutExpo]: inOutExpo,
	[EasingType.EaseInCirc]: inCirc,
	[EasingType.EaseOutCirc]: outCirc,
	[EasingType.EaseInOutCirc]: inOutCirc,
	[EasingType.EaseInBack]: inBack,
	[EasingType.EaseOutBack]: outBack,
	[EasingType.EaseInOutBack]: inOutBack,
	[EasingType.EaseInElastic]: inElastic,
	[EasingType.EaseOutElastic]: outElastic,
	[EasingType.EaseInOutElastic]: inOutElastic,
	[EasingType.EaseInBounce]: inBounce,
	[EasingType.EaseOutBounce]: outBounce,
	[EasingType.EaseInOutBounce]: inOutBounce,
};

/** Apply an easing. x should be in [0, 1]. */
export function applyEasing(t: EasingType, x: number): number {
	return easingMap[t](math.clamp(x, 0, 1));
}
