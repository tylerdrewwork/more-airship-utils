import Character from "@Easy/Core/Shared/Character/Character";
import CharacterParentComponent from "Code/MoreAirshipUtils/Character/CharacterParenter";

/**
 * Put this on a trigger attatched to a moving platform to let your player move with the platform. 
 * Make sure that you have CharacterParenter.ts on your character!
 */
export default class ParentOnTriggerEnter extends AirshipBehaviour {
	protected OnTriggerEnter(collider: Collider): void {
		const char = collider.gameObject.GetAirshipComponentInParent<Character>();
		if (char) {
			
			const charParenter = char.gameObject.GetAirshipComponent<CharacterParentComponent>()
			if (charParenter) {
				charParenter.parent = this.transform.parent.gameObject;
				charParenter.ClearParentState();
				print("new parent:" + charParenter?.parent);
			}
		}
	}

	protected OnTriggerExit(collider: Collider): void {
		const char = collider.gameObject.GetAirshipComponentInParent<Character>();
		if (char) {
			const charParenter = char.gameObject.GetAirshipComponent<CharacterParentComponent>()
			if (charParenter) {
				charParenter.parent = undefined;
			}
		}
	}
}
