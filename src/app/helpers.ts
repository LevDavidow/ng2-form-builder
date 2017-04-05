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