export function getNowDateText() {
    return new Date().toISOString()
                     .split('T')[0];
}
