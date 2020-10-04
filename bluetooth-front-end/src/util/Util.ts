export function isNumeric(str: string) {
	if (typeof str != "string")
	{
		return false;
	}
	return !isNaN(str as unknown as number) && !isNaN(parseFloat(str));
}
