export function calculateFutureTime(minutesToAdd, start = new Date()) {
    const now = new Date(start.getTime());

    const currentMinutes = now.getMinutes();
    const roundedMinutes = minutesToAdd ? Math.round((currentMinutes + minutesToAdd) / 15) * 15 : currentMinutes;

    if (roundedMinutes === 60) {
        now.setHours(now.getHours() + 1);
        now.setMinutes(0);
    } else {
        now.setMinutes(roundedMinutes);
    }

    return now.toTimeString().slice(0, 5);
}