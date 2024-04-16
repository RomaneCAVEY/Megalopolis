function random(seed: number) : number
{
	const nextSeed : number = (1839567234 * seed + 972348567) % 8239451023;
	return nextSeed;
}


function randomInRange(seed: number, min: number, max: number) : number
{
	const nextSeed : number = random(seed);
	const r : number = min + Math.floor((nextSeed) % (max - min))
	return r;
}


export {randomInRange};