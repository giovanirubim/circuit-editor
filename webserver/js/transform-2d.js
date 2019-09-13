class Coordinate extends Float32Array {
	constructor() {
		super(2);
	}
	set(a, b) {
		if (a instanceof Coordinate) {
			this[0] = a[0];
			this[1] = a[1];
		} else {
			this[0] = a;
			this[1] = b;
		}
		return this;
	}
	clear() {
		this[0] = this[1] = 0;
		return this;
	}
	translate(x, y) {
		this[0] += x;
		this[1] += y;
		return this;
	}
	round(step) {
		if (step !== undefined) {
			this[0] = Math.round(this[0]);
			this[1] = Math.round(this[1]);
		} else {
			this[0] = Math.round(this[0]/step)*step;
			this[1] = Math.round(this[1]/step)*step;
		}
		return this;
	}
	apply(transform) {
		const [x, y] = this;
		const [a, b, c, d, e, f] = transform;
		return this;
	}
	reverse(transform) {
		const [x, y] = this;
		const [a, b, c, d, e, f] = transform;
		if (Math.abs(d) > Math.abs(c)) {
			const g = c/d;
			const h = y - f;
			this[0] = (x - e - h*g)/(a - b*g);
			this[1] = (h - this[0]*b)/d;
		} else {
			const g = d/c;
			const h = x - e;
			this[0] = (y - h*g - f)/(b - a*g);
			this[1] = (h - this[0]*a)/c;
		}
		return this;
	}
}
class Transformation extends Float32Array {
	constructor() {
		super(6);
		this[0] = 1;
		this[3] = 1;
	}
	set(a, b, c, d, e, f) {
		if (a instanceof Transformation) {
			this[0] = a[0];
			this[1] = a[1];
			this[2] = a[2];
			this[3] = a[3];
			this[4] = a[4];
			this[5] = a[5];
		} else {
			this[0] = a;
			this[1] = b;
			this[2] = c;
			this[3] = d;
			this[4] = e;
			this[5] = f;
		}
		return this;
	}
	clear() {
		this[0] = 1;
		this[1] = 0;
		this[2] = 0;
		this[3] = 1;
		this[4] = 0;
		this[5] = 0;
		return this;
	}
	translate(x, y) {
		this[4] += x;
		this[5] += y;
		return this;
	}
	scale(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;
		this[2] *= scalar;
		this[3] *= scalar;
		this[4] *= scalar;
		this[5] *= scalar;
		return this;
	}
	rotate(radians) {
		const [a, b, c, d, e, f] = this;
		const cos = Math.cos(radians);
		const sin = Math.sin(radians);
		this[0] = a*cos - b*sin;
		this[1] = a*sin + b*cos;
		this[2] = c*cos - d*sin;
		this[3] = c*sin + d*cos;
		this[4] = e*cos - f*sin;
		this[5] = e*sin + f*cos;
		return this;
	}
	coord(coord) {
		coord[0] = this[4];
		coord[1] = this[5];
		return this;
	}
	round(step) {
		if (step !== undefined) {
			this[0] = Math.round(this[0]);
			this[1] = Math.round(this[1]);
			this[2] = Math.round(this[2]);
			this[3] = Math.round(this[3]);
			this[4] = Math.round(this[4]);
			this[5] = Math.round(this[5]);
		} else {
			this[0] = Math.round(this[0]/step)*step;
			this[1] = Math.round(this[1]/step)*step;
			this[2] = Math.round(this[2]/step)*step;
			this[3] = Math.round(this[3]/step)*step;
			this[4] = Math.round(this[4]/step)*step;
			this[5] = Math.round(this[5]/step)*step;
		}
		return this;
	}
}
export const Coord = () => new Coordinate();
export const Transform = () => new Transformation();