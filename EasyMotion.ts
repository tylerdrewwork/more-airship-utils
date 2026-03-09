import { applyEasing, EasingType } from "Code/MoreAirshipUtils/Easings";

export default class EasyMotion extends AirshipBehaviour {
	/** 0 = Self, 1 = World. Only applies to non-sine translate/rotate. */
	public transformSpace: number = 0;

	@Header("Translation")
	public translate = false;
	public translationSpeed = new Vector3(0, 0, 0);
	/** When true, lerp position from start to end point and back. End point is in local space. */
	public useTranslateToPoint = false;
	public translateToPoint = new Vector3(0, 0, 0);
	/** Time in seconds to go from start to end (one way). Full cycle = 2 × lerpDuration. */
	public lerpDuration = 2;
	/** Easing for translate-to-point motion. See https://easings.net/ */
	public easingType = EasingType.Linear;

	@Header("Rotation")
	public rotate = false;
	public angularRotationSpeed = new Vector3(0, 0, 0);

	@Header("Scale")
	public scale = false;
	public scaleSpeed = new Vector3(0, 0, 0);

	@Header("Sine Motion")
	public sineMotion = false;
	public sineMod = 1;
	public sineOffset = 0;
	public randomizeOffset = false;

	private initialPos = new Vector3(0, 0, 0);
	private initialScale = new Vector3(0, 0, 0);
	private initialRot = new Vector3(0, 0, 0);

	protected Start(): void {
		if (this.randomizeOffset) {
			this.sineOffset += math.random();
		}
		this.initialPos = this.transform.localPosition;
		this.initialScale = this.transform.localScale;
		this.initialRot = this.transform.localEulerAngles;
	}

	protected FixedUpdate(): void {
		if (this.translate) {
			if (this.useTranslateToPoint && this.lerpDuration > 0) {
				const cycle = 2 * this.lerpDuration;
				const elapsed = (Time.time + this.sineOffset) % cycle;
				const tRaw = elapsed < this.lerpDuration
					? elapsed / this.lerpDuration
					: 2 - elapsed / this.lerpDuration;
				const t = applyEasing(this.easingType, tRaw);
				const diff = this.translateToPoint.sub(this.initialPos);
				this.transform.localPosition = this.initialPos.add(diff.mul(t));
			} else if (this.sineMotion) {
				const s = math.sin(Time.time * this.sineMod + this.sineOffset);
				this.transform.localPosition = this.initialPos.add(this.translationSpeed.mul(s));
			} else {
				const delta = this.translationSpeed.mul(Time.deltaTime);
				this.transform.Translate(delta.x, delta.y, delta.z);
			}
		}
		if (this.rotate) {
			if (this.sineMotion) {
				const s = math.sin(Time.time * this.sineMod + this.sineOffset);
				this.transform.localEulerAngles = this.initialRot.add(this.angularRotationSpeed.mul(s));
			} else {
				const delta = this.angularRotationSpeed.mul(Time.deltaTime);
				this.transform.Rotate(delta.x, delta.y, delta.z);
			}
		}
		if (this.scale) {
			if (this.sineMotion) {
				const s = (math.sin(Time.time * this.sineMod + this.sineOffset) + 1) / 2;
				this.transform.localScale = this.initialScale.add(this.scaleSpeed.mul(s));
			} else {
				const current = this.transform.localScale;
				this.transform.localScale = current.add(this.scaleSpeed.mul(Time.deltaTime));
			}
		}
	}
}
