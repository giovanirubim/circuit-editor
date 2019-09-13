import { Coord, Transform } from '/js/transform-2d.js';

class Component {
	constructor() {
		this.transform = Transform();
		this.stateChanged = 0;
		this.inputChanged = 0;
	}
}
class AtomicComp extends Component {
	constructor() {}
}
class ComplexComp extends Component {
}