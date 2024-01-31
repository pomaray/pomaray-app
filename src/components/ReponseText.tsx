export function ResponseText({
	errorMessage,
}: {
	errorMessage?: string;
}) {
	return (
		<div className="text-center">
			<p className="text-danger">{errorMessage}</p>
		</div>
	);
}
