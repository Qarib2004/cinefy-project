export const getMovieWordWithEnding = (movieCount: number) => {
	switch (movieCount) {
		case 1 || 21:
			return `${movieCount} film`
		default:
			return `${movieCount} films`
	}
}