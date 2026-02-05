const inputs = document.querySelectorAll('input');

function toMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

function toHours(totalMinutes) {
    if (isNaN(totalMinutes)) return "--:--";
    // Se o valor for negativo (ex: trabalhou demais), tratamos como 0 ou exibimos 00:00
    if (totalMinutes < 0) return "00:00"; 
    
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function calculate() {
    const startVal = document.getElementById('entrada').value;
    const lunchStartVal = document.getElementById('saidaAlmoco').value;
    const lunchEndVal = document.getElementById('retornoAlmoco').value;
    const balanceVal = document.getElementById('balance').value;

    if (startVal && lunchStartVal && lunchEndVal) {
        const start = toMinutes(startVal);
        const lunchStart = toMinutes(lunchStartVal);
        const lunchEnd = toMinutes(lunchEndVal);
        const balance = toMinutes(balanceVal);
        
        const hoursWorking = 8; // CASO QUEIRA ALTERAR AS HORAS FIXAS TRABALHADAS NO DIA.

        const workGoal = (hoursWorking * 60) - balance;

        const morningDuration = lunchStart - start;
        const remainingMinutes = workGoal - morningDuration;
        const targetClockOut = lunchEnd + remainingMinutes;

        document.getElementById('tempoTrabalhado').innerText = toHours(morningDuration);
        document.getElementById('horaSaida').innerText = toHours(targetClockOut);
    }
}

inputs.forEach(input => input.addEventListener('input', calculate));

const yearElement = document.getElementById('anoAtual');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}