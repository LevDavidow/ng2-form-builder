export function generateUID(): string {
	let i, random;
    let result = '';

    for (i = 0; i < 10; i++) {
        random = Math.random() * 16 | 0;
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return result;
}

export function isCurrentDragula(dragulaValue, id) {
	return dragulaValue[0] === id;
}


export class ReducedArray {
	public order: string[];
	public keys: Object;


	constructor(private array: Array<any>, private key: string) {
		this.createOrder();
		this.createKeys();
	}

	static isLengthEqual(first: ReducedArray, second: ReducedArray) {
		return first.order.length === second.order.length;  
	}

	
	static findDifferentKey(long: ReducedArray, short: ReducedArray) {
		const keysLong = long.order;
		const keysShort = short.order;


		let diff: string = '';

		for (let key of keysLong) {
			if (keysShort.indexOf(key) === - 1) {
				diff = key;
				break;
			}
		}

		return diff;
	}

	public read(key) {
		return this.keys[key];
	}

	public delete(toDelete) {

		this.order = this.order.filter(key => key !== toDelete );

		delete this.keys[toDelete];
	}

	public update(key, value) {
		this.keys[key] = value;
	}
	
	public create(key, value) {
		this.order.push(key);
		this.keys[key] = value;
	}

	public reduceBack() {
		return this.order.map(key => this.keys[key]);
	}

	private createOrder() {
		this.order = this.array.map(item => item[this.key]);
	}

	private createKeys() {
		this.keys = this.array.reduce((result, item) => {
			const key = item[this.key]
			result[key] = item;
			return result;
		}, {})
	}
}