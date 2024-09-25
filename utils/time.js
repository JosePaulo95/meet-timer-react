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

// Função que calcula o tempo de fim baseado na string de hora de fim
export function calculateEndTime(endTimeStr) {
    const [hours, minutes] = endTimeStr.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours);
    endTime.setMinutes(minutes);
    endTime.setSeconds(0);
    return endTime.getTime();
};

export function calcRemainingTime(endTimeStr) {
    const endTime = calculateEndTime(endTimeStr);

    const currentTime = new Date().getTime();
    const remaining = endTime - currentTime;

    if (remaining <= 0) {
        return '00:00';
    }

    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${displayMinutes}:${displaySeconds}`
}