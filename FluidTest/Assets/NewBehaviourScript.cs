using UnityEngine;
using System.Collections;

public class NewBehaviourScript : MonoBehaviour {

	// Use this for initialization
	void Start () {
	}
	// Update is called once per frame
	void Update () {
		Vector2 p = transform.position;
		p.x += 0.1f;
		transform.position = p;

	}
}
