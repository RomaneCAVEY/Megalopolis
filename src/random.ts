function random(seed: number) : number
{
	const nextSeed : number = (1839567234 * seed + 972348567) % 8239451023;
	return nextSeed;
}


/** Returns the Size_largest_componentof_each_color
 * @param seed a random number
 * @param min minimal include value
 * @param max maximal exclude value
 * @return number in [min, max[
 */
function randomInRange(seed: number, min: number, max: number) : number
{
	const nextSeed : number = random(seed);
	const r : number = min + Math.floor((nextSeed) % (max - min));
	return r;
}


export {randomInRange};