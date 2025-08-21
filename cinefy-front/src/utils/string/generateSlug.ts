
const translit = (str: string): string => {
	const az: Record<string, string> = {
		'ə': 'e', 'Ə': 'e',
		'ı': 'i', 'I': 'i',
		'ö': 'o', 'Ö': 'o',
		'ü': 'u', 'Ü': 'u',
		'ş': 'sh', 'Ş': 'sh',
		'ç': 'ch', 'Ç': 'ch',
		'ğ': 'g', 'Ğ': 'g',
	}

	return str
		.split('')
		.map(ch => az[ch] ?? ch) 
		.join('')
}


const generateSlug = (str: string): string => {
	if (!str) return ''

	let url: string = str.replace(/[\s]+/gi, '-')

	url = translit(url)

	url = url
		.replace(/[^0-9a-z_\-]+/gi, '')
		.replace(/-{2,}/g, '-') 
		.replace(/^-+|-+$/g, '') 
		.toLowerCase()          

	return url
}

export default generateSlug
