import { Game } from "@Easy/Core/Shared/Game";

/**
 * Add this to the character prefab to allow correct parenting for character physics
 * @see ParentOnTriggerEnter.ts
 */
export default class CharacterParentComponent extends AirshipBehaviour {
    public parent: GameObject | undefined;
    private lastPos: Vector3 | undefined = undefined;
    private lastRot: Vector3 | undefined = undefined;
    private rb: Rigidbody;

    /** Call after setting parent so the next frame uses current platform transform (avoids teleport on re-enter). */
    public ClearParentState(): void {
        this.lastPos = undefined;
        this.lastRot = undefined;
    }

    protected Start(): void {
        this.rb = this.gameObject.GetComponent<Rigidbody>()!;
    }

    protected FixedUpdate(): void {
        if (!Game.IsServer()) return;
        if (!this.parent) return;
        const lastPos = this.lastPos ?? this.parent.transform.position;
        const lastRot = this.lastRot ?? this.parent.transform.rotation.eulerAngles;
        const lastParentQ = Quaternion.Euler(lastRot.x, lastRot.y, lastRot.z);
        const invLastParentQ = Quaternion.Inverse(lastParentQ);

        // Position: offset in last frame's parent local space, then apply current parent transform
        const offset = this.rb.position.sub(lastPos);
		const newPos = this.parent.transform.position.add(this.parent.transform.rotation.mul(invLastParentQ.mul(offset)));
		const newRot = this.parent.transform.rotation.mul(invLastParentQ).mul(this.rb.rotation);
        this.rb.MovePosition(newPos);
		this.rb.MoveRotation(newRot);
        
        this.lastPos = this.parent.transform.position;
        this.lastRot = this.parent.transform.rotation.eulerAngles;
    }
}
1