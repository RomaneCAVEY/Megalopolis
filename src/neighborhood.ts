// Differents types of neightborhood
enum Color {
    Green,
    Blue,
    Red,
    Grey,
    Rainbow= -1
}

// create a green neighborhood
function getRainbowNeighborhood() : Color
{
    return Color.Rainbow;
}

/* 
0 : Green
1 : Blue
2 : Red
3 : Grey
*/
function createNeighborhood(c : number) : Color
{
	if (c%4 === 0)
		return Color.Green;
	else if (c%4 === 1)
		return Color.Blue;
	else if (c%4 === 2)
		return Color.Red;
	else 
		return Color.Grey;
}

export {Color, createNeighborhood, getRainbowNeighborhood};
