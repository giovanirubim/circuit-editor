import { Coord, Transform } from '/js/transform-2d.js';
import * as Util from '/js/Util.js';

class Bit extends Uint8Array {
	constructor(buffer, index) {
		if (buffer === undefined) {
			super(1);
		} else {
			super(buffer, index);
		}
	}
}
class BitStream {
	constructor() {
		this.bits = [];
	}
	bit(index) {
		return this.bits[index];
	}
	append(element) {
		const {bits} = this;
		if (element instanceof Bit) {
			bits.push(element);
		} else if (element instanceof BitStream) {
			const array = element.bits;
			const {length} = array;
			for (let i=0; i<length; ++i) {
				bits.push(array[i]);
			}
		}
		return this;
	}
	sub(first, last) {
		const {bits} = this;
		const stream = new BitStream();
		for (let i=first; i<=last; ++i) {
			stream.append(bits[i]);
		}
		return stream;
	}
	uint() {
		const {bits} = this;
		const {length} = bits;
		let res = 0, pow = 1;
		for (let i=0; i<length; ++i) {
			res += bits[i]*pow;
			pow *= 2;
		}
		return res;
	}
	count() {
		const {bits} = this;
		let res = 0;
		for (let i=bits.length; i; ) {
			res += bits[--i];
		}
		return res;
	}
	size() {
		return this.bits.length;
	}
}
class Point {
	constructor() {
		this.coord = Coord();
		this.source = null;
		this.fixed = false;
		this.wires = [];
	}
	setSource(source) {
		if (this.fixed === true) {
			throw 'Can not reset the source of a fixed point';
		}
		this.source = source;
		return this;
	}
	fixSource(source) {
		this.setSource(source);
		this.fixed = true;
		return this;
	}
	disconnect(forced) {
		const {wires} = this;
		for (let i=wires.length; i--;) {
			const wire = wires[i];
			if (wire.hidden === false || forced === true) {
				wire.disconnect();
			}
		}
		return this;
	}
}
class Wire {
	constructor(a, b, hidden) {
		this.a = a;
		this.b = b;
		a.wires.push(this);
		b.wires.push(this);
		this.hidden = hidden || false;
	}
	other(point) {
		const {a, b} = this;
		return point === b ? a : b;
	}
	disconnect() {
		Util.arrayRemove(this.a.wires, this);
		Util.arrayRemove(this.b.wires, this);
		return this;
	}
}
class WirePoint extends Point {
	constructor() {
		super();
	}
}
class IOPoint extends Point {
	constructor(type) {
		super();
		this.type = type;
	}
}
class InnerIO extends IOPoint {
	constructor(type) {
		super(type);
	}
}
class OuterIO extends IOPoint {
	constructor(type) {
		super(type);
		this.component = null;
		this.attr = null;
	}
	setSource(source) {
		const {attr} = this;
		if (this.fixed === true) {
			throw 'Can not reset the source of a fixed point';
		}
		if (attr !== null) {
			if (source.size() !== 1) {
				throw 'Gate inputs need a one-bit source';
			}
			this.component[attr] = source.bit(0);
		}
	}
}